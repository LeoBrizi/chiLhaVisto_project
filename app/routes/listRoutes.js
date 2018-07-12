module.exports = function(app,request,amqp,querystring,io){
	
	const { body,validationResult } = require('express-validator/check');
	const { sanitizeBody } = require('express-validator/filter');
	const costanti = require("../../config/auth");
	const user= require('../models/listModels.js').Utente; 			//recuperiamo il modello degli utenti
	const post= require('../models/listModels.js').Post;			//recuperiamo il modello dei post
	const configBroker = require('../../config/amqp_const');
	
	function remove(array, element) {
		const index = array.indexOf(element);
		if (index !== -1) {
			array.splice(index, 1);
		}
		return array;
	}
	
	// PAGINA INIZIALE--------------------------------------------------
	app.get('/', function(req,res) {    
		res.render('index');
	});

	//LOGIN------------------------------------------------------------
	app.get('/login',function(req,res){
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
		var token_u;
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
			var info = JSON.parse(body);
			if(info.error === 'access_denied' && info.error_reason === 'user_denied'){
				res.redirect("/login");
			}			
			queryString = {
				access_token: info.access_token
			}
			token_u=info.access_token;
			request.get({url: 'https://graph.facebook.com/v3.0/me?fields=id,name,email', qs:queryString},function optionalCallback(err, httpResponse, body){
				if(err){
					return console.error('upload failed:', err);
				}
				var info = JSON.parse(body);
				//controllo se utente già nel db      		
				user.find({id: info.id}, function (err, result) {					//cerchiamo l'utente nel db
					if (err) return console.error(err);                     		//caso errore
					else if (!result.length) {										//se non già presente 
						//UTENTE INSERITO NEL DB------------------------
						var u= {
							id: info.id,
							token: token_u,
							name: info.name,
							email: info.email,
							phone: ''
						};
						console.log(u);
						var entry= new user(u);                          			//creata la entry
						entry.save(function (err) {                         		//salvata la entry sul db
							if (err) return console.error(err);             		//caso errore
							else console.log('inserito nel db');
						});
						res.redirect("/numero/"+info.id);							//reindirizzato su pagina per ottenere numero di telefono, da cui rimandato su profilo	
					}
					else {																							//se già presente  
						user.update({ id: info.id }, { token: token_u, email: info.email }, function(err, raw) {	//aggiorno info
							if (err) return console.error(err);
							console.log(raw);
							res.redirect("/profilo/"+info.id); 						//carico suo profilo
						});		
					}
				})	
			});
		});
	});
	
	//INSERIMENTO NUMERO CELLULARE---------------------------------------
	app.get('/numero/:id', function (req, res){
        res.render("number");
    });
    
    app.post('/numero/:id', [
		//verifichiamo che numero sia stato inserito correttamente
		body('numero').isLength({ min: 9, max:10 }).withMessage('Numero non inserito')
		.isAlphanumeric().withMessage('Inserire solo valori validi')
		.matches("[0-9]+").withMessage('Inserire solo valori numerici')
		.optional({ checkFalsy: true }).withMessage('Numero non inserito correttamente'),
        
        //optional=>verifica solo se effettivamente inserito il valore, checkFalsy: true => considero null e '' valori nulli
        //togliamo per ogni valore possibili spazi aggiuntivi
        sanitizeBody('*').trim(),
        //continuiamo la richiesta        
        (req, res)=> {
			//estraiamo gli errori della form
			const errors = validationResult(req);
			//prendiamo i dati ottenuti 
			var numero=req.body.numero;
			if (numero.data==null || numero.data=='') delete numero.data;
			if (!errors.isEmpty()) {
            // Ci sono degli errori: restituiamo la form nuovamente con valori puliti dagli spazi-errori segnalati.
				res.render('number', { errors: errors.array() });
				return;
			}
			else{
				//i dati sono validi
				var u_id=req.params.id; 					
				//NUMERO INSERITO NEL DB------------------------------
				user.update({ id: u_id }, { phone: numero }, function(err, raw) {	//aggiorno info
					if (err) return console.error(err);
					console.log(raw);
				});							
				res.redirect("/profilo/"+u_id);
			}
		}
    ]);
	//PROFILO-----------------------------------------------------------

	app.get('/profilo/:id',function(req,res){
		var u_id=req.params.id;
		user.findOne({id: u_id}, function (err, result) {           
			if (err) return console.error(err);            
			if (result.token=='') res.redirect("/");   		//controlliamo se entrato sul profilo da schermata login
			else {
				//RECUPERO POST UTENTE-------------------------------------
				post.find({ user_id: u_id }, function (err, results) {		//trovati tutti i post aventi user_id=u_id
					if (err) return console.error(err);                     //caso errore
					res.render('profile', {posts: results, id: u_id})
				})	
			}	
		})
	});

	//LOGOUT------------------------------------------------------------
	app.post('/profilo/:id', function(req,res) {
		user.update({ id: req.params.id }, { token: ''}, function(err, raw) {	//aggiorno info
			if (err) return console.error(err);
			console.log(raw);
			res.redirect("/"); 											
		});	
	});

    //NUOVO POST--------------------------------------------------------
    app.get('/nuovo_post/:id', function (req, res){						//da passare id user così che quando fatta post ho id user
		var u_id=req.params.id;
		user.findOne({id: u_id}, function (err, result) {           
			if (err) return console.error(err);            
			if (result.token=='') res.redirect("/");
			else{
				const tipoPostOpt = [{value: "Perso"}, {value: "Trovato"}];
				const catOpt= [{value: "Elettronica"}, {value: "Abbigliamento"},{value: "Cartoleria"},{value: "Altro"}];
				res.render('form', {tipoPostOpt: tipoPostOpt, catOpt: catOpt});
			}
		})
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
			var u_id=req.params.id;
			user.findOne({id: u_id}, function (err, result) {           
				if (err) return console.error(err);            
				if (result.token=='') res.redirect("/");
				else{
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
						città: req.body.citta,
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
						//i dati sono validi
						var u_id=req.params.id;  									//id utente che ha creato nuovo post
						var p_id='';
						//POST INSERITO NEL DB------------------------------
						info.user_id= u_id;
						info.user_em=result.email;
						console.log(info)
						var entry= new post(info);                          //creata la entry
						entry.save(function (err) {                         //salvata la entry sul db
							if (err) return console.error(err);             //caso errore
							else {
								console.log('inserito post nel db');
								p_id=entry._id;
								res.render('added', {id: u_id});
								//INSERIMENTO ENTRY IN CODA MESSAGGI PER RICERCA POST SIMILI
								amqp.connect(configBroker.url, function(err,connection){
									if (err) return console.error(err);
									connection.createChannel(function(err,channel){
										if (err) return console.error(err);
										var exchange = configBroker.exchange_search;
										var key = info.tipoPost;
										var msg = [{
											id: p_id,
											user: u_id,
											categoria :  info.categoria,
											data : info.data,
											citta : info.città
										}];
										channel.assertExchange(exchange,'topic', {durable:false});	//topic = tipo di exchange, durable false = la coda non sopravvive se il broker viene riavviato
										channel.publish(exchange,key, new Buffer(JSON.stringify(msg)));
										console.log("	Post sent to queue %s", key);
										console.log(JSON.parse(JSON.stringify(msg)));
									});
								});
							}
						});
						//condividi su facebook(chiamata REST)
						if (info.tipoPost=='Perso'){
							 //devo cercare il token dell'utente
							var message="In data: "+info.data+", ho smarrito "+info.sottoCategoria+
								" in "+info.luogo+", a "+info.città+". Potete aiutarmi a ritrovarlo? Grazie.";
							var options = {												
								url: 'https://graph.facebook.com/v2.11/'+u_id+'/feed/?message='+message+'&access_token='+result.token,
								method: 'POST',
								headers: {
									"Content-Type": "application/json"
								},
								json:true
							};
							request.post(options, function(error,response,body){
								if (!error && response.statusCode == 200) {
									console.log(body)
								}						
							});
						}
					}
				}
			})
		}
    ]);
    
    //ELIMINAZIONE POST DA DB:-------------------------
	app.get('/delete_post/:id', function (req, res){
		post.findOne({_id: req.params.id }, function (err,result) {     //ho bisogno dell'id utente (per reindirizzarlo poi sul profilo) e della lista dei post correlati          
            if (err) return console.error(err);            
			var u_id=result.user_id;
			var conn=result.connected; 
			post.find({ _id: { $in: conn} }, function(err, results) {	//aggiorno info post correlati (elimino questo post tra i loro correlati)
				if (err) return console.error(err);
				for (var i = 0; i <results.length; i++) {					//da recuperare post correllati
					results[i].connected=remove(results[i].connected, req.params.id ); 
					results[i].save();
					io.emit(results[i].user_id,"reload");
				} 	
				console.log('eliminato nei correlati!');
				post.deleteOne({ _id: req.params.id }, function (err) {		//elimino il post
					if (err) return console.error(err);            
					console.log('eliminato!');
					res.render('deleted', {id: u_id}); 					//avviso che è riuscita l'eliminazione
				});		
			});	
		});
	});
		
	app.get('/refresh/:utentiDaInformare',function(req,res){
		var utenti = req.params.utentiDaInformare.split(";");
		for (var i = 0; i < utenti.length; i++) {
			io.emit(utenti[i],"reload")
		}
		res.send("ok");
	})

}

