const { h, list } = require('redom')
const { dispatch } = require('../library/dispatch')

module.exports = class List {
  constructor(config) {
    class ListItem {
      constructor() {
        if (config.cell) {
          this.cell = new config.cell()
          this.el = h('li', this.cell)
        }
      }

      update(data) {
        this.el.id = data._id

        if (this.cell) {
          this.cell.update(data)
        }
      }
    }

    this.el = list(`ul.list.ma0.overflow-y-auto.pa0${config.class || ''}`, ListItem, config.key || null)
    this.el.el.id = config.id || ''

    this.el.el.onclick = e => {
      if (e.target.nodeName === 'UL') return

      this.toggleSelection(e)

      dispatch(this.el, 'list:selection', {
        list: this.el.el,
        target: this.selectedElement.parentNode
      })
    }

    this.selectedElement = null

    this.selectedClasses = config.selectedClasses || ['bg-black-05', 'black']
  }

  selectElementById(id) {
    const el = document.getElementById(id)

    if (el) {
      this.toggleSelection({ target: el.firstElementChild })
      this.selectedElement.scrollIntoViewIfNeeded()
    }
  }

  selectElementByIndex(index) {
    if (this.el.el.childNodes.length) {
      this.toggleSelection({ target: this.el.el.childNodes[index] })
      this.selectedElement.scrollIntoViewIfNeeded()
    }
  }

  toggleSelection(e) {
    if (this.selectedElement) {
      this.selectedElement.classList.remove(...this.selectedClasses)
    }

    this.selectedElement = e.target
    this.selectedElement.classList.add(...this.selectedClasses)
  }

  update(data) {
    this.el.update(data)

    if (!this.selectedElement && this.el.el.children.length) {
      this.toggleSelection({ target: this.el.el.firstChild })
    }
  }
}
