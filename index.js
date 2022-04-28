const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')


mongoose.connect('mongodb://172.17.0.2:27017/agendamento', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("banco de dados conectado!")
    })
    .catch(err => {
        console.log(err)
    })

app.use(express.static('public'))


app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.set('view engine', 'ejs')



app.get("/", (req, res) => {
    res.send("TESTE")
})

app.listen(5000, () => {
    console.log("Servidor rodando na porta: 5000")
})