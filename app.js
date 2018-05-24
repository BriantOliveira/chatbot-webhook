/*********************************
*     WEBHOOK CHATBOT API
*********************************/

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const expressSanitizer = require('express-sanitizer');
const API_KEY = process.env.SECRETKEY;

//Initializing server
const app = express();

//Defining the PORT connection
const PORT = process.env.PORT || 3000

//Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSanitizer());

//ROUTE LOAD
require('./controler/webhook.js')(app);

//Port Listener
app.listen(PORT, function() {
  console.log('WEBHOOK API LISTENING ON PORT', PORT);
});
