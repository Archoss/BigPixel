var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Express'
    });
  })
  .post('/form', function (req, res, next) {
    console.log('azzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
    var pseudo = req.body.pseudo.trim();
    var email = req.body.email;
    var password = req.body.password;
    var city = req.body.city;
    var movie = req.body.movie.trim();
    var game = req.body.game.trim();
    // /---/  MONGO  /---/ //
    req.db.collection('utilisateurs').findOne({
      pseudo: {
        $regex: pseudo,
        $options: "is"
      },
    }, function (err, result) {
      if (result) {
        res.render('form', {
          error: true,
          message: "Le pseudo est déja pris"
        })
      } else {
        req.db.collection('utilisateurs').insertOne({
            pseudo: pseudo,
            password: password
          },
          err => {
            if (err) {
              throw err;
            } else {
              let user = {
                pseudo: pseudo,
                password: password
              }
              req.session.user = user
              res.redirect("/profil");
              console.log(req.body)
            }
          })
      }
    })
  })
module.exports = router;