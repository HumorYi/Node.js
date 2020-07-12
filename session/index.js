const Koa = require('koa')
const router = require('koa-router')()
const session = require('koa-session')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const app = new Koa()
const port = 3000

app.use(cors({
  credentials: true
}))

app.keys = ['some secret']

app.use(static(__dirname + '/'))
app.use(bodyParser())
app.use(session(app))

app.use((ctx, next) => {
  const { url, session } = ctx

  if (!url.includes('login')) {
    const { user } = session
    if (!user) {
      ctx.body = { message: 'login failed' }
    }
  }

  next()
})

router.post('/login', async (ctx) => {
  const { body } = ctx.request

  ctx.session.user = body.username

  ctx.body = {
    message: 'login success'
  }
})

router.post('/logout', async (ctx) => {
  delete ctx.session.user

  ctx.body = {
    message: 'logout'
  }
})

router.get('/getUser', async (ctx) => {
  ctx.body = {
    message: 'get user success',
    user: ctx.session.user
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => console.log('app listen port by', port))