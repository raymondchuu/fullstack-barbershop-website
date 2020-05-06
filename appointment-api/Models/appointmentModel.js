const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    appointment_date: {
        type: String
    },
    appointment_time: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;