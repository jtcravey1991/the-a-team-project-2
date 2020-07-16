// Creating our Hug model
module.exports = function(sequelize, DataTypes) {
    const Hug = sequelize.define("Hug", {
      // date column
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true
        }
      }
    });
  
    Hug.associate = function(models) {
      // We're saying that the Study model should belong to a User
      // A study goal can't be created without a User due to the foreign key constraint
      Hug.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Hug;
  };