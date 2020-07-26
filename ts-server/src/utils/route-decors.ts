import * as glob from 'glob'
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as Parameter from 'parameter'

type HTTPMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'
type LoadOptions = {
  /**
   * 路由文件扩展名，默认值是`.{js,ts}`
   */
  extname?: string
}

type RouteOptions = {
  /**
   * 适用于某个请求比较特殊，需要单独制定前缀的情形
   */
  prefix?: string
  /**
   * 给当前路由添加一个或多个中间件
   */
  middlewares?: Array<Koa.Middleware>
}

const router = new KoaRouter()
const createMethod = (router: KoaRouter) => (method: HTTPMethod) => (path: string, options: RouteOptions = {}) => (
  target,
  property: string
) => {
  // 由于方法装饰器运行优先级高于类装饰器，让方法装饰器在下一线程开始前再执行，可得到类装饰器优先执行
  process.nextTick(() => {
    const middlewares = []
    // 类装饰器中间件
    if (target.middlewares) {
      middlewares.push(...target.middlewares)
    }

    // 类方法装饰器中间件
    if (options.middlewares) {
      middlewares.push(...options.middlewares)
    }

    // 类方法
    middlewares.push(target[property])

    const url = options.prefix ? options.prefix + path : path
    router[method](url, ...middlewares)
  })
}

const method = createMethod(router)

export const get = method('get')
export const post = method('post')
export const put = method('put')
export const del = method('delete')

export const middlewares = (middlewares: Koa.Middleware[]) => target => {
  target.prototype.middlewares = middlewares
}

export const load = (folder: string, options: LoadOptions = { extname: '.{js,ts}' }): KoaRouter => {
  glob.sync(require('path').join(folder, `./**/*${options.extname}`)).forEach(filepath => require(filepath))

  return router
}

const validateRule = paramPart => rule => (target, property, descriptor) => {
  const oldValue = descriptor.value

  descriptor.value = function (...args) {
    const ctx = args[0]
    const data = ctx.request[paramPart]
    const parameter = new Parameter()
    const errors = parameter.validate(rule, data)

    if (errors) {
      throw new Error(JSON.stringify(errors))
    }

    return oldValue.apply(null, args)
  }

  return descriptor
}

export const querystring = validateRule('query')
export const body = validateRule('body')
