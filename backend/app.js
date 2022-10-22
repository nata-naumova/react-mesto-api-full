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
