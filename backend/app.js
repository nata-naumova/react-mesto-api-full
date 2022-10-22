const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const mainErrors = require('./middlewares/main-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
const routes = require('./routes/routes');

// подключаемся к серверу Mongo
async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });
}

// МИДЛВАРЫ
app.use(bodyParser.json());

// Подключаем роуты
app.use(express.json());
app.use(requestLogger);

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://mesto.nata.nomoredomains.icu/',
  'http://mesto.nata.nomoredomains.icu/',
  'localhost:3000'
];

app.use(function(req, res, next) {
  const { method } = req;
  const { origin } = req.headers;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

// Централизованная обработка ошибок
app.use(errorLogger);
app.use(errors());
app.use(mainErrors);

// Запуск сервера
main();
