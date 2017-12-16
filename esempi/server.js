var express = require('express');
var app = express();
var path = require("path");
var engines = require('consolidate');

app.use(express.static(path.join(__dirname, 'views')));

app.engine('html', engines.mustache);
app.get('/', function (req, res) {
    res.render('index.html');
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Example app listening at port:', port);
});

