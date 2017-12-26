//questo simula un server meteo con i suoi servizi rest

var express = require('express');
var app = express();


var bodyParser = require("body-parser"); //per parsare il body della post
app.use(bodyParser.urlencoded({ extended: false }));

//questi sono dei valori di esempio che simulano un database
var obj ={ 
		"cities": [
        {
            "name": "Roma",
            "value": "33",
        },
		{
            "name": "Milano",
            "value": "34",
        },
    ]
};

app.get('/roma', function (req, res) { // http://localhost:3003/roma
  console.log("chiamata avvenuta per roma");
  res.send(obj.cities[0]); //questo restituisce un file json
});

app.get('/get_temp', function (req, res) { // i parametri con la get si passano con ?nome=valore dopo l'url
  //1. prendi la città dal parametro city della get
  //2. acceddi all''oggetto corrispondente es: obj.cities[0].value nel caso di Roma
  //3. resituisci il valore

  var città = req.query.city; //query serve per prendere i valori dall'url
  if(città == 'Roma')
    res.send(obj.cities[0]);
  else
    res.send(obj.cities[1]);
});


app.post('/', function (req, res) { //questa bho, fa fico ;D
  res.send('è una post');
});


var server = app.listen(3003, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
