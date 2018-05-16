const webpackConfig = require('./webpack.scss');
const webpack = require('webpack');

console.log(webpackConfig);
webpack(webpackConfig).run((err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) console.error(err.details)
    //   reject(err)
    }

    console.log('success');
    // console.log(' - %s %s', chalk.green('scss'), srcFile, destCssFile)
    // resolve()
  });