const fs = require('fs'); 
const gitbookParsers = require('gitbook-parsers');
const path = require('path');
const docsSummary = fs.readFileSync(path.join(__dirname, '../docs/summary.md'), 'utf-8');
const apiSummary = fs.readFileSync(path.join(__dirname, '../api/summary.md'), 'utf-8');
const demoSummary = fs.readFileSync(path.join(__dirname, '../demo/summary.md'), 'utf-8');

const parser = gitbookParsers.get(".md");
const summaryArr = [
    { content: docsSummary, prefix: 'docs' },
    { content: apiSummary, prefix: 'api' },
    { content: demoSummary, prefix: 'demo' }
];

const i18nSummary = (summary) => {
    if (summary.chapters) {
        summary.chapters = summary.chapters.map((item) => {
            if (item.title && item.title.indexOf('|') !== -1) {
                const splitName = item.title.split('|');
                item.title = splitName[0];
                item.enTitle = splitName[1];
            } else {
                item.enTitle = item.title;
            }

            if (Array.isArray(item.articles)) {                
                item.articles = item.articles.map((articleItem) => {
                    if (articleItem.title && articleItem.title.indexOf('|') !== -1) {
                        const splitName = articleItem.title.split('|');
                        articleItem.title = splitName[0];
                        articleItem.enTitle = splitName[1];
                    } else {
                        articleItem.enTitle = articleItem.title;
                    }

                    return articleItem;
                });
            }

            return item;
        });
    }

    return summary;
}

summaryArr.forEach((summaryItem) => {
    const { content, prefix } = summaryItem;

    parser.summary(content).then(function(summary) {
        summary = i18nSummary(summary);
        try {
            let summaryJSON = JSON.stringify(summary, null, 2);
            summaryJSON = summaryJSON.replace(/\.md/g, '');
            const smReg = new RegExp(`${prefix}\/`, 'g');
            summaryJSON = summaryJSON.replace(smReg, `/${prefix}?md=`);
            fs.writeFileSync(path.join(__dirname, `../src/${prefix}_summary.js`), 'export default ' + summaryJSON, 'utf-8');
        } catch (e) {
            console.error('docs/summary.md解析出错，请检查', e);
        }
    });
});