const usuariosRepository = require('./usuarios_repository');

function listar() {
  return usuariosRepository.listarUsuarios();
}

function inserir(usuario) {
  if (
    usuario.nome &&
    usuario.matricula &&
    usuario.senha &&
    usuario.email &&
    usuario.telefone
  ) {
    return usuariosRepository.inserirUsuario(usuario);
  } else throw { id: 400, msg: 'Usuario com dados inválidos' };
}

function atualizar(id, atualizacao) {
  if (usuariosRepository.buscarUsuarioPorId(id)) {
    if (
      atualizacao.titulo &&
      atualizacao.autores &&
      atualizacao.ISBN &&
      atualizacao.anoPublicacao &&
      atualizacao.editora &&
      atualizacao.edicao
    ) {
      usuariosRepository.atualizarUsuario(id, atualizacao);
    } else throw { id: 400, msg: 'Atualização com dados inválidos' };
  } else throw { id: 404, msg: 'Usuario não encontrado' };
}

function deletar(id) {
  if (usuariosRepository.buscarUsuarioPorId(id)) {
    usuariosRepository.deletarUsuario(id);
  } else throw { id: 404, msg: 'Usuario não encontrado' };
}

module.exports = {
  listar,
  inserir,
  atualizar,
  deletar,
};
