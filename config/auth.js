module.exports = {
	
	'facebookAuth' : {
		'clientID'		: ,
		'clientSecret'	: ,
		'callbackURL'	: 'http://localhost:3000/auth/facebook/callback',
		'profileURL'	: 'https://graph.facebook.com/v2.11/me?fields=first_name,last_name,email',	//URL da cui fare chiamata GET rest che restituisce i campi nome, cognome ed email
		'profileFields' : ['id','email','name']
	},

   'twitterAuth' : {
        'consumerKey'       : ,
        'consumerSecret'    : ,
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
    }
	
}
