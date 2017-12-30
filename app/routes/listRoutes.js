
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
	
	app.get('/profilo',isLoggedIn,function(req,res){
		//da fare funzione che controlla se loggato o da eliminare isLoggedIn
	});
	
	//LOGOUT------------------------------------------------------------
	
	app.get('/logout', function(req,res) {
		//
	});

}
