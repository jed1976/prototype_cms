exports.listen = (target, handlers) => {
  const el = target.el || target
  const handler = e => {
    const { type, data } = e.detail
    handlers[type] && handlers[type](data)
  }

  el.addEventListener('redom', handler)

  return {
    remove() {
      el.removeEventListener('redom', handler)
    }
  }
}
