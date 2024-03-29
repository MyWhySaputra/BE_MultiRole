const { Sequelize } = require("sequelize");
const { mysql2 } = require("mysql2");

// Database Local

// const db = new Sequelize("be_multirole", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });

const db = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    dialectModule: mysql2,
  }
);

module.exports = db;