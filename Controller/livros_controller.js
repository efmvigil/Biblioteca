const livrosService = require('../Service/livros_service');

function listar(req, res) {
  res.json(livrosService.listar());
}

function buscarPorId(req, res) {
  try {
    const livroEncontrado = livrosService.buscarPorId(Number(req.params.id));
    res.json(livroEncontrado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function inserir(req, res) {
  try {
    const novoLivro = livrosService.inserir(req.body);
    res.status(201).json(novoLivro);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function atualizar(req, res) {
  try {
    const livroAtualizado = livrosService.atualizar(
      Number(req.params.id),
      req.body
    );
    res.json(livroAtualizado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function deletar(req, res) {
  try {
    const livroDeletado = livrosService.deletar(Number(req.params.id));
    res.json(livroDeletado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

module.exports = {
  listar,
  buscarPorId,
  inserir,
  atualizar,
  deletar,
};
