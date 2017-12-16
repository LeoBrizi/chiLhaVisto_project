/*
main dell'applicazione, fa il set up del server
*/
const costanti = require("./costanti.json");
var db = require("./dataBase_mod");
db.init(costanti.dataBase.ip,costanti.dataBase.porta);
var post = require("./post");

var express = require("express");
var app = express();
var port = process.env.PORT || costanti.defaultPort;

var routes = require('./app/routes');   //importa routes, gestore delle chiamate REST
routes(app);

app.listen(port,function(){
    p = new post.Post(2,2,2,2,2,2,2,2);
    console.log(p.toString());
    db.aggiungiPost("34",p);
    
    console.log("Server running on port "+port);
})

