const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport').Strategy;

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

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.getUserByUsername(username)
      .then()
      
      , function (err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: 'Unknown User' });
      }

      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid password' });
        }
      });
    });
  })
);


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