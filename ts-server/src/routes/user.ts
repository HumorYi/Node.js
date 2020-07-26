import * as Koa from 'koa'
import { get, post, middlewares, querystring, body } from '../utils/route-decors'
// import modelUser from '../model/user'

@middlewares([
  async (ctx, next) => {
    if (ctx.header.token) {
      await next()
    } else {
      throw 'please login'
    }
  }
])
export default class User {
  @get('/users')
  @querystring({
    age: {
      type: 'int',
      required: true,
      max: 200,
      convertType: 'int'
    }
  })
  async list(ctx: Koa.Context) {
    // const users = await modelUser.findAll()
    const users = [{ name: 'tom' }]

    ctx.body = { ok: 1, data: users }
  }

  @post(
    '/users'
    /* {
    middlewares: [
      async (ctx, next) => {
        const { name } = ctx.request.body

        if (!name) {
          throw '请输入用户名'
        }

        next()
      }
    ]
  } */
  )
  @body({
    name: {
      type: 'string',
      required: true,
      max: 200,
      convertType: 'string'
    }
  })
  add(ctx: Koa.Context) {
    ctx.body = { ok: 1, data: ctx.request.body }
  }
}
