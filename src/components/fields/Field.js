const { h } = require('redom')
const { dispatch } = require('../../library/dispatch')

module.exports = class Field {
  constructor(config) {
    const defaultConfig = {
      afterFieldDecorator: h(''),
      beforeFieldDecorator: h(''),
    }

    config = Object.assign(defaultConfig, config)

    const required = config.required ? ' *' : ''
    const label = `${config.label}${required}`
    let help = ''

    if (config.help) {
      help = h('p.black-50.f7.lh-copy.ma0.mt1', config.help)
    }

    this.el = h('.mb4',
      this.label = h('label.black-50.db.f7.fw6.mb3.tracked.ttu', label),

      this.beforeFieldDecorator = config.beforeFieldDecorator,

      this.content = h(''),

      this.afterFieldDecorator = config.afterFieldDecorator,

      this.help = help,
    )
  }
}
