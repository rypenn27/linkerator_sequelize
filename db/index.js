// Connect to DB
const { Client } = require("pg");
const { Sequelize } = require("sequelize");

const DB_NAME = "linkerator";
const DB_URL =
  process.env.DATABASE_URL ||
  `postgres://postgres:noles0306@localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);
const sequelize = new Sequelize(DB_URL); // Example for postgres

// database methods

// export
module.exports = {
  client,
  sequelize,
  // db methods
};
