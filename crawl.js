//jsdom -->used to access dom apis
const { JSDOM } = require('jsdom')
async function crawlPage(baseURL, currentURL,pages){
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages
    }
    const normalizeCurrentURL = normalizeURL(currentURL)
    if(pages[normalizeCurrentURL] > 0){
        pages[normalizeCurrentURL]++
        return pages
    }
    pages[normalizeCurrentURL] = 1
    console.log(`actively crawling ${currentURL}`)
    try{
        const resp = await fetch(currentURL)
        if(resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page : ${currentURL}`)
            return pages
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log(`non html text received , content -type: ${contentType} on page : ${currentURL}`)
            return pages
        }
        const htmlBody = await resp.text()
        const nextURLs = getURLsFromHTML(htmlBody , baseURL)
        for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL,nextURL ,pages)
        }
        }catch(err){
            console.log(`error in fetch: ${err.message} , on page: ${currentURL}`)
        }
        return pages
}
function getURLsFromHTML(htmlBody , baseUrl){
    const url = []
    const dom = new JSDOM(htmlBody)
    const linkedElements = dom.window.document.querySelectorAll('a')
    for(const linkedElement of linkedElements){
        if(linkedElement.href.slice(0,1) === '/'){
            //relative
            try{
                const urlObj=new URL(`${baseUrl}${linkedElement.href}`)
                url.push(urlObj.href)
            }catch(err){
                console.log(`error with relative url : ${err.message}`)
            }
        }
        else{
            //absolute
            //console.log(linkedElement.href)
             try{
                const urlObj=new URL(linkedElement.href)
                url.push(linkedElement.href)
             }catch(err){
                console.log(`error with relative url : ${err.message}`)
             }
        }
    }
    return url
}

//input https://Boot.dev/path/  output boot.dev/path
function normalizeURL(urlString){
    //inbuilt func
    const urlObj = new URL(urlString)
    const hostPath= `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1);
    }
    return hostPath
}

module.exports ={
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}