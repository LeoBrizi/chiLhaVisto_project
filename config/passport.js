
var FBStrategy = require('passport-facebook').Strategy;		//usata per autenticarsi su facebook e gestire la callback

var user = require('../app/models/Utente');					//prendiamo il modello di utente del db

var configAuth = require('./auth');

module.exports = function(passport) {
	
	passport.serializeUser(function(user,done){
		done(null,user.id);
	});
	
	passport.deserializeUser(function(id,done){
		User.findById(id,function(err,user){
			done(err,user);
		});
	});
	
	//FACEBOOK----------------------------------------------------------
	passport.use(new FBStrategy({
		
		//caricihiamo i dati della nostra app
		clientID		: configAuth.facebookAuth.clientID,
		clientSecret	: configAuth.facebookAuth.clientSecret,
		callbackURL		: configAuth.facebookAuth.callbackURL
		
		},
		
		function(token, refreshToken, profile, done){
			//facebook ci restituirà il token di accesso e il profilo
			
			}
			process.nextTick(function() {
				//questo utente è registrato nel nostro database?
				user.findOne({'facebook.id' : profile.id}, function(err,user){
					
					if(err)
						return done(err);
					
					if(user) {	//trovato!
						return done(null,user);
					}
					
					else {	//creiamo un nuovo account
						var newUser = new user();
						newUser.facebook.id = profile.id;	//profile è restituito da facebook
						newUser.facebook.token = token;
						newUser.name = profile.name.givenName + ' ' + profile.name.familyName
						newUser.facebook.email = profile.emails[0].value;
						
						newUser.save(function(err) {
							if(err)
								throw err;
							return done(null,newUser);
						});
					}
				});
			}));
		};
}

