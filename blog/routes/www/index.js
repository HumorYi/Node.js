const Router = require('koa-router');

const common = require('../../libs/common')

let router = new Router();

router.prefix('/');

router.get('/', async ctx => {
  let { HTTP_ROOT } = ctx.config;

  let banners = await ctx.db.query("SELECT * FROM banner_table ORDER BY serial ASC");
  let catalogs = await ctx.db.select.all("catalog_table");
  let articles = await ctx.db.query(`
    SELECT
    *,
    article_table.title AS article_title,
    catalog_table.title AS catalog_title,
    article_table.ID AS article_ID
    FROM article_table
    LEFT JOIN catalog_table ON article_table.catalog_ID=catalog_table.ID
    ORDER BY article_table.created_time DESC LIMIT 10
  `);

  articles.forEach(article => {
    let oDate = common.outputDbDate(article.created_time);

    article.created_time = common.outputDate(oDate);
  });


  await ctx.render('www/index', {
    HTTP_ROOT,
    banners,
    catalogs,
    articles
  });
});

router.get('/list/:id/', async ctx => {
  let { id } = ctx.params;
  let { HTTP_ROOT } = ctx.config;

  let rows = await ctx.db.select.byId('catalog_table', id);
  let articles = await ctx.db.query(`
    SELECT
    *,
    article_table.title AS article_title,
    catalog_table.title AS catalog_title,
    article_table.ID AS article_ID
    FROM article_table
    LEFT JOIN catalog_table ON article_table.catalog_ID=catalog_table.ID
    WHERE article_table.catalog_ID=${id}
    ORDER BY article_table.created_time DESC LIMIT 10
  `);

  articles.forEach(article => {
    let oDate = common.outputDbDate(article.created_time);

    article.created_time = common.outputDate(oDate);
  });

  await ctx.render('www/list', {
    HTTP_ROOT,
    catalog_title: rows[0].title,
    articles
  });
});

router.get('/article/:id/', async ctx => {
  let { id } = ctx.params;
  let { HTTP_ROOT } = ctx.config;

  let rows = await ctx.db.select.byId("article_table", id);
  let article = rows[0];

  let oDate = common.outputDbDate(article.created_time);

  article.created_time = common.outputDate(oDate);

  await ctx.render('www/article', {
    HTTP_ROOT,
    article
  });
});

module.exports = router.routes();
