const crypto = require('crypto')
const fs = require('fs')

module.exports = {
  md5(buffer) {
    return crypto.createHash('md5').update(buffer).digest('hex')
  },
  unlink(path) {
    return new Promise((resolve, reject) => {
      fs.unlink(path, (err) => err ? reject(err) : resolve())
    })
  },
  inputDbDate(date) {
    return Math.floor(new Date(date).getTime() / 1000)
  },
  outputDbDate(date) {
    return new Date(date * 1000)
  },
  outputDate(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1 + '').padStart(2, '0')}-${(date.getDate() + '').padStart(2, '0')}`
  }
}