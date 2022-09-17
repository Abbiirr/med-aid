const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
//app.use(expressValidator());
app.use(express.urlencoded({ extended: false }));

app.use('/doctor', require('./routes/doctorRoutes'))
app.use('/Patient', require('./routes/PatientRoutes'));

app.listen(port, () => {
    console.log('listening on port ' + port);
})
