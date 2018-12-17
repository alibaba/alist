const umdConfig = [
    {
        entry: 'src/antd.jsx',
        output: {
            filename: 'antd.js',
            library: 'antdList',
        },
    },
    // {
    //     entry: 'src/next.jsx',
    //     output: {
    //         filename: 'next.js',
    //         library: 'nextList',
    //     },
    // },
];

module.exports = umdConfig;
