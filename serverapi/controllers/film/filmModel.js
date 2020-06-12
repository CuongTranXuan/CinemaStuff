const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    adult: {type: Boolean},
    trailer_link: {type: String},//not used yet, gonna change it to trailer link
    id: {type: String, unique:true, required:true},
    original_language: {type: String},
    original_title: {type: String},
    overview: {type: String},
    poster_link: {type: String},
    release_date: {type: String},
    title: {type: String},
    video_link: {type: String},
    vote_average: {type: Number},
})

schema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Film', schema)