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
    console.log('Dynamic Survey Route.')

    const exampleSurvey = {
      name: 'Is this a simple survey?',
      questions: [
        {
          prompt: 'On a scale from 1 to 10 how hard is this survey?',
          type: 'text'
        },
        {
          prompt: 'What are good alternative names to simple survey?',
          type: 'radio',
          options: ['simpl-serve', 'simple surv(e with a tilde)', 'nothing, stop doing the most.']
        },
        {
          prompt: 'How many hours will Dino spend on the front-end?',
          type: 'checkbox',
          options: ['+5 min', '+30 min', '+1 hr', '+3 hr']
        },
        {
          prompt: 'How many surveys could a woodchuck chuck, if a woodchuck could chuck wood?',
          type: 'number'
        }
      ]
    }
    res.render('survey', { survey: exampleSurvey })
  })

  app.post('/create', (req, res) => {
    const newSurvey = new Survey(req.body)

    newSurvey
      .save()
      .then(() => {
        res.send({ status: 200, message: 'Survey created successfully!' })
      })
  })
}
