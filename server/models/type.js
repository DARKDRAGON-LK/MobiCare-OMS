module.exports = (sequelize, Sequelize) => {
    const Type = sequelize.define('Type', {
      TypeID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: Sequelize.STRING
    });
  
    return Type;
  };