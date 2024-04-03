module.exports = (sequelize, Sequelize) => {
    const OrderCost = sequelize.define('OrderCost', {
      OrderID: Sequelize.INTEGER,
      DeliveryCost: Sequelize.DECIMAL(10, 2),
      AdditionalCost: Sequelize.DECIMAL(10, 2),
      UserID: Sequelize.INTEGER
    });
  
    OrderCost.belongsTo(require('./order')(sequelize, Sequelize), { foreignKey: 'OrderID' });
  
    return OrderCost;
  };
  