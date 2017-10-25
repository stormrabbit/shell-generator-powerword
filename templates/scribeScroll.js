const buildCommandCode = (wordObj) => {
  const {
    word,
    alias,
    des,
    command
  } = wordObj;
  return `\r\nprogram
  .command('${word}')
  .description('${des}')
  .alias('${alias}')
  .action(() => {
    require('../command/${command}')()
  })`;
}

const buildActionCode = () => {
  return `
'use strict'
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const exec = require('child_process').exec
module.exports = () => {
  co(function* () {
    const temp = yield prompt('input a word：\\r\\n')
    console.log(chalk.red(\`hello, \${temp}\`))
    process.exit()
  })
}
`;
}

module.exports = {buildActionCode ,buildCommandCode};