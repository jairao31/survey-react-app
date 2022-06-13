const adminRoutes = require("./admin");
const userRoutes = require("./user");

const constructorMethod = (app) => {
  app.use("/admin", adminRoutes);
  app.use("/user", userRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
