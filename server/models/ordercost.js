module.exports = (sequelize, Sequelize) => {
    const OrderCost = sequelize.define('OrderCost', {
      Code: Sequelize.INTEGER,
      DeliveryCost: Sequelize.DECIMAL(10, 2),
      AdditionalCost: Sequelize.DECIMAL(10, 2),
      UserID: Sequelize.INTEGER
    });
  
    OrderCost.belongsTo(require('./product')(sequelize, Sequelize), { foreignKey: 'Code' });
  
    return OrderCost;
  };
  