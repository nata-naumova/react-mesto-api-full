require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const mainErrors = require('./middlewares/main-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(express.json());
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(mainErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
