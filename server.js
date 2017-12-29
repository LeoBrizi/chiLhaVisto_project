/*
main dell'applicazione, fa il set up del server
*/
const costanti = require("./config/costanti");

var express = require("express");
var app = express();

var port = process.env.PORT || costanti.defaultPort;

var path = require("path");

var mongoose = require('mongoose');  
var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connesso al database

var passport = require('passport');
require('./config/passport')(passport); // passato passport per configurarlo

var session = require('express-session');

const pug = require('pug');

var bodyParser = require("body-parser"); //per parsare il body della post
app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'pug');

//PASSPORT SET-UP-------------------------------------------------------
app.use(session({secret: 'itremoschettieri'}));		//per stabilire le sessioni con gli utenti
app.use(passport.initialize());
app.use(passport.session());	//invocato ad ogni richiesta: verifica se lo user è autenticato

var routes = require('./app/routes/listRoutes');   //importa routes, gestore delle chiamate http
routes(app,passport); //passati app e passport per essere usati in routes

//LANCIO SERVER-------------------------------------------------------
app.listen(port,function(){
    console.log("Server running on port "+port);
})

