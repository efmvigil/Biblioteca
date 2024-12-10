const express = require('express');
const retiradasController = require('../Controller/retiradas_controller');
const autenticarToken = require('../auth');
const router = express.Router();

router.route('/').get(retiradasController.listarLivrosRetirados);

router
  .route('/:id')
  .post(autenticarToken, retiradasController.retirarLivro)
  .delete(autenticarToken, retiradasController.devolverLivro);

module.exports = router;
