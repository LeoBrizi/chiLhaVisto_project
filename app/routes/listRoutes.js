
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
	
	//controlliamo se id_user è presente in db (quindi se esiste)
	app.param('id', function(req, res, next, u_id) {
		var user= require('../models/listModels.js').Utente; 			//recuperiamo il modello degli utenti
		user.find({facebook: {id: u_id}}, function(err, result) {		//cerchiamo un utente con l'id passato
			if (err) {													//in caso di errore
				//possibile notifica broswer
				res.redirect('/'); 
			} else if (!result.length) {								//se non ha trovato nessuno
				//possibile notifica broswer
				res.redirect('/'); 
			} else {													//esiste un utente con questo id!
				next();													//continua il caricamento del profilo (app.get('/profilo/:id))
			}
		});
	});

	app.get('/profilo/:id',function(req,res){
		
		//res.render('profilo'); 
    
        //RECUPERO POST UTENTE-------------------------------------
        var u_id=req.id;                                             //id utente che ha creato nuovo post
        var post= require('../models/listModels.js').Post;           //recuperiamo il modello dei post
        var posts= post.find({ user_id: u_id }, function (err) {     //trovati tutti i post aventi user_id=u_id
            if (err) return console.error(err);                      //caso errore
        })

        //altro...        

	});

    //NUOVO POST--------------------------------------------------------

    app.get('/profilo/nuovo_post', function (req, res){
        //res.render("form");
        //da passare id user così che quando fatta post ho id user
    });

    app.post('/profilo/nuovo_post', function (req, res){
        /*
         * TUTTO COMMENTATO FINCHè NON PASSATO ID (SENNò NON COMPILA)
         * var u_id=; //id utente che ha creato nuovo post
       
        //POST INSERITO NEL DB------------------------------
        var post= require('../models/listModels.js').Post;  //recuperiamo il modello dei post
        var info = JSON.parse(req.body);                    //mettiamo le info del post in formato JSON
        info.user_id= u_id;                                 //aggiungiamo all'oggetto JSON l'utente 
        var entry= new post(info);                          //creata la entry
        entry.save(function (err) {                         //salvata la entry sul db
            if (err) return console.error(err);             //caso errore
        });
		*/
        //parte di codice per inserire la entry in coda
    });
    
    /*ELIMINAZIONE POST DA DB (da scegliere route-metodo):
     *  var post= require('../models/listModels.js').Post;
     *  post.deleteOne({<query>}, function (err) {                
            if (err) return console.error(err);            
            else console.log('eliminato!');
        });
	*/
		
	//LOGOUT------------------------------------------------------------
	
	app.get('/logout', function(req,res) {
		//res.redirect('/');
	});

}

