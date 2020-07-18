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
    }
  });

  Joke.associate = function(models) {
    // We're saying that the Study model should belong to a User
    // A study goal can't be created without a User due to the foreign key constraint
    Joke.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Joke;
};
