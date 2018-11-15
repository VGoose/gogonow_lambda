const router = require('express').Router();

const User = require('../../models/User');
const jwt = require('jsonwebtoken');


router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  //check for taken names/emails
  User.findOne({ username: username }).exec()
    .then(user => {
      if (user) {
        res.redirect('/register');
      }
    })
  User.findOne({ email: email }).exec()
    .then(user => {
      if (user) {
        res.redirect('/register');
      }
    })

  var newUser = new User({
    email: email,
    username: username,
    password: password
  });

  //call next on /login and provide all credentials, let /login redirect
  User.createNewUser(newUser)
    .then(user => res.send(user))
    .catch(error => res.send(error))
})

router.post('/login', (req, res) => {
  let password = req.body.password;
  let email = req.body.email;
  User.getUserByEmail(email)
    .then(user => User.comparePassword(password, user.password)
      .then(isMatch => isMatch
        ? jwt.sign({ user }, 'abcdsfewasdbeqpiuwqfdsafjeksdlsdfj ', {/*TODO*/ }, (error, token) => {
          return error ? res.json({ error }) : res.json({ token })
        })
        : res.json({ error: 'invalid credentials' }))
      .catch(error => res.json({ error }))
    )
    .catch(error => res.json({ error }))
})

router.get('/status', (req, res) => {
  //TODO
  res.send(true)
})

router.get('/data', (req, res) => {
  //TODO
  //return user.data from db 
  //how to get user id? req.userId -- doesn't work
  console.log(req.user);
  res.json(req.user)

})

module.exports = router;