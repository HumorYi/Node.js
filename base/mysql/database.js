const mysql = require('mysql')
const co = require('co-mysql');

// port: 3306, connectionLimit: 10
// 将mysql的api封装为promise,支持异步语法
module.exports = co(mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node',
}))