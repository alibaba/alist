const path = require('path');
const root = process.cwd();
const paths = require('./lib/paths')
const resolveApp = paths.resolveApp;
const dist = path.join(root, 'dist');

const entry = {
    'index' : resolveApp('src/index.js'),
    // wrapper
    'wrapper/next' : resolveApp('src/wrapper/next.js'),
    'wrapper/antd' : resolveApp('src/wrapper/antd.js') ,
    // dialog
    'dialog/next' : resolveApp('src/dialog/next.js'),
    'dialog/antd' : resolveApp('src/dialog/antd.js'),
    'dialog/zent' : resolveApp('src/dialog/zent.js')
}

const basicConfig = {
    libraryTarget: "umd"
};

const entryOuts = [
    {
        entry: resolveApp('src/index.js'),
        output: {
            ...basicConfig,
            path: dist,
            filename: 'index.js',
            library: 'noform',
        }
    },
    {
        entry: resolveApp('src/wrapper/next.js'),
        output: {
            ...basicConfig,
            path: path.join(dist, 'wrapper'),
            filename: 'next.js',
            library: ['noformWrapper', 'next'],
        }
    },
    {
        entry: resolveApp('src/wrapper/antd.js'),
        output: {
            ...basicConfig,
            path: path.join(dist, 'wrapper'),
            filename: 'antd.js',
            library: ['noformWrapper', 'antd'],
        }
    },
    {
        entry: resolveApp('src/dialog/next.js'),
        output: {
            ...basicConfig,
            path: path.join(dist, 'dialog'),
            filename: 'next.js',
            library: ['noformDialog', 'next'],
        }
    },
    {
        entry: resolveApp('src/dialog/antd.js'),
        output: {
            ...basicConfig,
            path: path.join(dist, 'dialog'),
            filename: 'antd.js',
            library: ['noformDialog', 'antd'],
        }
    },
    {
        entry: resolveApp('src/dialog/zent.js'),
        output: {
            ...basicConfig,
            path: path.join(dist, 'dialog'),
            filename: 'zent.js',
            library: ['noformDialog', 'zent'],
        }
    }
];

module.exports = entryOuts;