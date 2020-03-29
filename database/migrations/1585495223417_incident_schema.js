"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class IncidentSchema extends Schema {
  up() {
    this.create("incidents", table => {
      table.increments();
      table
        .integer("ong_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("ongs");
      table.string("title", 80).notNullable();
      table.string("description").notNullable();
      table.decimal("value").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("incidents");
  }
}

module.exports = IncidentSchema;
