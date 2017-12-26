var express = require('express');
var app = express();

var request = require('request'); //per rispondere?!



var bodyParser = require("body-parser"); //per parsare il body della post
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/meteo', function(req, res){
  //1. Prelevo la città dalla form req.body.city vedi form_meteo.html
  //2. Faccio la chiamata REST a METEO_REST.COM --> http://localhost:3003/roma --> http://localhost:3003/ + req.body.city
  //3. Scrivo i dati su DB con chiamata REST --> scrivi_db()
  //4. Rispondo all'utente  res.send...	
  
  var città = req.body.city; //body è il body della POST
  console.log("città ricevuta "+città);
  var urlli = 'http://127.0.0.1:3003/get_temp?city='+città; //questa è l'URL del server meteo simulato da meteo_rest.js
  request({
    url: urlli, //URL to hit    
    method: 'GET'
    }, function(error, resp, body){
        if(error) {
            console.log(error);
        } else {   //quando il server meteo risponde senza errore scivo sul DB e rispondo al client
            var json = JSON.parse(body); //questo serve per parsare il json che manda il server del meteo
            var val = json.value;
            console.log(body);
            console.log("valore preso in invio al server database "+val);
            scrivi_db(città,val); //scrive sul db (sorriso ammiccante di giorgio)
            res.send(val); //risponde al client stesso sorriso ;)
        }
    });
});

function scrivi_db(city, val){
// curl -X PUT http://127.0.0.1:5984/my_database/"001" -d '{ " city " : city , " val" :val }'
console.log("iniziamo a scrivere nel database "+city+val);
request({
    url: 'http://127.0.0.1:5984/my_database', //URL di couch db, bisogna avere couchDB dulla porta 5984 con un database creato che si chiama my_database
    method: 'POST',
    json: true, //per dire che il body è un json
    //body: 'Hello Hello! String body!' //Set the body as a string
    body:{"city":city,"val":val} //il body in formato json
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});

}

app.listen(3000);
