
'use strict'
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const exec = require('child_process').exec
module.exports = () => {
  co(function* () {
    const temp = yield prompt('input a word：\r\n')
    console.log(chalk.red(`hello, ${temp}`))
    process.exit()
  })
}
