const express = require("express");
const Router = express.Router();
const Ctrl = require("../controllers/");

Router.route("/:company_name")
  .all((req, res, next) => {
    next();
  })
  .get(Ctrl.fetchCompany);

Router.route("/")
  .all((req, res, next) => {
    next();
  })
  .get(Ctrl.fetch);
// .post()
// .patch()
// .delete();

module.exports = Router;
