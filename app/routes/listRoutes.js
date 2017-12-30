
module.exports = function(app){

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
	
	app.get('/profilo',function(req,res){
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

