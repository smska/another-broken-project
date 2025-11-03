const { AdviceItem, User } = require('../../db/models');
class AdviceItemService {
  static async getAllAdviceItems() {
    return AdviceItem.findAll({ order: [['title', 'DESC']] });
  }

  static async getOneAdviceItem(id) {
    return AdviceItem.findByPk(id, {
      include: [{ model: User, attributes: ['name'] }],
    });
  }

  static async addAdviceItem(data) {
    return AdviceItem.create(data);
  }

  static async editAdviceItem(data, id) {
    const oneAdviceItem = await AdviceItemService.getOneAdviceItem(id);
    if (oneAdviceItem) {
      await oneAdviceItem.update(data);
    }
    return oneAdviceItem;
  }

  static async deleteOneAdviceItem(id) {
    const oneAdviceItem = await AdviceItemService.getOneAdviceItem(id);
    if (oneAdviceItem) {
      await oneAdviceItem.destroy();
    }
    return oneAdviceItem;
  }
}

module.exports = AdviceItemService;
