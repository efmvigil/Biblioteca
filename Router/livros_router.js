const express = require('express');
const livrosController = require('../Controller/livros_controller');
const router = express.Router();

router.route('/').get(livrosController.listar).post(livrosController.inserir);

router
  .route('/:id')
  .get(livrosController.buscarPorId)
  .put(livrosController.atualizar)
  .delete(livrosController.deletar);

module.exports = router;
