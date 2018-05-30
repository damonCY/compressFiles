import fs from 'fs'
import path from 'path'
import uglifyjs from 'uglify-js'

/**
 * 递归创建目录 同步方法
 * @param dir
 * @returns {boolean}
 */
const mkdirsSync = dir => {
  if (fs.existsSync(dir)) {
    return true
  }
  else {
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
      // 不处理忽略文件夹
      if (ignoredir && file.indexOf(ignoredir) > -1) {
      }
      else {
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
const compressfiles = (src, dest, ignoredir) => {
  const files = []
  // 遍历收集文件列表
  traverseDirSync(src, files, ignoredir)

  files.forEach(file => {
    const relative = path.relative(src, file)
    const finalPath = path.join(dest, relative)
    mkdirsSync(path.dirname(finalPath))
    const extname = path.extname(file)
    if (extname === '.js') {
      const result = uglifyjs.minify([file], { compress: true })
      fs.writeFileSync(finalPath, result.code)
    }
    else {
      // 非js文件直接copy
      fs.writeFileSync(finalPath, fs.readFileSync(file))
    }

    console.log(`file: ${finalPath} created.`)
  })
}

module.exports = compressfiles
