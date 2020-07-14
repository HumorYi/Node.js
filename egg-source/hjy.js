const Koa = require('koa')
const { initRouter, initController, initService, initSchedule, loadConfig } = require('./hjy-loader')

class HJY {
  constructor(conf) {
    this.$app = new Koa(conf)
    loadConfig(this)
    this.$service = initService(this)
    this.$ctrl = initController(this)
    // this.$router = initRouter()
    this.$router = initRouter(this)
    this.$app.use(this.$router.routes())

    initSchedule()
  }

  start(port) {
    this.$app.listen(port, () => console.log('app listening port by', port))
  }
}

module.exports = HJY