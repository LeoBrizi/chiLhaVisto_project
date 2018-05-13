var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema post---------------------------------------
var PostSchema = new Schema({
	
  tipoPost: {
    type: String,
    enum: ["Perso", "Trovato"],
    description: "Per favore, indicare se il post riguarda un oggetto perso o ritrovato",
    required: true
  },
  
  categoria: {
	type: String,
	enum: ["Elettronica", "Abbigliamento", "Cartoleria", "Altro"],
	description: "Per favore, indicare a quale categoria appartiene l'oggetto",
	required: true
  },
  
  sottoCategoria: String,
  
/*  immagine: {
	  type: 
  },
 */
  
  data: {
    type: Date,
    default: Date.now
  },
  
  città: {
	type: String,
	required: true
  },
  
  luogo: {
    type: String,
    description : "Per favore, indicare il luogo dove è stato perso o ritrovato l'oggetto"
  },
  
  descrizione: String,
  
  ricompensa: String,
  
  user_id: String, 
  
  user_em: String,
  
  connected: Array

});

//schema utente-------------------------------
var UtenteSchema = new Schema({
    id           : String,
    token        : String,
    name         : String,
    email        : String,
	phone		 : String
});

module.exports.Post = mongoose.model('Post', PostSchema);
module.exports.Utente = mongoose.model('Utente',UtenteSchema);

