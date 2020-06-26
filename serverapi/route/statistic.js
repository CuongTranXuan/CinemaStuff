const express = require('express')
const statisticRoute = express.Router()
const NodeCache = require('node-cache')
const filmCache = new NodeCache()
const historyService = require('../controllers/history/historyService.js')
const authJWT = require('../helpers/jwt.js')
let clientsList = [] //control dashboard list, usually have 1 client at a same time but... :P
// route
statisticRoute.get('/play/:id',startPlay) //call when someone play video
statisticRoute.get('/end/:id',stopPlay)
//return data to dashboard, should be authenticated to access
// statisticRoute.get('/data',[authJWT.verifyToken], notifyClient) //send data back to dashboard whenever something happen with history list  
statisticRoute.get('/init',dataHandler)

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
                    filmCache.set(filmId, tmp)
                    historyService.getAllHistory().then(historyList => {
                        let data = {} //history list + caching data from server
                        for (let history of historyList) {
                            let tmp = filmCache.get(history.filmId)
                            if (tmp != undefined) {
                                let filmId = tmp.filmId
                                let concurrent = tmp.concurrent
                                data[filmId] = concurrent
                            } else {
                                let filmId = history.filmId
                                let concurrent = 0
                                data[filmId] = concurrent
                            }
                        }
                        clientsList.forEach(c => {
                            let string = `data: ${JSON.stringify(data)}\n\n`
                            console.log(string)
                            c.res.write(string)
                            c.res.flush()
                        })
                    })
                }
            })
    }
    else{
        tmp.concurrent++ 
        tmp.totalWatch++
        tmp.log.push(time)
        filmCache.set(filmId, tmp)
        if (tmp.log.length % 10 === 0) {
            historyService.updateHistory(filmId,tmp)
                .then(() => {
                    console.log("updated to database!!!")
                })
        }
        historyService.getAllHistory().then(historyList => {
            let data = {} //history list + caching data from server
            for (let history of historyList) {
                let tmp = filmCache.get(history.filmId)
                if (tmp != undefined) {
                    let filmId = tmp.filmId
                    let concurrent = tmp.concurrent
                    data[filmId] = concurrent
                } else {
                    let filmId = history.filmId
                    let concurrent = 0
                    data[filmId] = concurrent
                }
            }
            clientsList.forEach(c => {
                let string = `data: ${JSON.stringify(data)}\n\n`
                console.log(string)
                c.res.write(string)
                c.res.flush()
            })
        })
    }
}
function stopPlay(req,res,next) {
    let filmId = req.params.id
    let tmp = filmCache.get(filmId)
    if (tmp.concurrent >= 0){
        tmp.concurrent-- 
    }
    if (tmp.concurrent === 0) {
        filmCache.del(filmId)
        historyService.updateHistory(filmId,tmp)
        .then(() => {
            console.log("deleted cache and updated to database!!!")
        })
    } else {
        filmCache.set(filmId, tmp)
    }
    historyService.getAllHistory().then(historyList => {
        let data = {} //history list + caching data from server
        for (let history of historyList) {
            let tmp = filmCache.get(history.filmId)
            if (tmp != undefined) {
                let filmId = tmp.filmId
                let concurrent = tmp.concurrent
                data[filmId] = concurrent
            } else {
                let filmId = history.filmId
                let concurrent = 0
                data[filmId] = concurrent
            }
        }
        clientsList.forEach(c => {
            let string = `data: ${JSON.stringify(data)}\n\n`
            console.log(string)
            c.res.write(string)
            c.res.flush()
        })
    })
}

function dataHandler(req,res,next) {//when a client call this, it will set a connection between client-server, and we can use response object to send data to them in every route we want
    const headers = // special data for Server-Sent Events implementations
        {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            'Access-Control-Allow-Origin': '*'
        }
    // res.writeHead(200,headers)
    historyService.getAllHistory().then(historyList => {
        let data = {} //history list + caching data from server
        for (let history of historyList) {
            let tmp = filmCache.get(history.filmId)
            if (tmp != undefined) {
                let filmId = tmp.filmId
                let concurrent = tmp.concurrent
                data[filmId] = concurrent
            } else {
                let filmId = history.filmId
                let concurrent = 0
                data[filmId] = concurrent
            }
        }
        res.writeHead(200,headers)
        let string = `data: ${JSON.stringify(data)}\n\n`
        console.log(string)
        res.write(string)
        res.flush()
        const clientId = Date.now()
        const newClient = {
            id: clientId,
            res
        }
        console.log(clientId)
        clientsList.push(newClient)
        req.on('close',() => {
            console.log(`${clientId} is closed`)
            clientsList.filter(c => c.id != clientId)
        })
    })
}
module.exports = statisticRoute