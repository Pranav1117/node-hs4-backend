const route = require("express").Router();

const {
  registrationApi,
  loginApi,
} = require("../controller/api");

route.post("/register", registrationApi);
route.use("/login", loginApi);

module.exports = route;
