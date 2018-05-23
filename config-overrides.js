const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  
    config = rewireLess(config, env);
    
    // with loaderOptions
    config = rewireLess.withLoaderOptions({
      modifyVars: {
        "@primary-color": "#1890ff",
      },
    })(config, env);

  return config;
};