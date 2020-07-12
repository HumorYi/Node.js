const http = require('http')
const port = 3000

// session-cookie
const session = {}
const sessionKey = 'sid'

http.createServer((req, res) => {
  const { url, headers } = req
  if (url === '/favicon.ico') {
    res.end('')
    return
  }

  const { cookie } = headers
  const hasCookie = cookie && cookie.includes(sessionKey)
  if (hasCookie) {
    const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
    const results = cookie.match(pattern)
    const hasResults = results.length > 0
    if (hasResults) {
      const sid = results[1]
      console.log('session key:', sid, '; session value:', session[sid])
    }
    res.end('Come Back')

    return
  }

  const sid = Math.floor(Math.random() * 99999999)
  res.setHeader('Set-cookie', `${sessionKey}=${sid}`)
  session[sid] = { name: 'humorYi' }

  // res.setHeader('Set-Cookie', 'cookie1=abc')
  res.end('hello cookie!')
}).listen(port, () => console.log('app listen port by', port))