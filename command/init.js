'use strict'
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const exec = require('child_process').exec

module.exports = () => {
  co(function*(){
    let name = yield prompt('input your code:\n')
    console.log('name==>', name)
    process.exit()
  })
}