const appointment = require('../models/Appointment')
const mongoose = require('mongoose')
const AppointmentFactory = require('../factories/AppointmentFactory')
const mailer = require('nodemailer')
    // const { default: mongoose } = require('mongoose')

const Appo = mongoose.model('Appointment', appointment)

class AppointmentService {
    async Create(name, email, description, cpf, date, time) {
        const newappo = new Appo({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false,
            notified: false
        })
        try {
            await newappo.save()
            return true

        } catch (error) {
            console.log(error)
            return false
        }
    }

    async GetAll(showFinished) {
        if (showFinished) {
            return await Appo.find()
        } else {
            let appos = await Appo.find({ 'finished': false })
            let appointments = []

            appos.forEach(appointment => {
                if (appointment.date != undefined) {

                    appointments.push(AppointmentFactory.Build(appointment))
                }
            })
            return appointments
        }

    }

    async GetById(id) {
        try {

            let appointment = await Appo.findOne({ '_id': id })
            return appointment
        } catch (error) {
            console.log(error)
        }
    }

    async Finish(id) {
        try {
            await Appo.findByIdAndUpdate(id, { finished: true })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async Search(query) {
        try {
            let appos = await Appo.find().or([{ email: query }, { cpf: query }])
            return appos
        } catch (error) {
            console.log(error)
            return []
        }


    }

    async SendNotification() {
        let transporter = mailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 25,
            auth: {
                user: "e5320b1663183f",
                pass: "3b84c250de90f5"

            }
        })
        let appos = await this.GetAll(false)
        appos.forEach(async app => {
            let date = app.start.getTime()
            let hour = 1000 * 60 * 60

            let gap = date - Date.now()

            if (gap <= hour) {
                if (!app.notified) {
                    await Appo.findByIdAndUpdate(app.id, { notified: true })
                    transporter.sendMail({
                        from: 'Aldo Pereira <aldopereira@gmail.com>',
                        to: app.email,
                        subject: "Sua consulta vai acontecer em breve",
                        text: "Sua consulta vai acontecer em uma hora"

                    }).then(() => {

                    }).catch(err => {

                    })
                }
            }
        })
    }
}

module.exports = new AppointmentService()