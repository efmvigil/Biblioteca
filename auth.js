const jwt = require('jsonwebtoken');
const SECRET_KEY = 'chave_secreta';

function autenticarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, usuario) => {
      if (err) return res.status(403).json({ message: 'Token inválido' });
      else {
        req.usuario = usuario; // Armazena as informações do usuário no objeto req
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
}

module.exports = autenticarToken;
