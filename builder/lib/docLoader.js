'use strict'

const fs = require('fs')
const path = require('path')
const marked = require('marked')
const rescape = require('escape-string-regexp')

const PATTERN_START_TOKEN = /^`{4}(\w+)\s*/

const template = (text, values, opts) => {
  opts = Object.assign({
    left: '{',
    right: '}'
  }, opts)

  let rule = new RegExp(rescape(opts.left) + '([\\w\\s\\.\\(\\)\\|-]+)' + rescape(opts.right), 'g')

  return text.replace(rule, (total, name) => {
    if (typeof values === 'function') {
      return values(name, total)
    } else {
      return name in values ? values[name] : total
    }
  })
}

class Renderer extends marked.Renderer {
  constructor () {
    super()

    // codes: [{
    //   type: 'js',
    //   content: <string>
    // }, ...]
    this.codes = []
    this._headHtmls = []
  }

  getHeadHtml () {
    return this._headHtmls.join('\n')
  }

  /**
   * 渲染可执行的代码片段
   * @param {String} code
   * @param {String} lang
   * @param {Boolean} escaped
   */
  code (code, lang, escaped) {
    let executable = false
    // 判断 lang 是否以 ! 开头, 如果是就是可执行的
    if (lang && lang.startsWith('!')) {
      lang = lang.substring(1)
      executable = true
    }

    let parsed = super.code(code, lang, escaped)
    let renderred = ''

    // 只有可执行的代码, 才走特殊的渲染方式, codeIndex ++
    if (executable) {
      switch (lang) {
        case 'js':
        case 'jsx':
          this.codes.push({
            type: 'js',
            content: code
          })
          let index = this.codes.length - 1
          renderred = `
          <div class="mount-node" id="mount-node-${index}"></div>
          `
          break
        case 'css':
          this.codes.push({
            type: 'css',
            content: code
          })
          // CSS
          renderred = ''
          break
        case 'html':
          renderred = code
          break
        case 'html:head':
          this._headHtmls.push(code)
          renderred = ''
          break
        default:
          renderred = parsed
      }
    } else {
      renderred = parsed
    }

    return renderred
  }
}

function lowerCamelCase (text) {
  return text.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

/**
 * parse markdown
 *
 * source:
 * ```
 * # header1
 *
 * - author: zoujie.wzj
 * - created-time: yyyy/mm/dd
 * - charset: utf8
 *
 * description ...
 * ---
 *
 * code ...
 * ```
 *
 * result:
 * ```
 * meta: {
 *   charset: 'utf8',
 *   author: 'zoujie.wzj',
 *   createdTime: 'yyyy/mm/dd',
 *   title: 'header1',
 *   description: 'description ...'
 * }
 * ```
 *
 * @param  {String} content
 * @return {Object}
 *  - meta
 *  - content
 */
function parseMeta (content) {
  let lines = content.split('\n')
  let meta = {}
  let titleIndex = -1

  // parse meta
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    if (line[0] === '#') {
      if (line[1] !== '#' && !meta.title) {
        meta.title = line.substring(1).trim()
        titleIndex = i
      }
    } else if (line.match(/^[*-]/)) {
      let matches = line.match(/^[*-]\s*([\w-]+)\s*:\s*(.*)/)

      if (matches) {
        let key = lowerCamelCase(matches[1])
        meta[key] = String(matches[2]).trim()
      }

      lines[i] = ''
    } else if (!line || line.match(/^\s+/)) {
      continue
    } else {
      break
    }
  }

  // add executable mark
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(PATTERN_START_TOKEN)) {
      lines[i] = lines[i].replace(PATTERN_START_TOKEN, (total, lang) => {
        return '````!' + lang
      })
    }
  }

  if (meta.layout === 'test' && titleIndex >= 0) {
    lines[titleIndex] = ''
  }

  return {
    meta,
    content: lines.join('\n')
  }
}

function fixDocsCode (index, code, pkgName, relativePath) {
  return code
    .replace(/\bmountNode\b/g, `document.getElementById('mount-node-${index}')`)
    .replace(new RegExp(`(import .*["'])${pkgName}(\\/src|\\/lib)?(\\S*["'])`, 'g'), `$1${relativePath}/src$3`)
}

module.exports = function (content) {
  const cwd = process.cwd()
  const pkg = require(path.join(cwd, 'package.json'))
  const resourcePath = this.resourcePath
  const relativePath = path.relative(cwd, resourcePath)
  const parsed = parseMeta(content)
  const meta = parsed.meta
  const renderer = new Renderer()
  const bodyHtml = marked(parsed.content, {
    renderer
  })
  const codes = renderer.codes

  // codes
  let js = []
  let css = []
  let realtiveRoot = path.relative(path.dirname(resourcePath), cwd)
  for (let i = 0; i < codes.length; i++) {
    let code = codes[i]
    if (code.type === 'js') {
      js.push(fixDocsCode(i, code.content, pkg.name, realtiveRoot))
    } else if (code.type === 'css') {
      css.push(code.content)
    }
  }

  // params
  let title = meta.title || resourcePath
  let layout = meta.layout || 'default'
  let charset = meta.charset || 'utf8'
  let headHtml = renderer.getHeadHtml()
  let tplFile = path.join(__dirname, 'layout', layout + '.html')
  if (!fs.existsSync(tplFile)) {
    throw new Error(`读取 layout 文件 ${tplFile} 失败`)
  }
  let tplContent = fs.readFileSync(tplFile, 'utf8')
  let html = template(tplContent, {
    name: pkg.name,
    title,
    charset,
    headHtml,
    bodyHtml,
    jsUrl: `/static/js/${relativePath}.js`,
    css: css.join('\n')
  })
  let htmlPath = path.relative(cwd, resourcePath).replace(/\.md$/, '.html')
  this.emitFile(htmlPath, html)

  return `
// js
import React from 'react'
import ReactDOM from 'react-dom'
${js.join('\n')}

// HMR code
console.log('xxx');
if (module.hot) {
  module.hot.accept();
}
`
}