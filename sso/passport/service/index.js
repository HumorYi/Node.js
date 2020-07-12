const verifyToken = token => Boolean(token && token === 'passport')

module.exports = {
  verifyToken
}