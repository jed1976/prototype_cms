const Input = require('./Input')

module.exports = class URL extends Input {
  constructor(config, data) {
    const protocols = ['http://', 'https://']

    config = Object.assign(config, {
      attributes: {
        maxlength: 524288,
        minlength: protocols[0].length,
        pattern: '(http://.*|https://.*)',
        type: 'url'
      }
    })

    super(config, data)

    this.field.addEventListener('blur', e => {
      const el = e.target
      const value = el.value

      if ((value.startsWith(protocols[0]) === false &&
          value.startsWith(protocols[1]) === false) &&
          value !== '') {
        el.value = protocols[0] + value
      }
    })
  }
}
