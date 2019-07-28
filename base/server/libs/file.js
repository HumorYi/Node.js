const fs = require('fs')
const zlib = require('zlib')
const notFound = require('./not-found')

module.exports = {
  gzip(filePath, res) {
    fs.stat(filePath, (err, stat) => {
      if (err) {
        notFound(res)
        return
      }

      let rs = fs.createReadStream(filePath)
      let gz = zlib.createGzip()

      rs.on('error', (error) => {
        console.error(error)
      })

      res.setHeader('content-encoding', 'gzip')
      rs.pipe(gz).pipe(res)
    })
  }
}