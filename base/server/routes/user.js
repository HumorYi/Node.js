const url = require('url')
const db = require('../libs/database')
const router = require('../libs/router')()

router.prefix('/user')

router.get('/', async (req, res) => {

  try {
    let data = await db.query('SELECT * FROM user');
    res.writeJson({ error: 0, data });
  } catch (e) {
    res.writeJson({ error: 1, msg: 'database error' });
  }
})

router.get('/add', async (req, res) => {
  let {query: {username, password} } = url.parse(req.url, true)

  if (!username || !password) {
    res.writeJson({error: 1, msg: 'params invaild'});
    res.end();
  }

  try {
    let data = await db.query('SELECT id FROM user WHERE username = ?', [username])

    if (data.length > 0) {
      res.writeJson({error: 1, msg: 'username exits'});
      res.end();
    }

    let result = await db.query('INSERT INTO USER(username, password) VALUES(?,?)', [username, password])

    res.writeJson({error: 0, msg: 'success'});
  } catch (error) {
    res.writeJson({error: 1, msg: 'database error'});
    console.error(error);
  }
})

module.exports = router