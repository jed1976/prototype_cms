const Input = require('./Input')

module.exports = class Phone extends Input {
  constructor(config, data) {
    config = Object.assign(config, {
      attributes: {
        type: 'phone'
      }
    })

    super(config, data)
  }
}
