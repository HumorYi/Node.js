const fs = require('fs')
const path = require('path')

const koa = require('koa')
const session = require('koa-session')
const body = require('koa-better-body')
const ejs = require('koa-ejs')

const config = require('./config')
const db = require('./libs/database')
const routes = require('./routes')

const server = new koa()
server.listen(config.HTTP_PORT)
console.log(`server running at ${config.HTTP_PORT}`);

// 添加全局数据
Object.assign(server.context, {
  db,
  config,
})

// 添加keys
server.keys = fs.readFileSync('./data/.keys').toString().split('\n')

// 添加session
server.use(session({
  maxAge: 20 * 60 * 1000,
  renew: true,
}, server))

// 添加用户上传的文件存储目录
server.use(body({ uploadDir: config.UPLOAD_DIR }))

// 使用ejs来渲染
ejs(server, {
  root: path.resolve(__dirname, 'template'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
})

// 添加路由
server.use(routes)