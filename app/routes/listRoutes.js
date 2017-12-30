
module.exports = function(app, passport){

	// PAGINA INIZIALE--------------------------------------------------
	
	app.get('/', function(req,res) {    
		res.render('index');
	});
	
	//LOGIN-------------------------------------------------------------

	app.get('/login',function(req,res){
		res.render("login");
	});

	app.post('/login',function(req,res){

	});
	
	//PROFILO-----------------------------------------------------------
	
	app.get('/profilo',isLoggedIn, function(req,res){
		/*res.render('profilo', {
            user : req.user // passaggio dell'utente per mostrargli il proprio profilo
        });*/
	});
	
	//LOGOUT------------------------------------------------------------
	
	app.get('/logout', function(req,res) {
		req.logout();		//disponibile da passport
		res.redirect('/');
	});

}

function isLoggedIn(req,res,next){
	
	if(req.isAuthenticated())
		return next();		// se l'utente è autenticato, la sessione può continuare
		
	res.redirect('/');		//altrimenti viene rediretto alla home page
}
