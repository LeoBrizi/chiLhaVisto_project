module.exports = function(app,request,querystring){
	
	const { body,validationResult } = require('express-validator/check');
	const { sanitizeBody } = require('express-validator/filter');
	const costanti = require("../../config/auth");

	// PAGINA INIZIALE--------------------------------------------------
	
	app.get('/', function(req,res) {    
		res.render('index');
	});
	
	//LOGIN-------------------------------------------------------------

	app.get('/login',function(req,res){
		res.render("login");
	});
	
	app.get('/login/facebook',function(req,res){
		
		var urlfb = costanti.facebookAuth.urlFb;
		
		var query = querystring.stringify({
			client_id: costanti.facebookAuth.clientID,
    		redirect_uri: costanti.facebookAuth.callbackURL,
			response_type : 'code',
			scope: costanti.facebookAuth.permissions
		});
		res.redirect(urlfb + query);
	});

	app.get('/callbackfacebook',function(req,res){
  		var queryString = {
    		code: req.query.code,
    		client_id: costanti.facebookAuth.clientID,
    		client_secret: costanti.facebookAuth.clientSecret,
    		redirect_uri: costanti.facebookAuth.callbackURL,
  		}
		request.get({url: 'https://graph.facebook.com/v2.11/oauth/access_token', qs: queryString}, function optionalCallback(err, httpResponse, body) {
  			if (err) {
   				return console.error('upload failed:', err);
  			}
  			console.log('Upload successful!  Server responded with:', body);
			var info = JSON.parse(body);
			if(info.error === 'access_denied' && info.error_reason === 'user_denied'){
				res.redirect("/login");
			}
			//res.send("Got the token "+ info.access_token);
			//salvare dB??
			queryString = {
				access_token: info.access_token
			}
			console.log(queryString);
			request.get({url: 'https://graph.facebook.com/me', qs:queryString},function optionalCallback(err, httpResponse, body){
				if(err){
					return console.error('upload failed:', err);
				}
				var info = JSON.parse(body);
				console.log(info);
				//se non già presente salvare info utente (id, nome, token, email) su db e reindirizzarlo su pagina per ottenere numero di telefono, da cui rimandato su profilo; se già presente caricare suo profilo (ha senso aggiornare info?)
				res.redirect("/profilo/"+info.id);
				});
			});
	});
	
	//PROFILO-----------------------------------------------------------

	app.get('/profilo/:id',function(req,res){
		
		//res.render('profilo'); 
		res.send("profilo utente"+u_id);									
		
        //RECUPERO POST UTENTE-------------------------------------
        var u_id=req.params.id;   									
        var post= require('../models/listModels.js').Post;          //recuperiamo il modello dei post
        post.find({ user_id: u_id }, function (err, result) {		//trovati tutti i post aventi user_id=u_id
            if (err) return console.error(err);                     //caso errore
            //fai qualcosa con post trovati=result
        })

        //altro...        
	});

    //NUOVO POST--------------------------------------------------------

    app.get('/nuovo_post/:id', function (req, res){
		const tipoPostOpt = [{value: "Perso"}, {value: "Trovato"}];
		const catOpt= [{value: "Elettronica"}, {value: "Abbigliamento"},{value: "Cartoleria"},{value: "Altro"}];
        res.render('form', {tipoPostOpt: tipoPostOpt, catOpt: catOpt});
        //da passare id user così che quando fatta post ho id user
    });

    app.post('/nuovo_post/:id', [
		
		//verifichiamo che città e data siano state inserite correttamente
		body('citta').isLength({ min: 1 }).trim().withMessage('Città non inserita.')
		.isAlpha().withMessage('La città deve essere composta da sole lettere'),
        body('data', 'Data in formato non valido').optional({ checkFalsy: true }).isISO8601(),
        
        //optional=>verifica solo se effettivamente inserito il valore, checkFalsy: true => considero null e '' valori nulli
        
        //togliamo per ogni valore possibili spazi aggiuntivi
        sanitizeBody('*').trim(),
        
        //continuiamo la richiesta        
        (req, res)=> {
			
			const tipoPostOpt = [{value: 'Perso'}, {value: 'Trovato'}];
			const catOpt= [{value: "Elettronica"}, {value: 'Abbigliamento'},{value: 'Cartoleria'},{value: 'Altro'}];
		
			//estraiamo gli errori della form
			const errors = validationResult(req);
			
			//prendiamo i dati ottenuti 
			var info= {
				tipoPost: req.body.tipoPost,
				categoria: req.body.categoria,
				sottoCategoria: req.body.sottoCategoria,
				data: req.body.data,
				citta: req.body.citta,
				luogo: req.body.luogo,
				descrizione: req.body.descrizione,
				ricompensa: req.body.ricompensa		
			};
			
			if (info.data==null || info.data=='') delete info.data;
			
			if (info.tipoPost=='Trovato') delete info.ricompensa;
			 
			if (!errors.isEmpty()) {
            // Ci sono degli errori: restituiamo la form nuovamente con valori puliti dagli spazi-errori segnalati.
				res.render('form', { tipoPostOpt: tipoPostOpt, catOpt: catOpt, info:info, errors: errors.array() });
				return;
			}
			else{
				res.send(info);
				console.log(info);
				//i dati sono validi
				
				/* TUTTO COMMENTATO FINCHè NON PASSATO ID (SENNò NON COMPILA)
				* var u_id=req.params.id; ; 						//id utente che ha creato nuovo post
       
				//POST INSERITO NEL DB------------------------------
				var post= require('../models/listModels.js').Post;  //recuperiamo il modello dei post
				info.user_id= u_id;                                 //aggiungiamo all'oggetto JSON l'utente 
				info.user_em= 				//da db!
				var entry= new post(info);                          //creata la entry
				entry.save(function (err) {                         //salvata la entry sul db
					if (err) return console.error(err);             //caso errore
				});
				*/
				//parte di codice per inserire la entry in coda+condividi su facebook(chiamata REST)
			}
		}
    ]);
    
    /*ELIMINAZIONE POST DA DB (da scegliere route-metodo):--------------
     *  var post= require('../models/listModels.js').Post;
     *  post.deleteOne({<query>}, function (err) {                
            if (err) return console.error(err);            
            else console.log('eliminato!');
        });
	*/
		
	//LOGOUT------------------------------------------------------------
	
	app.get('/logout', function(req,res) {
		res.redirect('/');
	});

}

