const path = require('path')
const fs = require('fs')

module.exports = class TestNow {
  genJestSource(sourcePath = path.resolve('./')) {
    const testPath = `${sourcePath}/__test__`

    if (!fs.existsSync(testPath)) {
      fs.mkdirSync(testPath)
    }

    const filenames = fs.readdirSync(sourcePath)

    filenames
      .map(filename => `${sourcePath}/${filename}`)
      .filter(filename => fs.statSync(filename).isFile())
      .filter(filename => !filename.includes('.spec'))
      .map(filename => this.genTestFile(filename))
  }

  genTestFile(filename) {
    const testFileName = this.getTestFilename(filename)

    if (fs.existsSync(testFileName)) {
      console.log(`${testFileName} test file exists`)
      return
    }

    const mod = require(filename)
    let source

    switch (typeof mod) {
      case 'object':
        source = Object.keys(mod)
          .map(key => this.getTestSource(key, path.basename(filename), true))
          .join('\n')
        break

      case 'function':
        const basename = path.basename(filename)
        source = this.getTestSource(basename.replace('.js', ''), basename)
        break
    }

    source && fs.writeFileSync(testFileName, source)
  }

  getTestSource(methodName, classFile, isClass) {
    return `
test('${'TEST ' + methodName}', () => {
  const ${isClass ? '{' + methodName + '}' : methodName} = require('${'../' + classFile}')
  const ret = ${methodName}()
  // expect(ret).toBe('test return')
})`
  }

  getTestFilename(filename) {
    const dirName = path.dirname(filename)
    const baseName = path.basename(filename)
    const extName = path.extname(filename)
    const testName = baseName.replace(extName, `.spec${extName}`)

    return path.format({
      root: dirName + '/__test__/',
      base: testName
    })
  }
}
