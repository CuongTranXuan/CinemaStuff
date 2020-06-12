const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    filmId: {type: String, required: true},
    totalWatch: {type: Number},
    log: [String]
},
{ 
    skipVersioning: { 
        totalWatch: true ,
        log: true
    } 
})


schema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('History', schema);