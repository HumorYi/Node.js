/* module.exports = {
  'get /': async ctx => {
    ctx.body = 'index'
  },
  'get /detail': async ctx => {
    ctx.body = 'detail'
  },
} */

module.exports = app => {
  return {
    'get /': app.$ctrl.home.index,
    'get /detail': app.$ctrl.home.detail,
  }
}