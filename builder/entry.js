const paths = require('./lib/paths')
const resolveApp = paths.resolveApp;

// lib/index.js;lib/wrapper/next.js;lib/dialog/next.js;lib/index.css;lib/wrapper/next.css;lib/dialog/next.css;

const entry = {
    'index' : resolveApp('src/index.jsx'),
    // wrapper
    'wrapper/next' : resolveApp('src/wrapper/next.jsx'),
    'wrapper/antd' : resolveApp('src/wrapper/antd.jsx') ,
    // dialog
    'dialog/next' : resolveApp('src/dialog/next.jsx'),
    'dialog/antd' : resolveApp('src/dialog/antd.jsx'),
    'dialog/zent' : resolveApp('src/dialog/zent.jsx')
};

module.exports = entry;