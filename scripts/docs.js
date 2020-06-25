const path = require('path')
const fs = require('fs-extra')
const { command } = require('doc-scripts')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const HEAD_HTML = `
<script>
window.codeSandBoxDependencies = {
  '@alifd/next': 'latest',
  '@formily/next': 'latest',
  '@formily/next-components': 'latest',
  '@formily/antd': 'latest',
  '@formily/antd-components': 'latest',
  '@alist/core': 'latest',
  '@alist/next': 'latest',
  '@alist/antd': 'latest',
  '@alist/react': 'latest',
  '@alist/react-schema-renderer': 'latest',
  '@babel/runtime':'latest',
  antd: 'latest'
}

window.codeSandBoxPeerDependencies = {
  moment: 'latest'
}
</script>
`

const createDocs = async () => {
  const packagesDir = path.resolve(process.cwd(), './packages')
  const packages = await fs.readdir(packagesDir)
  const alias = packages
    .map(v => path.join(packagesDir, v))
    .filter(v => {
      return !fs.statSync(v).isFile()
    })
    .reduce((buf, _path) => {
      const name = path.basename(_path)

      return {
        ...buf,
        [`@alist/${name}`]: `${_path}/src`
      }
    }, {})
  command(
    {
      title: 'AList',
      renderer: path.resolve(__dirname, './doc-renderer.js'),
      header: HEAD_HTML,
    },
    (webpackConfig, env) => {
      webpackConfig.devtool = 'none'
      webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
        if (rule.test.test('.tsx')) {
          return {
            ...rule,
            use: [
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true
                }
              }
            ]
          }
        } else {
          return rule
        }
      })

      Object.assign(webpackConfig.resolve.alias, {
        ...alias,
        '@alifd/next': path.resolve(
          __dirname,
          '../packages/next/node_modules/@alifd/next'
        ),
        antd: path.resolve(__dirname, '../packages/antd/node_modules/antd'),
        '@formily/next': path.resolve(
          __dirname,
          '../packages/next/node_modules/@formily/next'
        ),
        '@formily/next-components': path.resolve(
          __dirname,
          '../packages/next/node_modules/@formily/next-components'
        ),
        '@formily/antd-components': path.resolve(
          __dirname,
          '../packages/antd/node_modules/@formily/antd-components'
        ),
        '@formily/antd': path.resolve(
          __dirname,
          '../packages/antd/node_modules/@formily/antd'
        ),
      })
      webpackConfig.resolve.plugins = [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, '../tsconfig.json')
        })
      ]
      return webpackConfig
    }
  )
}
createDocs()
