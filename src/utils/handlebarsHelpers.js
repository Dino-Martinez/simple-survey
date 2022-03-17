module.exports = {
  hasOptions: function (type) {
    return (type === 'checkbox' || type === 'radio')
  },
  concat: function (first, second, third) {
    return first + second + third
  }
}
