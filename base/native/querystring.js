const querystring = require('querystring')

console.log(querystring.parse('a=12&b=14&c=16'));
console.log(querystring.stringify({ a: 12, b: 14, c: 16 }));
