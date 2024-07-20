const fs = require('fs')
const path = require('path')

// 遍历目录
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f)
    const isDirectory = fs.statSync(dirPath).isDirectory()
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f))
  })
}

// 替换文件中匹配的行
function replacePatternInFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    // <% xxx %> -> <%_ xxx _%> to trim blank lines
    // reference: https://github.com/mde/ejs#tags
    const result = data.replace(/<%\s+(.*?)\s+%>/g, '<%_ $1 _%>')
    fs.writeFile(filePath, result, 'utf8', (err) => {
      if (err) console.error(err)
    })
  })
}

// 脚本入口
try {
  console.info('>>> Replacing <% xxx %> to <%_ xxx %> in layout/**/*.ejs...')
  walkDir(path.resolve(__dirname, '../layout'), (filePath) => {
    if (path.extname(filePath) !== '.ejs') return
    console.log(`>>> Processing file: ${filePath}`)
    replacePatternInFile(filePath)
  })
  console.info(
    '>>> Replace <% xxx %> to <%_ xxx %> in layout/**/*.ejs successfully.',
  )
} catch (error) {
  console.error(
    `>>> Replace <% xxx %> to <%_ xxx %> in layout/**/*.ejs failed.\n${error}`,
  )
}
