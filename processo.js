const costanti = require("./config/cost_proc");
const serverCostanti = require("./config/costanti");
const configBroker = require('./config/amqp_const');
const posts= require('./app/models/listModels.js').Post;			//recuperiamo il modello dei post
const user= require('./app/models/listModels.js').Utente; 			//recuperiamo il modello degli utenti

var request = require('request'); 

var mongoose = require('mongoose');  
var configDB = require('./config/database.js');

//CONNESSIONE DATABASE
mongoose.Promise = global.Promise; 
mongoose.connect(configDB.url, {useMongoClient: true},function(err, db) {
    if (err) {
        console.log('Unable to connect to the database. Please start the db. Error:', err);
    } else {
        console.log('Connected to database successfully!');
    }
}); // connesso al database

//funzione per riportare stringa in formato Date
function StringToDate(date){
	var parts =date.split('-');
	// JavaScript conta i mesi da 0
	var mydate = new Date(parts[0], parseInt(parts[1]) - 1, parseInt(parts[2])+1 ); 
	return mydate;
}

//callback richiesta sms
function callback(error, response, body) {					
    if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(body));
    }
    else console.log("Error: message not sent");
}

//find nelle code
function findCorr(post, tipo, queryData) {
    var utentiDaInformare = post.user;
	posts.find({ tipoPost: tipo, categoria: post.categoria, user_id: { $ne: post.user}, data: queryData, città: { $in: [(post.citta).toUpperCase(), post.citta.toLowerCase(), post.citta.charAt(0).toUpperCase() + post.citta.slice(1).toLowerCase()]} }, function (err, results) {		//trovati tutti i post correlati
		if (err) return console.error(err); //caso errore
		console.log(results);
        var conn=[];                     
		for (var i = 0; i <results.length; i++) {			
			results[i].connected=results[i].connected.concat(post.id);
			results[i].save();
			conn=conn.concat(results[i]._id);
            //INVIO MESSAGGIO-------------------------------------------
            utentiDaInformare = utentiDaInformare+';'+results[i].user_id
			user.findOne({ id: results[i].user_id}, function (err, res){
				if (err) return console.error(err);
				var numero = 39+res.phone;
				var url = 'https://rest.nexmo.com/sms/json?'+"api_key="+costanti.api_key+"&api_secret="+costanti.api_secret+"&to="+numero+"&from=chiLhaVisto"+"&text=Abbiamo nuovi post che fanno al caso tuo! Vieni a controllare!"
				/*request.post(url, function(error,response,body){
					if (!error && response.statusCode == 200) {
						console.log(body)
					}						
                });		//chiamata rest per sms (POST)
                */
			})
		}
		console.log('Aggiunto post ai correlati');
		posts.update({ _id: post.id }, { connected: conn }, function(err, raw) {	//aggiorno info
			if (err) return console.error(err);
			console.log('Aggiunti correlati');
        })											
        url= 'http://'+serverCostanti.ipServer+":"+serverCostanti.defaultPort+"/refresh/";
        request.get(url+utentiDaInformare, function(error,response,body){
            if (!error && response.statusCode == 200) {
                console.log(body)
            }						
        })
    })
}

//CODE--------------------------------------------------------

var amqp = require('amqplib/callback_api');

amqp.connect(configBroker.url, function(err,connection){
    connection.createChannel(function(err,channel){
        var exchange = configBroker.exchange_search;
        channel.assertExchange(exchange,'topic',{durable: false});

        //Due code: post ritrovati e post persi
        channel.assertQueue('codaPersi',{exclusive: true}, function(err,q){     //exclusive = coda esistente finché processo non muore
            channel.bindQueue(q.queue, exchange, 'Perso');
            channel.consume(q.queue,function(msg){
                console.log(" [x] Received");
                post = JSON.parse(msg.content);
                console.log(JSON.stringify(post));
                //RICERCA POST--------------------------------
                findCorr(post[0], 'Trovato', { $gte: StringToDate(post[0].data) });
                //parte di ari ancora da implementare
            }, {noAck: true});
        });

        channel.assertQueue('codaTrovati',{exclusive: true}, function(err,q){     //exclusive = coda esistente finché processo non muore
            channel.bindQueue(q.queue, exchange, 'Trovato');
            channel.consume(q.queue,function(msg){
                console.log(" [x] Received");
                post = JSON.parse(msg.content);
                console.log(JSON.stringify(post));
                //RICERCA POST--------------------------------
                findCorr(post[0], 'Perso', { $lte: StringToDate(post[0].data) });
                //parte di ari ancora da implementare
            }, {noAck: true});
        });
    });
});




     

