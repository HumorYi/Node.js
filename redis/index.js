const redis = require('redis')
const client = redis.createClient(6379, 'localhost')

client.set('hello', 'hi')
client.get('hello', (err, v) => {
  console.log('redis value:', v)
})