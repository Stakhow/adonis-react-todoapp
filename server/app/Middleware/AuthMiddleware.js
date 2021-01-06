/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

use('App/Models/User');

class AuthMiddleware {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth }, next) {
    try {
      await auth.check();
      return await next();
    } catch (e) {
      return response
        .status(401)
        .json({ status: 401, error: true, message: e.message });
    }
  }
}

module.exports = AuthMiddleware;
