const http = require('http')
const url = require('url')
const fs = require('fs')
const zlib = require('zlib')

http.createServer((req, res) => {
  let {pathname} = url.parse(req.url, true)
  let filepath = 'read' + pathname

  // 1、先判断文件是否存在
  fs.stat(filepath, (err, stat) => {
    if (err) {
      res.writeHeader(404)
      res.write('not found')
      res.end()
      return
    }

    console.log(stat);
    

    let rs = fs.createReadStream(filepath)

    rs.on('error', (err) => {
      throw err
    })
    
    // 告诉浏览器使用gzip解析文件
    res.setHeader('content-encoding', 'gzip')
    // 读取到的文件使用gzip进行压缩再留到res流中
    rs.pipe(zlib.createGzip()).pipe(res)

  })
}).listen(8080)