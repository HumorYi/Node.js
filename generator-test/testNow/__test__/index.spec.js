const fs = require('fs')
test('generate test file', () => {
  fs.rmdirSync(__dirname + '/data/__test__', {
    recursive: true
  })

  const src = new (require('../index'))()
  src.genJestSource(__dirname + '/data')
})

test('test generate source', () => {
  const src = new (require('../index'))()
  const ret = src.getTestSource('fun', 'class')

  expect(ret).toBe(`
test('TEST fun', () => {
  const fun = require('../class')
  const ret = fun()
  // expect(ret).toBe('test return')
})`)
})

test('test generate filename', () => {
  const src = new (require('../index'))()
  const ret = src.getTestFilename('/abc/class.js')

  expect(ret).toBe('/abc/__test__/class.spec.js')
})
