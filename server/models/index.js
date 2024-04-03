// models/index.js
require('dotenv').config(); // Load environment variables from .env file
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.Product = require('./product')(sequelize, Sequelize);
// Load other models...

module.exports = db;
