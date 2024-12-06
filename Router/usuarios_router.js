const express = require('express');
const usuariosController = require('../Controller/usuarios_controller');
const router = express.Router();

router
  .route('/')
  .get(usuariosController.listar)
  .post(usuariosController.inserir);

router
  .route('/:id')
  .get(usuariosController.buscarPorId)
  .put(usuariosController.atualizar)
  .delete(usuariosController.deletar);

module.exports = router;
