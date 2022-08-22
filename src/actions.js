exports.actions = (app, db, docs) => {

  return {
    'collection:add': data => {

    },

    'list:selection': data => {
      let selectedCollection = localStorage.getItem('selectedCollection')
      let selectedRecord = localStorage.getItem('selectedRecord')

      const id = data.target.id

      switch (data.list.id) {
        case 'collections':
          if (id !== localStorage.getItem('selectedCollection')) {
            const record = docs.filter(doc => doc.parent === id).shift()
            selectedRecord = record ? record._id : null
          }

          selectedCollection = id
        break

        case 'records':
          selectedRecord = id
        break
      }

      localStorage.setItem('selectedCollection', selectedCollection)
      localStorage.setItem('selectedRecord', selectedRecord)

      app.update(docs)
    },

    'record:add': data => {
      const selectedCollection = localStorage.getItem('selectedCollection')
      const collection = docs.filter(doc => doc._id === selectedCollection).shift()
      const fields = collection.fields.map(field => field.name)
      const date = new Date().toJSON()
      const doc = {
        _id: `${collection.name}-${date}`,
        created: date,
        modified: date,
        status: 'draft',
        type: 'record',
        parent: collection._id,
      }

      fields.forEach(field => doc[field] = '')

      doc.name = `New Record`

      db.put(doc).then(response => {
        localStorage.setItem('selectedRecord', doc._id)
        app.update(docs)
      })
    },

    'record:delete': data => {
      db.get(data.id)
        .then(doc => db.remove(doc))
        .then(result => {
          const selectedCollection = localStorage.getItem('selectedCollection')
          const selectedRecord = docs.filter(doc => doc.parent === selectedCollection).shift()
          localStorage.setItem('selectedRecord', selectedRecord._id)
          app.update(docs)
        })
        .catch(error => console.error(error))
    },

    'record:update': data => {

    },
  }
}
