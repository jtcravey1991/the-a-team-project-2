// Creating our Socialize model
module.exports = function(sequelize, DataTypes) {
    const Socialize = sequelize.define("Socialize", {
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
  };

  return Socialize;
};
