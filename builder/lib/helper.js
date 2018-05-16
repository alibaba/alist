'use strict'

const glob = require('glob')
const path = require('path')

function getDocsEntry (appDocs) {
  const demos = glob.sync('**/*.md', {
    cwd: appDocs
  })
  return demos.reduce((entry, mdFile) => {
    let key = path.join('docs', mdFile).replace(/\\+/g, '/')
    entry[key] = [
      // add little polyfills
      require.resolve('./polyfills'),
      // add HMR
      require.resolve('react-dev-utils/webpackHotDevClient'),
      // add *.md entry
      path.join(appDocs, mdFile)
    ]

    return entry
  }, {})
}

module.exports = {
  getDocsEntry
}
