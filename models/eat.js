// Creating our healthy eats model
module.exports = function(sequelize, DataTypes) {
    var Eat = sequelize.define("Eat", {
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

    Eat.associate = function(models) {
      // We're saying that the Study model should belong to a User
      // A study goal can't be created without a User due to the foreign key constraint
      Eat.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    return Eat;
  };