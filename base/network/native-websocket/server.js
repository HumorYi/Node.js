// tcp连接
const net =  require('net')
const crypto = require('crypto')

const parseHeaders = (str) => {
  let reg = /^\s+|\s$/g
  let headers = {}
  // http 的headers属性间是以\r\n来换行的，获取所有属性并过滤掉空行
  let arr = str.split('\r\n').filter((line) => line)
  // 去掉 GET / HTTP/1.1
  arr.shift()


  arr.forEach((line) => {
    let [name, value] = line.split(': ')
    name = name.replace(reg, '').toLowerCase()
    value = value.replace(reg, '')

    headers[name] = value
  })

  return headers

}

const server = net.createServer((sock) => {
  // 第一次握手
  sock.once('data', (buffer) => {
    let headers = parseHeaders(buffer.toString())

    if (headers['upgrade'] !== 'websocket') {
      console.log('no upgrade');
      sock.end()
    }
    else if (headers['sec-websocket-version'] !== '13') {
      console.log('no version 13');
      sock.end()
    }
    else {
      console.log('nice');
      let key = headers['sec-websocket-key']
      let uuid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
      let retKey = crypto.createHash('sha1').update(key + uuid).digest('base64')

      sock.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept:${retKey}\r\n\r\n`)
    }
  })

  sock.on('end', () => {
    console.log('end')
  })
})
server.listen(8080)