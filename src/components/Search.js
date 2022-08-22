const { h } = require('redom')
const Icon = require('./Icon')

module.exports = class Search {
  constructor() {
    this.el = h('.relative.w-100',
      h('.absolute.ml2.mt2.z1',
        new Icon({ cls: '.black-50.h1.w1', name: 'Search' })
      ),

      this.search = h('input.bg-black-05.bn.br2.db.f6.input-reset.near-black.outline-0.pa2.pl4.w-100',
        {
          oninput: e => { this.oninput(e.target.value) },
          placeholder: 'Search',
          type: 'search'
        }
      )
    )
  }

  clear() {
    this.search.value = ''
  }

  oninput(query) {}
}
