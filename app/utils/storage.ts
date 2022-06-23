const Storage = {
  get: (key) => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  },
  set: (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key) => {
    return localStorage.removeItem(key)
  },
}
export default Storage
