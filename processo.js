const costanti = require("./config/cost_proc");
var request = require('request'); 

//parte riguardante code
//recupero info post
//RICERCA POST SIMILI-----------------------------------------

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

     

