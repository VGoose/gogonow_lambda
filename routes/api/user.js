const router = require('express').Router();

const User = require('../../models/User');

router.get('/register', (req, res) => {
  res.json('register route');
})

router.get('/login', (req, res) => {
  res.json('login route');
})

router.post('/register', (req, res) => {
  let userName = req.body.userName;
  let email = req.body.email;
  let password = req.body.password;
})
// router.get('/', (req, res) => {
//   User.find()
//     .then(users => res.json(users))
// })

// router.post('/', (req, res) => {
//   const newUser = new User({
//     name: req.body.name
//   });

//   newUser.save().then(user => res.json(user));
// })

module.exports = router;