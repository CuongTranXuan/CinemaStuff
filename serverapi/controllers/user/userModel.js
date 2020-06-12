const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    password: {type: String, required: true},
    accessToken: { type: String },// time-based, only provided after qr check pass
    createdDate: { type: Date, default: Date.now },
    role: { type: String, required: true},
    secret: {type: String} //secret.base32 stored from speakeasy
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);