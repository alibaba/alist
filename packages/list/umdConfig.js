const umdConfig = [
    {
        entry: 'src/wrapper/antd.jsx',
        output: {
            filename: 'antd.js',
            library: 'antdList',
        },
    },
    {
        entry: 'src/wrapper/next.jsx',
        output: {
            filename: 'next.js',
            library: 'nextList',
        },
    },
];

module.exports = umdConfig;
