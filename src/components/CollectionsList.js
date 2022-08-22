const { h, setStyle } = require('redom')
const { dispatch } = require('../library/dispatch')
const Button = require('./Button')
const Icon = require('./Icon')
const List = require('./List')
const CollectionItem = require('./CollectionItem')
const Toolbar = require('./Toolbar')

module.exports = class CollectionsList {
  constructor() {
    this.el = h('.b--black-10.bg-black-025.bottom-0.br.fixed.flex.flex-column.left-0.top-0.vh-100',

      new Toolbar({
        border: false,
        items: [
          h('h1.f3.fw7.black.lh-title.ma0', 'Collections'),
        ]
      }),

      this.list = new List({
        cell: CollectionItem,
        class: '.black-50.flex-auto',
        id: 'collections',
        key: '_id',
        selectedClasses: ['bg-black-05', 'blue']
      }),

      new Toolbar({
        border: false,
        items: [
          new Button({
            icon: new Icon({
              cls: '.h1.w1',
              name: 'Add'
            }),
            onclick: e => dispatch(this, 'collection:add', e)
          })
        ]
      })
    )

    setStyle(this.el, { width: '320px' })
  }

  update(docs) {
    const collections = docs.filter(doc => doc.type === 'collection')
    this.list.update(collections)
    this.list.selectElementById(localStorage.getItem('selectedCollection'))
  }
}
