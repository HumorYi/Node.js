const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const axios = require('axios')
const querystring = require('querystring')

const app = new Koa()
const port = 7001

const config = {
  client_id: '63469afaf20ba573db11',
  client_secret: '5a11b73612fe49fdedab712a19a7448e8ddebc3b'
}

app.use(static(__dirname + '/'))

router.get('/auth/github/login', async ctx => {
  // 重定向到 github 服务器
  const path = `https://github.com/login/oauth/authorize?client_id=${config.client_id}`
  ctx.redirect(path)
})

router.get('/auth/github/callback', async ctx => {
  const { code } = ctx.query

  const { data: oauth } = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: config.client_id,
    client_secret: config.client_secret,
    code
  })

  const { access_token } = querystring.parse(oauth)
  const { data: user } = await axios.get(`https://api.github.com/user?access_token=${access_token}`)

  ctx.body = `
    <h1>Hello ${user.name}</h1>
    <img src="${user.avatar_url}" alt=""/>
  `
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => console.log('app listen port by', port))
