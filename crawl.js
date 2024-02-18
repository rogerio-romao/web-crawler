const { JSDOM } = require('jsdom');

function normalizeURL(url) {
    // GUARDS
    if (!url) {
        throw new Error('No URL provided');
    }
    if (typeof url !== 'string') {
        throw new Error('URL must be a string');
    }
    if (!URL.canParse(url)) {
        throw new Error('Invalid URL');
    }

    const parsedURL = new URL(url);
    const pathnameIsEmpty = parsedURL.pathname === '/';
    let normalized = `${
        parsedURL.hostname + (pathnameIsEmpty ? '' : parsedURL.pathname)
    }`;
    return normalized;
}

function getURLsFromHTML(htmlBody, baseURL) {
    // GUARDS
    if (htmlBody == null) {
        throw new Error('No htmlBody provided');
    }
    if (baseURL == null) {
        throw new Error('No baseURL provided');
    }
    if (typeof htmlBody !== 'string') {
        throw new Error('htmlBody must be a string');
    }
    if (typeof baseURL !== 'string') {
        throw new Error('baseURL must be a string');
    }

    const dom = new JSDOM(htmlBody);
    const links = [...dom.window.document.querySelectorAll('a')];
    const mappedLinks = links.map((link) => {
        const href = link.getAttribute('href');
        return `${baseURL}${href}`;
    });
    return mappedLinks;
}

async function crawlPage(url) {
    console.log(`Crawling ${url}...`);

    // Fetch the page
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch page: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType.includes('text/html')) {
            throw new Error('Not an HTML page');
        }
        const html = await response.text();
        console.log(html);
    } catch (error) {
        console.error(`Failed to crawl ${url}: ${error.message}`);
        return;
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
};
