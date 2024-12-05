const livros_service = require('./livros_service');

function listar(req, res) {
  res.json(livros_service.listar());
};

function inserir(req, res) {
  try {
    const novoLivro = livros_service.inserir(req.body);
    res.status(201).json(novoLivro);
  } catch (err) {
    res.status(err.id).json(err);
  }
};

function atualizar(req, res) {
  try {
    const livroAtualizado = livros_service.atualizar(req.params.id, req.body);
    res.json(livroAtualizado);
  } catch (err) {
    res.status(err.id).json(err);
  }
};

function deletar(req, res) {
  try {
    const livroDeletado = livros_service.deletar(req.params.id);
    res.json(livroDeletado);
  } catch (err) {
    res.status(err.id).json(err);
  }
};

module.exports = {
  listar,
  inserir,
  atualizar,
  deletar
}