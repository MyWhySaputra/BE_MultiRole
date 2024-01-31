const { Sequelize } = require("sequelize");

const db = new Sequelize("be_multirole", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;