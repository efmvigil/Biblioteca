const { listaLivros } = require('./livros_repository');
const { listaUsuarios } = require('./usuarios_repository');
const { format, parse, differenceInDays } = require('date-fns');

const livrosRetirados = [];

function listarLivrosRetirados() {
  return livrosRetirados;
}

function retirarLivro(usuario, livro) {
  const dataRetirada = new Date();
  const prazoDevolucao = new Date(dataRetirada);
  prazoDevolucao.setDate(prazoDevolucao.getDate() + 15);
  livro.dataRetirada = format(dataRetirada, 'dd/MM/yyyy');
  livro.prazoDevolucao = format(prazoDevolucao, 'dd/MM/yyyy');
  usuario.livrosRetirados.push(livro);
  livrosRetirados.push(livro);
  return livro;
}

function devolverLivro(usuario, livroRetirado) {
  const indexArrUsuario = usuario.livrosRetirados.findIndex(
    (livro) => livro === livroRetirado
  );
  const indexArrRetirados = livrosRetirados.findIndex(
    (livro) => livro === livroRetirado
  );
  usuario.livrosRetirados.splice(indexArrUsuario, 1);
  livrosRetirados.splice(indexArrRetirados, 1);

  const dataDevolucao = new Date();
  const resultado = calcularMulta(
    dataDevolucao,
    livroRetirado.prazoDevolucao,
    livroRetirado.valorLivro
  );
  usuario.multa += resultado.multa;
  return resultado;
}

function verificarLivroRetirado(idLivro) {
  return livrosRetirados.some((livro) => livro.id === idLivro);
}

function calcularMulta(dataDevolucao, prazoDevolucao, valorLivro = 50) {
  const prazoDevolucaoFormatado = parse(
    prazoDevolucao,
    'dd/MM/yyyy',
    new Date()
  );
  const diasAtraso = differenceInDays(prazoDevolucaoFormatado, dataDevolucao);
  const percentualBase = 0.01;
  const incrementoDiario = 0.001;
  if (diasAtraso >= 0)
    return {
      data_devolucao: format(dataDevolucao, 'dd/MM/yyyy'),
      dias_de_atraso: 0,
      multa: 0,
    };
  else {
    let multa = 0;
    for (let dia = 1; dia <= diasAtraso; dia++) {
      const percentualDia = percentualBase + incrementoDiario * dia;
      multa += valorLivro * percentualDia;
    }
    return {
      data_devolucao: format(dataDevolucao, 'dd/MM/yyyy'),
      dias_de_atraso: diasAtraso,
      multa: multa.toFixed(2),
    };
  }
}

module.exports = {
  listarLivrosRetirados,
  retirarLivro,
  devolverLivro,
  verificarLivroRetirado,
};
