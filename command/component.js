'use strict'

const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const { fsTools: { writeFilePlus }, txtTools:{head2UpperCase} } = require('eschew-materials')
const { buildStatelessComponentCss, buildStatelessComponentJs } = require('../templates/components');

module.exports = (componentName, options) => {
  co(function* () {
    try {
      let cName = componentName;
      while (!cName || !(cName.trim().length > 0)) {
        cName = yield prompt('请输入 component 的名称：\r\n');
      }
      cName = head2UpperCase(cName);
      console.log(cName);
      const currentPath = process.cwd();
      yield writeFilePlus(`${currentPath}/${cName}.js`, buildStatelessComponentJs(cName));
      console.log(chalk.green(`生成成功：${currentPath}/${cName}.js`))
      yield writeFilePlus(`${currentPath}/${cName}.css`, buildStatelessComponentCss(cName));
      console.log(chalk.green(`生成成功：${currentPath}/${cName}.css`))
    } catch (error) {
      console.log(chalk.red(error))
    } finally {
      process.exit();
    }
  })
}
