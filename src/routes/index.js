const Survey = require('../models/survey')

module.exports = (app, connectDb) => {
  // Establish connection to Database
  connectDb()

  app.get('/', (req, res) => {
    res.render('home')
  })

  app.get('/create', (req, res) => {
    res.render('create')
  })

  app.get('/respond/:id', (req, res) => {
    async function fetchSurvey (req) {
      return await Survey.findById(req.params.id).lean()
    }

    fetchSurvey(req)
      .then(function (survey) {
        res.render('survey', { survey: survey })
      })
  })

  app.post('/create', (req, res) => {
    const newSurvey = new Survey(req.body)
    const uniqueKey = newSurvey.id
    const surveyUrl = 'localhost:8080/respond/' + uniqueKey
    // replace above code for production link
    // const surveyUrl = 'https://simpl-survey.herokuapp.com/respond/' + uniqueKey
    newSurvey
      .save()
      .then(() => {
        res.send({ status: 200, message: 'Visit this link to take the survey: ' + surveyUrl })
      })
  })
}
