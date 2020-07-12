const express = require('express')
const router = express.Router()
const request = require('request')

router.get('/', (req, res, next) => {
  const system = process.env.SERVER_NAME
  const { user } = req.session

  if (user) {
    // 如果 session 中有用户信息，则说明已经登录过，直接返回请求的资源。
    res.render('index', {
      user,
      system
    })

    return
  }

  /*
   * 如果 session 中没有用户信息，则需要去 passport 系统进行身份认证。这里区分两种情况：
   *
   * 1. 如果 url 中带有 token 信息，则去 passport 中认证 token 的有效性，如果有效则说明登录成功，建立 session 开始通话。
   * 2. 如果 url 中没有 token 信息，则去 passport 进行登录。如果登录成功，passport 会将浏览器重定向到此系统并在 url 上附带 token 信息。进行步骤 1。
   *
   * 因为 token 很容易伪造，所以需要去检验 token 的真伪，否则任何一个带有 token 的请求岂不是都可以通过认证。
   */

  const { query: { token }, headers: { host }, originalUrl } = req
  const redirectUrl = `http://localhost:8080/login?redirectUrl=${host + originalUrl}`

  if (!token) {
    res.redirect(redirectUrl)
    return
  }

  request(`http://localhost:8080/check_token?token=${token}&t=${new Date().getTime()}`, (error, { statusCode }, data) => {
    if (!error && statusCode === 200) {
      data = JSON.parse(data)

      if (data.error === 0) {

        const { userId } = data
        if (!userId) {
          res.redirect(redirectUrl)
          return
        }

        /*
         * TODO:
         * 获取 userId 后，可以操作数据库获取用户的详细信息，用户名、权限等；
         * 这里也可以由 passport 直接返回 user 信息，主要看用户信息的数据库如何部署。
         * 为了方便，直接操作 userId，省略用户数据库操作。
         */
        req.session.user = userId
        res.render('index', {
          user: userId,
          system
        })

        return
      }

      // TODO 这里的 userId 信息应该是经过加密的，加密算法要么内嵌，要么从 passport 获取。这里为了操作简单，直接使用明文。

      // token 验证失败，重新去 passport 登录。
      res.redirect(redirectUrl)

      return
    }

    res.redirect(redirectUrl)
  })
})


module.exports = router