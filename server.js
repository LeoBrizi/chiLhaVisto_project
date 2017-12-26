/*
main dell'applicazione, fa il set up del server
*/
const costanti = require("./config/costanti.json");

var express = require("express");
var app = express();
var port = process.env.PORT || costanti.defaultPort;

var routes = require('./app/routes/listRoutes');   //importa routes, gestore delle chiamate REST
routes(app);

app.listen(port,function(){
    console.log("Server running on port "+port);
})

