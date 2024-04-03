// models/product.js
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
      Code: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING,
      },
      Type: {
        type: Sequelize.STRING,
      },
      Category: {
        type: Sequelize.STRING,
      },
      Brand: {
        type: Sequelize.STRING,
      },
      Colour: {
        type: Sequelize.STRING,
      },
      Cost: {
        type: Sequelize.DECIMAL(10, 2),
      },
      SellingPrice: {
        type: Sequelize.DECIMAL(10, 2),
      },
    });
  
    return Product;
  };
  