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
        // return res.status(500).send({message: "can't get history or history not available yet!"})
        return {}
    }
}
async function getHistory(id){
    const history = await History.findOne({filmId: id})
    if (history){
        return history
    }
    else{
        // return res.status(404).send({message: "can't find the film's history! "})
        return {}
    }
}
async function updateHistory(id,filmLog){
    const history = await History.findOne({filmId: id})
    if (!history) return {}
    Object.assign(history, filmLog)
    await history.save()
}
async function createHistory(filmLog){
    let history = await History.findOne({filmId: filmLog.id})
    if (history) return {}
    history = new History(filmLog)
    await history.save()
}
async function deleteHistory(id){
    await History.findOneAndDelete({filmId: id})
}