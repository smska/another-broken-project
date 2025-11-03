const express = require('express');
const adviceItemRouter = require('./adviceItemRouter');
const authRouter = require('./authRouter');

const apiRouter = express.Router();

apiRouter.use('/advice', adviceItemRouter);
apiRouter.use('/auth', authRouter);

module.exports = apiRouter;
