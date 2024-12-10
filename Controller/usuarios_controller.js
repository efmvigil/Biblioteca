const usuariosService = require('../Service/usuarios_service');

function listar(req, res) {
  res.json(usuariosService.listar());
}

function buscarPorId(req, res) {
  try {
    const usuarioEncontrado = usuariosService.buscarPorId(
      Number(req.params.id)
    );
    res.json(usuarioEncontrado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function inserir(req, res) {
  try {
    const novoUsuario = await usuariosService.registrarUsuario(req.body);
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

async function logar(req, res) {
  try {
    const result = await usuariosService.logarUsuario(req.body);
    res.send(result);
  } catch (err) {
    res.status(err.id).send(err);
  }
}

async function atualizar(req, res) {
  try {
    const usuarioAtualizado = await usuariosService.atualizar(
      req.usuario.id,
      req.body
    );
    res.json(usuarioAtualizado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function deletar(req, res) {
  try {
    const usuarioDeletado = usuariosService.deletar(Number(req.usuario.id));
    res.json(usuarioDeletado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

module.exports = {
  listar,
  buscarPorId,
  inserir,
  logar,
  atualizar,
  deletar,
};
