const passport = require("passport");

const authController = {
    authSucces(req, res) {
        if (req.user) {
            res.status(200).json({
                success: true,
                message: "successfull",
                user: req.user,
                cookies: req.cookies,
            });
        }
    },

    authFailed(req, res) {
        res.status(401).json({
            success: false,
            message: "failure",
        });
    },

    authLogout(req, res, next) {
        req.logout(function (err) {
            req.session.destroy((err) => {
                if (err) {
                    return next(err);
                }
                req.session = null;
                res.clearCookie("ir", { path: "/" });
                return res.redirect("http://localhost:3000/");
            });
        });
    },

    authGoogle: passport.authenticate("google", {
        scope: ["email", "profile"],
    }),
    authGoogleCallback: passport.authenticate("google", {
        successRedirect: "http://localhost:3000/",
        failureRedirect: "/login/failed",
    }),
};

module.exports = authController;
