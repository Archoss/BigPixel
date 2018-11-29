"use strict";
const express = require("express"),
	app = express(),
	session = require("express-session"),
	path = require("path"),
	bodyParser = require("body-parser"),
	server = require("http").Server(app),
	expressMongoDb = require("express-mongo-db"),
	MongoStore = require("connect-mongo")(session),
	bcrypt = require("bcryptjs"),
	uuidv4 = require('uuid/v4');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("trust proxy", 1); // trust first proxy
app.locals.pretty = true;

app.use(expressMongoDb("mongodb://pierre:bonde007pierre@ds211774.mlab.com:11774/bigpixel"));
// app.use(expressMongoDb("mongodb://127.0.0.1:27017/bigPixel_db"));
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(
	"/bootstrap",
	express.static(__dirname + "/node_modules/bootstrap/dist/")
);
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));

app.use(
	session({
		secret: "thisisasecretshhhh",
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false
		},
		store: new MongoStore({
			url: "mongodb://pierre:bonde007pierre@ds211774.mlab.com:11774/bigpixel",
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
app.get("/signIn", function (req, res) {
	res.render("signIn", {
		titre: "BigPixel"
	});
});
app.get("/about", function (req, res) {
	let user = req.session.user;
	res.render("about", {
		titre: "BigPixel",
		user: user
	});
});
app.get("/logout", function (req, res) {
	res.render("accueil", {
		titre: "BigPixel"
	});
	req.session.destroy();
});

app.get("/profil", function (req, res) {
	let user = req.session.user;
	console.log("profil - req.session -->", req.session);
	res.render("profil", {
		titre: "BigPixel",
		user: user
	});
});

app.get("/mur", function (req, res) {
	const user = req.session.user;
	const msg = req.session.msg;
	req.db.collection('messages').find().toArray((err, msg) => {
		// console.log(msg)
		res.render("mur", {
			titre: "BigPixel",
			user: user,
			msg: msg,
			moment: function () {
				var dateNow = new Date();
				var dd = dateNow.getDate();
				var monthSingleDigit = dateNow.getMonth() + 1,
					mm = monthSingleDigit < 10 ? '0' + monthSingleDigit : monthSingleDigit;
				var yy = dateNow.getFullYear().toString().substr(2);
				return (mm + '/' + dd + '/' + yy);
			}
		});
	}, function (err, msg) {
		console.log(msg)
		if (msg) {
			res.json('Data found');
		} else {
			res.json('Erreur')
		}
	})
	console.log(req.session)
	console.log("req.session.user", user.pseudo)
	console.log(uuidv4());
});

app.get("/404", function (req, res, next) {
	res.status(404);
	// respond with pug page
	res.render("404");
});

server.listen(3000, function () {
	console.log("Serveur connecté sur le port 3000");
});

module.exports = app;