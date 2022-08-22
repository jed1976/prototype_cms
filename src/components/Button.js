const { h, setChildren, setStyle, text } = require('redom')

module.exports = class Button {
  constructor(config) {
    const defaultConfig = {
      cls: '',
      iconPosition: 'left'
    }

    config = Object.assign(defaultConfig, config)

    let iconSpacing, flexDirection = 'flex-row', flexOrder = '0'

    switch (config.iconPosition) {
      case 'b':
      case 'bottom':
        flexDirection = 'flex-column'
        flexOrder = 'order-1'
        iconSpacing = 'mt2'
      break

      case 'r':
      case 'right':
        flexOrder = 'order-1'
        iconSpacing = 'ml2'
      break

      case 't':
      case 'top':
        flexDirection = 'flex-column'
        iconSpacing = 'mb2'
      break

      case 'l':
      default:
        iconSpacing = 'mr2'
      break
    }

    iconSpacing = config.text ? iconSpacing : 'ma0'

    const icon = config.icon
      ? this.icon = h(`span.flex.${flexOrder}.items-center.justify-center.${iconSpacing}`, config.icon)
      : ''

    const textContent = text(config.text ? config.text : '')

    this.el = h(`button.bg-animate.bg-black-05.bn.br2.f6.input-reset.outline-0.pa0${config.cls}`,
      h(`.flex.${flexDirection}.items-center.justify-center.ph3.pointer-events-none.pv2`,
        this.icon = icon,
        this.text = textContent
      )
    )

    if (config.id) {
      this.el.id = config.id
    }

    if (config.title) {
      this.el.title = config.title
    }

    if (config.disabled) {
      this.setDisabled()
    }

    this.el.onclick = e => {
      e.preventDefault()

      if (config.onclick) {
        config.onclick.call(this, e)
      }
    }
  }

  setDisabled() {
    this.el.disabled = true
    setStyle(this.el, { opacity: 0.5 })
  }

  setEnabled() {
    this.el.disabled = false
    setStyle(this.el, { opacity: 1 })
  }

  setIcon(icon) {
    setChildren(this.icon, icon)
  }

  setText(text) {
    this.text.textContent = text
  }
}
