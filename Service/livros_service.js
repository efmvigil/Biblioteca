const livrosRepository = require('../Repository/livros_repository');

function listar() {
  return livrosRepository.listarLivros();
}

function buscarPorId(id) {
  const livroEncontrado = livrosRepository.buscarLivroPorId(id);
  if (livroEncontrado) return livroEncontrado;
  else throw { id: 404, msg: 'Livro com este id não existe' };
}

function inserir(livro) {
  if (
    livro.titulo &&
    livro.autores &&
    livro.isbn &&
    livro.anoPublicacao &&
    livro.editora &&
    livro.edicao &&
    livro.valor
  ) {
    return livrosRepository.inserirLivro(livro);
  } else {
    throw { id: 400, msg: 'Livro com dados inválidos' };
  }
}

function atualizar(id, atualizacao) {
  if (livrosRepository.buscarLivroPorId(id)) {
    if (
      atualizacao.titulo &&
      atualizacao.autores &&
      atualizacao.isbn &&
      atualizacao.anoPublicacao &&
      atualizacao.editora &&
      atualizacao.edicao &&
      atualizacao.valor
    ) {
      return livrosRepository.atualizarLivro(id, atualizacao);
    } else throw { id: 400, msg: 'Atualização com dados inválidos' };
  } else throw { id: 404, msg: 'Livro com este id não existe' };
}

function deletar(id) {
  const livroEncontrado = livrosRepository.buscarLivroPorId(id);
  if (livroEncontrado) {
    livrosRepository.deletarLivro(livroEncontrado.id);
    return livroEncontrado;
  } else throw { id: 404, msg: 'Livro com este id não existe' };
}

module.exports = {
  listar,
  buscarPorId,
  inserir,
  atualizar,
  deletar,
};
