'use strict'
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const exec = require('child_process').exec

module.exports = () => {
  co(function*(){

    let name = yield prompt('Project name: ')
    let cmdStr = `git clone https://github.com/stormrabbit/spell-book-powerword.git ${name} && cd ${name} && git checkout master`
    console.log(chalk.white('\n start generating...'))
    
    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }
      console.log(chalk.green('\n √ Generation completed!'))
      console.log(`\n cd ${name} && npm install \n`)
      process.exit()
    })
  })
}