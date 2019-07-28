const http = require('http')
const allowOrigin = [
  'http://localhost',
  'http://127.0.0.1',
  'http://aaa.com'
]

http.createServer((req, res) => {
  let { origin } = req.headers
  if (allowOrigin.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', '*')
  }

  res.write('{"a": 12, "b": "Blue"}');
  res.end();
}).listen(8080)