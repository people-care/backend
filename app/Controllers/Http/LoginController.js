"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

class LoginController {
  /**
   * Generates a JWT token.
   * POST login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store({ auth, request }) {
    const { email, password } = request.all();
    const data = await auth.attempt(email, password);
    return data;
  }
}

module.exports = LoginController;
