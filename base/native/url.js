const url = require('url')

let str = 'http://www.bing.com:8080/a/b/1.html?a=12&b=14'
let str1 = 'http://www.bing.com:8080/a/b/1.html?a=12&a=14&a=16'

console.log(url.parse(str, true));
console.log(url.parse(str1, true));
