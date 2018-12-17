const umdConfig = [    
    {
        entry: 'src/antd/index.jsx',
        output: {
            filename: 'antd.js',
            library: 'antdWrapper',
        },
    },
    // {
    //     entry: 'src/next/index.jsx',
    //     output: {
    //         filename: 'next.js',
    //         library: 'nextWrapper',
    //     },
    // },
];

module.exports = umdConfig;
