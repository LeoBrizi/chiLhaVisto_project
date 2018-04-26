
module.exports = function(app,request,querystring){

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
		res.send("ma li meglio morti tua");
        console.log("sono vivo");
		
	});
	
	//LOGOUT------------------------------------------------------------
	
	app.get('/logout', function(req,res) {
		req.logout();		//disponibile da passport
		res.redirect('/');
	});

	app.get('/login/facebook',function(req,res){

		var urlfb = 'https://www.facebook.com/v2.11/dialog/oauth?';
		
		var query = querystring.stringify({
			client_id: '1857911927781379',
    		redirect_uri: 'http://localhost:3000/callbackfacebook',
			response_type : 'code',
			scope:'public_profile,email,publish_actions'
		});
		res.redirect(urlfb + query);
	});

	app.get('/callbackfacebook',function(req,res){
		var c_id = '1857911927781379';
  		var queryString = {
    		code: req.query.code,
    		client_id: c_id,
    		client_secret: '4e008a8e293d41d2cd18183da951651f',
    		redirect_uri: 'http://localhost:3000/callbackfacebook',
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
				res.redirect("/profilo?id="+info.id);
				});
			});
	});
}

