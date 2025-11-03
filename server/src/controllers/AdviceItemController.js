const AdviceItemService = require('../services/AdviceItemService');
const formatResponse = require('../utils/formatResponse');
const { AdviceItem } = require('../../db/models');

class AdviceItemController {
  static async getAdviceItems(req, res) {
    try {
      const adviceItems = await AdviceItemService.getAllAdviceItems();
      if (adviceItems.length === 0)
        return res.json(formatResponse(200, 'Совет не найдено', []));
      return res.json(formatResponse(200, 'Succeess', adviceItems));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  static async createAdviceItem(req, res) {
    if (!req.body) return res.status(400).json(formatResponse(400, 'Нет данных'));
    const { title, desc } = req.body;
    const { isValid, error } = AdviceItem.validate({ title, desc });
    if (!isValid)
      return res.status(400).json(formatResponse(400, 'Ошибка валидации', null, error));
    const { user } = res.locals;
    try {
      const newAdviceItem = await AdviceItemService.addAdviceItem({
        title,
        desc,
        authorId: user.id,
      });
      return res.status(201).json(formatResponse(201, 'Success', newAdviceItem));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  static async getAdviceItemById(req, res) {
    const { id } = req.params;
    try {
      const oneAdviceItem = await AdviceItemService.getOneAdviceItem(id);
      if (!oneAdviceItem) return res.status(400).json(formatResponse(400, 'Нет совета'));
      return res.json(formatResponse(200, 'Success', oneAdviceItem));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  static async updateAdviceItem(req, res) {
    if (!req.body) return res.status(400).json(formatResponse(400, 'Заполните данные'));
    const { title, desc } = req.body;
    const { isValid, error } = AdviceItem.validate({ title, desc });
    if (!isValid)
      return res.status(400).json(formatResponse(400, 'Ошибка валидации', null, error));
    const { id } = req.params;
    try {
      const updatedAdviceItem = await AdviceItemService.editAdviceItem(
        { title, desc },
        id,
      );
      if (!updatedAdviceItem)
        return res.status(400).json(formatResponse(400, 'Нет совета'));
      return res.json(formatResponse(200, 'Success', updatedAdviceItem));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  static async deleteAdviceItem(req, res) {
    const { id } = req.params;
    try {
      const deletedAdviceItem = await AdviceItemService.deleteOneAdviceItem(id);
      if (!deletedAdviceItem) return res.json(formatResponse(400, 'Нет совета'));
      return res.status(204).json(formatResponse(204, 'Success'));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }
}

module.exports = AdviceItemController;
