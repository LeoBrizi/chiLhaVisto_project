/*
main dell'applicazione, fa il set up del server
*/
const costanti = require("./config/costanti.json");

var express = require("express");
var app = express();
var port = process.env.PORT || costanti.defaultPort;
var path = require("path");
var engines = require('consolidate');
var mongoose = require('mongoose');  //va configurato
var passport = require('passport');
var session = require('express-session');

app.use(bodyParser());

app.use(express.static(path.join(__dirname,'views')));

app.engine('html',engines.mustache); //per adesso usiamo questo i vorei utilizzare pug

//PASSPORT SET-UP-------------------------------------------------------
app.use(session({secret: 'itremoschettieri'}));		//per stabilire le sessioni con gli utenti
app.use(passport.initialize());
app.use(passport.session());	//invocato ad ogni richiesta: verifica se lo user è autenticato

var routes = require('./app/routes/listRoutes');   //importa routes, gestore delle chiamate http
routes(app,passport);

app.listen(port,function(){
    console.log("Server running on port "+port);
})

