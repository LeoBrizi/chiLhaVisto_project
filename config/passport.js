
var FBStrategy = require('passport-facebook').Strategy;		//usata per autenticarsi su facebook e gestire la callback

var configAuth = require('./auth');

module.exports = function(passport) {
	
	//FACEBOOK----------------------------------------------------------
	passport.use(new FBStrategy({
		
		//caricihiamo i dati della nostra app
		clientID		: configAuth.facebookAuth.clientID,
		clientSecret	: configAuth.facebookAuth.clientSecret,
		callbackURL		: configAuth.facebookAuth.callbackURL
		
		},
		
		function(token, refreshToken, profile, done){
			
	
}

