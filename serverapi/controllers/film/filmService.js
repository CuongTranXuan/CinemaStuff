const db = require('../../helpers/db.js')
const Film = db.Film
const historyService = require('../history/historyService.js')


module.exports = {
    getFilmInfo, //for streaming site using
    getAllFilm,
    createFilm, // for dashboard site
    // uploadVideo,
    // uploadSubtitles,
    updateFilm,
    deleteFilm
}

async function getFilmInfo(id){
    const film = await Film.findOne({id: id})
    if (film) {
        return film
    }
}
async function getAllFilm(){
    const listFilm = await Film.find({})
    if (listFilm){
        return listFilm
    }
}
async function createFilm(filmParams){
    //validate
    if(await Film.findOne({id: filmParams.id})){
        throw 'Film "' + filmParams.name + ' " has already added';
    }
    let film = new Film(filmParams)
    historyService.createHistory({
        filmId: filmParams.id,
        log: [],
        totalWatch: 0
    })
    //save film to database
    await film.save()
}
async function updateFilm(id, filmParams){
    var film = await Film.findById(id)
    
    //validate
    if (!film) throw 'Film not found'
    historyService.createHistory({ //make sure u have a history document for the film
        filmId: filmParams.id,
        log: [],
        totalWatch: 0
    })
    //override filmParams to film and update to database
    Object.assign(film, filmParams)
    await film.save()
}
async function deleteFilm(id){
    await Film.findByIdAndDelete(id)
}
