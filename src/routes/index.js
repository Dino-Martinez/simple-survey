const Survey = require('../models/survey')
const mongoose = require('mongoose')

module.exports = (app, connectDb) => {
  // Establish connection to Database
  connectDb()

  async function fetchSurvey (req) {
    return await Survey.findById(req.params.id).lean()
  }

  app.get('/', (req, res) => {
    res.render('home')
  })

  app.get('/create', (req, res) => {
    res.render('create')
  })

  app.post('/create', (req, res) => {
    const newSurvey = new Survey(req.body)
    const uniqueKey = newSurvey.id
    newSurvey
      .save()
      .then(() => {
        res.render('link', { key: uniqueKey })
      })
  })

  app.get('/respond/:id', (req, res) => {
    console.log(req.params.id)

    fetchSurvey(req)
      .then(function (survey) {
        res.render('survey', { key: req.params.id, survey: survey })
      })
  })

  app.post('/respond/:id', (req, res) => {
    fetchSurvey(req)
      .then(function (survey) {
        const questions = survey.questions
        const id = mongoose.Types.ObjectId(req.params.id)
        questions.forEach((question, x) => {
          // case: radio, check
          if (question.options) {
            const arr = []
            question.options.forEach((option, y) => {
              if (req.body.questions[x].includes(option)) {
                arr.push(true)
              } else {
                arr.push(false)
              }
            })
            question.responses.push(arr)
          } else {
            // base case : text, number
            question.responses.push(req.body.questions[x])
          }
        })

        Survey.findByIdAndUpdate({ _id: id }, { questions: questions }, function (err, result) {
          if (err) {
            res.send(err)
          } else {
            res.send({ status: 200, message: 'Responses saved successfully!!' })
          }
        })
      })
  })
}
