const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const appointmentService = require('./services/appointmentService')


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
    res.render("index")
})
app.get('/cadastro', (req, res) => {
    res.render('create')
})

app.post('/create', async(req, res) => {
    const status = await appointmentService.Create(
        req.body.name,
        req.body.email,
        req.body.description,
        req.body.cpf,
        req.body.date,
        req.body.time
    )
    if (status) {
        res.redirect('/')

    } else {
        res.send("Ocorreu uma falha")

    }
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta: 3000")
})