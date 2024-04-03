module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('Category', {
      CategoryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: Sequelize.STRING
    });
  
    return Category;
  };
  