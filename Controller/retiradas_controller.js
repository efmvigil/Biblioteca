const retiradasService = require('../Service/retiradas_service');

function listarLivrosRetirados(req, res) {
  res.json(retiradasService.listarLivrosRetirados());
}

function retirarLivro(req, res) {
  try {
    const livroRetirado = retiradasService.retirarLivro(
      req.usuario.id,
      Number(req.params.id)
    );
    res.json(livroRetirado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function devolverLivro(req, res) {
  try {
    const devolucao = retiradasService.devolverLivro(
      req.usuario.id,
      Number(req.params.id)
    );
    res.json(devolucao);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

module.exports = {
  listarLivrosRetirados,
  retirarLivro,
  devolverLivro,
};
