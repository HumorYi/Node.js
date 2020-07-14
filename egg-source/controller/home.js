module.exports = app => {
  return {
    index: async ctx => {
      // ctx.body = 'index'
      // const name = await app.$service.user.getName()
      // app.ctx.body = 'ctrl index: ' + name

      app.ctx.body = await app.$model.user.findAll()
    },
    detail: async ctx => {
      // ctx.body = 'detail'
      app.ctx.body = 'ctrl detail'
    }
  }
}