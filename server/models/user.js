module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
      UserID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Email: Sequelize.STRING,
      FullName: Sequelize.STRING,
      ContactNumber: Sequelize.BIGINT,
      Permission_Type: Sequelize.STRING,
      Password: Sequelize.STRING
    });
  
    return User;
  };
  