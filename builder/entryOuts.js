const path = require('path');

const root = process.cwd();
const paths = require('./lib/paths');

const { resolveApp } = paths;
const dist = path.join(root, 'dist');
const basicConfig = {
    libraryTarget: 'umd',
};

const entryOuts = [
    {
        entry: resolveApp('src/index.js'),
        output: Object.assign({
            path: dist,
            filename: 'index.js',
            library: 'noform',
        }, basicConfig),
    },
    {
        entry: resolveApp('src/wrapper/next.jsx'),
        output: Object.assign({
            path: path.join(dist, 'wrapper'),
            filename: 'next.js',
            library: ['noformWrapper', 'next'],
        }, basicConfig),
    },
    {
        entry: resolveApp('src/wrapper/antd.jsx'),
        output: Object.assign({
            path: path.join(dist, 'wrapper'),
            filename: 'antd.js',
            library: ['noformWrapper', 'antd'],
        }, basicConfig),
    },
    {
        entry: resolveApp('src/dialog/next.jsx'),
        output: Object.assign({
            path: path.join(dist, 'dialog'),
            filename: 'next.js',
            library: ['noformDialog', 'next'],
        }, basicConfig),
    },
    {
        entry: resolveApp('src/dialog/antd.jsx'),
        output: Object.assign({
            path: path.join(dist, 'dialog'),
            filename: 'antd.js',
            library: ['noformDialog', 'antd'],
        }, basicConfig),
    },
    {
        entry: resolveApp('src/repeater/antd.js'),
        output: Object.assign({
            path: path.join(dist, 'repeater'),
            filename: 'antd.js',
            library: ['noformRepeater', 'antd'],
        }, basicConfig),
    },
    {
        entry: resolveApp('src/dialog/zent.jsx'),
        output: Object.assign({
            path: path.join(dist, 'dialog'),
            filename: 'zent.js',
            library: ['noformDialog', 'zent'],
        }, basicConfig),
    },
];

module.exports = entryOuts;
