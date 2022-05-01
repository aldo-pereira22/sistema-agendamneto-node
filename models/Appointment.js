mongose = require('mongoose')

const appointment = new mongose.Schema({
    name: String,
    email: String,
    description: String,
    cpf: String,
    date: Date,
    time: String,
    finished: Boolean
})

module.exports = appointment