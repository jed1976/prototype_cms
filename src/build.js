const { Document } = require('nodom')
global.document = new Document()
const { mount } = require('redom')
const App = require('./components/App')

const app = new App()
mount(document.body, app)

console.log(document.documentElement.outerHTML)
