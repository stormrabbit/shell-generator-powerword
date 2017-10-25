'use strict'
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const exec = require('child_process').exec
const { insertFileP, writeFileP } = require('../utils/fsPromise')
const {buildActionCode, buildCommandCode} = require('../templates/scribeScroll');
module.exports = () => {
  co(function* () {
    /**
     * 1 读取输入，包括：
     *   .command .alias .description .command 的值并保存
     */
    let word = yield prompt('write your spell:\n')
    let alias = yield prompt('write a short name:\n')
    let des = yield prompt('write a description for the spell:\n')
    let command = yield prompt(`name your spell file:\n[${word}]`);
    const spellObj = {
      word,
      alias,
      des,
      command: (!command || !command.length) ? word: command
    }
    /**
     * 2 把 wordObj 的值根据模板插入到 powerword 文件中
     */

    yield insertFileP('../bin/spell', buildCommandCode(spellObj), '定义具体方法');

    /**
     * 3 根据输入的 command 创建/重写文件 
     */

    yield writeFileP(`../command/${spellObj.command}.js`, buildActionCode());

    // 做完了就退出
    process.exit()
  })
}

// const buildCommandCode = (wordObj) => {
//   const {
//     word,
//     alias,
//     des,
//     command
//   } = wordObj;
//   return `\r\nprogram
//   .command('${word}')
//   .description('${des}')
//   .alias('${alias}')
//   .action(() => {
//     require('../command/${command}')()
//   })`;
// }

// const buildActionCode = () => {
//   return `'use strict'\r\nconst co = require('co')\r\n
//   const prompt = require('co-prompt')
//   const chalk = require('chalk')
//   const exec = require('child_process').exec
//   module.exports = () => {
//     co(function* () {
//       const temp = yield prompt('input a word：\\r\\n')
//       console.log(chalk.red(\`hello, \${temp}\`))
//       process.exit()
//     })
//   }`;
// }

