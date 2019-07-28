const http = require('http')
const multiparty = require('multiparty')

http.createServer((req, res) => {
  let form = new multiparty.Form({ uploadDir: './upload' })

  form.parse(req)

  form.on('field', (name, value) => {
    console.log("字段：", name, value);
  })

  form.on('file', (name, file) => {
    console.log("文件名：", name);
    console.log("文件：", file);
  })

  form.on('close', () => {
    console.log('done');
    res.end('success');
  })

  form.on('error', (err) => {
    console.log('error', err);
  })
}).listen(8080)