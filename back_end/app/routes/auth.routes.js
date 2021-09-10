const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const express = require('express');
const { route } = require("./practice.routes");
const router = express.Router()

router.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  router.get("/auth/findall/:id" , controller.findAll)
  router.post("/auth/signin", controller.signin);
  router.get("/auth/findadmin",  controller.findAllAdmin)
  router.get("/auth/getAllEmployees", controller.findAllUsers)

  router.get("/auth/signout", controller.signout)

  module.exports = router;
