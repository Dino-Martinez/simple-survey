module.exports = {
  hasOptions: function (type) {
    return (type === 'checkbox' || type === 'radio')
  },
  concat: function (args) {
    let outStr = ''
    for (const arg in args) {
      if (typeof args[arg] !== 'object') {
        outStr += args[arg]
      }
    }
    return outStr
  }
}
