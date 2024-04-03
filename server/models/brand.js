module.exports = (sequelize, Sequelize) => {
    const Brand = sequelize.define('Brand', {
      BrandID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: Sequelize.STRING
    });
  
    return Brand;
  };
  