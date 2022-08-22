const { h } = require('redom')
const fecha = require('fecha')
const Icon = require('./Icon')

module.exports = class RecordItem {
  constructor() {
    this.el = h('.pl3.relative',
      h('.b--black-10.bb.pointer-events-none.pr3.pv3',
        this.title = h('h1.f5.fw6.lh-title.ma0.mb1.truncate'),

        this.body = h('p.f5.lh-copy.ma0.mb2.truncate'),

        this.date = h('time.f7.ma0'),
      )
    )
  }

  update(data) {
    this.title.textContent = data.name

    this.body.textContent = data.body

    this.date.textContent = fecha.format(new Date(data.modified), 'mediumDate')
  }
}
