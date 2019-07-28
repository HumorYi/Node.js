const fs = require('fs')
const zlib = require('zlib')

let rs = fs.createReadStream('./read/3.txt')
let gz = zlib.createGzip()
let ws = fs.createWriteStream('./write/3.txt.gz')

rs.pipe(gz).pipe(ws)

rs.on('error', (err) => {
  console.log(err);
})

ws.on('finish', () => {
  console.log('done')
})