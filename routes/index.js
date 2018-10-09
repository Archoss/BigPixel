var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('accueil', {
      title: 'BigPixel'
    });
  })
  .post('/signUp', function (req, res, next) {
    console.log(req.body)
    var pseudo = req.body.pseudo.trim();
    var email = req.body.email;
    var password = req.body.password;
    var lastname = req.body.lastname.trim();
    var firstname = req.body.firstname.trim();
    var age = req.body.age;
    var adress = req.body.adress.trim();
    var city = req.body.city.trim();
    var movie = req.body.movie.trim();
    var game = req.body.game.trim();
    var presentation = req.body.presentation;
    console.log("req.body.pseudo --> " + req.body.pseudo)
    console.log("req.body.email --> " + req.body.email)
    // /---/  MONGO  /---/ //
    req.db.collection('utilisateurs').findOne({
      pseudo: {
        $regex: pseudo,
        $options: "is"
      },
      email: {
        $regex: email,
        $options: "is"
      },
    }, function (err, result) {
      if (result) {
        res.render('signUp', {
          error: true,
          message: "Le pseudo et/ou le mot de passe est déja pris"
        })
      } else {
        req.db.collection('utilisateurs').insertOne({
            pseudo: pseudo,
            email: email,
            password: password,
            lastname: lastname,
            firstname: firstname,
            age: age,
            adress: adress,
            city: city,
            movie: movie,
            game: movie,
            presentation: presentation,
          },
          err => {
            if (err) {
              throw err;
            } else {
              let user = {
                pseudo: pseudo,
                email: email,
                password: password,
                lastname: lastname,
                firstname: firstname,
                age: age,
                adress: adress,
                city: city,
                movie: movie,
                game: game,
                presentation: presentation,
              }
              req.session.user = user
              res.redirect("/profile");
              console.log(req.body)
            }
          })
      }
    })
  })
module.exports = router;