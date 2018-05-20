'use strict'

// 设置 ENV
const ENV_TYPE = process.env.NODE_ENV || 'production'
// const ENV_TYPE = process.env.NODE_ENV || 'development'
process.env.NODE_ENV = ENV_TYPE
process.env.BABEL_ENV = ENV_TYPE

// 保证 unhandle process 能抛出异常
process.on('unhandledRejection', err => {
  throw err
})

// 加载环境变量
require('./lib/env')

const sass = require('node-sass');
const entry = require('./entry');
const paths = require('./lib/paths');
const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const fs = require('fs');
const { rmdirSync, mkdir } = require('./utils');
const umdConfig = require('./lib/webpack.umd');

const transformCss = async () => {
  const CSS_PATTERN = /\.(scss)$/
  let files = glob.sync('**/*.*', {
    cwd: paths.appSrc
  })

  for (let file of files) {
    let srcFile = path.join(paths.appSrc, file)
    let destFile = path.join(paths.appBuild, file)

    if (file.match(CSS_PATTERN)) {
      console.log(' - %s %s', chalk.green('scss'), file)
      destFile = destFile.replace(CSS_PATTERN, '.css')
      let content = fs.readFileSync(srcFile, 'utf8')
      await mkdir(path.dirname(destFile))
      const rawScss = sass.renderSync({
        data: content
      });

      const cssContent = rawScss.css.toString('utf-8');
      fs.writeFileSync(destFile, cssContent);
    }
  }
  console.log(chalk.green('\nTransform successfully!'))
};

const callback = async (err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) console.error(err.details)
    return;
  }

  console.log(stats.toString({
    chunks: false, // Makes the build much quieter
    chunkModules: false,
    colors: true, // Shows colors in the console
    children: false,
    builtAt: true,
    modules: false
  }))

  await transformCss();
}

rmdirSync(paths.appBuild);
webpack(umdConfig).run(callback);