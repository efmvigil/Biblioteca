const livrosRepository = require('./livros_repository');

function listar() {
  return livrosRepository.listarLivros();
}

function buscarPorId(id) {
  const livroEncontrado = livrosRepository.buscarLivroPorId(id)
  if (livroEncontrado) return livroEncontrado
  else throw {id: 404, msg: 'Livro com este id não existe'}
}

function inserir(livro) {
  if (
    livro.titulo &&
    livro.autores &&
    livro.ISBN &&
    livro.anoPublicacao &&
    livro.editora &&
    livro.edicao
  ) {
    return livrosRepository.inserirLivro(livro);
  } else throw { id: 400, msg: 'Livro com dados inválidos' };
}

function atualizar(id, atualizacao) {
  if (livrosRepository.buscarLivroPorId(id)) {
    if (
      atualizacao.titulo &&
      atualizacao.autores &&
      atualizacao.ISBN &&
      atualizacao.anoPublicacao &&
      atualizacao.editora &&
      atualizacao.edicao
    ) {
      livrosRepository.atualizarLivro(id, atualizacao);
    } else throw { id: 400, msg: 'Atualização com dados inválidos' };
  } else throw { id: 404, msg: 'Livro com este id não existe' };
}

function deletar(id) {
  if (livrosRepository.buscarLivroPorId(id)) {
    livrosRepository.deletarLivro(id);
  } else throw { id: 404, msg: 'Livro com este id não existe' };
}

module.exports = {
  listar,
  inserir,
  atualizar,
  deletar,
};
