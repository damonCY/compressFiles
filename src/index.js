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
 * @param dir 源文件
 * @param files 收集的文件列表
 * @param ignoreFileArr 排除文件
 */
const traverseDirSync = (dir, files, ignoreFileArr) => {
  const list = fs.readdirSync(dir)
  list.forEach(file => {
    file = path.join(dir, file)
    const stat = fs.statSync(file)
    // 过滤文件
    if (ignoreFileArr) {
      for (const item of ignoreFileArr) {
        if (file.indexOf(item) >= 0) return
      }
    }
    if (stat && stat.isDirectory()) {
      traverseDirSync(file, files, ignoreFileArr)
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
const compressfiles = (src, dest, ignoreFileArr) => {
  const files = []
  // 遍历收集文件列表
  traverseDirSync(src, files, ignoreFileArr)

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
