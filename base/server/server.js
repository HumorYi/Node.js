const http = require('http')
const url = require('url')
const { HTTP_PORT, HTTP_ROOT } = require('./config')
const file = require('./libs/file')
const notFound = require('./libs/not-found')
const route = require('./libs/route')()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')

route.use(indexRouter.routes(), indexRouter.allowedMethods())
route.use(userRouter.routes(), userRouter.allowedMethods())

http.createServer(async (req, res) => {

  // 为res对象添加写json方法
  res.writeJson = (json) => {
    res.setHeader('content-type', 'application/json')
    res.write(JSON.stringify(json))
  }

  let { pathname } = url.parse(req.url, true)
  let fn = route.find(req.method, pathname)
  console.log("router: %s =>", pathname, fn ? fn : 'not found');

  if (fn) {
    try {
      await fn(req, res)
    } catch (error) {
      res.writeHeader(500)
      res.write('Internal Server Error')
      res.end()
    }
  }
  else {
    // 不是查找文件
    if (!pathname.includes('.')) {
      notFound(res)
      return
    }

    // 找不到接口，则读取文件
    let filePath = HTTP_ROOT + pathname
    file.gzip(filePath, res)
  }

}).listen(HTTP_PORT)