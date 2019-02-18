const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');


const rootDir = process.cwd();
const destDir = path.join(rootDir, 'lib');
const wrapperDir = path.join(rootDir, 'lib/wrapper');

const files = glob.sync('*.*', { cwd: wrapperDir });
console.log('files', rootDir, destDir, wrapperDir, files);
const run = async () => {
    for (const file of files) {
        if (file !== 'index.scss') {
            const srcFile = path.resolve(wrapperDir, file);
            const destFile = path.resolve(destDir, file);
            await fs.copy(srcFile, destFile);
        }
    }
};

run();

