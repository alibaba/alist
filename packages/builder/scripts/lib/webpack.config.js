'use strict'

const path = require('path')
const webpack = require('webpack')
const chalk = require('chalk')
const autoprefixer = require('autoprefixer')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const getClientEnvironment = require('./env')
const paths = require('./paths')
const babelConfig = require('./libBabelConfig')
const { getDocsEntry } = require('./helper')
const libBase = require('../libBase');

// TODO: 目前的实现和https://github.com/facebook/create-react-app/pull/4077一致
// 等合并之后，这里就使用react-dev-utils/WatchMissingNodeModulesPlugin的版本
// const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const WatchMissingNodeModulesPlugin = require('./MissingModulePlugin')

const babelLoaderOptions = Object.assign({
  cacheDirectory: true
}, babelConfig)

// 公开路径 (使用相对路径)
const publicPath = '/'
// 公开路径 (去除头部 '/')
const publicUrl = ''
// 当前应用的环境变量
const env = getClientEnvironment(publicUrl)

module.exports = options => {
  // -------------------------------------------------------------------- //
  //                               基础配置                                //
  // -------------------------------------------------------------------- //
  const isProductMode = !!options.build || !!options.profile;
  const isDevMode = options.dev && process.env.NODE_ENV !== 'production';
  const productEntry = options.entry;

  const devOutput = {
    // 添加在 require() 处添加 /* 文件名 */ 注释
    pathinfo: true,
    // 构建目录
    filename: 'static/js/[name].js',
    // chunk 名
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath,
    // 处理 sourceMap 源路径
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
  };

  const prodOutput = {
    // 添加在 require() 处添加 /* 文件名 */ 注释
    pathinfo: true,
    // 构建目录
    path: paths.appBuild,
    // 文件名
    filename: '[name].js',
    // chunk 文件名 (添加 chunk 后缀)
    chunkFilename: '[name].js',
    publicPath,
    libraryTarget: "umd"
    // 处理 sourceMap 源路径
    // devtoolModuleFilenameTemplate: info =>
    //   path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
  };

  // 标准配置
  const config = {
    mode: process.env.NODE_ENV,
    // dev 模式下, 以组件的 docs/*.md 文件作为入口
    entry: isDevMode ?  getDocsEntry(paths.appDocs) : productEntry,
    output: isDevMode ?  devOutput : prodOutput,
    resolve: {
      // 模块查找顺序:
      // - node_modules
      // - {app}/node_modules
      // - global path
      modules: ['node_modules', paths.appNodeModules].concat(
        process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
      ),
      // 支持的扩展名
      extensions: ['.mjs', '.js', '.json', '.jsx'],
      plugins: [
        // 限制 src 目录以外的文件引用 (允许引用 package.json)
        new ModuleScopePlugin(paths.appSrc, [ paths.appPackageJson ])
      ]
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          // 使用 oneOf, 会依次配置 loader, 如果未匹配到的会默认使用最后的 file-loader
          oneOf: [
            // 加载图片
            {
              test: /\.(bmp|gif|png|jpe?g)$/,
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]'
              }
            },
            // 加载 js
            {
              test: /\.(js|jsx|mjs)$/,
              loader: require.resolve('babel-loader'),
              include: paths.appSrc,
              options: babelLoaderOptions
            },
            // 支持引用 html 模板
            {
              test: /\.(html|htm|tpl)$/,
              loader: require.resolve('html-loader')
            },
            // 加载 css
            {
              id: 'css',
              test: /\.css$/,
              use: [
                // MiniCssExtractPlugin.loader,
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1
                  }
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9' // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009'
                      })
                    ]
                  }
                }
              ]
            },
            // 加载 sass
            {
              id: 'sass',
              test: /\.(sass|scss)$/,
              use: [
                // MiniCssExtractPlugin.loader,
                require.resolve('style-loader'),
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1
                  }
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9' // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009'
                      })
                    ]
                  }
                },
                require.resolve('fast-sass-loader')
              ]
            },
            // 加载 docs/*.md
            {
              test: /docs[/\\].+\.md$/,
              use: [
                {
                  loader: require.resolve('babel-loader'),
                  options: babelLoaderOptions
                },
                {
                  loader: require.resolve('./docLoader.js')
                }
              ]
            },
            // 默认的 loader
            {
              exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
              loader: require.resolve('file-loader'),
              options: {
                name: 'static/media/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      // 让模块名称可见
      new webpack.NamedModulesPlugin(),
      // 注入环境变量
      new webpack.DefinePlugin(env.stringified),
      // HRM 插件
      new webpack.HotModuleReplacementPlugin(),
      // 处理路径大小写问题
      new CaseSensitivePathsPlugin(),
      // 监视缺失的模块
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      // 处理 .locale 文件
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),      
    ],
    // 注入空 node 模块
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    },
    // 关闭性能提示
    performance: {
      hints: false
    }
  }

  // optimization非空设定，优化配置写入
  if (!config.optimization) config.optimization = {}

  if (isDevMode) {
    config.plugins.push(function() {        
      this.plugin("watch-run", (compiler, callback) => {
        const ES_PATTERN = /\.(js|jsx|mjs)$/;
        const localPath = process.cwd();
        const changedTimes = compiler.watchFileSystem.watcher.mtimes;
        const changedFiles = Object.keys(changedTimes).filter((changeItem) => {
          return changeItem.startsWith(localPath) && changeItem.match(ES_PATTERN);
        });
        if (changedFiles.length) {
          libBase(localPath, changedFiles).catch((err) => {
            console.error(chalk.red(err.stack || err));
            process.exit(1);
          });
        }
        callback();
      })
    });
    config.devtool = 'cheap-module-source-map'; // 定义 sourcemap 配置
  }
  if (isProductMode) {
    console.log(chalk.cyan('INFO:'), `当前构建模式为 ${process.env.NODE_ENV} 模式`)

    const sourceMap = false

    // 修正 sourceMap
    config.devtool = sourceMap

    // 设置 css / scss loader
    config.module.rules[0].oneOf.forEach((configItem, configIndex) => {
      const { id } = configItem;
      if ('css' === id) {
        config.module.rules[0].oneOf[configIndex].use.unshift(MiniCssExtractPlugin.loader);
      } else if ('sass' === id) {
        config.module.rules[0].oneOf[configIndex].use.splice(0, 1, MiniCssExtractPlugin.loader);
      }
    });

    config.plugins = [
      new webpack.DefinePlugin(env.stringified),
      // webpack4抽取css文件
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      // 显示构建进度
      new ProgressBarPlugin(),
      // 处理路径大小写问题
      new CaseSensitivePathsPlugin(),
      // 处理 .locale 文件
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ];

    // 如果开启 profile
    if (options.profile) {
      console.log(chalk.cyan('INFO:'), '已开启 profile (webpack bundle analyze)')
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugins.push(
        new BundleAnalyzerPlugin()
      )
    }

    // 设置性能提示
    config.performance = {}
  }

  // 删除掉所有 loader 上的 id
  for (const item of config.module.rules[0].oneOf) {
    delete item.id
  }

  return config
}
