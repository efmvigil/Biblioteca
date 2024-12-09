const retiradasService = require('./retiradas_service');
const retiradasRepository = require('../Repository/retiradas_repository');
const livrosRepository = require('../Repository/livros_repository');
const usuariosRepository = require('../Repository/usuarios_repository');

jest.mock('../Repository/retiradas_repository');
jest.mock('../Repository/livros_repository');
jest.mock('../Repository/usuarios_repository');

// Teste da função listarLivrosRetirados
test('Deve retornar toda a lista de livros retirados', () => {
  const mockLivros = [
    { id: 1, titulo: 'Livro  1', autor: 'Autor A' },
    { id: 2, titulo: 'Livro 2', autor: 'Autor D' },
    { id: 3, titulo: 'Livro 3', autor: 'Autor C' },
  ];

  retiradasRepository.listarLivrosRetirados.mockReturnValue(mockLivros);
  const resultado = retiradasService.listarLivrosRetirados();
  expect(resultado).toEqual(mockLivros);
  expect(retiradasRepository.listarLivrosRetirados).toHaveBeenCalledTimes(1);
});

// Cenário de sucesso para a função retirarLivro
test('Deve chamar todas as funções corretamente e retornar o objeto contendo o livro retirado', () => {
  const mockUsuario = {
    id: 1,
    livrosRetirados: [{ id: 1, titulo: 'Livro  1', autor: 'Autor A' }],
  };
  const mockLivro = { id: 2, titulo: 'Livro 2', autor: 'Autor B' };

  livrosRepository.buscarLivroPorId.mockReturnValue(mockLivro);
  usuariosRepository.buscarUsuarioPorId.mockReturnValue(mockUsuario);
  retiradasRepository.verificarLivroRetirado.mockReturnValue(false);
  retiradasRepository.retirarLivro.mockReturnValue({
    ...mockLivro,
    dataRetirada: '01/12/2024',
    prazoDevolucao: '16/12/2024',
  });

  const resultado = retiradasService.retirarLivro(mockUsuario.id, mockLivro.id);
  expect(resultado).toEqual({
    ...mockLivro,
    dataRetirada: '01/12/2024',
    prazoDevolucao: '16/12/2024',
  });
  expect(retiradasRepository.retirarLivro).toHaveBeenCalledWith(
    mockUsuario,
    mockLivro
  );
  expect(livrosRepository.buscarLivroPorId).toHaveBeenCalledWith(mockLivro.id);
  expect(usuariosRepository.buscarUsuarioPorId).toHaveBeenCalledWith(
    mockUsuario.id
  );
  expect(retiradasRepository.verificarLivroRetirado).toHaveBeenCalledWith(
    mockLivro.id
  );
});

//Cenário de exceção para a função retirarLivro: livro com id inexistente
test('Deve lançar o erro 404 corretamente', () => {
  const mockUsuario = {
    id: 1,
    livrosRetirados: [{ id: 1, titulo: 'Livro  1', autor: 'Autor A' }],
  };
  const mockLivro = { id: 1000, titulo: 'Livro 2', autor: 'Autor B' };

  usuariosRepository.buscarUsuarioPorId.mockReturnValue(mockUsuario);
  livrosRepository.buscarLivroPorId.mockReturnValue(undefined);

  try {
    retiradasService.retirarLivro(mockUsuario.id, mockLivro.id);
  } catch (err) {
    expect(err).toEqual({
      id: 404,
      msg: 'Livro com este id não existe',
    });
  }
  expect(livrosRepository.buscarLivroPorId).toHaveBeenCalledWith(mockLivro.id);
  expect(usuariosRepository.buscarUsuarioPorId).toHaveBeenCalledWith(
    mockUsuario.id
  );
});

//Cenário de exceção para a função retirarLivro: usuario já retirou 3 livros
test('Deve lançar o erro 409 corretamente', () => {
  const mockUsuario = {
    id: 1,
    livrosRetirados: [
      { id: 1, titulo: 'Livro  1', autor: 'Autor A' },
      { id: 2, titulo: 'Livro 2', autor: 'Autor B' },
      { id: 3, titulo: 'Livro 3', autor: 'Autor C' },
    ],
  };
  const mockLivro = { id: 4, titulo: 'Livro 4', autor: 'Autor D' };

  usuariosRepository.buscarUsuarioPorId.mockReturnValue(mockUsuario);
  livrosRepository.buscarLivroPorId.mockReturnValue(mockLivro);

  try {
    retiradasService.retirarLivro(mockUsuario.id, mockLivro.id);
  } catch (err) {
    expect(err).toEqual({
      id: 409,
      msg: 'Não é possivel retirar mais de 3 livros ao mesmo tempo',
    });
  }
});

//Cenário de exceção para a função retirarLivro: livro já retirado
test('Deve lançar o erro 409 corretamente', () => {
  const mockUsuario = {
    id: 1,
    livrosRetirados: [{ id: 1, titulo: 'Livro  1', autor: 'Autor A' }],
  };
  const mockLivro = { id: 2, titulo: 'Livro 2', autor: 'Autor B' };

  usuariosRepository.buscarUsuarioPorId.mockReturnValue(mockUsuario);
  livrosRepository.buscarLivroPorId.mockReturnValue(mockLivro);

  retiradasRepository.verificarLivroRetirado.mockReturnValue(true);

  try {
    retiradasService.retirarLivro(mockUsuario.id, mockLivro.id);
  } catch (err) {
    expect(err).toEqual({ id: 409, msg: 'Livro indisponivel para retirada' });
  }

  expect(retiradasRepository.verificarLivroRetirado).toHaveBeenCalledWith(
    mockLivro.id
  );
});

//Cenário de sucesso para a função devolverLivro
test('Deve chamar todas a funções corretamente e retornar o objeto contendo as informações da devolução', () => {
  const mockUsuario = {
    id: 1,
    livrosRetirados: [{ id: 1, titulo: 'Livro  1', autor: 'Autor A' }],
  };
  const mockLivro = { id: 2, titulo: 'Livro 2', autor: 'Autor B' };

  usuariosRepository.buscarUsuarioPorId.mockReturnValue(mockUsuario);
  livrosRepository.buscarLivroPorId.mockReturnValue(mockLivro);

  retiradasRepository.devolverLivro.mockReturnValue({
    data_devolucao: '16/12/2024',
    dias_de_atraso: 0,
    multa: 0,
  });

  const resultado = retiradasService.devolverLivro(
    mockUsuario.id,
    mockLivro.id
  );

  expect(resultado).toEqual({
    data_devolucao: '16/12/2024',
    dias_de_atraso: 0,
    multa: 0,
  });

  expect(livrosRepository.buscarLivroPorId).toHaveBeenCalledWith(mockLivro.id);
  expect(usuariosRepository.buscarUsuarioPorId).toHaveBeenCalledWith(
    mockUsuario.id
  );

  expect(retiradasRepository.devolverLivro).toHaveBeenCalledWith(
    mockUsuario,
    mockLivro
  );
});

//Cenário de exceção para a função devolverLivro: livro com id inexistente
test('Deve lançar o erro 404 corretamente', () => {
  const mockUsuario = {
    id: 1,
    livrosRetirados: [{ id: 1, titulo: 'Livro  1', autor: 'Autor A' }],
  };
  const mockLivro = { id: 1000, titulo: 'Livro 2', autor: 'Autor B' };

  usuariosRepository.buscarUsuarioPorId.mockReturnValue(mockUsuario);
  livrosRepository.buscarLivroPorId.mockReturnValue(undefined);

  try {
    retiradasService.devolverLivro(mockUsuario.id, mockLivro.id);
  } catch (err) {
    expect(err).toEqual({
      id: 404,
      msg: 'Livro retirado com este id não existe',
    });
  }
});
