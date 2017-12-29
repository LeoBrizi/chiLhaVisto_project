module.exports = function(app){

	// PAGINA INIZIALE--------------------------------------------------
	
	app.get('/', function(req,res) {    
		res.render('index');
	});
	
	//LOGIN-------------------------------------------------------------

	app.get('/login',function(req,res){
		//res.render("login.html");
		res.render("login");
	});
	// altri tipi di login qui
	app.post('/login',function(req,res){

	});
	
	//LOGOUT------------------------------------------------------------
	
	app.get('/logout', function(req,res) {
		//
	});
	
	//gestione del profilo utente
	app.get('/profilo',function(req,res){

	});
	
}
