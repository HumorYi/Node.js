const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')

/**
 * 编译模板
 * @param {Object} meta
 * @param {String} filePath
 * @param {String} templatePath
 */
const compile = (meta, filePath, templatePath) => {
  if (!fs.existsSync(templatePath)) {
    return
  }

  const content = fs.readFileSync(templatePath).toString()
  const result = handlebars.compile(content)(meta)
  fs.writeFileSync(filePath, result)

  console.log(chalk.red(`🚀${filePath} 创建成功`))
}

module.exports = async () => {
  const list = fs
    .readdirSync('./src/views')
    .filter(filename => filename !== 'Home.vue')
    .map(filename => ({
      name: filename.replace('.vue', '').toLowerCase(),
      file: filename
    }))

  // 生成路由
  compile({ list }, './src/router.js', './template/router.js.hbs')

  // 生成菜单
  compile({ list }, './src/App.vue', './template/App.vue.hbs')
}
