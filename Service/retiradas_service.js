const retiradasRepository = require('../Repository/retiradas_repository');
const livrosRepository = require('../Repository/livros_repository');
const usuariosRepository = require('../Repository/usuarios_repository');

function listarLivrosRetirados() {
  return retiradasRepository.listarLivrosRetirados();
}

function retirarLivro(idUsuario, idLivro) {
  const usuario = usuariosRepository.buscarUsuarioPorId(idUsuario);
  const livro = livrosRepository.buscarLivroPorId(idLivro);

  if (livro) {
    if (usuario.livrosRetirados.length < 3) {
      if (!retiradasRepository.verificarLivroRetirado(idLivro)) {
        return retiradasRepository.retirarLivro(usuario, livro);
      } else throw { id: 409, msg: 'Livro indisponivel para retirada' };
    } else
      throw {
        id: 409,
        msg: 'Não é possivel retirar mais de 3 livros ao mesmo tempo',
      };
  } else throw { id: 404, msg: 'Livro com este id não existe' };
}

function devolverLivro(idUsuario, idLivroRetirado) {
  const usuario = usuariosRepository.buscarUsuarioPorId(idUsuario);
  const livro = livrosRepository.buscarLivroPorId(idLivroRetirado);

  if (livro) {
    return retiradasRepository.devolverLivro(usuario, livro);
  } else {
    throw { id: 404, msg: 'Livro retirado com este id não existe' };
  }
}

module.exports = {
  listarLivrosRetirados,
  retirarLivro,
  devolverLivro,
};
