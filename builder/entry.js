const paths = require('./lib/paths')
const resolveApp = paths.resolveApp;

// lib/index.js;lib/wrapper/next.js;lib/dialog/next.js;lib/index.css;lib/wrapper/next.css;lib/dialog/next.css;

const entry = {
    'index' : resolveApp('src/index.js'),
    // wrapper
    'wrapper/next' : resolveApp('src/wrapper/next.js'),
    'wrapper/antd' : resolveApp('src/wrapper/antd.js') ,
    // dialog
    'dialog/next' : resolveApp('src/dialog/next.js'),
    'dialog/antd' : resolveApp('src/dialog/antd.js'),
    'dialog/zent' : resolveApp('src/dialog/zent.js')
};

module.exports = entry;