const { app, servidor } = require('./app');
const request = require('supertest');

//Encerra o servidor após os testes
afterAll(() => {
  servidor.close();
});

describe('testes sobre o CRUD livros', () => {
  test('Deve retornar status 200 e response no formato json', async () => {
    const res = await request(app)
      .get('/api/livros')
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(res.statusCode).toEqual(200);
  });

  test('Deve retornar status 201 e o objeto correto ao criar um livro', async () => {
    const res = await request(app)
      .post('/api/livros')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .send({
        titulo: 'Livro 1',
        autores: 'Autor A',
        isbn: '978-3-16-148410-0 ',
        anoPublicacao: '2024',
        editora: 'Editora X',
        edicao: 1,
        valor: 50,
      });
    expect(Object.keys(res.body).length).toEqual(8);
    expect(res.body.titulo).toEqual('Livro 1');
    expect(res.body.edicao).toEqual(1);
    expect(res.statusCode).toEqual(201);
  });

  test('Deve retornar status 400 e a mensagem correta ao inserir um livro sem ano de publicação', async () => {
    const res = await request(app)
      .post('/api/livros')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .send({
        titulo: 'Livro 1',
        autores: 'Autor A',
        isbn: '978-3-16-148410-0 ',
        editora: 'Editora X',
        edicao: 1,
        valor: 50,
      });
    expect(Object.keys(res.body).length).toEqual(2);
    expect(res.body.msg).toEqual('Livro com dados inválidos');
    expect(res.statusCode).toEqual(400);
  });

  test('Deve retornar status 200 e o livro correto com id 1', async () => {
    const res = await request(app)
      .get('/api/livros/1')
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(Object.keys(res.body).length).toEqual(8);
    expect(res.body.titulo).toEqual('Livro 1');
    expect(res.body.edicao).toEqual(1);
    expect(res.statusCode).toEqual(200);
  });

  test('Deve retornar status 404 e a mensagem correta ao buscar livro com id inexistente', async () => {
    const res = await request(app)
      .get('/api/livros/1000')
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(Object.keys(res.body).length).toEqual(2);
    expect(res.body.msg).toEqual('Livro com este id não existe');
    expect(res.statusCode).toEqual(404);
  });

  test('Deve retornar status 200 e atualizar o livro com id 1 corretamente', async () => {
    const res = await request(app)
      .put('/api/livros/1')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .send({
        titulo: 'Livro 2',
        autores: 'Autor B',
        isbn: '978-3-16-148410-0 ',
        anoPublicacao: '2000',
        editora: 'Editora Z',
        edicao: 5,
        valor: 35,
      });
    expect(Object.keys(res.body).length).toEqual(8);
    expect(res.body.titulo).toEqual('Livro 2');
    expect(res.body.valor).toEqual(35);
    expect(res.body.isbn).toEqual('978-3-16-148410-0 ');
    expect(res.statusCode).toEqual(200);
  });

  test('Deve retornar status 400 e a mensagem correta ao atualizar sem passar o isbn do livro', async () => {
    const res = await request(app)
      .put('/api/livros/1')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .send({
        titulo: 'Livro 2',
        autores: 'Autor B',
        anoPublicacao: '2000',
        editora: 'Editora Z',
        edicao: 5,
        valor: 35,
      });
    expect(Object.keys(res.body).length).toEqual(2);
    expect(res.body.msg).toEqual('Atualização com dados inválidos');
    expect(res.statusCode).toEqual(400);
  });

  test('Deve retornar status 200 e o livro deletado corretamente', async () => {
    const res = await request(app)
      .delete('/api/livros/1')
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(Object.keys(res.body).length).toEqual(8);
    expect(res.body.titulo).toEqual('Livro 2');
    expect(res.body.id).toEqual(1);
    expect(res.statusCode).toEqual(200);
  });

  test('Deve retornar status 404 e a mensagem correta ao deletar livro com id inexistente', async () => {
    const res = await request(app)
      .get('/api/livros/1000')
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(Object.keys(res.body).length).toEqual(2);
    expect(res.body.msg).toEqual('Livro com este id não existe');
    expect(res.statusCode).toEqual(404);
  });
});
