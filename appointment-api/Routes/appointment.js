const express = require('express');
const router = express.Router();
const Appointment = require('../Models/appointmentModel');
const { sendEmail } = require('../Mail');

//Retrieves all the appointments in the database
router.get('/', async (req, res) => {
    try{
        const appointment = await Appointment.find();
        res.json(appointment);
    } catch (err) {
        res.json({ message: err });
    }
});

//Posts new appointments to database
router.post('/bookAppointment', async (req, res) => {
    const newAppointment = new Appointment({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        appointment_date: req.body.appointment_date,
        appointment_time: req.body.appointment_time
    });

    try{
        const createdAppointment = await newAppointment.save();
        res.json(createdAppointment);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/confirmationEmail', (req, res) => {
    res.json(sendEmail(req.body.email, req.body.name, "confirm"));
})

//Deletes an appointment with their given email
router.delete('/:appointmentEmail', async (req, res) => {
    try{
        deleteAppointment = await Appointment.deleteOne({ email: req.params.appointmentEmail });
        res.json(deleteAppointment);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;