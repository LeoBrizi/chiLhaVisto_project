module.exports = {
	
	'facebookAuth' : {
		'clientID'		: '1857911927781379',
		'clientSecret'	: '4e008a8e293d41d2cd18183da951651f',
		'callbackURL'	: 'http://localhost:3000/',
		'profileURL'	: 'https://graph.facebook.com/v2.11/me?fields=first_name,last_name,email',	//URL da cui fare chiamata GET rest che restituisce i campi nome, cognome ed email
		'profileFields' : ['id','email','name']
	}

}
