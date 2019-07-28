const tablelib = require('../../libs/table');

let router = tablelib(
  [
    { title: '标题', name: 'title', type: 'text' },
    { title: '图片', name: 'src', type: 'file' },
    { title: '链接', name: 'href', type: 'text' },
    { title: '序号', name: 'serial', type: 'number' },
  ],
  'banner_table',
  'banner'
);

router.prefix('/banner')

module.exports = router.routes()