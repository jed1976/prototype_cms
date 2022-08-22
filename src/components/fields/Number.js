const Input = require('./Input')

module.exports = class Number extends Input {
  constructor(config, data) {
    config = Object.assign(config, {
      attributes: {
        max: config.max,
        min: config.min,
        type: 'number'
      }
    })

    super(config, data)
  }
}
