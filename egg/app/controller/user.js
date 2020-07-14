const { Controller } = require('egg')

class UserController extends Controller {
  async index() {
    this.ctx.body = await this.ctx.service.user.getAll()

    /* this.ctx.body = [
      { name: 'tom' },
      { name: 'jerry' }
    ] */
  }
}

module.exports = UserController