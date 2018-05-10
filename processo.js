const costanti = require("./config/cost_proc");
var request = require('request'); 

//parte riguardante code
//recupero info post
//RICERCA POST SIMILI-----------------------------------------

var amqp = require('amqplib/callback_api');
const configBroker = require('./config/amqp_const');

amqp.connect(configBroker.url, function(err,connection){
    connection.createChannel(function(err,channel){
        var exchange = configBroker.exchange_search;
        channel.assertExchange(exchange,'topic',{durable: false});

        //Due code: post ritrovati e post oersi
        channel.assertQueue('codaPersi',{exclusive: true}, function(err,q){     //exclusive = coda esistente finché processo non muore
            channel.bindQueue(q.queue, exchange, 'Perso');
            channel.consume(q.queue,function(msg){
                console.log(" [x] Received");
                post = JSON.parse(msg.content);
                console.log(JSON.stringify(post));
                //RICERCA POST--------------------------------
                //INVIO RISULTATI-----------------------------
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
                //INVIO RISULTATI-----------------------------
                //parte di ari ancora da implementare
            }, {noAck: true});
        });
    });
});

//INVIO MESSAGGIO---------------------------------------------
var data = {												//body della request
	"from": "chiLhaVisto",
	"text": "Abbiamo nuovi post che fanno al caso tuo! Vieni a controllare!",
	//"to": TO_NUMBER,		numero da prendere da db
	"api_key": costanti.api_key,
	"api_secret": costanti.api_secret						//da recuperare da costanti
}

var options = {												//opzioni della request
    url: 'https://rest.nexmo.com/sms/json',
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: data,
    json:true
};

function callback(error, response, body) {					//callback rischiesta
    if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(body));
    }
    else console.log("Error: message to"+ /*NUMBER*/ +"not sent");
}

request(options, callback);									//chiamata rest (POST)

     

