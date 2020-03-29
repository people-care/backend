"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(function() {
  Route.post("/login", "LoginController.store");
  Route.post("/ongs", "OngController.store");
  Route.get("/ongs", "OngController.index");
  Route.post("/incidents", "IncidentController.store");
  Route.get("/incidents", "IncidentController.index");
  Route.delete("/incidents/:id", "IncidentController.destroy");
}).prefix("api/v1");
