const entryOuts = require('../entryOuts');
const babelLoaderOpts = require('../lib/babelConfig');

const mode = 'production';
const basicConfig = {
    mode,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: babelLoaderOpts,
                },
            },
        ],
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        },
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};

const config = entryOuts.map(entryOutItem => Object.assign({}, entryOutItem, basicConfig));

module.exports = config;
