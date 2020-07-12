/**
 * 过程:
 *  用户登录的时候，服务端生成一个token返回给客户端
 *  客户端后续的请求都带上这个token
 *  服务端解析token获取用户信息，并响应用户的请求
 *  token会有过期时间，客户端登出的时候也会废弃token，但是服务端不需要任何操作
 *
 * session vs token:
 *  session要求服务端存储信息，并且根据id能够检索，而token不需要（因为信息就在token中，这样实现了服务端无状态化）。
 *  在大规模系统中，对每个请求都检索会话信息可能是一个复杂和耗时的过程。
 *  但另外一方面服务端要通过token来解析用户身份也需要定义好相应的协议（比如JWT）。
 *
 *  session一般通过cookie来交互，而token方式更加灵活，可以是cookie，也可以是header，也可以放在请求的内容中。
 *  不使用cookie可以带来跨域上的便利性。
 *
 *  token的生成方式更加多样化，可以由第三方模块来提供。
 *  token若被盗用，服务端无法感知，cookie信息存储在用户自己电脑中，被盗用风险略小。
 */

const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')
const jwtAuth = require('koa-jwt')

const app = new Koa()
const port = 3000

const secret = "it's a secret"

app.use(bodyParser())
app.use(static(__dirname + '/'))

router.post('/login-token', async ctx => {
  const { body } = ctx.request

  const user = body.username

  ctx.body = {
    message: 'login success',
    user,
    token: jwt.sign({
      data: user,
      // 设置 token 过期时间，一小时后，秒为单位
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    }, secret)
  }
})

router.get('/getUser-token', jwtAuth({ secret }), async ctx => {
  console.log('user message', ctx.state.user)

  ctx.body = {
    message: 'get user success',
    user: ctx.state.user.data
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => console.log('app listen port by', port))