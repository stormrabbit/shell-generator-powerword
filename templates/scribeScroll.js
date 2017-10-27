const buildCommandCode = (wordObj) => {
  const {
    word,
    alias,
    des,
    command
  } = wordObj;


  return `\r\n
program
  .command('${word} [arg1]')
  .description('${des}')
  .alias('${alias}')
  .option('-e --example', '在这里可以添加 ${word} 的 options')
  .action((arg1, options) => {
    require('../command/${command}')(arg1, options)
})`;
}



const buildActionCode = () => {
  return `'use strict'\r\n
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const exec = require('child_process').exec
module.exports = (args1, options) => {
  co(function* () {
    console.log('args1==>', args1);
    console.log('options.example==>', options.example);
    const temp = yield prompt('input a word：\\r\\n')
    console.log(chalk.blue(\`\${args1}, \${temp}\`))
    process.exit()
  })
}
`;
}

module.exports = {buildActionCode ,buildCommandCode};