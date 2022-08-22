const { listen } = require('./listen')
const { actions } = require('../actions')
const PouchDB = require('pouchdb')


exports.api = app => {
  let docs

  const options = { live: true, retry: true, since: 0 }
  const localDB = new PouchDB.default('timothymcallister')
  const remoteDB = new PouchDB.default('http://192.168.1.86:5984/timothymcallister')

  const binarySearch = (arr, docId) => {
    let low = 0, high = arr.length, mid
    while (low < high) {
      mid = (low + high) >>> 1
      arr[mid]._id < docId ? low = mid + 1 : high = mid
    }
    return low
  }

  const fetchDocs = () =>
    localDB.allDocs({ attachments: true, include_docs: true }).then(result => {
      docs = result.rows.map(row => row.doc)

      const listener = listen(app, actions(app, localDB, docs))

      window.addEventListener('unload', () => {
        listener.remove()
        sync.cancel()
      })

      app.update(docs)
    })

  const onDeleted = id => {
    const index = binarySearch(docs, id)
    const doc = docs[index]

    if (doc && doc._id === id) {
      docs.splice(index, 1)
    }
  }

  const onUpdatedOrInserted = newDoc => {
    const index = binarySearch(docs, newDoc._id)
    const doc = docs[index]

    if (doc && doc._id === newDoc._id) {
      docs[index] = newDoc
    } else {
      docs.splice(index, 0, newDoc)
    }
  }

  const reactToChanges = () => {
    localDB.changes({ include_docs: true, live: true, since: 'now' })
      .on('change', change => {
        if (change.deleted) {
          onDeleted(change.id)
        } else {
          onUpdatedOrInserted(change.doc)
        }
        app.update(docs)
      })
      .on('error', error => console.log.bind(console))
  }

  const sync = PouchDB.default.sync(localDB, remoteDB, options)
    .on('complete', info => console.info(info))
    .on('paused', info => console.info(info))
    .on('active', info => console.info(info))
    .on('denied', error => console.error(error))
    .on('error', error => console.error(error))

  fetchDocs().then(reactToChanges).catch(console.log.bind(console))
}
