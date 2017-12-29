/*
main dell'applicazione, fa il set up del server
*/
const costanti = require("./config/costanti.json");

var express = require("express");
var app = express();

var port = process.env.PORT || costanti.defaultPort;

var path = require("path");

var mongoose = require('mongoose');  //va configurato

var passport = require('passport');

const pug = require('pug');

var bodyParser = require("body-parser"); //per parsare il body della post
app.use(bodyParser.urlencoded({ extended: false }));



app.set('view engine', 'pug');

var routes = require('./app/routes/listRoutes');   //importa routes, gestore delle chiamate http
routes(app);

app.listen(port,function(){
    console.log("Server running on port "+port);
})

