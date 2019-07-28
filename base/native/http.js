const http = require('http')

const server = http.createServer((req, res) => {
  res.write('gg')
  res.end()
})

server.listen(8080)