require('dotenv').config({silent :true}); //process.env



const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./helpers/errorhandler.js');
const jwt = require('./helpers/jwt.js');

// busboy middleware for express
const busboy = require('connect-busboy');

const mongoose = require('mongoose');
const dbConfig = require('./config/config.json');
//setting middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(busboy({
    highWaterMark: 10 * 1024 * 1024, // Set 10MiB buffer
})); // Insert the busboy middle-ware

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }
  next()
})
mongoose.connect(dbConfig.connectionString, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// global error handler
app.use(errorHandler);

//include router

let films = require('./route/films.js');
let admin = require('./route/admin.js');
let user = require('./route/user.js');
app.use('/api/films',films);
app.use('/api/admin',admin);
app.use('/api/user',user);




app.listen(process.env.port, () => {
 console.log("Server running on port ",process.env.port);
});