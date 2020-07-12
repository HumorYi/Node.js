const express = require('express')
const router = express.Router()
const { verifyToken } = require('../service')

router.get('/', (req, res, next) => {
  const { token } = req.cookies
  /*
   * 如果 token 存在，说明登录过，检查 token 是否合法。合法则重定向到原页面，并将 token 作为参数传递。
   * 原页面对应的系统在收到带有 token 的请求后，应该向 passport 发起请求检查 token 的合法性。
   *
   * 如果 cookie 中 token 不存在或者不合法，则返回登录页面。这里登录页面由 passport 提供，也可以重定向到原系统的登录页面。
   */
  if (verifyToken(token)) {
    const { redirectUrl } = req.query

    if (redirectUrl) {
      res.redirect(`http://${redirectUrl}?token=${token}`)

      return
    }

    res.send('<h1>login success</h1>')

    return
  }

  res.render('login')
})

router.post('/', (req, res, next) => {
  const { username, password } = req.body
  const { redirectUrl } = req.query
  const token = 'passport'

  if (username === 'test' && password === '123456') {

    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true
    })

    if (redirectUrl) {
      res.redirect(`http://${redirectUrl}?token=${token}`)

      return
    }

    res.send('<h1>login success</h1>')

    return
  }

  res.send({
    error: 1,
    msg: 'username or password error'
  })
})

module.exports = router