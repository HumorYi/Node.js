const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const resolve = dir => path.resolve(__dirname, dir)

const load = (dir, cb) => {
  const url = resolve(dir)
  fs.readdirSync(url).forEach(filename => {
    filename = filename.replace('.js', '')
    cb(filename, require(url + '/' + filename))
  })
}

const loadModel = config => app => {
  mongoose.connect(config.db.url, config.db.options)

  const conn = mongoose.connection

  conn.on('error', () => console.error('connection failed'))

  app.$model = {}

  load('../models', (filename, { schema }) => {
    console.log('load model:', filename, schema)

    app.$model[filename] = mongoose.model(filename, schema)
  })
}

module.exports = {
  loadModel
}