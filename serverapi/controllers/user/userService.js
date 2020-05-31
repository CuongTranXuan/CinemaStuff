const config = require('../../config/config.json')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./userModel.js')
// const crypto = require('crypto')
// const notp = require('../../helpers/TOTP.js')
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getQRcode, //support OTP
    checkQRcode
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(404).send({message : "user not found"})
    }
    var passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      );

    if (!passwordIsValid) {
        return {
          accessToken: null,
          message: "Invalid Password!"
        }
    }
    if (passwordIsValid) {
        const token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 3600  }) //expire in 1 hour
        var isRequireQR = false
        if (user.secret === '') {
            isRequireQR = true
        }
        return {
            id: user.id,
            username: user.username,
            role: user.role,
            accessToken: token,
            requireQR: isRequireQR
        }
    }
}

async function getAll() {
    return await User.find()
}

async function getById(id) {
    console.log(id)
    const user = await User.findById(id)
    const url = speakeasy.otpauthURL({
        secret: user.secret,
        label: 'Fcinema',
        encoding: 'base32',
    })
    return qrcode.toDataURL(url)
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        return res.status(404).send({message : "username has been used, choose another one"})
    }

    const user = new User(userParam)

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken'
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10)
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save()
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function getQRcode(username){ //call when user want to renew qr code to add to another app on another phone
    let user = await User.findOne({username: username})
    const secret = speakeasy.generateSecret({name: "Fcinema"})
    user['secret'] = secret.base32
    user.save()
    const url = speakeasy.otpauthURL({
        secret: secret.base32,
        label: 'Fcinema',
        encoding: 'base32',
    })
    return qrcode.toDataURL(url)
}
async function checkQRcode(username, code){
    let user = await User.findOne({username: username})
    const reply = speakeasy.totp.verify({
        secret: user.secret,
        encoding: 'base32',
        token: code,
        window: 2
    })
    if (reply) {
        return{
            message: "code valid",
            authenticated: true,
        }
    }
    else{
        return{
            message: "code invalid",
            authenticated: false,
        }
    }
}