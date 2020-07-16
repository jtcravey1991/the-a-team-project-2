// Creating our Water model
module.exports = function(sequelize, DataTypes) {
    const Water = sequelize.define("Water", {
      // date column
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true
        }
      },
      // value column
      value: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    Water.associate = function(models) {
      // We're saying that the Study model should belong to a User
      // A study goal can't be created without a User due to the foreign key constraint
      Water.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Water;
  };