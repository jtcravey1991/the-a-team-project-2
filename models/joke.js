// Creating our Joke model
module.exports = function(sequelize, DataTypes) {
    const Joke = sequelize.define("Joke", {
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

  return Joke;
};
