const express = require('express')
const app = express()
const path = require('path')
const mongo = require('./models/db')
// const testData = require('./initData')
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'))
})

app.get('/api/list', async (req, res) => {
  const pageSize = 5
  const { page, category, keyword } = req.query

  // 构造条件
  const condition = {}
  if (category) {
    condition.category = category
  }
  if (keyword) {
    condition.name = { $regex: new RegExp(keyword) }
  }

  try {
    const col = mongo.col('fruits')
    const total = await col.find(condition).count()
    const fruits = await col.find(condition).skip((page - 1) * pageSize).limit(pageSize).toArray()

    res.json({
      ok: 1,
      data: {
        fruits,
        pagination: {
          total,
          page
        }
      }
    })
  } catch (err) {
    console.error(err)
  }
})

app.get('/api/category', async (req, res) => {
  const col = mongo.col('fruits')
  const data = await col.distinct('category')

  res.json({
    ok: 1,
    data
  })
})

app.listen(port, () => console.log('app started at port ', port))