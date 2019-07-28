const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'node'
})

let {username, password} = {
  username: 'bamboo',
  password: '123456'
}

db.query('INSERT INTO user (username, password) VALUES (?,?)', [username, password], (err, data) => {
  if (err) {
    console.log('insert error: ', err);
  }
  else {
    console.log('insert success: ', data);
    console.log('insert insertId: ', data.insertId);

  }
})

db.query('SELECT * FROM user WHERE username = ?', [username], (err, data) => {
  if (err) {
    console.log('select error: ', err);
  }
  else {
    console.log('select success: ', data);
  }
})