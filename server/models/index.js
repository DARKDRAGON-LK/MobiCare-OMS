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
db.User = require('./user')(sequelize, Sequelize);
db.Brand = require('./brand')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.Colour = require('./colour')(sequelize, Sequelize);
db.Type = require('./type')(sequelize, Sequelize);
db.Product = require('./product')(sequelize, Sequelize);
db.Stock = require('./stock')(sequelize, Sequelize);
db.Customer = require('./customer')(sequelize, Sequelize);
db.Order = require('./order')(sequelize, Sequelize);
db.OrderCost = require('./ordercost')(sequelize, Sequelize);
db.OrderProduct = require('./orderproduct')(sequelize, Sequelize);
db.Tracking = require('./tracking')(sequelize, Sequelize);
// Load other models...

module.exports = db;
