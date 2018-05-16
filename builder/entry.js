const paths = require('./lib/paths')
const resolveApp = paths.resolveApp;

// lib/index.js;lib/wrapper/next.js;lib/dialog/next.js;lib/index.css;lib/wrapper/next.css;lib/dialog/next.css;

const entry = {
    'index' : [resolveApp('src/index.scss'), resolveApp('src/index.jsx')],
    // wrapper
    'wrapper/next' : [resolveApp('src/wrapper/next.scss'), resolveApp('src/wrapper/nextWrapper.jsx')],
    'wrapper/antd' : [resolveApp('src/wrapper/antd.scss'),resolveApp('src/wrapper/antdWrapper.jsx') ],
    // dialog
    'dialog/next' : [resolveApp('src/dialog/next.scss'), resolveApp('src/dialog/nextDialogForm.jsx')],
    'dialog/antd' : [resolveApp('src/dialog/antd.scss'), resolveApp('src/dialog/antdDialogForm.jsx')],
    'dialog/zent' : [resolveApp('src/dialog/zent.scss'), resolveApp('src/dialog/zentDialogForm.jsx')],
};

module.exports = entry;