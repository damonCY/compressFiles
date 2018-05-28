'use strict';

var uglifyjs = require('uglify-js');
var fs = require('fs');
var path = require('path');

/**
 * 递归创建目录 同步方法
 * @param dir
 * @returns {boolean}
 */
var mkdirsSync = function mkdirsSync(dir) {
  if (fs.existsSync(dir)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dir))) {
      fs.mkdirSync(dir);
      return true;
    }
  }
};

/**
 * 遍历目录文件 同步方法
 * @param dir
 * @param files 收集的文件列表
 */
var traverseDirSync = function traverseDirSync(dir, files, ignoredir) {
  var list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = path.join(dir, file);
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (ignoredir && file.indexOf(ignoredir) > 0) {
        //　不处理忽略文件夹
      } else {
        traverseDirSync(file, files);
      }
    } else {
      files.push(file);
    }
  });
};

/**
 * 压缩文件
 * @param dest 目标路径
 * @param src 模板文件路径
 */
var compressfiles = function compressfiles(dest, src, ignoredir) {
  var files = [];
  // 遍历收集文件列表
  traverseDirSync(src, files, ignoredir);

  files.forEach(function (file) {
    var relative = path.relative(src, file);
    var finalPath = path.join(dest, relative);
    var result = uglifyjs.minify([file], { compress: true });
    mkdirsSync(path.dirname(finalPath));
    fs.writeFileSync(finalPath, result.code);
    console.log('file: ' + finalPath + ' created.');
  });
};

module.exports = compressfiles;