import {Exception} from '@adonisjs/core/exceptions'
import {HttpContext} from '@adonisjs/core/http';

export default class UnAuthorizedException extends Exception {
  static status = 403

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({errors: [{message: error.message}]})
  }
}
