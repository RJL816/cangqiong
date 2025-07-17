import ResizeObserver from 'resize-observer-polyfill'

export function addResizeObserve (element, callback) {
  const handleResize = (entries) => {
    const entry = entries[0]
    const { width, height } = entry.contentRect
    const hide = width === 0 && height === 0
    const rect = { hide, width, height }
    callback && callback(rect)
  }
  let watcher = new ResizeObserver(handleResize)
  watcher.observe(element)
  return {
    removeResizeObserve: function () {
      watcher.disconnect(element)
      watcher = null
      element = null
    }
  }
}
