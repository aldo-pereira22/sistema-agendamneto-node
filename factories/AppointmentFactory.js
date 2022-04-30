class AppointmentFactory {

    Build(simpleAppointment) {
        // id, title, start, end

        let day = simpleAppointment.date.getDate() + 1
        let month = simpleAppointment.date.getMonth()
        let year = simpleAppointment.date.getFullYear()

        let hour = Number.parseInt(simpleAppointment.time.split(':')[0])
        let minutes = Number.parseInt(simpleAppointment.time('')[1])

        let startDate = new Date(year, month, day, hour, minutes, 0, 0)

        let appo = {
            id: simpleAppointment._id,
            title: simpleAppointment.name + "  - " + simpleAppointment.description,
            start: startDate,
            end: startDate

        }

        return appo
    }
}

module.exports = new AppointmentFactory()