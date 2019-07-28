const fs = require('fs')
const http = require('http')
const bufferUtil = require('./buffer-util')

// 文件上传
http.createServer((req, res) => {
  // multipart/form-data; boundary=----WebKitFormBoundary8WtYAhgAk3YQjXNy
  let boundary = '--' + req.headers['content-type'].split('boundary=')[1]

  // 练习使用，实际是来一个包处理一个包
  let arr = []

  req.on('data', (buffer) => arr.push(buffer))

  req.on('end', () => {
    bufferUtil.foreach(Buffer.concat(arr), boundary, ({ type, name, filename, data }) => {
      if (type === 'file') {
        let pos = filename.indexOf('.')
        let ext = filename.slice(pos)
        let baseName = filename.slice(0, pos)
        filename = baseName + new Date().getTime() + ext;

        fs.writeFile(`upload/${filename}`, data, (err) => {
          if (err) {
            console.log(err)
          }
          else {
            console.log('上传成功')
          }
        })
      }
      else {
        console.log(name)
      }
    })
  })
}).listen(8080)