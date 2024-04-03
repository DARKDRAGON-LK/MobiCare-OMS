module.exports = (sequelize, Sequelize) => {
    const Tracking = sequelize.define('Tracking', {
      TrackingNumber: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      Description: Sequelize.TEXT,
      SaleID: Sequelize.INTEGER
    });
  
    Tracking.belongsTo(require('./order')(sequelize, Sequelize), { foreignKey: 'SaleID' });
  
    return Tracking;
  };
  