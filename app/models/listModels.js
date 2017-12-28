var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = new Schema({
	
  tipoPost: {
    type: String,
    required: 'Per favore, indicare se il post riguarda un oggetto perso o ritrovato'
  },
  
  categoria: {
	  type: [{
		  type: String,
		  enum: ['Elettronica','Abbigliamento','Cartoleria','Altro']
	  }]
	  required: "Per favore, indicare a quale categoria appartiene l'oggetto"
  },
  
  sottoCategoria: {
	  type: String
  },
  
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
    required : "Per favore, indicare il luogo dove è stato perso o ritrovato l'oggetto"
  },
  
  ricompensa: {
	  type: Number
  },
  
  Descrizione: {
	  type: String
  }
});

var UtenteSchema = new Schema({
	
});

module.exports.Post = mongoose.model('Post', PostSchema);
module.exports.Utente = mongoose.model('Utente',UtenteSchema);
