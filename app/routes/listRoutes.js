module.exports = function(app){
	// var db = require(dataBase_mod.js);
	// var oauthLogin = require(--);
	var fs = require('fs');
	
	// PAGINA INIZIALE--------------------------------------------------
	
	app.get('/', function(req,res) {    //restituiamo index.html in views
		fs.readFile('../../../views/index.html', function(err,data){
			 res.writeHead(200, {'Content-Type': 'text/html'});
			 res.write(data);
			 res.end();
		});
	});
	
	//LOGIN-------------------------------------------------------------
	
	app.get('/loginfacebook', function(req,res) {
		//
	});
	
	app.get('/logingoogle', function(req,res) {
		//
	});
	
	// altri tipi di login qui
	
	//LOGOUT------------------------------------------------------------
	
	app.get('/logout', function(req,res) {
		//
	});
	
	//GESTIONE DEI POST-------------------------------------------------
	
	app.get('/scrivipost', function(req,res) {
		//l'utente viene indirizzato su una pagina con un form per compilare il post
	});
	
	app.post('/scrivipost/invia',function(req,res) {
		//l'utente invia la form compilata del post
	});
	
}
