exports.dispatch = function(target, type, data) {
  const event = new window.CustomEvent('redom', {
    bubbles: true,
    detail: { type, data }
  })

  const el = target.el || target

  el.dispatchEvent(event)
}
