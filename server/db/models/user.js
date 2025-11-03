'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ AdviceItem }) {
      this.hasMany(AdviceItem, { foreignKey: 'authorId' });
    }

    static validateSignup(user) {
      const { name, email, password } = user;
      if (!name || typeof name !== 'string' || name.trim() === '')
        return { isValid: false, error: 'Name is required' };
      if (!email || typeof email !== 'string' || email.trim() === '')
        return { isValid: false, error: 'Email is required' };
      if (
        !password ||
        typeof password !== 'string' ||
        password.trim() === '' ||
        password.length < 6
      )
        return { isValid: false, error: 'Password is required' };
      return { isValid: true, error: null };
    }

    static validateLogin(user) {
      const { email, password } = user;
      if (!email || typeof email !== 'string' || email.trim() === '')
        return { isValid: false, error: 'Email is required' };
      if (!password || typeof password !== 'string' || password.trim() === '')
        return { isValid: false, error: 'Password is required' };
      return { isValid: true, error: null };
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
