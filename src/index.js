const { setChildren } = require('redom')
const { api } = require('./library/api')
const App = require('./components/App')

const render = () => {
  const app = new App()
  api(app)
  setChildren(document.body, app)
}

render()

if (module.hot) {
  module.hot.accept(render)
}
