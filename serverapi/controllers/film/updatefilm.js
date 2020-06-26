//just a script to update film data which is crawled from TMDB
// not a part of server


const config = require('../config/config.json');
const db = require('../helpers/db.js');
const Film = db.Film;



//  add link + edit name + fix vote average countless number
async function getAllFilm(){
    const listFilm = await Film.find({});
    if (listFilm){
        return listFilm;
    }
}
async function updateFilm(id, filmParams){
    var film = await Film.findById(id);
    
    //validate
    if (!film) throw 'Film not found';
    //override filmParams to film and update to database
    Object.assign(film, filmParams);
    await film.save();
}
let count = 21;
getAllFilm().then((listFilm) =>{
    listFilm.forEach(element => {
        delete(element.video)
       element.video_link = `http://125.212.203.148/hls/master_fate_ep${count}.m3u8`
       element.id = `fate_ep${count}`
       element.vote_average = 8.8
       element.poster_link = `https://image.tmdb.org/t/p/w370_and_h556_bestv2${element.poster_link}`
       count--
       updateFilm(element._id,element)
    });
} )

