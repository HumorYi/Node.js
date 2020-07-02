const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const { clone } = require('./download')
const open = require('open')

const spawn = async (...args) =>
  new Promise(resolve => {
    const { spawn } = require('child_process')
    const proc = spawn(...args)

    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)

    proc.on('close', () => resolve())
  })

const log = content => console.log(chalk.green(content))

module.exports = async name => {
  clear()

  const data = await figlet('Welcome')

  log(data)

  log(`🚀创建项目:` + name)

  await clone('github:su37josephxia/vue-template', name)

  log('安装依赖')

  // windows: npm.cmd, linux: npm,  cwd: current work directory
  await spawn('npm.cmd', ['install'], { cwd: `./${name}` })

  log(
    chalk.green(`
👌安装完成：
To get Start:
===========================
  cd ${name}
  npm run serve
===========================
    `)
  )

  open('http://localhost:8080')

  await spawn('npm.cmd', ['run', 'serve'], { cwd: `./${name}` })
}
