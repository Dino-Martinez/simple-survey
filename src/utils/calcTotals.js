module.exports = (survey) => {
  survey.questions.forEach(question => {
    if (question.options) {
      // Transpose 2D array to get matrix of form
      // [ [answer_1_1, answer_1_2], [answer_2_1, answer_2_2] ]
      question.responses = question.responses[0].map((_, colIndex) => question.responses.map(row => row[colIndex]))
      question.totals = []
      question.responses.forEach((option, index) => {
        const numTrue = option.reduce((acc, curr) => {
          if (curr === true) {
            acc++
          }
          return acc
        }, 0)
        question.totals.push(numTrue)
      })
    }
  })
  return survey
}
