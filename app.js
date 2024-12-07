const express = require('express');
const app = express();

const livrosRouter = require('./Router/livros_router');
const usuariosRouter = require('./Router/usuarios_router');
const retiradasRouter = require('./Router/retiradas_router');

const PORTA = 5000;

app.use(express.json());

app.use('/api/livros', livrosRouter);

app.use('/api/usuarios', usuariosRouter);

app.use('/api/retiradas', retiradasRouter);

app.listen(PORTA, () => console.log(`Servidor executando na porta ${PORTA}`));
