const { argv } = require('node:process');

const { crawlPage } = require('./crawl');

function main() {
    if (argv.length < 3) {
        console.error('No URL provided');
        process.exit(1);
    }
    if (argv.length > 3) {
        console.error('Too many arguments');
        process.exit(1);
    }
    const url = argv[2];

    crawlPage(url);
}

main();
