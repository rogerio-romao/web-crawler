const { argv } = require('node:process');

const { crawlPage } = require('./crawl');

async function main() {
    if (argv.length < 3) {
        console.error('No URL provided');
        process.exit(1);
    }
    if (argv.length > 3) {
        console.error('Too many arguments');
        process.exit(1);
    }
    const url = argv[2];

    const pages = await crawlPage(url, url, {});
    console.log(JSON.stringify(pages, null, 4));
    process.exit(0);
}

main();
