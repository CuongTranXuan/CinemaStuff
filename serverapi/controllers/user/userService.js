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
        user.hash
      );

    if (!passwordIsValid) {
        return {
          accessToken: null,
          message: "Invalid Password!"
        }
    }
    if (passwordIsValid) {
        const token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 3600  }); //expire in 1 day
        var role = user.role
        return {
            id: user.id,
            username: user.username,
            role: role,
            accessToken: token,
            shared_key: ''
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
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
        userParam.hash = bcrypt.hashSync(userParam.password, 10)
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save()
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function getQRcode(username){ //call when user want to renew qr code to add to another app on another phone
    // const key = config.master_qr_key
    // const algorithm = 'sha512'
    // let user = await User.findOne({username: username})
    // if (user.shared_key ===  ''){
    //     let text = user._id
    //     text = text + Date.now()
    //     const hmac = crypto.createHmac(algorithm, key).update(text).digest('hex')
    //     Object.assign(user,{shared_key: hmac})
    //     await user.save()
    //     return hmac
    // }
    // else return user.shared_key
    
    let user = await User.findOne({username:username})
    const secret = speakeasy.generateSecret({name: "Fcinema"})
    user['shared_key'] = secret.base32
    user.save()
    return qrcode.toDataURL(secret.otpauth_url)
}
async function checkQRcode(username, code){
    const user = await User.findOne({username: username})
    const reply = notp.totp.verify(user.shared_key, code)
    if (reply) {
        return{
            message: "code valid",
            authenticated: true
        }
    }
    else{
        return{
            message: "code invalid",
            authenticated: false
        }
    }
}