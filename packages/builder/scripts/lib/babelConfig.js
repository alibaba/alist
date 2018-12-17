'use strict'

module.exports = {
  babelrc: false,
  compact: false,
  presets: [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
  ],
  plugins: [
    require.resolve("@babel/plugin-proposal-class-properties"),
    require.resolve("@babel/plugin-transform-runtime"),
    [require.resolve("@babel/plugin-proposal-decorators"), { "legacy": true }],
    require.resolve("@babel/plugin-transform-modules-umd"),
  ]
}
