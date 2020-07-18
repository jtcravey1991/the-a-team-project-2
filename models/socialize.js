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
    }
  });

  Socialize.associate = function(models) {
    // We're saying that the Study model should belong to a User
    // A study goal can't be created without a User due to the foreign key constraint
    Socialize.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Socialize;
};
