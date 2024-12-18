const listaUsuarios = [];
let idUsuarios = 0;

function inserirUsuario(usuario) {
  usuario.id = ++idUsuarios;
  usuario.livrosRetirados = [];
  usuario.multa = 0;
  listaUsuarios.push(usuario);
  return usuario;
}

function listarUsuarios() {
  return listaUsuarios;
}

function buscarUsuarioPorId(id) {
  const resultado = listaUsuarios.filter((usuario) => usuario.id === id);
  return resultado[0];
}

function atualizarUsuario(id, atualizacao) {
  listaUsuarios[id - 1] = atualizacao;
  listaUsuarios[id - 1].id = id;
  return listaUsuarios[id - 1];
}

function deletarUsuario(id) {
  listaUsuarios.splice(id - 1, 1);
  atribuirIDs();
}

function atribuirIDs() {
  idUsuarios = 0;
  listaUsuarios.forEach((usuario) => (usuario.id = ++idUsuarios));
}

function verificarUsuarioExistente(login) {
  const resultado = listaUsuarios.filter(
    (usuario) => usuario.matricula === login.matricula
  );
  return resultado[0];
}

module.exports = {
  listaUsuarios,
  inserirUsuario,
  listarUsuarios,
  atualizarUsuario,
  deletarUsuario,
  buscarUsuarioPorId,
  verificarUsuarioExistente,
};
