//route films definition

const express = require('express')
const filmsRoute = express.Router()
const filmService = require('../controllers/film/filmService.js')
//routes 
filmsRoute.get('/',getAllFilm)
filmsRoute.get('/:id',getFilmInfo)

//function
function getAllFilm(req,res,next){
    filmService.getAllFilm()
        .then(listFilm => {res.status(200).json(listFilm)})
        .catch(err => res.status(500).json(err))
}
function getFilmInfo(req,res,next){
    filmService.getFilmInfo(req.params.id)
        .then(link => {res.status(200).json(link)})
        .catch(err => res.status(500).json(err))
}
module.exports = filmsRoute
