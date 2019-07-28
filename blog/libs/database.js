const mysql = require('mysql')
const promiseMysql = require('./promise-mysql')
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = require('../config')

const { query } = promiseMysql(mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
}))

module.exports = {
  query,
  select: {
    byId(table, id) {
      return query(`SELECT * FROM ${table} WHERE ID=?`, [id])
    },
    all(table) {
      return query(`SELECT * FROM ${table}`)
    },
  },
  insert: {
    byColumns(table, columns, values) {
      return query(`INSERT INTO ${table} (${columns.join(',')}) VALUES(${
        columns.map(column => '?').join(',')
        })`, values)
    },
    all(table, values) {
      return query(`INSERT INTO ${table} VALUES(${
        values.map(value => '?').join(',')
        })`, values)
    },
  },
  update: {
    byId(table, columns, values, id) {
      return query(`UPDATE ${table} SET ${
        columns.map(column => `${column}=?`).join(',')
        } WHERE ID=?`, [...values, id])
    },
    all(table, columns, values) {
      return query(`UPDATE ${table} SET ${
        columns.map(column => `${column}=?`).join(',')
        }`, values)
    },
  },
  delete: {
    byId(table, id) {
      return query(`DELETE FROM ${table} WHERE ID=?`, [id])
    },
    all(table) {
      return query(`DELETE FROM ${table}`)
    },
  },
}