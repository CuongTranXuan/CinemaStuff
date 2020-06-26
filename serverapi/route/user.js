const express = require('express')
const user = express.Router()
const userService = require('../controllers/user/userService.js')
const authJWT = require('../helpers/jwt.js')
// routes
user.post('/authenticate', authenticate)
user.post('/register', register)
user.get('/',[authJWT.verifyToken,authJWT.isAdmin], getAll)
user.put('/:id',[authJWT.verifyToken,authJWT.isAdmin], update)
user.delete('/:id',[authJWT.verifyToken,authJWT.isAdmin], _delete)
//support OTP
user.post('/qrcode',[authJWT.verifyToken],createQRcode)
user.get('/qrcode/:id',[authJWT.verifyToken], getQRcodeById) 
user.post('/qrcode/validate',[authJWT.verifyToken],checkQRcode)


function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then((result) => {
            if (result.accessToken === null){
                res.status(401).send(result)
            } else {
                res.status(200).send(result)
            }
        })
        .catch(err => res.status(500).json({error: err}))
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.status(200).json({message:'registered'}))
        .catch(err => res.status(500).json({error: err}))
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({error: err}))
}


function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.status(200).json({message:"updated successfully"}))
        .catch(err => res.status(500).json({error: err}))
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.status(200).json({message: "deleted successfully"}))
        .catch(err => res.status(500).json({error: err}))
}
//support OTP
function createQRcode(req,res,next) {
    userService.createQRcode(req.body.username)
        .then(result => {
            res.status(200).json({message: "qr generated", qrcode: result})
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
}
function checkQRcode(req,res,next){
    userService.checkQRcode(req.body.username, req.body.code)
        .then(result => {
            if (result.authenticated === true) {
                res.status(200).json(result)
            }
            else{
                res.status(403).json(result)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
}
function getQRcodeById(req, res, next) {
    userService.getQRcodeById(req.params.id)
        .then(user => user ? res.status(200).json(user) : res.sendStatus(404))
        .catch(err => res.status(500).json({error: err}))
}
module.exports = user