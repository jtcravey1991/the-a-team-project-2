// Creating our Sleep model
module.exports = function(sequelize, DataTypes) {
  const Sleep = sequelize.define("Sleep", {
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

  Sleep.associate = function(models) {
    // We're saying that the Study model should belong to a User
    // A study goal can't be created without a User due to the foreign key constraint
    Sleep.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Sleep;
};
