const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const axios = require('axios')
const querystring = require('querystring')
const jwt = require("jsonwebtoken")
const jwtAuth = require("koa-jwt")
const accessTokens = {}

const app = new Koa()
const port = 7001
const secret = "it's a secret"

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
  const uid = Math.random() * 99999
  accessTokens[uid] = access_token

  const token = jwt.sign({
    data: uid,
    // 设置 token 过期时间，一小时后，秒为单位
    exp: Math.floor(Date.now() / 1000) + 60 * 60
  }, secret)

  ctx.response.type = 'html'
  ctx.response.body = `
    <script>
      window.localStorage.setItem("authSuccess", "true");
      window.localStorage.setItem("token", "${token}");
      window.close();
    </script>
  `
})

router.get('/auth/github/user', jwtAuth({ secret }), async ctx => {
  const access_token = accessTokens[ctx.state.user.data]
  const { data: user } = await axios.get(`https://api.github.com/user?access_token=${access_token}`)
  ctx.body = user
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => console.log('app listen port by', port))
