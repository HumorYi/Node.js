(async () => {
  const { MongoClient } = require('mongodb')
  const client = new MongoClient('mongodb://localhost:27017', {
    // useNewUrlParser: true
    useUnifiedTopology: true
  })

  let ret = await client.connect()
  const db = client.db('test')
  const fruits = db.collection('fruits')

  // ret = await fruits.insertOne({
  //   name: '芒果',
  //   price: 20.1
  // })
  // console.log('insertOne result', ret)

  // ret = await fruits.insertMany([
  //   {
  //     name: '芒果',
  //     price: 20.1
  //   },
  //   {
  //     name: '芒果',
  //     price: 30.1
  //   },
  //   {
  //     name: '蔬菜',
  //     price: 10.5
  //   },
  // ])
  // console.log('insertOne result', ret)

  // ret = await fruits.findOne()
  // ret = await fruits.findOne({ name: '芒果' })
  // ret = await fruits.find({ name: '苹果' })
  // console.log('findOne result', ret)

  // ret = await fruits.updateOne({ name: '芒果' }, {
  //   $set: { name: '苹果' }
  // })
  // console.log('updateOne result', ret)

  // ret = await fruits.updateMany({ name: '芒果' }, {
  //   $set: { name: '苹果' }
  // })
  // console.log('updateOne result', ret)

  // ret = await fruits.deleteOne({ name: '芒果' })
  // ret = await fruits.deleteMany({ name: '苹果' })
  // console.log('deleteOne result', ret)

  client.close()
})()