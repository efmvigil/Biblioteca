const livros_service = require('./livros_service');

app.get('/', (req, res) => {
  res.json(livros_service.listar());
});

app.post('/', (req, res) => {
  try {
    const novoLivro = livros_service.inserir(req.body);
    res.status(201).json(novoLivro);
  } catch (err) {
    res.status(err.id).json(err);
  }
});

app.put('/id:', (req, res) => {
  try {
    const livroAtualizado = livros_service.atualizar(req.params.id, req.body);
    res.json(livroAtualizado);
  } catch (err) {
    res.status(err.id).json(err);
  }
});

app.delete('/id:', (req, res) => {
  try {
    const livroDeletado = livros_service.deletar(req.params.id);
    res.json(livroDeletado);
  } catch (err) {
    res.status(err.id).json(err);
  }
});
