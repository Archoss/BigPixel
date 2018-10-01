var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
})
// .get('/profil', function (req, res, next) {
//   console.log(req.db.collection('users').findOne({}, {
//     sort: {
//       _id: -1
//     },
//     limit: 1
//   }));
//   req.db.collection('users').findOne({}, {
//     sort: {
//       _id: -1
//     },
//     limit: 1
//   });
// req.db.collection('users').findOne({

// })
// res.render('profil', {
//   firstname: firstname,
//   lastname: lastname,
//   username: username,
//   adresse: adresse,
//   age: age,
//   email: email,
//   username: req.body.username
// })
// })

module.exports = router;