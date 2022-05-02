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
    // mongoose.set('useFindAndModify', false)

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
app.get('/getcalendar', async(req, res) => {
    let appointments = await appointmentService.GetAll(false)

    res.json(appointments)
})

app.get('/event/:id', async(req, res) => {
    let appo = await appointmentService.GetById(req.params.id)
    res.render('event', { appo })
})

app.post('/finish', async(req, res) => {
    let id = req.body.id
    let result = await appointmentService.Finish(id)
    res.redirect('/')
})
app.get('/list', async(req, res) => {
    let appos = await appointmentService.GetAll(true)
    res.render('list', { appos })

})

app.get("/searchresult", async(req, res) => {
    let appos = await appointmentService.Search(req.query.search)

    res.render('list', { appos })
})

var poolTime = 1000 * 60 * 5
setInterval(async() => {
    await appointmentService.SendNotification()

}, poolTime)

app.listen(3000, () => {
    console.log("Servidor rodando na porta: 3000")
})