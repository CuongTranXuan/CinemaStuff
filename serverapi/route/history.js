const express = require('express')
const historyRoute = express.Router()
const historyService = require('../controllers/history/historyService.js')

//route
// this route is acctually not necessary
historyRoute.get('/',getAllHistory)
historyRoute.get('/:id',getHistory)
historyRoute.post('/',createHistory)
historyRoute.put('/:id',updateHistory)
historyRoute.delete('/:id', deteleHistory)

//function
function getAllHistory(req,res,next) {
    historyService.getAllHistory()
        .then(historyList => {
            res.status(200).json(historyList)
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
}
function getHistory(req,res,next){
    historyService.getHistory(req.params.id)
        .then(history => {
            res.status(200).json(history)
        })
        .catch(err => {
            res.status(500).send({message: err.message})
        })
}
function createHistory(req,res,next) {
    historyService.createHistory(req.body)
        .then(() => {
            res.status(200).json({message: "create successfully"})
        })
        .catch(err => {
            res.status(500).send({message: err.message})
        })
}
function updateHistory(req,res,next) {
    historyService.updateHistory(req.params.id,req.body)
        .then(() => {
            res.status(200).json({message: "update successfully"})
        })
        .catch(err => {
            res.status(500).send({message: err.message})
        })
}
function deteleHistory(req,res,next) {
    historyService.deleteHistory(req.params.id)
        .then(() => {
            res.status(200).json({message: "delete successfully"})
        })
        .catch(err => {
            res.status(500).send({message: err.message})
        })
}

module.exports = historyRoute