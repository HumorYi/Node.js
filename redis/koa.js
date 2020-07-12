const Koa = require('koa')
const app = new Koa()
const port = 3000

const session = require('koa-session')
const redisStore = require('koa-redis')
const redis = require('redis')
const redisClient = redis.createClient(6379, 'localhost')
// redis to promise
const wrapper = require('co-redis')
const client = wrapper(redisClient)

app.keys = ['some secret']

const SESSION_CONFIG = {
  key: 'hjy:sess', // 名
  // maxAge: 8640000, // 有效期
  // httpOnly: true, // 服务器有效
  // signed: true, // 签名
  store: redisStore({ client })
}

app.use(session(SESSION_CONFIG, app))

app.use(ctx => {
  if (ctx.path === '/favicon.ico') return

  const { session } = ctx
  let { count = 0 } = session
  session.count = ++count

  redisClient.keys('*', (err, keys) => {
    keys.forEach(key => {
      redisClient.get(key, (err, val) => console.log(`key:${key}， value:${val}`))
    })
  })

  ctx.body = `第 ${count} 次访问`

})

app.listen(port, () => console.log('app listen port by', port))