const express = require('express')
const statisticRoute = express.Router()
const NodeCache = require('node-cache')
const filmCache = new NodeCache()
const historyService = require('../controllers/history/historyService.js')

// route
statisticRoute.get('/play/:id',startPlay) //call when someone play video
statisticRoute.get('/end/:id',stopPlay)
statisticRoute.get('/concurrents')


// function
function startPlay(req,res,next){
    let filmId = req.params.id
    let time = new Date //timer to save log
    time = time.toLocaleString()
    let tmp = filmCache.get(filmId) //get saved film log from cache
    if (tmp == undefined) { //if don't exist, tmp return undefined, then we must create one
        historyService.getHistory(filmId)
            .then(history => {
                if(history != {}){
                    tmp = JSON.parse(JSON.stringify(history)) //object return from mongoose is weird
                    tmp['concurrent'] = 1 // generate new cache
                    tmp.totalWatch++
                    tmp.log.push(time)
                    console.log(tmp)
                    filmCache.set(filmId, tmp)
                    res.end('new view confirmed')
                }
            })
    }
    else{
        tmp.concurrent++ 
        tmp.totalWatch++
        tmp.log.push(time)
        console.log(tmp)
        filmCache.set(filmId, tmp)
        if (tmp.log.length % 10 === 0) {
            historyService.updateHistory(filmId,tmp)
                .then(() => {
                    console.log("updated to database!!!")
                })
        }
        res.end('new view confirmed')
    }
}
function stopPlay(req,res,next) {
    let filmId = req.params.id
    let tmp = filmCache.get(filmId)
    if (tmp.concurrent > 0){
        tmp.concurrent-- 
    }
    console.log(tmp)
    if (tmp.concurrent === 0) {
        historyService.updateHistory(filmId,tmp)
        .then(() => {
            console.log("deleted cache and updated to database!!!")
            filmCache.del(filmId)
        })
    } else {
        filmCache.set(filmId, tmp)
    }
    res.json(tmp)
}

module.exports = statisticRoute