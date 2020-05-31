const express = require('express');
const user = express.Router();
const userService = require('../controllers/user/userService.js');
const authJWT = require('../helpers/jwt.js')
// routes
user.post('/authenticate', authenticate);
user.post('/register', register);
user.get('/',[authJWT.verifyToken,authJWT.isAdmin], getAll);
user.get('/:id',[authJWT.verifyToken], getById);
user.put('/:id',[authJWT.verifyToken,authJWT.isAdmin], update);
user.delete('/:id',[authJWT.verifyToken,authJWT.isAdmin], _delete);
//support OTP
user.post('/qrcode',[authJWT.verifyToken],getQRcode);
user.post('/qrcode/validate',[authJWT.verifyToken],checkQRcode);


function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then((result) => {
            if (result.accessToken === null){
                res.status(401).send(result)
            } else {
                res.status(200).send(result)
            }
        })
        .catch(err => res.status(500).send({ message: err.message }));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({result:'registered'}))
        .catch(err => res.status(500).send({ message: err.message }));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => res.status(500).send({ message: err.message }));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({message:"updated successfully"}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({message: "deleted successfully"}))
        .catch(err => next(err));
}
//support OTP
function getQRcode(req,res,next) {
    userService.getQRcode(req.body.username)
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
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
}

module.exports = user;