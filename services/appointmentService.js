const appointment = require('../models/Appointment')
const mogoose = require('mongoose')
const { default: mongoose } = require('mongoose')

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
            finished: false
        })
        try {
            await newappo.save()
            return true

        } catch (error) {
            console.log(error)
            return false
        }
    }
}

module.exports = new AppointmentService()