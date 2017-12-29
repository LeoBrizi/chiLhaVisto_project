module.exports = function(app, passport){
	// var db = require(dataBase_mod.js);
	// var oauthLogin = require(--);

	// PAGINA INIZIALE--------------------------------------------------
	
	app.get('/', function(req,res) {    //restituiamo index.html in views
		res.render("index.html");
		
	});
	
	//LOGIN-------------------------------------------------------------
	
	app.get('/login', function(req,res) {
		//
	});
	
	//PROFILO-----------------------------------------------------------
	
	app.get('/profile',function(req,res)){
		//
	});
	
	//LOGOUT------------------------------------------------------------
	
	app.get('/logout', function(req,res) {
		req.logout();		//disponibile da passport
		res.redirect('/');
	});
	
	//GESTIONE DEI POST-------------------------------------------------
	
	app.get('/scrivipost', function(req,res) {
		//l'utente viene indirizzato su una pagina con un form per compilare il post
	});
	
	app.post('/scrivipost',function(req,res) {
		//l'utente invia la form compilata del post
	});
	
}

function isLoggedIn(req,res,next){
	
	if(req.isAuthenticated())
		return next();		// se l'utente è autenticato, la sessione può continuare
		
	res.redirect('/');		//altrimenti viene rediretto alla home page
}
