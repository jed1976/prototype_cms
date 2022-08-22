const Input = require('./Input')

module.exports = class Email extends Input {
  constructor(config, data) {
    config = Object.assign(config, {
      attributes: {
        type: 'email'
      }
    })

    super(config, data)
  }
}
