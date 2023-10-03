const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor'); 

router.get('/:id', async (req, res) => {
    try {
      const appointmentId = req.params.id;
  
      // Retrieve appointment details by ID from the database
      const appointment = await Appointment.findById(appointmentId);
  
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
  
      res.json(appointment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching appointment details' });
    }
  });
  

router.post('/book', (req, res) => {

  const { doctorId, patientName, appointmentDate, appointmentTime } = req.body;

  const doctor = doctor.find((doc) => doc.id === doctorId);

  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }


  if (!doctor.availableDays.includes(appointmentDate.getDay())) {
    return res.status(400).json({ error: 'Doctor is not available on this day' });
  }

  if (
    !isWithinPracticeHours(doctor.practiceHours, appointmentTime)
  ) {
    return res.status(400).json({ error: 'Doctor is not available at this time' });
  }

 
  const appointmentsForDay = getAppointmentsForDay(appointments, doctorId, appointmentDate);
  if (appointmentsForDay.length >= doctor.maxAppointmentsPerDay) {
    return res.status(400).json({ error: 'Doctor is fully booked on this day' });
  }

  // Create a new appointment
  const newAppointment = new Appointment(doctorId, patientName, appointmentDate, appointmentTime);
  appointments.push(newAppointment);

  return res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
});


function isWithinPracticeHours(practiceHours, appointmentTime) {
    const [practiceStart, practiceEnd] = practiceHours.split(' - '); 
    const [appointmentHour, appointmentMinute] = appointmentTime.split(':');
    const [startHour, startMinute] = practiceStart.split(':');
    const [endHour, endMinute] = practiceEnd.split(':');
  

    const appointmentTimeInt = parseInt(appointmentHour) * 60 + parseInt(appointmentMinute);
    const practiceStartInt = parseInt(startHour) * 60 + parseInt(startMinute);
    const practiceEndInt = parseInt(endHour) * 60 + parseInt(endMinute);
  

    return appointmentTimeInt >= practiceStartInt && appointmentTimeInt <= practiceEndInt;
  }
  


function getAppointmentsForDay(appointments, doctorId, appointmentDate) {
    return appointments.filter((appointment) => {
      return (
        appointment.doctorId === doctorId &&
        appointment.appointmentDate.toDateString() === appointmentDate.toDateString()
      );
    });
  }
  
module.exports = router;
