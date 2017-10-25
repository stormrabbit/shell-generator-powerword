const fs = require('fs');
const co = require('co');

/**
 * 
 * @param {*} fileName 
 * @returns Promise 对象 
 */
const readFileP = (fileName) => {
  return new Promise((reslove, reject) => {
    fs.readFile(__dirname + '/' + fileName, { flag: 'r+', encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err);
      }
      reslove(data);
    })
  })
}

/**
 * 
 * @param {*} fileName  写入的文件名
 * @param {*} filledTxt 写入的 txt
 * @param {*} isAppend 是否是追加
 */
const writeFileP = (fileName, filledTxt, isAppend) => {
  return new Promise((reslove, reject) => {
    fs.writeFile(__dirname + '/' + fileName, new Buffer(filledTxt), !!isAppend ? { flag: 'a' } : {}, err => {
      if (err) {
        reject(err);
      }
      reslove(0);
    })
  })
}

/**
 * 
 * @param {*} fileName 文件名
 * @param {*} filledTxt  需要追加的文字
 * @param {*} appendTxt  在某段文字后追加，找不到就在结尾追加
 */
const insertFileP = (fileName, filledTxt, appendTxt) => {
  return new Promise((reslove, reject) => {
    try {
      co(function* () {
        const fileData = yield readFileP(fileName);
        let substringIndex = -1;
        if (!!appendTxt && !!appendTxt.length) {
          substringIndex = (fileData.indexOf(appendTxt) === -1) ? -1: fileData.indexOf(appendTxt) + appendTxt.length;
        }
        substringIndex = (substringIndex === -1 ? fileData.length : substringIndex);
        const preTxt = fileData.substring(0, substringIndex);
        const postTxt = fileData.substring(substringIndex);
        const rewriteTxt = preTxt + filledTxt + postTxt;
        const result = writeFileP(fileName, rewriteTxt);
        reslove(result);
      });
    } catch (error) {
      reject(error);
    }

  })
}

module.exports = { readFileP, writeFileP, insertFileP };

