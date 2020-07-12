const http = require('http')
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const login = require('./routes/login')
const checkToken = require('./routes/check-token')

const app = express()
const port = process.env.PORT || 8080

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/login', login)
app.use('/check_token', checkToken)

app.set('port', port)

http.createServer(app).listen(port, () => {
  console.log(`Server passport listening on port: ${port}`)
})