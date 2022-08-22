const { h, setStyle } = require('redom')
const { dispatch } = require('../library/dispatch')
const Button = require('./Button')
const Icon = require('./Icon')
const List = require('./List')
const RecordItem = require('./RecordItem')
const Search = require('./Search')
const Toolbar = require('./Toolbar')

module.exports = class RecordsList {
  constructor() {
    this.collection = null
    this.docs = this.filteredDocs = this.searchResults = []

    this.el = h('.b--black-10.bg-black-025.bottom-0.br.fixed.flex.flex-column.top-0.vh-100',

      new Toolbar({
        items: [
          this.search = new Search()
        ]
      }),

      this.list = new List({
        cell: RecordItem,
        class: '.black.flex-auto',
        id: 'records',
        key: '_id',
        selectedClasses: ['bg-blue', 'white']
      }),

      new Toolbar({
        border: false,
        items: [
          new Button({
            icon: new Icon({
              cls: '.h1.w1',
              name: 'Add'
            }),
            onclick: e => dispatch(this, 'record:add', e)
          })
        ]
      })
    )

    setStyle(this.el, { left: '320px', width: '320px' })

    this.search.oninput = query => {
      query = query.toLocaleLowerCase()

      this.searchResults = query === ''
        ? this.filteredDocs = this.docs
        : this.filteredDocs.filter(doc => Object.keys(doc).some(key => {
          let result = false
          const value = doc[key]

          if (typeof value === 'string') {
            result = value.toLocaleLowerCase().includes(query)
          }

          return result
        }))

      this.list.update(this.searchResults)
    }
  }

  applyFilter(docs) {
    const collection = localStorage.getItem('selectedCollection')

    if (collection !== this.collection) {
      this.searchResults = []
      this.search.clear()
    }

    this.collection = collection

    this.docs = docs.filter(doc =>
      doc.type === 'record' &&
      doc.parent === this.collection
    )

    return this.searchResults.length ? this.searchResults : this.docs
  }

  selectRecord() {
    if (this.docs.length) {
      if (localStorage.getItem('selectedRecord')) {
        this.list.selectElementById(localStorage.getItem('selectedRecord'))
      } else {
        this.list.selectElementByIndex(0)
      }
    }
  }

  update(docs) {
    this.filteredDocs = this.applyFilter(docs)
    this.list.update(this.filteredDocs)
    this.selectRecord()
  }
}
