const { get } = require("mongoose")

module.exports = {
  async init(ctx, next) {
    const model = ctx.app.$model[ctx.params.list]

    if (model) {
      ctx.list = model
      await next()
    }
    else {
      ctx.body = 'no ' + model + ' model'
    }
  },
  async list(ctx) {
    ctx.body = await ctx.list.find({})
  },
  async get(ctx) {
    ctx.body = await ctx.list.findOne({ _id: ctx.params.id })
  },
  async create(ctx) {
    const ret = await ctx.list.create(ctx.request.body)
    ctx.body = ret
  },
  async update(ctx) {
    console.log(ctx.request.body)
    ctx.body = await ctx.list.updateOne({ _id: ctx.params.id }, ctx.request.body)
  },
  async del(ctx) {

    ctx.body = await ctx.list.deleteOne({ _id: ctx.params.id })
  },
  async page(ctx) {
    // TODO: 补充条件
    ctx.body = await ctx.list.find({ _id: ctx.params.id })
  },
}