'use strict'
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const exec = require('child_process').exec
const { fsTools : {insertFilePlus, writeFilePlus}} = require('eschew-materials')
const { buildActionCode, buildCommandCode } = require('../templates/scribeScroll');
module.exports = (cmdName, options) => {
  co(function* () {
    try {
      /**
       * change
       *  2017.10.27 修改
       *  增加功能 spell scibe <cmdName> [-i]
       * 1. 先检测是否有 command 命令的名称 cmdName
       * 2. 没有则输入，有则检测是否有 options -a 的指令
       * 3. 有则一步一步的开始定制，没有直接根据 command 的名称输出结果
       */
      let word = cmdName;
      while (!word || !word.trim().length || word.trim().toLowerCase() === 'scribe') {
        word = yield prompt('必须输入 command 命令的名称且不能为\'scribe\' ：\n');
      }

      const flagOptionAll = (!!options && !!options.all);
      let alias = flagOptionAll ? yield prompt('请输入 command 名称的缩写:\n') : word.substring(0, 2);
      let des = flagOptionAll ? yield prompt('请输入 comand 命令的描述:\n') : `command 命令 ${word}`;
      let command = flagOptionAll ? yield prompt(`请输入 command 命令对应的 js 文件名称:\n`) : word;
      /**
       * 1 读取输入，包括：
       *   .command .alias .description .command 的值并保存
       */
      const spellObj = {
        word,
        alias,
        des,
        command
      }
      /**
       * 2 把 wordObj 的值根据模板插入到 powerword 文件中
       */
      yield insertFilePlus(__dirname + '/../bin/spell', buildCommandCode(spellObj), '定义具体方法');
      console.log(chalk.green(`插入 command 代码：成功`))
      /**
       * 3 根据输入的 command 创建/重写文件 
       */
      yield writeFilePlus(__dirname + `/../command/${spellObj.command}.js`, buildActionCode());
      console.log(chalk.green(`生成 js 文件：../command/${spellObj.command}.js 生成成功}`))
    } catch (error) {
      console.log(chalk.red(`抄写卷轴失败：${error}`));
    } finally {
      // 做完了就退出
      process.exit()
    }
  })
}

