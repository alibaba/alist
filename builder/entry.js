const paths = require('./lib/paths');

const { resolveApp } = paths;

const entry = {
    index: resolveApp('src/index.js'),
    // wrapper
    'wrapper/next': resolveApp('src/wrapper/next.jsx'),
    'wrapper/antd': resolveApp('src/wrapper/antd.jsx'),
    // dialog
    'dialog/next': resolveApp('src/dialog/next.jsx'),
    'dialog/antd': resolveApp('src/dialog/antd.jsx'),
    'dialog/zent': resolveApp('src/dialog/zent.jsx'),
};

module.exports = entry;
