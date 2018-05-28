const uglifyjs = require('uglify-js')
const fs = require('fs')
const path = require('path')


/**
 * 递归创建目录 同步方法
 * @param dir
 * @returns {boolean}
 */
const  mkdirsSync = dir => {
  if (fs.existsSync(dir)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dir))) {
      fs.mkdirSync(dir)
      return true
    }
  }
}

/**
 * 遍历目录文件 同步方法
 * @param dir
 * @param files 收集的文件列表
 */
const traverseDirSync = (dir, files, ignoredir) => {
  const list = fs.readdirSync(dir)
  list.forEach(file => {
    file = path.join(dir, file)
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      if (ignoredir && file.indexOf(ignoredir) > 0) {
         //　不处理忽略文件夹
      } else {
        traverseDirSync(file, files)
      }
    }
    else {
      files.push(file)
    }
  })
}

/**
 * 压缩文件
 * @param dest 目标路径
 * @param src 模板文件路径
 */
const compressfiles = (dest, src, ignoredir) => {
  const files = []
  // 遍历收集文件列表
  traverseDirSync(src, files, ignoredir)

  files.forEach(file => {
    const relative = path.relative(src, file)
    const finalPath = path.join(dest, relative)
    const result = uglifyjs.minify([file],{compress: true})
    mkdirsSync(path.dirname(finalPath))
    fs.writeFileSync(finalPath, result.code)
    console.log(`file: ${finalPath} created.`)
  })
}

module.exports = compressfiles