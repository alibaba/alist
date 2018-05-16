'use strict'

module.exports = {
  babelrc: false,
  compact: false,
  presets: [
    require.resolve('babel-preset-react'),
    require.resolve('babel-preset-env'),
    require.resolve('babel-preset-stage-0')
  ],
  plugins: [
    require.resolve('babel-plugin-transform-runtime'),
    require.resolve('babel-plugin-transform-decorators-legacy'),
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-transform-es2015-modules-umd')
  ]
}
