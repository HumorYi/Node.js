const fs = require('fs')
const { resolve } = require('path')
const Router = require('koa-router')
const Sequelize = require('sequelize')
const schedule = require('node-schedule')

const load = (dir, cb) => {
  const url = resolve(__dirname, dir)
  const files = fs.readdirSync(url)

  files.forEach(filename => {
    filename = filename.replace('.js', '')

    const file = require(url + '/' + filename)

    cb(filename, file)
  })
}

const initRouter = app => {
  const router = new Router()

  load('routes', (filename, routes) => {
    const prefix = filename === 'index' ? '' : `/${filename}`
    routes = typeof routes === 'function' ? routes(app) : routes

    Object.keys(routes).forEach(key => {
      const [method, path] = key.split(' ')
      const endPath = prefix !== '' && path === '/' ? '' : path

      // router[method](prefix + endPath, routes[key])

      router[method](prefix + endPath, async ctx => {
        app.ctx = ctx

        await routes[key](app)
      })
    })
  })

  return router
}

const initController = app => {
  const controllers = {}

  load('controller', (filename, controller) => {
    controllers[filename] = controller(app)
  })

  return controllers
}

const initService = app => {
  const services = {}

  load('service', (filename, service) => {
    services[filename] = service(app)
  })

  return services
}

const initSchedule = () => {
  load('schedule', (filename, scheduleConfig) => {
    schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler)
  })
}

const loadConfig = app => {
  load('config', (filename, conf) => {
    if (conf.db) {
      app.$db = new Sequelize(conf.db)

      app.$model = {}

      load('model', (filename, { schema, options }) => {
        app.$model[filename] = app.$db.define(filename, schema, options)
      })

      app.$db.sync()
    }

    if (conf.middleware) {
      conf.middleware.forEach(mid => {
        const midPath = resolve(__dirname, 'middleware', mid)

        app.$app.use(require(midPath))
      })
    }
  })
}

module.exports = {
  initRouter,
  initController,
  initService,
  initSchedule,
  loadConfig
}