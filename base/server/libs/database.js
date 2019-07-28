const mysql = require('mysql')
const co = require('co-mysql')
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_CONNECTION_LIMIT,
} = require('../config')


module.exports = co(mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: DB_CONNECTION_LIMIT,
}))