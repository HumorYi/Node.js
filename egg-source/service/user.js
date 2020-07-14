const delay = (data, tick) => new Promise(resolve => {
  setTimeout(() => resolve(data), tick);
})

module.exports = app => {
  return {
    getName() {
      // return delay('jerry', 1000)
      return app.$model.user.findAll()
    },
    getAge() {
      return 18
    }
  }
}