module.exports = (sequelize, Sequelize) => {
    const OrderProduct = sequelize.define('OrderProduct', {
      OrderID: Sequelize.INTEGER,
      ProductCode: Sequelize.INTEGER,
      Quantity: Sequelize.INTEGER,
      UserID: Sequelize.INTEGER
    });
  
    OrderProduct.belongsTo(require('./order')(sequelize, Sequelize), { foreignKey: 'OrderID' });
    OrderProduct.belongsTo(require('./product')(sequelize, Sequelize), { foreignKey: 'ProductCode' });
  
    return OrderProduct;
  };
  