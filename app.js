"use strict";
const express = require("express");
const app = express();
const path = require("path");
const server = require("http").Server(app);
const session = require('express-session')
const bodyParser = require("body-parser");
const expressMongoDb = require("express-mongo-db");
const MongoStore = require('connect-mongo')(session);

// view engine setup
app.locals.pretty = true;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'))

app.get("/", function (req, res) {
    res.render("accueil", {
        titre: "BigPixel"
    });
});
app.get("/signUp", function (req, res) {
    res.render("signUp", {
        titre: "BigPixel",
    });
});

app.get('/profil', function (req, res) {
    let user = req.session.user
    console.log(req.session.user)
    res.render('profil', {
        titre: "BigPixel",
        user: user
    });
});

app.listen(3000, function () {
    console.log("Serveur connecté sur le port 3000");
});