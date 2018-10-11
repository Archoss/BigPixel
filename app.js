"use strict";
const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const server = require("http").Server(app);
const expressMongoDb = require("express-mongo-db");
const MongoStore = require("connect-mongo")(session);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("trust proxy", 1); // trust first proxy
app.locals.pretty = true;

app.use(expressMongoDb("mongodb://127.0.0.1:27017/bigPixel_db"));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/"));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));

app.use(
    session({
        secret: "thisisasecretshhhh",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        },
        store: new MongoStore({
            url: "mongodb://localhost:27017/bigPixel",
            ttl: 30 * 60
        })
    })
);
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.get("/", function (req, res) {
    res.render("accueil", {
        titre: "BigPixel"
    });
});
app.get("/signUp", function (req, res) {
    res.render("signUp", {
        titre: "BigPixel"
    });
});
app.get("/about", function (req, res) {
    res.render("about", {
        titre: "BigPixel"
    });
});

app.get("/profile", function (req, res) {
    let user = req.session.user;
    console.log(req.session.user);
    res.render("profile", {
        titre: "BigPixel",
        user: user
    });
});

app.get("/404", function (req, res, next) {
    res.status(404);
    // respond with pug page
    res.render('404');
});

server.listen(3000, function () {
    console.log("Serveur connecté sur le port 3000");
});

module.exports = app;