const path = require('path');

const root = process.cwd();
const dist = path.join(root, 'dist');
const entry = require('../entry');
const babelLoaderOpts = require('../lib/babelConfig');

const mode = 'production';
const config = {
    // mode: 'development',
    mode: mode,
    entry: entry,
    output: {
        library: 'noform',
        path: dist,
        filename: '[name].js',
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                loader: 'babel-loader',
                options: babelLoaderOpts
                }
            }
        ]
    },
    externals: {
        "react": {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
        },
        "react-dom": {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    }
}
module.exports = config;