//route films definition

const express = require('express')
const filmsRoute = express.Router()
const filmService = require('../controllers/film/filmService.js')
//routes 
filmsRoute.get('/',getAllFilm)
filmsRoute.get('/:id',getStream)

//function
function getAllFilm(req,res,next){
    filmService.getAllFilm()
        .then(listFilm => {res.json(listFilm)})
        .catch(err => next(err))
}
function getStream(req,res,next){
    filmService.getFilmInfo(req.params.id)
        .then(link => {res.json(link)})
        .catch(err => next(err))
}
module.exports = filmsRoute
