const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const ora = require('ora')

module.exports.clone = async (repo, desc) => {
  const process = ora(`download...${repo}`)

  process.start()

  try {
    await download(repo, desc)
  } catch (error) {
    process.fail()
  }

  process.succeed()
}
