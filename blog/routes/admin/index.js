const path = require('path')

const Router = require('koa-router')
const fs = require('await-fs')

const common = require('../../libs/common')

const router = new Router()
router.prefix('/admin')

router.get('/login', async ctx => {
  await ctx.render('admin/login', {
    HTTP_ROOT: ctx.config.HTTP_ROOT,
    errmsg: ctx.query.errmsg
  })
})

router.post('/login', async ctx => {
  const { HTTP_ROOT, ADMIN_PREFIX } = ctx.config;

  let { username, password } = ctx.request.fields;
  // 读取文件是为了避免服务在运行时添加管理员而查找不断
  let admin = JSON.parse((await fs.readFile(
    path.resolve(__dirname, '../../data/admin.json')
  )).toString()).find(admin => admin.username === username);

  if (!admin) {
    //ctx.body='no this user';    //?
    ctx.redirect(`${HTTP_ROOT}/admin/login?errmsg=${encodeURIComponent('用户不存在')}`);
  }
  else if (admin.password !== common.md5(ADMIN_PREFIX + password)) {
    ctx.redirect(`${HTTP_ROOT}/admin/login?errmsg=${encodeURIComponent('密码不对')}`);
  }
  else {
    //success
    ctx.session['admin'] = username;
    ctx.redirect(`${HTTP_ROOT}/admin/`);
  }

})

// 前面路由无需登录，后续路由需要登录
router.all('*', async (ctx, next) => {
  let { HTTP_ROOT } = ctx.config;

  if (ctx.session['admin']) {
    await next();
  } else {
    //ctx.body='你不是管理员';
    ctx.redirect(`${HTTP_ROOT}/admin/login`);
  }
})

router.get('/', async ctx => {
  const { HTTP_ROOT } = ctx.config;

  ctx.redirect(`${HTTP_ROOT}/admin/banner`);
});

router.use(require('./banner'));
router.use(require('./catalog'));
router.use(require('./article'));

module.exports = router.routes()