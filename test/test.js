const uglifyFiles =  require('../lib/index.js')
const path = require('path')
const fs = require('fs')
const assert = require('chai').assert

describe('uglifyFiles方法测试', () => {
  it('将文件压缩后放到dist目录', (done) => {
    uglifyFiles('dist', 'test/case1', 'ignoredir')
    const excutePath = process.cwd()
    const f = () => {
      const dirStat = fs.existsSync(path.join(excutePath, 'test/case1'))
      const fileStat = fs.existsSync(path.join(excutePath, 'test/case1', 'index.js'))
      const ignoredirStat = fs.existsSync(path.join(excutePath, 'dist/ignoredir'))

      assert.strictEqual(dirStat, true, '创建dist目录')
      assert.strictEqual(fileStat, true, 'dist/index.js 压缩文件生成')
      assert.strictEqual(ignoredirStat, false, '未创建忽略文件')
      done()
    }
    setTimeout(f, 3000)
  })
})