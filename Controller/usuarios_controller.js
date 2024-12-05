const usuarios_service = require('./usuarios_service');

app.get('/', (req, res) => {
  res.json(usuarios_service.listar());
});

app.post('/', (req, res) => {
  try {
    const novoUsuario = usuarios_service.inserir(req.body);
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(err.id).json(err);
  }
});

app.put('/id:', (req, res) => {
  try {
    const usuarioAtualizado = usuarios_service.atualizar(req.params.id, req.body);
    res.json(usuarioAtualizado);
  } catch (err) {
    res.status(err.id).json(err);
  }
});

app.delete('/id:', (req, res) => {
  try {
    const usuarioDeletado = usuarios_service.deletar(req.params.id);
    res.json(usuarioDeletado);
  } catch (err) {
    res.status(err.id).json(err);
  }
});
