const { test, expect, describe } = require('@jest/globals');

const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
const { htmlString1, htmlString2, htmlString3 } = require('./data.js');

describe('normalizeURL', () => {
    test('should be defined', () => {
        expect(normalizeURL('http://example.com')).toBeDefined();
    });
    test('fails if no url is provided', () => {
        expect(() => normalizeURL()).toThrow('No URL provided');
    });
    test('fails if url is not a string', () => {
        expect(() => normalizeURL(123)).toThrow('URL must be a string');
    });
    test('fails if url is not valid', () => {
        expect(() => normalizeURL('this is just a string')).toThrow(
            'Invalid URL'
        );
    });
    test('should return normalized url with no trailing "/"', () => {
        expect(normalizeURL('http://example.com')).toBe('example.com');
    });
    test('should return normalized url when given path', () => {
        expect(normalizeURL('http://example.com/this/is/a/path')).toBe(
            'example.com/this/is/a/path'
        );
    });
    test('protocol and query params do not affect it', () => {
        expect(normalizeURL('ftp://example.com/path?query=string')).toBe(
            'example.com/path'
        );
    });
});

describe('getURLsFromHTML', () => {
    test('should be defined', () => {
        expect(
            getURLsFromHTML(
                '<html><body>test</body></html>',
                'https://www.example.com'
            )
        ).toBeDefined();
    });
    test('fails if no htmlBody is provided', () => {
        expect(() => getURLsFromHTML()).toThrow('No htmlBody provided');
    });
    test('fails if no baseURL is provided', () => {
        expect(() => getURLsFromHTML('<html><body>test</body></html>')).toThrow(
            'No baseURL provided'
        );
    });
    test('fails if htmlBody is not a string', () => {
        expect(() => getURLsFromHTML(123, 'test')).toThrow(
            'htmlBody must be a string'
        );
    });
    test('fails if baseURL is not a string', () => {
        expect(() => getURLsFromHTML('test', 123)).toThrow(
            'baseURL must be a string'
        );
    });
    test('returns 3 results with base url', () => {
        expect(getURLsFromHTML(htmlString1, 'http://www.base.url')).toEqual([
            'http://www.base.url/google',
            'http://www.base.url/github',
            'http://www.base.url/microsoft',
        ]);
    });
    test('returns 5 results, empty base url', () => {
        expect(getURLsFromHTML(htmlString2, '')).toEqual([
            'https://www.google.com',
            'https://www.github.com',
            'https://www.microsoft.com',
            'https://www.apple.com',
            'https://www.amazon.com',
        ]);
    });
    test('return empty array, html with no links', () => {
        expect(getURLsFromHTML(htmlString3, 'http://example.com')).toEqual([]);
    });
    test('return empty array, non html string', () => {
        expect(
            getURLsFromHTML('this is not html', 'http://example.com')
        ).toEqual([]);
    });
});
