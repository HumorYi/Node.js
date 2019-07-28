const path = require('path')

module.exports = {
  // database
  DB_HOST: '21.34.98.75',
  DB_PORT: 3306,
  DB_USER: 'root',
  DB_PASSWORD: '123456',
  DB_NAME: 'node',
  DB_CONNECTION_LIMIT: 10,

  // http
  HTTP_PORT: 8080,
  HTTP_ROOT: path.resolve(__dirname, '../static') + '/',
  HTTP_UPLOAD: path.resolve(__dirname, '../static/upload') + '/',
}