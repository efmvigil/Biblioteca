const listaLivros = [];
let idLivros = 0;

function inserirLivro(livro) {
  livro.id = ++idLivros;
  listaLivros.push(livro);
  return livro;
}

function listarLivros() {
  return listaLivros;
}

function buscarLivroPorId(id) {
  const resultado = listaLivros.filter((livro) => livro.id === id);
  return resultado[0];
}

function atualizarLivro(id, atualizacao) {
  listaLivros[id - 1] = atualizacao;
  listaLivros[id - 1].id = id;
  return listaLivros[id - 1];
}

function deletarLivro(id) {
  listaLivros.splice(id - 1, 1);
  atribuirIDs();
}

function atribuirIDs() {
  idLivros = 0;
  listaLivros.forEach((livro) => (livro.id = ++idLivros));
}

module.exports = {
  listaLivros,
  inserirLivro,
  listarLivros,
  atualizarLivro,
  deletarLivro,
  buscarLivroPorId,
};
