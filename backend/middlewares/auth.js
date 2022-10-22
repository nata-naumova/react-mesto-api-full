const jwt = require('jsonwebtoken');
//const { SEKRET_KEY } = require('../constants');
const UnauthorizedError = require('../errors/UnauthorizedError'); // 401

const { NODE_ENV, JWT_SECRET } = process.env;

/* 5. Сделайте мидлвэр для авторизации */
module.exports = (req, res, next) => {
  const { authorization } = req.headers; // достаём авторизационный заголовок
  if (!authorization || !authorization.startsWith('Bearer ')) {
    // убеждаемся, что он есть или начинается с Bearer
    return next(new UnauthorizedError('Необходима авторизация.'));
  }
  const token = authorization.replace('Bearer ', ''); // Извлекаем токен
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'); // Верификация токена
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация.'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
