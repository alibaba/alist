const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    // do stuff with the webpack config...
    if (env === 'production') {
        config.output.publicPath = './';
    }

    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = injectBabelPlugin(['wrapper', {}], config);
    config = rewireLess.withLoaderOptions({
        modifyVars: { '@primary-color': '#1DA57A' },
        javascriptEnabled: true,
    })(config, env);

    return config;
};
