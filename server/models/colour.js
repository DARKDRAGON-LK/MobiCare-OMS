module.exports = (sequelize, Sequelize) => {
    const Colour = sequelize.define('Colour', {
      ColourID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: Sequelize.STRING
    });
  
    return Colour;
  };
  