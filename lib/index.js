'use strict';

var _uglifyJs = require('uglify-js');

var _uglifyJs2 = _interopRequireDefault(_uglifyJs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 递归创建目录 同步方法
 * @param dir
 * @returns {boolean}
 */
var mkdirsSync = function mkdirsSync(dir) {
  if (_fs2.default.existsSync(dir)) {
    return true;
  } else {
    if (mkdirsSync(_path2.default.dirname(dir))) {
      _fs2.default.mkdirSync(dir);
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
  var list = _fs2.default.readdirSync(dir);
  list.forEach(function (file) {
    file = _path2.default.join(dir, file);
    var stat = _fs2.default.statSync(file);
    if (stat && stat.isDirectory()) {
      // 不处理忽略文件夹
      if (ignoredir && file.indexOf(ignoredir) > -1) {} else {
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
var compressfiles = function compressfiles(src, dest, ignoredir) {
  var files = [];
  // 遍历收集文件列表
  traverseDirSync(src, files, ignoredir);

  files.forEach(function (file) {
    var relative = _path2.default.relative(src, file);
    var finalPath = _path2.default.join(dest, relative);
    mkdirsSync(_path2.default.dirname(finalPath));
    var extname = _path2.default.extname(file);
    if (extname === '.js') {
      var result = _uglifyJs2.default.minify([file], { compress: true });
      _fs2.default.writeFileSync(finalPath, result.code);
    } else {
      // 非js文件直接copy
      _fs2.default.writeFileSync(finalPath, _fs2.default.readFileSync(file));
    }

    console.log('file: ' + finalPath + ' created.');
  });
};

module.exports = compressfiles;