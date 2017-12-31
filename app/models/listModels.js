var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema post---------------------------------------
var PostSchema = new Schema({
	
  tipoPost: {
    type: String,
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
  
  luogo: {
    type: String,
    description : "Per favore, indicare il luogo dove è stato perso o ritrovato l'oggetto"
  },
  
  ricompensa: Number,
  
  descrizione: String,

  user_id: Number
});

//schema utente-------------------------------
var UtenteSchema = new Schema({
	facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    }
});

module.exports.Post = mongoose.model('Post', PostSchema);
module.exports.Utente = mongoose.model('Utente',UtenteSchema);

