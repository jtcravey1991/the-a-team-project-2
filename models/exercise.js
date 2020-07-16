// Creating our Exercise model
module.exports = function(sequelize, DataTypes) {
    const Exercise = sequelize.define("Exercise", {
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
  
    Exercise.associate = function(models) {
      // We're saying that the Study model should belong to a User
      // A study goal can't be created without a User due to the foreign key constraint
      Exercise.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Exercise;
  };