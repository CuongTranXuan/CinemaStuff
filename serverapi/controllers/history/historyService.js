const db = require('../../helpers/db.js')
const History = db.History

module.exports = {
    getAllHistory,
    getHistory,
    updateHistory,
    createHistory,
    deleteHistory
}
async function getAllHistory(){
    const history = await History.find({})
    if (history){
        return history
    }
    else{
        throw "can't get history or history not available yet!"
    }
}
async function getHistory(id){
    const history = await History.findOne({filmId: id})
    if (history){
        return history
    }
    else{
        throw "can't find the film's history! "
    }
}
async function updateHistory(id,filmLog){
    const history = await History.findOne({filmId: id})
    if (!history) throw "History not available"
    Object.assign(history, filmLog)
    await history.save()
}
async function createHistory(filmLog){
    let history = await History.findOne({filmId: filmLog.id})
    if (history) throw "History is duplicated"
    history = new History(filmLog)
    await history.save()
}
async function deleteHistory(id){
    await History.findOneAndDelete({filmId: id})
}