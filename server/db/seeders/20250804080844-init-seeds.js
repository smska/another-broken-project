'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Jane',
        email: 'jane@mail.ru',
        password: await bcrypt.hash('123', 10),
      },
    ]);
    await queryInterface.bulkInsert(
      'AdviceItems',
      [
        {
          title: 'Типизация — твой друг',
          desc: 'Не бойся использовать типы, даже если ты новичок. TypeScript как кофейная машина: сначала сложно, но потом не можешь без неё жить!',
          authorId: 1,
        },
        {
          title: 'Любовь к any — путь к боли',
          desc: 'Любить any — это как есть только фастфуд: быстро и вкусно, но в долгосрочной перспективе твой код заболеет.',
          authorId: 1,
        },
        {
          title: 'Интерфейсы спасают проект',
          desc: 'Интерфейсы — это как инструкции к Ikea: сначала пугают, а потом делают твою жизнь легче.',
          authorId: 1,
        },
        {
          title: 'Стойкий и красивый',
          desc: 'Когда TypeScript ругается, не злись — он просто хочет сделать твой код более стойким и красивым.',
          authorId: 1,
        },
        {
          title: 'Не бойся ошибок и перезапусков',
          desc: 'Ошибки — не повод паниковать! Каждый баг — это как баг в игре: лечится перезапуском и внимательным дебагом.',
          authorId: 1,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AdviceItems', null, {});
  },
};
