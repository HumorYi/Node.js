const static = require('koa-static')
const defaultOptions = {
  image: 30,
  script: 1,
  styles: 30,
  html: 30,
  other: 7,
}
const day = 86400 * 1000
const STATIC_ROOT = './static'

module.exports = (router, options = {}) => {
  const {
    image,
    script,
    styles,
    html,
    other,
  } = Object.assign(options, defaultOptions)

  router.all(/\.(jpg|png|gif)$/i, static(STATIC_ROOT, {
    maxage: image * day
  }))
  router.all(/\.(js|jsx)$/i, static(STATIC_ROOT, {
    maxage: script * day
  }))
  router.all(/\.css$/i, static(STATIC_ROOT, {
    maxage: styles * day
  }))
  router.all(/\.(html|htm)$/i, static(STATIC_ROOT, {
    maxage: html * day
  }))
  router.all('*', static(STATIC_ROOT, {
    maxage: other * day
  }))
}