const http = require('http')
const io = require('socket.io')

// 1、简历普通http
let server = http.createServer((req, res) => {})
server.listen(8080)

// 2、建立ws
let ws = io.listen(server)
ws.on('connection', (sock) => {
  sock.on('aaa', (a, b) => console.log(a, b))

  setInterval(() => {
    sock.emit('timer', new Date().getTime())
  }, 1000);
})