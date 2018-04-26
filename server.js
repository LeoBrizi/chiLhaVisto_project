/*
main dell'applicazione, fa il set up del server
*/
const costanti = require("./config/costanti");

const querystring = require('querystring');

var express = require("express");
var app = express();

var request = require("request");

var port = process.env.PORT || costanti.defaultPort;

var mongoose = require('mongoose');  
var configDB = require('./config/database.js');
//mongoose.connect(configDB.url); // connesso al database

var pug = require('pug');

var bodyParser = require("body-parser"); //per parsare il body della post
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');

var routes = require('./app/routes/listRoutes');   //importa routes, gestore delle chiamate http
routes(app,request,querystring); //passati app e passport per essere usati in routes

//LANCIO SERVER-------------------------------------------------------
app.listen(port,function(){
    console.log("Server running on port "+port);
})

