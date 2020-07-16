// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // ----------- GOALS ROUTES -------------------- ||
  // sleep get
  app.get("/api/sleep", isAuthenticated, (req, res) => {
    db.Sleep.findAll({
      where: {
        UserId: req.user.id,
        date: {
          $gt: moment()
            .subtract(7, "days")
            .toDate()
        }
      }
    }).then(data => {
      res.json(data);
    });
  });
  // sleep post
  app.post("/api/sleep", isAuthenticated, (req, res) => {
    db.Sleep.create({
      UserId: req.user.id,
      date: req.body.date,
      value: req.body.value
    }).then(data => {
      res.json(data);
    });
  });

  // study get
  app.get("/api/study", isAuthenticated, (req, res) => {
    db.Study.findAll({
      where: {
        UserId: req.user.id,
        date: {
          $gt: moment()
            .subtract(7, "days")
            .toDate()
        }
      }
    }).then(data => {
      res.json(data);
    });
  });
  // study post
  app.post("api/study", isAuthenticated, (req, res) => {
    db.Study.create({
      UserId: req.user.id,
      date: req.body.date,
      value: req.body.value

    }).then(data => {
      res.json(data);

    });
  });

  //eat get
  app.get("/api/eat", isAuthenticated, (req, res) => {
    db.Eat.findAll({
      where: {
        UserId: req.user.id,
        date: {
          $gt: moment()
            .subtract(7, "days")
            .toDate()
        }
      }
    }).then(data => {
      res.json(data);
    });
  });
  //eat post
  app.post("api/eat", isAuthenticated, (req, res) => {
    db.Eat.create({
      UserId: req.user.id,
      date: req.body.date,
      value: req.body.value
    }).then(data => {
      res.json(data);
    });
  });

  //joke get
  app.get("/api/joke", isAuthenticated, (req, res) => {
    db.Joke.findAll({
      where: {
        UserId: req.user.id,
        date: {
          $gt: moment()
            .subtract(7, "days")
            .toDate()
        }
      }
    }).then(data => {
      res.json(data);
    });
  });
  //joke post
  app.post("api/joke", isAuthenticated, (req, res) => {
    db.Joke.create({
      UserId: req.user.id,
      date: req.body.date
    }).then(data => {
      res.json(data);
    });
  });

  //socialize get
  app.get("/api/socialize", isAuthenticated, (req, res) => {
    db.Socialize.findAll({
      where: {
        UserId: req.user.id,
        date: {
          $gt: moment()
            .subtract(7, "days")
            .toDate()
        }
      }
    }).then(data => {
      res.json(data);
    });
  });
  //socialize post
  app.post("api/socialize", isAuthenticated, (req, res) => {
    db.Socialize.create({
      UserId: req.user.id,
      date: req.body.date
    }).then(data => {
      res.json(data);
    });
  });

  //hug get
  app.get("/api/hug", isAuthenticated, (req, res) => {
    db.Hug.findAll({
      where: {
        UserId: req.user.id,
        date: {
          $gt: moment()
            .subtract(7, "days")
            .toDate()
        }
      }
    }).then(data => {
      res.json(data);
    });
  });
  //hug post
  app.post("api/hug", isAuthenticated, (req, res) => {
    db.Hug.create({
      UserId: req.user.id,
      date: req.body.date
    }).then(data => {
      res.json(data);
    });
  });

  //water get
  app.get("/api/water", isAuthenticated, (req, res) => {
    db.Water.findAll({
      where: {
        UserId: req.user.id,
        date: {
          $gt: moment()
            .subtract(7, "days")
            .toDate()
        }
      }
    }).then(data => {
      res.json(data);
    });
  });
  //water post
  app.post("api/water", isAuthenticated, (req, res) => {
    db.Water.create({
      UserId: req.user.id,
      date: req.body.date,
      value: req.body.value
    }).then(data => {
      res.json(data);
    });
  });

  //meditation get
  app.get("/api/meditation", isAuthenticated, (req, res) => {
    db.Meditation.findAll({
      where: {
        UserId: req.user.id,
        date: {
          $gt: moment()
            .subtract(7, "days")
            .toDate()
        }
      }
    }).then(data => {
      res.json(data);
    });
  });
  //meditation post
  app.post("api/meditation", isAuthenticated, (req, res) => {
    db.Meditation.create({
      UserId: req.user.id,
      date: req.body.date
    }).then(data => {
      res.json(data);
    });
  });

  //exercise get
  app.get("/api/exercise", isAuthenticated, (req, res) => {
    db.Exercise.findAll({
      where: {
        UserId: req.user.id,
        date: {
          $gt: moment()
            .subtract(7, "days")
            .toDate()
        }
      }
    }).then(data => {
      res.json(data);
    });
  });
  //exercise post
  app.post("api/exercise", isAuthenticated, (req, res) => {
    db.Exercise.create({
      UserId: req.user.id,
      date: req.body.date,
      value: req.body.value
    }).then(data => {
      res.json(data);
    });
  });

  //hobby get
  app.get("/api/hobby", isAuthenticated, (req, res) => {
    db.Hobby.findAll({
      where: {
        UserId: req.user.id,
        date: {
          $gt: moment()
            .subtract(7, "days")
            .toDate()
        }
      }
    }).then(data => {
      res.json(data);
    });
  });
  //hobby post
  app.post("api/hobby", isAuthenticated, (req, res) => {
    db.Hobby.create({
      UserId: req.user.id,
      date: req.body.date,
      value: req.body.value
    }).then(data => {
      res.json(data);
    });
  });

};

