const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/test", {
  useUnifiedTopology: true
})

// 1、建立连接
const conn = mongoose.connection

conn.on('error', (err) => console.error('connection failed', err))

conn.once('open', async () => {
  // 2、创建一个 Schema - Table
  const Schema = mongoose.Schema({
    category: String,
    name: String
  })

  // 3、编译一个 Model，对应数据库中复数小写的 Collection
  const Model = mongoose.model('fruit', Schema)

  try {
    // 4、创建数据，返回 Promise
    // let ret = await Model.create({
    //   category: '温带水果',
    //   name: '苹果',
    //   price: 25
    // })
    // console.log('insert data success', ret)

    // 5、查询数据，返回 Query，它实现了 then 和 catch，可以当 Promise使用
    // 如果需要返回 Promise，调用其 exec()
    // let ret = await Model.find({ name: '苹果' })
    // console.log('query data success', ret)

    // 6、更新，updateOne返回Query
    // let ret = await Model.updateOne({ name: '苹果' }, {
    //   $set: {
    //     name: '芒果'
    //   }
    // })
    // console.log('updateOne data success', ret)

    // 7、删除，deleteOne返回Query
    let ret = await Model.deleteOne({ name: '苹果' })
    console.log('deleteOne data success', ret)
  } catch (err) {
    console.error(err);
  }
})