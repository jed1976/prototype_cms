const Input = require('./Input')

module.exports = class Color extends Input {
  constructor(config, data) {
    config = Object.assign(config, {
      attributes: {
        type: 'color'
      },
    })

    super(config, data)

    this.field.classList.add('h3')
  }
}
