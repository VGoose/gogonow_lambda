const jwt = require('jsonwebtoken') 

const verifyUser = (req, res, next) => {
  const token = req.cookies.token
  jwt.verify(token, 'abcdsfewasdbeqpiuwqfdsafjeksdlsdfj', {/*TODO*/}, (err, decoded) => {
    if (err) {
      res.status(401).json(err)
    }
    req.user = decoded.user
    next()
  })
}
module.exports = verifyUser