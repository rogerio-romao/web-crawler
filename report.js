function printReport(pages) {
    console.log('Printing report...');

    const sortedPages = sortPages(pages);

    sortedPages.forEach((page) => {
        console.log(`Found ${page[1]} internal links to ${page[0]}`);
    });
}

function sortPages(pages) {
    // GUARDS
    if (!pages) {
        throw new Error('No pages provided');
    }
    if (typeof pages !== 'object' || Array.isArray(pages)) {
        throw new Error('Pages must be an object');
    }
    if (Object.values(pages).some((value) => typeof value !== 'number')) {
        throw new Error('Object values must be numbers');
    }

    const pagesArray = Object.entries(pages);
    const sortedPages = pagesArray.sort((a, b) => b[1] - a[1]);
    return sortedPages;
}

module.exports = {
    printReport,
    sortPages,
};
