const fs = require('fs'); 
const fsExtra = require('fs-extra');
const gitbookParsers = require('gitbook-parsers');
const path = require('path');
const { rmdirSync, mkdir } = require('./utils');
const docsSummary = fs.readFileSync(path.join(__dirname, '../docs/summary.md'), 'utf-8');
const apiSummary = fs.readFileSync(path.join(__dirname, '../api/summary.md'), 'utf-8');
const examplesSummary = fs.readFileSync(path.join(__dirname, '../examples/summary.md'), 'utf-8');

const parser = gitbookParsers.get(".md");

const rootPath = process.cwd();
const srcPath = path.join(rootPath, 'src');
const docPath = path.join(rootPath, 'docs');
const publicDocPath = path.join(rootPath, 'public/docs');

const summaryArr = [
    { content: docsSummary, prefix: 'docs' },
    { content: apiSummary, prefix: 'api' },
    { content: examplesSummary, prefix: 'examples' }
];

summaryArr.forEach((summaryItem) => {
    const { content, prefix } = summaryItem;

    parser.summary(content).then(function(summary) {
        try {
            let summaryJSON = JSON.stringify(summary, null, 2);
            summaryJSON = summaryJSON.replace(/\.md/g, '');
            const smReg = new RegExp(`${prefix}\/`, 'g');
            summaryJSON = summaryJSON.replace(smReg, `/${prefix}?md=`);
            fs.writeFileSync(path.join(__dirname, `../src/${prefix}_summary.js`), 'export default ' + summaryJSON, 'utf-8');
    
            fsExtra.copySync(docPath, publicDocPath);
        } catch (e) {
            console.error('docs/summary.md解析出错，请检查', e);
        }
    });
});

// parser.summary(docsSummary).then(function(summary) {
//     try {
//         let summaryJSON = JSON.stringify(summary, null, 2);
//         summaryJSON = summaryJSON.replace(/\.md/g, '');
//         summaryJSON = summaryJSON.replace(/docs\//g, '/docs?md=');
//         fs.writeFileSync(path.join(__dirname, '../src/summary.js'), 'export default ' + summaryJSON, 'utf-8');

//         fsExtra.copySync(docPath, publicDocPath);
//     } catch (e) {
//         console.error('docs/summary.md解析出错，请检查', e);
//     }
// });