const paths = require('./lib/paths')
const resolveApp = paths.resolveApp;

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