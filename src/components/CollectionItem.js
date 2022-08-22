const { h, text } = require('redom')
const Icon = require('./Icon')

module.exports = class CollectionItem {
  constructor() {
    this.el = h('.f5.flex.items-center.pa3',
      h('.flex.items-center',
        new Icon({ cls: '.h2.mr3.w2', name: 'Collection' }),
      ),

      this.text = text()
    )
  }

  update(data) {
    this.text.textContent = data.name
  }
}
