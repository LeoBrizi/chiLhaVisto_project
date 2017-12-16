/*
main dell'applicazione, gestore delle chiamate http che implentano la logica REST
*/
const costanti = require("./costanti.json");
var db = require("./dataBase_mod");
db.init(costanti.dataBase.ip,costanti.dataBase.porta);
var post = require("./post");

var express = require("express");
var app = express();
var port = process.env.PORT || costanti.defaultPort;

app.listen(port,function(){
    p = new post.Post(2,2,2,2,2,2,2,2);
    console.log(p.toString());
    db.aggiungiPost("34",p);
    
    console.log("Server running on port "+port);
})

