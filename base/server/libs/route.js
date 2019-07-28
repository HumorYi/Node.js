module.exports = () => {
  return {
    router: {},
    use({ prefix, routes }, allowedMethods) {
      Object.keys(routes).forEach((route) => {

        let method = routes[route]

        this.router[route] = this.router[route] || {}

        if (prefix) {
          this.router[route][prefix] = this.router[route][prefix] || {}

          Object.keys(method).forEach((key) => {
            this.router[route][prefix][key] = method[key]
          })
        }
        else {
          this.router[route] = method
        }
      })
    },
    find(method, url) {
      method = method.toLowerCase()

      // 去掉url尾部 /
      if (url.endsWith('/')) {
        url = url.slice(0, -1)
      }
      url = url.toLowerCase()

      let routerMethod = this.router[method]

      if (!routerMethod) { return undefined }

      // 根路径访问
      if (url.length <= 1) { return routerMethod['/'] }

      // 没有路由前缀 => /user、/user/a/b
      if (typeof routerMethod[url] === 'function') { return routerMethod[url] }

      // 可能有路由前缀
      let deeps = url.split('/')

      // 去掉头部空字符
      deeps.shift()

      let deepsLen = deeps.length

      // 带前缀，/user => object
      let route = routerMethod['/' + deeps[0]]
      if (typeof route !== 'object') { return undefined }

      // /user
      if (deepsLen === 1) { return route['/'] }

      // /user/add/test
      return route['/' + deeps.slice(1).join('/')]
    }
  }
}