const { normalizeURL,getURLsFromHTML } = require('./crawl.js')
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

//test( 'getURLsFromHTML absolute' , ()=> {
//    const inputHTMLBody = `
//<html>
//    <body>
//        <b href="https://blog.post.dev/path/">
//            Boot.dev Blog
//        </b>
//    </body>
//</html>
//    `
//    const inputBaseURL = "https://blog.post.dev/path/"
//    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
//    const expected = ["https://blog.post.dev/path/"]
//    expect(actual).toEqual(expected)
//})

test( 'getURLsFromHTML relative' , ()=> {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">
            Boot.dev Blog
        </a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.post.dev"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["https://blog.post.dev/path/"]
    expect(actual).toEqual(expected)
})

test( 'getURLsFromHTML both aboloute and relative' , ()=> {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path1/">
            Boot.dev Blog
        </a>
        <a href="https://blog.post.dev/path2/">
                    Boot.dev Blog
        </a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.post.dev"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["https://blog.post.dev/path1/","https://blog.post.dev/path2/"]
    expect(actual).toEqual(expected)
})

test( 'getURLsFromHTML invalid' , ()=> {
    const inputHTMLBody = `
<html>
    <body>
        <a href="INVALID">
            INVALID
        </a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.post.dev"
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})