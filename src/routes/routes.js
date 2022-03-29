const routes = require("express").Router();
const LojaController = require('../controllers/LojaController')
routes.get('/', LojaController.getAll);
module.exports = routes;
