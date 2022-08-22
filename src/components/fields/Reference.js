const { setStyle } = require('redom')
const Option = require('./Option')

module.exports = class Reference extends Option {
  constructor(config, data, docs) {
    config.options = [{ label: '', value: '' }].concat(docs
      .filter(doc => doc.parent === config.collection)
      .map(doc => ({ label: doc.name, value: doc._id }))
    )

    super(config, data)
  }
}
