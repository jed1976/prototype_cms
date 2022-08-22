const Input = require('./Input')

module.exports = class Plaintext extends Input {
  constructor(config, data) {
    config.attributes = {
      type: 'text'
    }

    super(config, data)
  }
}
