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

async function crawlPage(baseURL, currentURL, pages) {
    // GUARDS
    const baseURLDomain = new URL(baseURL).hostname;
    const currentURLDomain = new URL(currentURL).hostname;
    if (baseURLDomain !== currentURLDomain) {
        console.error('Base and Current URLs do not belong to the same domain');
        return pages;
    }

    const normalizedURL = normalizeURL(currentURL);
    if (pages[normalizedURL]) {
        pages[normalizedURL]++;
        return pages;
    } else if (normalizedURL !== baseURL) {
        pages[normalizedURL] = 1;
    } else {
        pages[normalizedURL] = 0;
    }

    console.log(`Crawling ${normalizedURL}...`);

    // Fetch the page
    let html = '';
    try {
        const response = await fetch(currentURL);
        if (!response.ok) {
            throw new Error(`Failed to fetch page: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType.includes('text/html')) {
            throw new Error('Not an HTML page');
        }
        html = await response.text();
    } catch (error) {
        console.error(`Failed to crawl ${currentURL}: ${error.message}`);
        return;
    }

    // Get the links
    try {
        const links = getURLsFromHTML(html, baseURL);
        for (const link of links) {
            await crawlPage(baseURL, link, pages);
        }
    } catch (error) {
        console.error(
            `Failed to get links from ${normalizedURL}: ${error.message}`
        );
        return;
    }

    console.log(`Crawling ${normalizedURL} complete`);
    return pages;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
};
