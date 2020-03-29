"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Incident = use("App/Models/Incident");

/**
 * Resourceful controller for interacting with incidents
 */
class IncidentController {
  /**
   * Show a list of all incidents.
   * GET incidents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ auth, request, response }) {
    const { page = 1 } = request.get();
    const limit = 5;
    const user = await auth.getUser();
    const ong = await user.ong().fetch();
    const incidents = await Incident.query()
      .where("ong_id", ong.id)
      .paginate(page, limit);
    return incidents;
  }

  /**
   * Create/save a new incident.
   * POST incidents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const user = await auth.getUser();
    const ong = await user.ong().fetch();
    const data = request.only(["title", "description", "value"]);
    const incident = await Incident.create({ ...data, ong_id: ong.id });
    return response.status(201).json(incident);
  }

  /**
   * Display a single incident.
   * GET incidents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ auth, params, request, response }) {}

  /**
   * Update incident details.
   * PUT or PATCH incidents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a incident with id.
   * DELETE incidents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ auth, params, request, response }) {
    const { id } = params;
    const user = await auth.getUser();
    const ong = await user.ong().fetch();
    const incident = await Incident.query()
      .where("ong_id", ong.id)
      .where("id", id)
      .first();

    if (!incident) {
      return response
        .status(404)
        .json({ message: `Resource with ID ${id} not found` });
    }

    incident.delete();

    return incident;
  }
}

module.exports = IncidentController;
