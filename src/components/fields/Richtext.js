const { h } = require('redom')
const Button = require('../Button')
const Icon = require('../Icon')
const Input = require('./Input')
const Toolbar = require('../Toolbar')

module.exports = class Richtext extends Input {
  constructor(config, data) {
    config = Object.assign(config, {
      beforeFieldDecorator: new Toolbar({
        border: false,
        cls: '.pb2',
        spacing: false,
        items: [
          new Button({
            cls: '.mr2',
            icon: new Icon({ cls: '.h1.w1', name: 'Bold' }),
          }),

          new Button({
            cls: '.mr2',
            icon: new Icon({ cls: '.h1.w1', name: 'Italics' }),
          }),

          new Button({
            icon: new Icon({ cls: '.h1.w1', name: 'Underline' }),
          }),
        ]
      }),
      singleLine: false
    })

    super(config, data)
  }
}
