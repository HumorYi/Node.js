/* const app = new (require('koa'))()
const { initRouter } = require('./hjy-loader')
app.use(initRouter().routes())
app.listen(3000) */

const HJY = require('./hjy')
const app = new HJY()
app.start(3000)