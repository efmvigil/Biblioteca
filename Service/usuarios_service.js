const usuariosRepository = require('../Repository/usuarios_repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'chave_secreta';

function listar() {
  return usuariosRepository.listarUsuarios();
}

function buscarPorId(id) {
  const usuarioEncontrado = usuariosRepository.buscarUsuarioPorId(id);
  if (usuarioEncontrado) return usuarioEncontrado;
  else throw { id: 404, msg: 'Usuario com este id não existe' };
}

async function registrarUsuario(usuario) {
  if (
    usuario.nome &&
    usuario.matricula &&
    usuario.email &&
    usuario.senha &&
    usuario.telefone
  ) {
    const verificacao = usuariosRepository.verificarUsuarioExistente(usuario);
    if (!verificacao) {
      usuario.senha = await bcrypt.hash(usuario.senha, 10);
      return usuariosRepository.inserirUsuario(usuario);
    } else {
      throw {
        status: 'erro',
        id: 400,
        msg: 'Já existe uma conta vinculada a este numero de matricula',
      };
    }
  } else {
    throw { id: 400, msg: 'Usuario com dados inválidos' };
  }
}

async function logarUsuario(login) {
  if (login.matricula && login.senha) {
    const usuario = usuariosRepository.verificarUsuarioExistente(login);
    if (usuario) {
      const senhaCorreta = await bcrypt.compare(login.senha, usuario.senha);
      if (senhaCorreta) {
        const token = jwt.sign(
          {
            id: usuario.id,
            matricula: usuario.matricula,
          },
          SECRET_KEY,
          { expiresIn: '1h' }
        );
        return { token };
      } else {
        throw {
          status: 'erro',
          id: 401,
          msg: 'Senha incorreta',
        };
      }
    } else {
      throw {
        status: 'erro',
        id: 404,
        msg: 'Usuário não encontrado',
      };
    }
  } else {
    throw {
      status: 'erro',
      id: 400,
      msg: 'Informe a matricula e a senha',
    };
  }
}

async function atualizar(id, atualizacao) {
  const usuario = usuariosRepository.buscarUsuarioPorId(id);
  if (usuario) {
    if (
      atualizacao.nome &&
      atualizacao.matricula &&
      atualizacao.email &&
      atualizacao.senha &&
      atualizacao.telefone
    ) {
      atualizacao.senha = await bcrypt.hash(atualizacao.senha, 10);
      atualizacao.livrosRetirados = usuario.livrosRetirados;
      atualizacao.multa = usuario.multa;
      return usuariosRepository.atualizarUsuario(id, atualizacao);
    } else throw { id: 400, msg: 'Atualização com dados inválidos' };
  } else throw { id: 404, msg: 'Usuario com este id não existe' };
}

function deletar(id) {
  const usuarioEncontrado = usuariosRepository.buscarUsuarioPorId(id);
  if (usuarioEncontrado) {
    usuariosRepository.deletarUsuario(usuarioEncontrado.id);
    return usuarioEncontrado;
  } else throw { id: 404, msg: 'usuario com este id não existe' };
}

module.exports = {
  listar,
  buscarPorId,
  registrarUsuario,
  logarUsuario,
  atualizar,
  deletar,
};
