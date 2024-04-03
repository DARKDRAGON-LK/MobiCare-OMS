module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('Order', {
      SaleID: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      Date: Sequelize.DATE,
      CustomerID: Sequelize.INTEGER,
      SocialMediaPlatform: Sequelize.STRING,
      ShippedDate: Sequelize.DATE,
      Status: Sequelize.STRING,
      TrackingNumber: Sequelize.STRING,
      PaymentType: Sequelize.STRING,
      UserID: Sequelize.INTEGER
    });
  
    Order.belongsTo(require('./user')(sequelize, Sequelize), { foreignKey: 'UserID' });
  
    return Order;
  };
  