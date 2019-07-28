const Router = require('koa-router')

const static = require('./static')
const adminRouter = require('./admin')
const apiRouter = require('./api')
const wwwRouter = require('./www')

const router = new Router()

//统一处理错误
router.use(async (ctx, next) => {
  let { HTTP_ROOT } = ctx.config;

  try {
    await next();

    if (!ctx.body) {
      await ctx.render('www/404', { HTTP_ROOT });
    }
  } catch (e) {
    console.log('error: ', e);

    await ctx.render('www/404', { HTTP_ROOT });
  }
});

router.use(adminRouter)
router.use(apiRouter)
router.use(wwwRouter)

static(router)

module.exports = router.routes()