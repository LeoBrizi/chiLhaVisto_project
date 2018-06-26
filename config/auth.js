module.exports = {
	
	'facebookAuth' : {
		'urlFb'			: 'https://www.facebook.com/v2.11/dialog/oauth?',
		'clientID'		: '1857911927781379',
		'clientSecret'	: '1f9327716efac87085c265122abe7cac',
		'callbackURL'	: 'http://localhost:3000/callbackfacebook',
		'permissions'	: 'public_profile,email,publish_actions',
		'profileURL'	: 'https://graph.facebook.com/v2.11/me?fields=first_name,last_name,email',	//URL da cui fare chiamata GET rest che restituisce i campi nome, cognome ed email
		'profileFields' : ['id','email','name']
	}

}
