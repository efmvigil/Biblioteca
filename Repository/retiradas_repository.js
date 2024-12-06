const { listaLivros } = require('./livros_repository');
const { listaUsuarios } = require('./usuarios_repository');

const livrosRetirados = [];

function listarLivrosRetirados() {
  return livrosRetirados;
}

function retirarLivro(usuario, livro) {
  usuario.livrosRetirados.push(livro);
  livrosRetirados.push(livro);
  return livro;
}

function verificarLivroRetirado(idLivro) {
  return livrosRetirados.some((livro) => livro.id === idLivro);
}

module.exports = {
  listarLivrosRetirados,
  retirarLivro,
  verificarLivroRetirado,
};
