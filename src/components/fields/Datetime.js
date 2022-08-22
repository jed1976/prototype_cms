const Input = require('./Input')

module.exports = class Datetime extends Input {
  constructor(config, data) {
    config = Object.assign(config, {
      attributes: {
        type: config.timepicker ? 'datetime-local' : 'date',
      }
    })

    super(config, data)
  }
}
