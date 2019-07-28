module.exports = () => {
  return {
    prefixName: '',
    routeObj: {},
    prefix(name) {
      this.prefixName = name
    },
    add(method, url, cb) {
      method = method.toLowerCase()

      if (!url.startsWith('/')) {
        url = '/' + url
      }
      
      if (url.length > 1 && url.endsWith('/')) {
        url = url.slice(0, -1)
      }

      url = url.toLowerCase()

      this.routeObj[method] = this.routeObj[method] || {}
      this.routeObj[method][url] = cb
    },
    get(url, cb) {
      this.add('get', url, cb)
    },
    post(url, cb) {
      this.add('post', url, cb)
    },
    put(url, cb) {
      this.add('put', url, cb)
    },
    del(url, cb) {
      this.add('del', url, cb)
    },
    routes() {
      return {
        prefix: this.prefixName,
        routes: this.routeObj
      }
    },
    allowedMethods() {
      return {}
    }
  }
}