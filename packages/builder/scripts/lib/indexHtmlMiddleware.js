'use strict'

const fs = require('fs')
const path = require('path')
const nunjucks = require('nunjucks')

module.exports = function (basedir) {
  console.log('indexhtml middleware', basedir, path.join(__dirname, 'index.html'));
  const tplContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
  const template = nunjucks.compile(tplContent)

  return function (req, res, next) {
    if (req.path === '/' || req.path === '/index.html') {
      let pkg = require(path.join(basedir, 'package.json'))
      let docsDir = path.join(basedir, 'docs')
      let docs = fs.readdirSync(docsDir).map(doc => {
        return {
          name: doc,
          url: '/docs/' + doc.replace(/\.md$/, '.html')
        }
      })

      let content = template.render({
        title: 'index of ' + pkg.name,
        docs
      })
      res.set('Content-Type', 'text/html; charset=utf-8')
      res.end(content)
    } else {
      next()
    }
  }
}