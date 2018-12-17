'use strict'

const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware')
const indexHtmlMiddleware = require('./indexHtmlMiddleware')
const path = require('path')
const paths = require('./paths')

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
const host = process.env.HOST || '0.0.0.0'

module.exports = function (allowedHost, publicPath) {
  return {
    // 禁用 HOST 检查
    disableHostCheck: true,
    // 启用压缩
    compress: true,
    // 不显示普通日志, 只显示 warning|error
    clientLogLevel: 'none',
    // HMR 服务
    hot: true,
    // 公共目录
    publicPath,
    // 静默模式
    quiet: true,
    // 防止 CPU 过高
    watchOptions: {
      ignored: new RegExp(
        `^(?!${path
          .normalize(paths.appSrc + '/')
          .replace(/[\\]+/g, '\\\\')}).+[\\\\/]node_modules[\\\\/]`,
        'g'
      )
    },
    // 支持 https 协议
    https: protocol === 'https',
    host: host,
    overlay: false,
    historyApiFallback: {
      disableDotRule: true
    },
    public: allowedHost,
    // proxy,
    before (app) {
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware())
      app.use(indexHtmlMiddleware(paths.appDir))
    }
  }
}
