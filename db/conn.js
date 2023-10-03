const mongoose = require('mongoose');
const DB = 'mongodb+srv://appointmentsystem:rohanappointmentsystem@details.vycdzht.mongodb.net/newAppointmentdetails?retryWrites=true&w=majority';
mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
},)
    .then(() => console.log('connection successful'))
    .catch((err) => { console.log('No connection', err); });