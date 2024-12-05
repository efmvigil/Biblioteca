const listaLivros = [];

function inserirLivro(livro) {
  listaLivros.push(livro);
}

function listarLivros() {
  return listaLivros;
}

function buscarLivroPorId(id) {
  return listaLivros[id];
}

function atualizarLivro(id, atualizacao) {
  listaLivros[id] = atualizacao;
  return listaLivros[id];
}

function deletarLivro(id) {
  listaLivros.splice(id, 1);
}

module.exports = {
  inserirLivro,
  listarLivros,
  atualizarLivro,
  deletarLivro,
  buscarLivroPorId,
};
