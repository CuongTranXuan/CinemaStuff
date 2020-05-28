//using jwt for authentication & authorization 
const jwt = require('jsonwebtoken')
const config = require('../config/config.json')
const { pathToRegexp, match, parse, compile } = require("path-to-regexp")
const userService = require('../controllers/user/userService.js')

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      })
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        })
      }
      req.userId = decoded.id;
      next()
    });
}
isAdmin = (req, res, next) => {
    userService.getById(req.userId).then(user => {
        if (user.role === 'admin') {
            next()
            return
        } else {
            res.status(403).send({
                message: "You aren't admin"
            })
            return;
        }
    })
}
isEditor = (req, res, next) => {
    userService.getById(req.userId).then(user => {
        if (user.role === 'editor') {
            next()
            return
        } else {
            res.status(403).send({
                message: "You aren't editor"
            })
            return;
        }
    })
}
const authJWT = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isEditor: isEditor
}
module.exports = authJWT