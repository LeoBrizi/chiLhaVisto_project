
module.exports = function(app){
	
	const { body,validationResult } = require('express-validator/check');
	const { sanitizeBody } = require('express-validator/filter');

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
	
	app.get('/profilo/:id',function(req,res){
		
		//res.render('profilo'); 
		if (req.id=='nuovo_post') next();
    
        //RECUPERO POST UTENTE-------------------------------------
        var u_id=req.id;                                            //id utente che ha creato nuovo post
        var post= require('../models/listModels.js').Post;          //recuperiamo il modello dei post
        post.find({ user_id: u_id }, function (err, result) {		//trovati tutti i post aventi user_id=u_id
            if (err) return console.error(err);                     //caso errore
            //fai qualcosa con post trovati=result
        })

        //altro...        

	});

    //NUOVO POST--------------------------------------------------------

    app.get('/nuovo_post', function (req, res){
		const tipoPostOpt = [{value: "Perso"}, {value: "Trovato"}];
		const catOpt= [{value: "Elettronica"}, {value: "Abbigliamento"},{value: "Cartoleria"},{value: "Altro"}];
        res.render('form', {tipoPostOpt: tipoPostOpt, catOpt: catOpt});
        //da passare id user così che quando fatta post ho id user
    });

    app.post('/nuovo_post', [
		
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
				* var u_id=; //id utente che ha creato nuovo post
       
				//POST INSERITO NEL DB------------------------------
				var post= require('../models/listModels.js').Post;  //recuperiamo il modello dei post
				info.user_id= u_id;                                 //aggiungiamo all'oggetto JSON l'utente 
				info.user_em= //chiamata rest a fb!
				var entry= new post(info);                          //creata la entry
				entry.save(function (err) {                         //salvata la entry sul db
					if (err) return console.error(err);             //caso errore
				});
				*/
				//parte di codice per inserire la entry in coda
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
		//res.redirect('/');
	});

}

