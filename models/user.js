// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // users first name
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // users last name
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // -------- Goals --------------------//

    // study time boolean
    isTrackingStudyTime: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // study goal per night
    studyTimeGoal: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // sleep time boolean
    isTrackingSleep: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // sleep goal per night
    sleepGoal: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // healthy eats boolean
    isTrackingHealthyEats: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // heathy eats goal per week
    healthyEatsGoal: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // drinking water boolean
    isTrackingDrinkingWater: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // drinking water goal per day in fl. oz.
    drinkingWaterGoal: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // medetation boolean
    isTrackingMeditaion: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // meditation goal in minutes per week
    meditationGoal: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // exercise boolean
    isTrackingExercise: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // exercise goal hours per week
    exerciseGoal: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // hugs given boolean
    isTrackingHugs: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // hugs goal per day
    hugsGoal: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // socialized boolean
    isTrackingSocizlizing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // socialized goal hours per week
    socializingGoal: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // jokes told boolean
    isTrackingJokes: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    //jokes goal jokes per day
    jokesGoal: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // hobby time boolean
    isTrackingHobby: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // hobby time goal hours per week
    hobbyGoal: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  });

  //association setup
  User.associate = function(models) {
    User.hasMany(models.Sleep, {
      onDelete: "cascade"
    });
    User.hasMany(models.Study, {
      onDelete: "cascade"
    });
    User.hasMany(models.Eat, {
      onDelete: "cascade"
    });
    User.hasMany(models.Water, {
      onDelete: "cascade"
    });
    User.hasMany(models.Meditation, {
      onDelete: "cascade"
    });
    User.hasMany(models.Exercise, {
      onDelete: "cascade"
    });
    User.hasMany(models.Hug, {
      onDelete: "cascade"
    });
    User.hasMany(models.Socialize, {    
      onDelete: "cascade"
    });
    User.hasMany(models.Joke, {
      onDelete: "cascade"
    });
    User.hasMany(models.Hobby, {
      onDelete: "cascade"
    });
  };

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
