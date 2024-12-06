const usuariosRepository = require('../Repository/usuarios_repository');

function listar() {
  return usuariosRepository.listarUsuarios();
}

function buscarPorId(id) {
  const usuarioEncontrado = usuariosRepository.buscarUsuarioPorId(id);
  if (usuarioEncontrado) return usuarioEncontrado;
  else throw { id: 404, msg: 'Usuario com este id não existe' };
}

function inserir(usuario) {
  if (
    usuario.nome &&
    usuario.matricula &&
    usuario.email &&
    usuario.senha &&
    usuario.telefone
  ) {
    return usuariosRepository.inserirUsuario(usuario);
  } else {
    throw { id: 400, msg: 'Usuario com dados inválidos' };
  }
}

function atualizar(id, atualizacao) {
  if (usuariosRepository.buscarUsuarioPorId(id)) {
    if (
      atualizacao.nome &&
      atualizacao.matricula &&
      atualizacao.email &&
      atualizacao.senha &&
      atualizacao.telefone
    ) {
      return usuariosRepository.atualizarUsuario(id, atualizacao);
    } else throw { id: 400, msg: 'Atualização com dados inválidos' };
  } else throw { id: 404, msg: 'Usuario com este id não existe' };
}

function deletar(id) {
  const usuarioEncontrado = usuariosRepository.buscarUsuarioPorId(id);
  if (usuarioEncontrado) {
    usuariosRepository.deletarUsuario(usuarioEncontrado.id);
    return usuarioEncontrado;
  } else throw { id: 404, msg: 'usuario com este id não existe' };
}

module.exports = {
  listar,
  buscarPorId,
  inserir,
  atualizar,
  deletar,
};
