const usuariosService = require('../Service/usuarios_service');

function listar(req, res) {
  res.json(usuariosService.listar());
}

function buscarPorId(req, res) {
  try {
    const usuarioEncontrado = usuariosService.buscarPorId(
      Number(req.params.id)
    );
    res.status(200).json(usuarioEncontrado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function inserir(req, res) {
  try {
    const novoUsuario = usuariosService.inserir(req.body);
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function atualizar(req, res) {
  try {
    const usuarioAtualizado = usuariosService.atualizar(
      Number(req.params.id),
      req.body
    );
    res.json(usuarioAtualizado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function deletar(req, res) {
  try {
    const usuarioDeletado = usuariosService.deletar(Number(req.params.id));
    res.json(usuarioDeletado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

module.exports = {
  listar,
  buscarPorId,
  inserir,
  atualizar,
  deletar,
};
