// test async function, must use callback to call done function finish it
/* test('generator', done => {
  const { co, promise } = require('../index')

  const generator = function* (name) {
    yield promise(name + 1)
    yield promise(name + 2)
    yield promise(name + 3)
  }

  co(generator('Co-Generator'))

  setTimeout(done, 1000)
}) */

// test async function, must use callback to call done function finish it
test('events', done => {
  const { event } = require('../index')
  event()

  setTimeout(done, 1000)
})
