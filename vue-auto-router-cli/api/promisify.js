module.exports = fn => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      args.push((err, ...arg) => {
        if (err) {
          reject(err)
        } else {
          resolve(...arg)
        }
      })

      fn.apply(null, args)
    })
  }
}
