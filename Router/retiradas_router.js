const express = require('express');
const retiradasController = require('../Controller/retiradas_controller');
const router = express.Router();

router.route('/').get(retiradasController.listarLivrosRetirados);

router
  .route('/:id')
  .post(retiradasController.retirarLivro)
  .delete(retiradasController.devolverLivro);

module.exports = router;
