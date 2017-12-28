module.exports = function(app){
	// var db = require(dataBase_mod.js);
	// var oauthLogin = require(--);

	// PAGINA INIZIALE--------------------------------------------------
	
	app.get('/', function(req,res) {    //restituiamo index.html in views
		res.render("index.html");
		
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
