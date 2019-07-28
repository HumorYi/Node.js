const path = require('path')
let str = '/root/a/b/1.txt'
// 获取父目录
console.log(path.dirname(str));
// 获取扩展名
console.log(path.extname(str));
// 获取文件名
console.log(path.basename(str));
// 获取解析目录
console.log(path.resolve('/root/a/b', '../c', 'build', '..', 'strict'));
// 获取解析绝对路径，__dirname 当前运行绝对路径目录
console.log(path.resolve(__dirname, 'build'));


