const express = require('express')
const router = express.Router()
const { verifyToken } = require('../service')

router.get('/', (req, res, next) => {
  const { token } = req.query
  const result = { error: 1 }

  if (verifyToken(token)) {
    result.error = 0
    result.userId = 'test'
  }

  res.json(result)
})

module.exports = router