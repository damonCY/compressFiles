'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _uglifyJs = require('uglify-js');

var _uglifyJs2 = _interopRequireDefault(_uglifyJs);

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
 * @param dir 源文件
 * @param files 收集的文件列表
 * @param ignoreFileArr 排除文件
 */
var traverseDirSync = function traverseDirSync(dir, files, ignoreFileArr) {
  var list = _fs2.default.readdirSync(dir);
  list.forEach(function (file) {
    file = _path2.default.join(dir, file);
    var stat = _fs2.default.statSync(file);
    // 过滤文件
    if (ignoreFileArr) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = ignoreFileArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (file.indexOf(item) >= 0) return;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    if (stat && stat.isDirectory()) {
      traverseDirSync(file, files, ignoreFileArr);
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
var compressfiles = function compressfiles(src, dest, ignoreFileArr) {
  var files = [];
  // 遍历收集文件列表
  traverseDirSync(src, files, ignoreFileArr);

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