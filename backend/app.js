require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const cors = require('cors');
const helmet = require('helmet');

const { errors } = require('celebrate');
const mainErrors = require('./middlewares/main-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/routes');

const { PORT = 3000 } = process.env;

const app = express();

// МИДЛВАРЫ
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);

const allowedCors = [
  // eslint-disable-next-line quotes
  "https://mesto.nata.nomoredomains.icu",
  // eslint-disable-next-line quotes
  "http://mesto.nata.nomoredomains.icu",
  // eslint-disable-next-line quotes
  "http://localhost:3000",
];

app.use((req, res, next) => {
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

app.use(express.json()); // Подключаем роуты

app.use(routes);

// Централизованная обработка ошибок
app.use(errorLogger);
app.use(errors());
app.use(mainErrors);

// подключаемся к серверу Mongo
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
  // eslint-disable-next-line no-console
  console.log('Connected to db');

  await app.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
}

// Запуск сервера
main();
