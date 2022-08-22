const { h } = require('redom')

require('tachyons')
require('../css/App.css')

const CollectionsList = require('./CollectionsList')
const Record = require('./Record')
const RecordsList = require('./RecordsList')

module.exports = class App {
  constructor() {
    this.el = h('main',
      this.collections = new CollectionsList(),
      this.records = new RecordsList(),
      this.record = new Record()
    )
  }

  update(docs) {
    this.collections.update(docs)
    this.records.update(docs)
    this.record.update(docs)
  }
}
