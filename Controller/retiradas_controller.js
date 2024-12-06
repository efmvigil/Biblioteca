const retiradasService = require('../Service/retiradas_service');

function listarLivrosRetirados(req, res) {
  res.json(retiradasService.listarLivrosRetirados());
}

function retirarLivro(req, res) {
  try {
    const livroRetirado = retiradasService.retirarLivro(
      req.body.id,
      Number(req.params.id)
    );
    res.json(livroRetirado);
  } catch (err) {
    res.status(err.id).json(err);
  }
}

function devolverLivro() {}

module.exports = {
  listarLivrosRetirados,
  retirarLivro,
  devolverLivro,
};
