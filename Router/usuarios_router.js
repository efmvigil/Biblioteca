const express = require('express');
const usuariosController = require('../Controller/usuarios_controller');
const autenticarToken = require('../auth');
const router = express.Router();

router
  .route('/')
  .get(usuariosController.listar)
  .post(usuariosController.inserir)
  .put(autenticarToken, usuariosController.atualizar)
  .delete(autenticarToken, usuariosController.deletar);

router.route('/:id').get(usuariosController.buscarPorId);

router.route('/login').post(usuariosController.logar);

module.exports = router;
