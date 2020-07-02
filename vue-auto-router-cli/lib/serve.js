const watch = require('watch')
const open = require('open')
const refresh = require('./refresh')

const spawn = async (...args) => {
  const { spawn } = require('child_process')
  const proc = spawn(...args)

  proc.stdout.pipe(process.stdout)
  proc.stderr.pipe(process.stderr)

  return proc
}

module.exports = async () => {
  let process
  let isRefresh = false

  watch.watchTree('./src', async () => {
    if (isRefresh) {
      return
    }

    isRefresh = true
    process && process.kill()

    await refresh()

    setTimeout(() => {
      isRefresh = false
    }, 5000)

    !process && open('http://localhost:8080')

    process = await spawn('npm.cmd', ['run', 'serve'])
  })
}
