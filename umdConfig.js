const umdConfig = [
    {
        entry: 'src/index.js',
        output: {
            filename: 'index.js',
            library: 'noform',
        },
    },
    {
        entry: 'src/wrapper/next.jsx',
        output: {
            path: 'wrapper',
            filename: 'next.js',
            library: ['noformWrapper', 'next'],
        },
    },
    {
        entry: 'src/wrapper/antd.jsx',
        output: {
            path: 'wrapper',
            filename: 'antd.js',
            library: ['noformWrapper', 'antd'],
        },
    },
    {
        entry: 'src/dialog/next.jsx',
        output: {
            path: 'dialog',
            filename: 'next.js',
            library: ['noformDialog', 'next'],
        },
    },
    {
        entry: 'src/dialog/antd.jsx',
        output: {
            path: 'dialog',
            filename: 'antd.js',
            library: ['noformDialog', 'antd'],
        },
    },
    {
        entry: 'src/repeater/antd.js',
        output: {
            path: 'repeater',
            filename: 'antd.js',
            library: ['noformRepeater', 'antd'],
        },
    },
    {
        entry: 'src/dialog/zent.jsx',
        output: {
            path: 'dialog',
            filename: 'zent.js',
            library: ['noformDialog', 'zent'],
        },
    },
];

module.exports = umdConfig;
