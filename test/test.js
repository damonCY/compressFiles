import compressfiles from '../lib/index.js'
import path from 'path'
import fs from 'fs'
import chai from 'chai'

let assert = chai.assert

describe('compressfiles方法测试', () => {
  it('将文件压缩后放到dist目录', (done) => {
    compressfiles('test/src', 'test/dist', 'test/src/ignoredir')
    const excutePath = process.cwd()
    const f = () => {
      const dirStat = fs.existsSync(path.join(excutePath, 'test/src'))
      const fileStat = fs.existsSync(path.join(excutePath, 'test/src', 'index.js'))
      const txtStat = fs.existsSync(path.join(excutePath, 'test/src', 'one'))
      const ignoredirStat = fs.existsSync(path.join(excutePath, 'test/dist/ignoredir'))

      assert.strictEqual(dirStat, true, '创建dist目录')
      assert.strictEqual(fileStat, true, 'dist/index.js 压缩文件生成')
      assert.strictEqual(txtStat, true, 'txt文件，跳过压缩，copy成功')
      assert.strictEqual(ignoredirStat, false, '未创建忽略文件')
      done()
    }
    setTimeout(f, 3000)
  })
})