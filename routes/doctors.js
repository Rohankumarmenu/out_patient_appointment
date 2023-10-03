const express = require('express');
const router = express.Router();

// Import Doctor model
const Doctor = require('../models/doctor');

// Route for listing doctors
router.get('/', async (req, res) => {
    try {
      const doctors = await Doctor.find(); 
      res.json(doctors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching doctors' });
    }
  });

// Route for doctor details
router.get('/:id', (req, res) => {


  const doctorId = parseInt(req.params.id);

 
  const doctor = doctors.find((doc) => doc.id === doctorId);

  if (!doctor) {
    res.status(404).json({ error: 'Doctor not found' });
  } else {
    res.json(doctor);
  }
});

module.exports = router;
