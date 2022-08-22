const { svg } = require('redom')
const icons = require('../images/Icons.svg')

module.exports = class Icon {
  constructor(config) {
    const defaultConfig = {
      cls: '',
      name: '',
    }

    config = Object.assign(defaultConfig, config)

    this.el = svg(`svg${config.cls}`,
      svg('use', { 'fill': 'currentColor', 'href': `${icons}#${config.name}` })
    )
  }
}
