const { h, setChildren, setStyle } = require('redom')
const { dispatch } = require('../library/dispatch')
const FieldComponents = require('./fields/Fields')
const Button = require('./Button')
const Icon = require('./Icon')
const Toolbar = require('./Toolbar')

module.exports = class Record {
  constructor() {
    this.record = null

    this.el = h('.bg-white.bottom-0.fixed.flex.flex-column.right-0.top-0.vh-100',

      h('.flex-auto.overflow-y-auto.pv5',
        this.form = h('form.center.w-80'),
      ),

      new Toolbar({
        items: [
          this.deleteButton = new Button({
            icon: new Icon({
              cls: '.h1.w1',
              name: 'Delete'
            }),
            text: 'Delete',
            title: 'Delete',
            onclick: e => {
              if (confirm('Are you sure you want to delete the selected record?')) {
                dispatch(this, 'record:delete', { id: this.record._id })
              }
            },
          }),

          this.saveButton = new Button({
            cls: '.bg-blue.ml-auto.white',
            icon: new Icon({
              cls: '.h1.w1',
              name: 'Checkmark'
            }),
            text: 'Save',
            title: 'Save',
            onclick: e => {
              this.saveButton.disabled = true
              dispatch(this, 'record:update', { target: this.form })
            }
          }),
        ]
      }),
    )

    setStyle(this.el, { left: '640px', minWidth: '640px' })
  }

  update(docs) {
    const fields = []
    const collection = docs.filter(doc => doc._id === localStorage.getItem('selectedCollection')).shift()
    const record = docs.filter(doc => doc._id === localStorage.getItem('selectedRecord')).shift()

    this.deleteButton.setDisabled()
    this.saveButton.setDisabled()

    if (typeof record !== 'undefined') {
      if (this.record === null) {
        this.record = record
      }

      if ('_id' in this.record && record._id !== this.record._id) {
        this.el.scrollTop = 0
      }

      this.record = record

      if (this.record) {
        collection.fields.map(config => {
          let data = this.record[config.name]

          fields.push(
            new FieldComponents[config.type](config, data, docs)
          )
        })

        fields.push(
          h('input', { name: '_id', type: 'hidden', value: this.record._id }),
          h('input', { name: '_rev', type: 'hidden', value: this.record._rev })
        )
      }

      this.deleteButton.setEnabled()
      this.saveButton.setEnabled()
    }

    setChildren(this.form, ...fields)

    if (this.form.elements.length) {
      this.form.elements[0].focus()
    }
  }
}
