var express = require('express');
var router = express.Router();
let shortId = require('short-id')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('accueil', {
      title: 'BigPixel'
    });
  })
  .post('/signUp', function (req, res, next) {
    // console.log(req.body)
    let user = {
      pseudo: req.body.pseudo.trim(),
      email: req.body.email,
      password: req.body.password,
      lastname: req.body.lastname.trim(),
      firstname: req.body.firstname.trim(),
      age: req.body.age,
      adress: req.body.adress.trim(),
      city: req.body.city.trim(),
      movie: req.body.movie.trim(),
      game: req.body.game.trim(),
      presentation: req.body.presentation,
    }
    // /---/  MONGO  /---/ //
    req.db.collection('utilisateurs').findOne({
      "user.pseudo": {
        $regex: user.pseudo,
        $options: "is"
      },
      "user.email": {
        $regex: user.email,
        $options: "is"
      },
    }, function (err, result) {
      if (result) {
        console.log("Le pseudo et/ou le mot de passe est déja pris")
        res.render('signUp', {
          error: true,
          message: "Le pseudo et/ou le mot de passe est déja pris"
        })
      } else {
        // bcrypt.hash(req.body.password, 10, function (err, hash) {
        //   // Store hash in database
        // });
        req.db.collection('utilisateurs').insertOne(user,
          err => {
            if (err) {
              throw err;
            } else {
              req.session.user = user
              res.redirect("/profil");
            }
          })
      }
    })
  })
  .post('/profil', function (req, res) {
    let user = {
      pseudo: req.body.pseudo.trim(),
      email: req.body.email,
      password: req.body.password,
      lastname: req.body.lastname.trim(),
      firstname: req.body.firstname.trim(),
      age: req.body.age,
      adress: req.body.adress.trim(),
      city: req.body.city.trim(),
      movie: req.body.movie.trim(),
      game: req.body.game.trim(),
      presentation: req.body.presentation,
    }
    req.db.collection('utilisateurs').updateOne({
        pseudo: req.body.pseudo
      },
      user, err => {
        if (err) {
          throw err;
        } else {
          req.session.user = user
        }
      })
  })

module.exports = router;