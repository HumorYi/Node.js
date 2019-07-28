const Router = require('koa-router');
const path = require('path');
const common = require('./common');

const page_types = {
  'banner': 'banner管理',
  'catalog': '类目管理',
  'article': '文章管理',
};

const getTableOption = (fields, reqFields, isSrcChange = false) => {
  let columns = [];
  let values = [];
  let src_changed = {};

  fields.forEach(field => {
    const { name, type } = field;
    const value = reqFields[name];

    columns.push(name);

    if (type == 'file') {
      if (isSrcChange && value && value.length && value[0].size) {
        src_changed[name] = true;
      }

      values.push(path.basename(value[0].path));
    }
    else if (type == 'date') {
      values.push(common.inputDbDate(value));
    }
    else {
      values.push(value);
    }
  });

  return {
    columns,
    values,
    src_changed,
  }
}

const delFile = (fields, UPLOAD_DIR, pathObj, src_changed) => {
  fields.filter(({ type, name }) => {
    return type === 'file' && (src_changed ? src_changed[name] : true)
  })
    .forEach(async ({ name }) => {
      await common.unlink(path.resolve(UPLOAD_DIR, pathObj[name]));
    });
}

module.exports = (fields, table, page_type, isDelFile = true, router_root = '/admin', template = 'table') => {
  let router = new Router();

  //通用
  router.get('/', async ctx => {
    const { HTTP_ROOT } = ctx.config;

    let datas = await ctx.db.select.all(table);

    fields.filter(({ type }) => type === 'select')
      .forEach(async field => {
        field.items = await ctx.db.query(field.from);
      })

    await ctx.render(`${router_root}/${template}`, {
      HTTP_ROOT,
      page_type,
      page_types,
      datas,
      fields
    })
  });

  router.post('/', async ctx => {
    let { HTTP_ROOT } = ctx.config;
    let { columns, values } = getTableOption(fields, ctx.request.fields);

    await ctx.db.insert.byColumns(table, columns, values);

    ctx.redirect(`${HTTP_ROOT}${router_root}/${page_type}`);
  });

  router.get('/delete/:id/', async ctx => {
    let { id } = ctx.params;
    let { UPLOAD_DIR, HTTP_ROOT } = ctx.config;

    let data = await ctx.db.select.byId(table, id);
    ctx.assert(data.length, 400, 'no data');

    isDelFile && delFile(fields, UPLOAD_DIR, data[0]);

    await ctx.db.delete.byId(table, id);

    ctx.redirect(`${HTTP_ROOT}${router_root}/${page_type}`);
  });

  router.get('/get/:id', async ctx => {
    let { id } = ctx.params;

    let rows = await ctx.db.select.byId(table, id);

    if (rows.length == 0) {
      ctx.body = { err: 1, msg: 'no this data' };
    } else {
      ctx.body = { err: 0, msg: 'success', data: rows[0] };
    }
  });

  router.post('/modify/:id/', async ctx => {
    let { id } = ctx.params;
    let { UPLOAD_DIR, HTTP_ROOT } = ctx.config;

    //获取原来的
    let rows = await ctx.db.select.byId(table, id);
    ctx.assert(rows.length, 400, 'no this data');

    let paths = {};
    fields.filter(({ type }) => type === 'file')
      .forEach(({ name }) => {
        paths[name] = rows[0][name];
      })

    let { columns, values, src_changed } = getTableOption(fields, ctx.request.fields, true);

    await ctx.db.update.byId(table, columns, values, id)

    isDelFile && delFile(fields, UPLOAD_DIR, paths, src_changed);

    ctx.redirect(`${HTTP_ROOT}${router_root}/${page_type}`);
  });

  return router;
};
