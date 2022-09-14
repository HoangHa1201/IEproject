'use strict';
require("dotenv").config();
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser")
const session = require("express-session");

const Auth = require("./routes/auth");
const fileRoutes = require('./routes/fileUploadRoutes');
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
    session({
        name: "ir",
        secret: "somethingsecretgoeshere",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    })
);

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/auth/google/callback",
            passReqToCallback: true,
        },
        (req, accessToken, refreshToken, profile, done) => {
            done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(Auth);
app.use('/api', fileRoutes.routes);

app.listen(port, () => {
    console.log("Server is listening in port " + process.env.PORT);
});
