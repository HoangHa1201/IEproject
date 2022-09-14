const Router = require("express").Router();
const authController = require("../controllers/authController");

Router.get("/auth/login/success", authController.authSucces);

Router.get("/auth/login/failed", authController.authFailed);

Router.get("/auth/logout", authController.authLogout);

Router.get("/auth/google", authController.authGoogle);

Router.get("/auth/google/callback", authController.authGoogleCallback);

module.exports = Router;
