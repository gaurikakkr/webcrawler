const { normalizeURL } = require('./crawl.js')
const { test,expect } = require('@jest/globals')

test( 'normalizeURL strip protocol' , ()=> {
    const input = 'https://blog.post.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.post.dev/path'
    expect(actual).toEqual(expected)
})

test( 'normalizeURL strip trailing slash' , ()=> {
    const input = 'https://blog.post.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.post.dev/path'
    expect(actual).toEqual(expected)
})

test( 'normalizeURL capitals' , ()=> {
    const input = 'https://BLOG.poSt.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.post.dev/path'
    expect(actual).toEqual(expected)
})

test( 'normalizeURL strip http' , ()=> {
    const input = 'http://blog.post.dev/path'

    const actual = normalizeURL(input)
    const expected = 'blog.post.dev/path'
    expect(actual).toEqual(expected)
})