const tablelib = require('../../libs/table');

let router = tablelib(
  [
    { title: '标题', name: 'title', type: 'text' },
  ],
  'catalog_table',
  'catalog'
);

router.prefix('/catalog')

module.exports = router.routes()