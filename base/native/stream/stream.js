const fs = require('fs')

// let rs = fs.createReadStream('./read/1.txt')
// let ws = fs.createWriteStream('./write/1.txt')

let rs = fs.createReadStream('./read/demo.jpg')
let ws = fs.createWriteStream('./write/demo.jpg')

rs.pipe(ws)

rs.on('error', (err) => {
  console.log(err);
})

ws.on('finish', () => {
  console.log('done')
})