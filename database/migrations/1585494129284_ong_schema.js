"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OngSchema extends Schema {
  up() {
    this.create("ongs", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table.string("name", 80).notNullable();
      table.string("whatsapp", 30).notNullable();
      table.string("city", 80).notNullable();
      table.string("uf", 2).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("ongs");
  }
}

module.exports = OngSchema;
