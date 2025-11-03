const express = require('express');
const AdviceItemController = require('../controllers/AdviceItemController');
const isValidateId = require('../middlewares/isValidateId');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const adviceItemRouter = express.Router();

adviceItemRouter.get('/', AdviceItemController.getAdviceItems);

adviceItemRouter.post('/', verifyAccessToken, AdviceItemController.createAdviceItem);

adviceItemRouter.get('/:id', isValidateId, AdviceItemController.getAdviceItemById);

adviceItemRouter.put('/:id', isValidateId, AdviceItemController.updateAdviceItem);

adviceItemRouter.delete('/:id', isValidateId, AdviceItemController.deleteAdviceItem);

module.exports = adviceItemRouter;
