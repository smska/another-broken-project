const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const corsConfig = require('./corsConfig');
const cookieParser = require('cookie-parser');

const serverConfig = (app) => {
  app.use(morgan('dev'));
  app.use(express.static('public'));
  // читать данные из тела запросов
  app.use(express.urlencoded({ extended: true }));
  // читать JSON-данные из тела запросов
  app.use(express.json());
  app.use(cors(corsConfig));
  app.use(cookieParser());
};

module.exports = serverConfig;
