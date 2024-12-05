const listaUsuarios = []
const idUsuarios = 0

function inserirUsuario(usuario) {
    usuario.id = ++idUsuarios
    usuario.livrosRetirados = []
  listaUsuarios.push(usuario);
  return usuario
}

function listarUsuarios() {
  return listaUsuarios;
}

function buscarUsuarioPorId(id) {
  return listaUsuarios[id];
}

function atualizarUsuario(id, atualizacao) {
  listaUsuarios[id] = atualizacao;
  return listaUsuarios[id];
}

function deletarUsuario(id) {
  listaUsuarios.splice(id, 1);
}

module.exports = {
  inserirUsuario,
  listarUsuarios,
  atualizarUsuario,
  deletarUsuario,
  buscarUsuarioPorId,
};
