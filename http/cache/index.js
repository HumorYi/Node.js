const http = require('http')
const port = 3000

const getTime = () => new Date().toUTCString()

const updateTime = () => {
  this.timer = this.timer || setInterval(() => { this.time = getTime() }, 5000)

  // 保证一开始的时间都一致为 undefined
  return this.time
}

http.createServer((req, res) => {
  const { url, headers } = req

  if (url === '/') {
    res.end(`
      <html>
        Html Update Time ${updateTime()}
        <!--
          <script src="main.js"></script>
        -->

        <!-- ajax 缓存 -->
        <script>
          const xhr = new XMLHttpRequest()
          xhr.onreadystatechange = () => {
            if (xhr.readyState==4) {
              console.log('request ' + xhr.status + ' ' +xhr.responseText)
            }
          }

          let counter = 0

          let timer = setInterval(() => {
            const isEnd = counter > 10
            if (isEnd) {
              clearInterval(timer)

              return
            }

            counter++;

            xhr.open('GET', '/main.js', true)
            xhr.send()
          }, 3000)
        </script>
      </html>
    `)
  }
  else if (url === '/main.js') {
    const content = `document.writeln('<br>JS Update Time: ${updateTime()}')`

    /**
     * 强缓存，http 1.0 Response Headers Expires
     * 设置 10s 后过期，即 10s 内不会再向服务器请求，走的是浏览器缓存（内存、磁盘）
     *
     * 问题：依赖于客户端时间，如果客户端时间（时区）随意更改超出缓存过期时间，
     *    会导致原有设置的缓存时间失效，再次访问时就会向服务器发起请求
     */
    // res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString())

    // // Expires 与 Cache-Control 同时存在，Cache-Control 优先级更高
    // res.setHeader('Cache-Control', 'max-age=20')

    /**
     * 协商缓存
     */
    // res.setHeader('Cache-Control', 'no-cache')

    // 通过协商修改时间为基础的策略
    /* res.setHeader('Last-Modified', new Date().toUTCString())
    const isCache = Date.now() - new Date(headers['if-modified-since']).getTime() > 3 * 1000
    if (isCache) {
      res.statusCode = 304
      res.end()
      return
    } */

    // 通过内容判断，一般的做法是将返回内容进行摘要（Hash），然后通过对比摘要来判断内容是否更新
    /* const crypto = require('crypto')
    const hash = crypto.createHash('sha1').update(content).digest('hex')
    res.setHeader('ETag', hash)

    const isCache = hash === headers['if-none-match']
    console.log(isCache)
    if (isCache) {
      res.statusCode = 304
      res.end()
      return
    } */

    // AJAX 缓存
    // res.setHeader('Cache-Control', 'max-age=10')
    res.statusCode = 200
    res.end(content)
  }
  else if (url === '/favicon.ico') {
    res.end('')
  }
}).listen(port, () => {
  console.log('app listen port by ', port)
})