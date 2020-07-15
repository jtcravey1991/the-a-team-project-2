// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
//const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("signup", {});
  });

  app.get("/goals", (req, res) => {
    res.render("goals", {});
  });

  app.get("/log", (req, res) => {
    res.render("log", {});
  });
};
