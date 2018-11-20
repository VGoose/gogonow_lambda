const router = require('express').Router();

const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const verifyUser = require('../../scripts/auth/verify')

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
        ? jwt.sign({ user }, 'abcdsfewasdbeqpiuwqfdsafjeksdlsdfj', {/*TODO*/ }, (error, token) => {
            return error ? res.json({ error }) : res.json({ token })
        })
        : res.json(401, { error: 'invalid credentials' }))
      .catch(error => res.json(401, { error }))
    )
    .catch(error => res.json({ error }))
})

router.post('/update', verifyUser, (req, res) => {
  const postData = req.body
  // const keys = req.data.keys()
  // const dataArr = keys.map(key => data[key])
  const update = { data: { ...req.user.data, ...postData }}
  const options = { new: true}
  console.log(postData)
  console.log(update)
  // console.log(dataArr)
  //data = { favorite_stations: []} 
  User.findByIdAndUpdate(req.user._id, update, options)
    .then(
      user => res.json(user),

      )
})

router.get('/data', verifyUser, (req, res) => {
  User.findById(req.user._id)
    .then(
      user => res.json(user),
      err => res.json(err)
    )
  // res.json(req.user.user)
})



module.exports = router;