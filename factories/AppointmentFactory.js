class AppointmentFactory {

    Build(simpleAppointment) {
        // id, title, start, end
        // console.log("AppointmentFactory: 5", simpleAppointment)

        let day = simpleAppointment.date.getDate() + 1
        let month = simpleAppointment.date.getMonth()
        let year = simpleAppointment.date.getFullYear()

        let hours = Number.parseInt(simpleAppointment.time.split(':')[0])
        let minutes = Number.parseInt(simpleAppointment.time.split(':')[1])

        // let startDate = new Date(year, month, day, hour, minutes, 0, 0)

        let startDate = new Date(year, month, day, hours, minutes, 0, 0)
            // startDate.setHours(startDate.getHours() - 3)


        let appo = {
            id: simpleAppointment._id,
            title: simpleAppointment.name + "  - " + simpleAppointment.description,
            start: startDate,
            end: startDate,
            notified: simpleAppointment.notified,
            email: simpleAppointment.email

        }

        return appo
    }
}

module.exports = new AppointmentFactory()