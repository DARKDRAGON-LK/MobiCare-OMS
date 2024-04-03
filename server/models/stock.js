module.exports = (sequelize, Sequelize) => {
    const Stock = sequelize.define('Stock', {
      ProductCode: Sequelize.INTEGER,
      Quantity: Sequelize.INTEGER,
      UserID: Sequelize.INTEGER
    });
  
    Stock.belongsTo(require('./product')(sequelize, Sequelize), { foreignKey: 'ProductCode' });
  
    return Stock;
  };
  