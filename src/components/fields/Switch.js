const { h, setChildren, setStyle } = require('redom')
const Field = require('./Field')
require('../../css/Switch.css')

module.exports = class Switch extends Field {
  constructor(config, data) {
    const defaultConfig = {
      oninput: e => {},
    }

    config = Object.assign(defaultConfig, config)

    super(config, data)

    this.field = h('label.flex.items-center',
      [
        h('input', { name: config.name, type: 'hidden', value: '0' }),

        this.input = h('input.dn.switch', { name: config.name, type: 'checkbox', value: '1' }),

        this.track = h('div.b--transparent.ba.br-pill.bw1.overflow-hidden.white',
          { 'data-name': 'track'},

          this.innerTrack = h('div.flex.items-center.flex-nowrap.w4',
            { 'data-name': 'inner-track'},

            h('span.db.f6.fw7.ph2.tc.ttu.w2', 'On'),

            h('span.bg-near-white.br-100.db.h2.w2'),

            h('span.db.f6.fw7.ph2.tc.ttu.w2', 'Off')
          )
        ),
      ]
    )

    this.input.checked = data == 1 ? true : false
    this.input.oninput = config.oninput

    setStyle(this.track, { width: '5.5rem' })

    setChildren(this.content, this.field)
  }
}
