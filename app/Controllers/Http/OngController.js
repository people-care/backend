"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Ong = use("App/Models/Ong");

/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with ongs
 */
class OngController {
  /**
   * Show a list of all ongs.
   * GET ongs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    const ongs = await Ong.query().fetch();
    return ongs;
  }

  /**
   * Create/save a new ong.
   * POST ongs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(["name", "whatsapp", "city", "uf"]);
    const user = await User.create({
      email: request.input("email"),
      password: request.input("password")
    });
    const ong = await Ong.create({ ...data, user_id: user.id });
    return response.status(201).json(ong);
  }

  /**
   * Display a single ong.
   * GET ongs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {}

  /**
   * Update ong details.
   * PUT or PATCH ongs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a ong with id.
   * DELETE ongs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = OngController;
