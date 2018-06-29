/*
main dell'applicazione, fa il set up del server
*/
const costanti = require("./config/costanti");
const querystring = require('querystring');
var express = require("express");
var app = express();
var request = require("request");
var mongoose = require('mongoose');  
var configDB = require('./config/database.js');
var amqp = require('amqplib/callback_api');
const configBroker = require('./config/amqp_const');
var pug = require('pug');
var bodyParser = require("body-parser");  //per parsare il body della post
var routes = require('./app/routes/listRoutes');   //importa routes, gestore delle chiamate http
var socket = require('socket.io');

var port = process.env.PORT || costanti.defaultPort;

//CONNESSIONE DATABASE
mongoose.Promise = global.Promise; 
mongoose.connect(configDB.url, {useMongoClient: true},function(err, db) {
    if (err) {
        console.log('Unable to connect to the database. Please start the db. Error:', err);
    } else {
        console.log('Connected to database successfully!');
    }
}); // connesso al database

//TEST RABBITMQ MESSAGE BROKER RUNNING----------------------------------
amqp.connect(configBroker.url,function(err, conn) {
    if (err) {
        console.log('Unable to connect to the message broker. Please start it. Error:', err);
    } else {
        console.log('RabbitMQ message broker is running!');
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');

//LANCIO SERVER-------------------------------------------------------
var server = app.listen(port,function(){
    console.log("Server running on port "+port);
})

var io = socket(server);

routes(app,request,amqp,querystring,io); //passati app e passport per essere usati in routes

const user= require('./app/models/listModels.js').Utente; 			//recuperiamo il modello degli utenti
const post= require('./app/models/listModels.js').Post;			//recuperiamo il modello dei post
	

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('reload',function(data){
        var conn=[];
        console.log('è arrivato un messaggio di reload da:'+data)
        post.find({ user_id: data }, function (err, results) {		//trovati tutti i post aventi user_id=u_id
            if (err) return console.error(err);
            for (var j = 0; j <results.length; j++) {					//da recuperare post correllati
                conn=conn.concat((results[j].connected));
            } 
            post.find({ _id: { $in: conn} }, function (err, conn_p) {	//trovati tutti i post 
                if (err) return console.error(err);                     //caso errore
                socket.emit(data,conn_p) 
            })
        })
    })
});