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
    async function fetchSurvey (req) {
      return await Survey.findById(req.params.id).lean()
    }

    fetchSurvey(req)
      .then(function (survey) {
        res.render('survey', { key: req.params.id, survey: survey })
      })
  })

  app.post('/respond/:id', (req, res) => {
    res.send({ status: 200, message: 'Route Got hit, nothing saved.' })
  })
}
