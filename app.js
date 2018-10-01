"use strict";
const express = require('express')
const app = express();
const path = require("path");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function (req, res) {
    res.render('accueil', {
        titre: 'BigPixel'
    })
})

app.listen(3000, function () {
    console.log('Serveur connecté sur le port 3000');
})