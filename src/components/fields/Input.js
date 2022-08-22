const { h, setChildren } = require('redom')
const Field = require('./Field')

module.exports = class Input extends Field {
  constructor(config, data) {
    super(config, data)

    const defaultConfig = {
      oninput: () => {},
      singleLine: true
    }

    const attributes = {
      autocapitalize: 'off',
      autocorrect: 'off',
      autocomplete: config.name,
      name: config.name,
      required: config.required,
      spellcheck: false,
      value: data || '',
    }

    config = Object.assign(defaultConfig, config)

    let el = config.singleLine ? 'input' : 'textarea'

    if (config.singleLine === false) {
      attributes.rows = 10
      attributes.style = 'resize: none'
    }

    this.field = h(`${el}.bg-black-05.black.bn.border-box.br2.db.f5.lh-copy.input-reset.ma0.pa2.w-100`, attributes)

    this.field.oninput = config.oninput

    setChildren(this.content, this.field)
  }
}
