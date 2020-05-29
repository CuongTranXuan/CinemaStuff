const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    role: { type: String, required: true},
    shared_key: {type: String} //use this key to gen QR code
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);