// Creating our Hug model
module.exports = function(sequelize, DataTypes) {
  const Hug = sequelize.define("Hug", {
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

  Hug.associate = function(models) {
    Hug.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Hug;
};
