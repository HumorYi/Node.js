const path = require('path')

module.exports = {
  // database
  DB_HOST: 'localhost',
  DB_PORT: 3306,
  DB_USER: 'root',
  DB_PASSWORD: '',
  DB_NAME: 'cpts',
  DB_CONNECTION_LIMIT: 10,

  // http
  HTTP_PORT: 8080,
  HTTP_ROOT: 'http://localhost:8080',

  UPLOAD_DIR: path.resolve(__dirname, '../static/upload'),

  ADMIN_PREFIX: '_?:L$"OPUIOSIFJ(*UPT:LKRFG',
}