// Creating our Hobby model
module.exports = function(sequelize, DataTypes) {
  const Hobby = sequelize.define("Hobby", {
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

  Hobby.associate = function(models) {
    // We're saying that the Study model should belong to a User
    // A study goal can't be created without a User due to the foreign key constraint
    Hobby.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Hobby;
};
