const mongoose = require('mongoose')

const { Schema } = mongoose

const SurveySchema = new Schema(
  {
    name: { type: String, required: true },
    questions: [
      {
        prompt: { type: String, required: true },
        type: { type: String, required: true },
        options: { type: Object, required: false }
      }
    ]
  }
)

module.exports = mongoose.model('Survey', SurveySchema)
