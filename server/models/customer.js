module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define('Customer', {
      CustomerID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      CustomerName: Sequelize.STRING,
      Address: Sequelize.STRING,
      City: Sequelize.STRING,
      District: Sequelize.STRING,
      ContactNumber: Sequelize.STRING,
      MobileNumber: Sequelize.STRING,
      SocialMediaPlaform: Sequelize.STRING,
      UserID: Sequelize.INTEGER
    });
  
    return Customer;
  };
  