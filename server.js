/*
main dell'applicazione, fa il set up del server
*/
const costanti = require("./config/costanti.json");

var express = require("express");
var app = express();
var port = process.env.PORT || costanti.defaultPort;
var path = require("path");
var engines = require('consolidate');

app.use(express.static(path.join(__dirname,'views')));

app.engine('html',engines.mustache); //per adesso usiamo questo i vorei utilizzare pug

var routes = require('./app/routes/listRoutes');   //importa routes, gestore delle chiamate http
routes(app);

app.listen(port,function(){
    console.log("Server running on port "+port);
})

