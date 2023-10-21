const { sortPages } = require('./report.js')
const { test,expect } = require('@jest/globals')

test( 'normalizeURL strip protocol' , ()=> {
    const input ={
        'https://google.com/path': 1,
        'https://google.com': 2
    }
    const actual = sortPages(input)
    const expected =[
        ['https://google.com', 2],
        ['https://google.com/path', 1]
    ]
    expect(actual).toEqual(expected)
})