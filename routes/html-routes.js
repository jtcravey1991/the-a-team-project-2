module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("signup", {});
  });

  app.get("/dashboard", (req, res) => {
    res.render("dashboard", {});
  });

  app.get("/goals", (req, res) => {
    res.render("goals", {});
  });
};
