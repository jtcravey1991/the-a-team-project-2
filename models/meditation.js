// Creating our Meditation model
module.exports = function(sequelize, DataTypes) {
    const Meditation = sequelize.define("Meditation", {
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
  
    Meditation.associate = function(models) {
      // We're saying that the Study model should belong to a User
      // A study goal can't be created without a User due to the foreign key constraint
      Meditation.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Meditation;
  };