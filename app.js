const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const livrosRouter = require('./Router/livros_router');
const usuariosRouter = require('./Router/usuarios_router');
const retiradasRouter = require('./Router/retiradas_router');

const PORTA = 5001;

app.use(express.json());

app.use('/api/livros', livrosRouter);

app.use('/api/usuarios', usuariosRouter);

app.use('/api/retiradas', retiradasRouter);

const servidor = app.listen(PORTA, () =>
  console.log(`Servidor executando na porta ${PORTA}`)
);

module.exports = { app, servidor };
