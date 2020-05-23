const Sequelize = require("sequelize");

class User extends Sequelize.Model {}

module.exports = User;
module.exports.initialize = (sequelize) => User.init({
  id: { type: Sequelize.TEXT, primaryKey: true, unique: true },
  name: { type: Sequelize.TEXT, allowNull: false },
  age: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  email: { type: Sequelize.TEXT }
}, { sequelize, modelName: "user" });
