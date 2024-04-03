module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('Product', {
    Code: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: Sequelize.STRING,
    BrandID: Sequelize.INTEGER,
    CategoryID: Sequelize.INTEGER,
    ColourID: Sequelize.INTEGER,
    TypeID: Sequelize.INTEGER,
    Cost: Sequelize.DECIMAL(10, 2),
    SellingPrice: Sequelize.DECIMAL(10, 2),
    UserID: Sequelize.INTEGER
  });

  Product.belongsTo(require('./brand')(sequelize, Sequelize), { foreignKey: 'BrandID' });
  Product.belongsTo(require('./category')(sequelize, Sequelize), { foreignKey: 'CategoryID' });
  Product.belongsTo(require('./colour')(sequelize, Sequelize), { foreignKey: 'ColourID' });
  Product.belongsTo(require('./type')(sequelize, Sequelize), { foreignKey: 'TypeID' });

  return Product;
};
