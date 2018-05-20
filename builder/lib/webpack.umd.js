const path = require('path');

const root = process.cwd();
const dist = path.join(root, 'dist');
const entryOuts = require('../entryOuts');
const babelLoaderOpts = require('../lib/babelConfig');

const mode = 'production';
const basicConfig = {
    mode: mode,
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
};

const config = entryOuts.map((entryOutItem) => {
    return {
        ...entryOutItem,
        ...basicConfig
    };
});

module.exports = config;