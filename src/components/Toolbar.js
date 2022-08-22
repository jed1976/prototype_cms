const { h, setChildren } = require('redom')

module.exports = class Toolbar {
  constructor(config) {
    const defaultConfig = {
      border: true,
      cls: '',
      items: [],
      spacing: true,
    }

    config = Object.assign(defaultConfig, config)

    if (config.border) {
      config.cls += '.b--black-10'
    } else {
      config.cls += '.b--transparent'
    }

    if (config.spacing) {
      config.cls += '.ph3.pv2'
    }

    this.el = h(`.bb.bt.flex.flex-none.items-center.relative${config.cls}`)

    setChildren(this.el, config.items)
  }
}
