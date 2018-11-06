var express = require('express');
var router = express.Router();
let shortId = require('short-id')

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.session.user);

    res.render('accueil', {
      title: 'BigPixel',
      user: req.session.user || null
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
      "pseudo": {
        $regex: user.pseudo,
        $options: "is"
      },
      "email": {
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
              req.session.user = user;
              res.render("profil", {
                titre: "BigPixel",
                user: user
              });
            }
          })
      }
    })
  })
  .post('/signIn', function (req, res) {
    console.log(req.body)
    const {
      pseudo,
      password
    } = {
      pseudo: req.body.pseudo.trim(),
      password: req.body.password
    };
    // /---/  MONGO  /---/ //
    req.db.collection('utilisateurs').findOne({
      pseudo,
      password
    }, function (err, user) {
      if (user) {
        console.log("Connexion")
        req.session.user = user
        res.redirect('/profil')
        // bcrypt.hash(req.body.password, 10, function (err, hash) {
        //   // Store hash in database
        // });
      }
    })
  })
  .post('/profil', function (req, res) {
    let user = {
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: req.body.password,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      age: req.body.age,
      adress: req.body.adress,
      city: req.body.city,
      movie: req.body.movie,
      game: req.body.game,
      presentation: req.body.presentation,
    }
    req.db.collection('utilisateurs').updateOne({
        pseudo: user.pseudo,
        email: user.email,
        password: user.password,
        lastname: user.lastname,
        firstname: user.firstname,
        age: user.age,
        adress: user.adress,
        city: user.city,
        movie: user.movie,
        game: user.game,
        presentation: user.presentation
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