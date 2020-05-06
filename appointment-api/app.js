const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middlewares
app.use(bodyParser.json());
app.use(cors());

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('connected to DB!');
    }   
);

//Import routes
const appointmentRoute = require('./Routes/appointment');
app.use('/', appointmentRoute);

//Deployment on Heroku
app.listen(process.env.PORT || 8000, function() {
    console.log('Listening to default PORT')
});