var express = require('express');
var router = express.Router();
let shortId = require('short-id')

/* GET home page. */
router.get('/', function (req, res, next) {
<<<<<<< HEAD
    console.log(req.session.user);

    res.render('accueil', {
      title: 'BigPixel',
      user: req.session.user || null
    });
  })
=======
  res.render('accueil', {
    title: 'BigPixel'
  });
})
>>>>>>> e8d82e87ff2f6691ba3646246e3ed452d01f9551
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
              req.session.user = user
              res.render("profil", {
                titre: "BigPixel",
                user: user
              });
            }
          })
      }
    })
  })
  .post('/signIn', function (req, res, next) {
    // console.log(req.body)
    let user = {
      pseudo: req.body.pseudo.trim(),
      password: req.body.password
    }
    // /---/  MONGO  /---/ //
    req.db.collection('utilisateurs').findOne({
      "user.pseudo": {
        $regex: user.pseudo,
        $options: "is"
      },
      "user.password": {
        $regex: user.password,
        $options: "is"
      },
    }, function (err, result) {
      if (result) {
        console.log("Connexion")
        res.render("profil", {
          titre: "BigPixel"
        });
        // bcrypt.hash(req.body.password, 10, function (err, hash) {
        //   // Store hash in database
        // });
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