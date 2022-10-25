require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const { errors } = require('celebrate');
const mainErrors = require('./middlewares/main-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/routes');

const { PORT = 3000 } = process.env;

const app = express();

// МИДЛВАРЫ
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);

app.use(cors());

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
