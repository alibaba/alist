const chalk = require('chalk');
const libBase = require('./libBase');

libBase(process.cwd()).catch((err) => {
    console.error(chalk.red(err.stack || err));
    process.exit(1);
});