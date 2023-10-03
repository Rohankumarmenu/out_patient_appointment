const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Routes
const doctorsRoutes = require('./routes/doctors');
const appointmentsRoutes = require('./routes/appointments');

app.use('/api/doctors', doctorsRoutes);
app.use('/api/appointments', appointmentsRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
