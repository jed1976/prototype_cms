const { h, setChildren, setStyle } = require('redom')
const Field = require('./Field')
const arrow = require('../../images/arrow-down.svg')

module.exports = class Option extends Field {
  constructor(config, data) {
    const defaultConfig = {
      oninput: () => {},
    }

    config = Object.assign(defaultConfig, config)

    super(config, data)

    const options = config.options.map(option => h('option', { value: option.value }, option.label))

    this.field = h('select.bg-black-05.black.bn.border-box.br2.db.f5.lh-copy.input-reset.ma0.pa2.w-100', { name: config.name }, options)

    this.field.oninput = config.oninput

    setStyle(this.field, {
      backgroundImage: `url(${arrow})`,
      backgroundPosition: 'right 8px center',
      backgroundSize: '16px',
      backgroundRepeat: 'no-repeat',
    })

    setChildren(this.content, this.field)
  }
}
