const { test, expect, describe } = require('@jest/globals');

const { sortPages } = require('./report');

describe('sortPages', () => {
    test('should be defined', () => {
        expect(sortPages({ 'example.com': 1 })).toBeDefined();
    });
    test('throws if no pages are provided', () => {
        expect(() => sortPages()).toThrow('No pages provided');
    });
    test('throws if pages is not an object', () => {
        expect(() => sortPages([])).toThrow('Pages must be an object');
    });
    test('object values must be numbers', () => {
        expect(() => sortPages({ 'example.com': '1' })).toThrow(
            'Object values must be numbers'
        );
    });
    test('should sort pages by number of links', () => {
        const pages = {
            'example.com': 1,
            'example.com/path': 2,
            'example.com/path2': 3,
        };
        expect(sortPages(pages)).toStrictEqual([
            ['example.com/path2', 3],
            ['example.com/path', 2],
            ['example.com', 1],
        ]);
    });
});
