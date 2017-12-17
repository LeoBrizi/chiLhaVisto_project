
function Post(tipoPost,categoria,sottoCategoria,immagine,data,luogo,ricompensa,descrizione){
    this.tipoPost = tipoPost;
    this.categoria = categoria;
    this.sottoCategoria = sottoCategoria;
    this.immagine = immagine;
    this.data = data;
    this.luogo = luogo;
    this.ricompensa = ricompensa;
    this.descrizione = descrizione;

    this.getTipoPost = function(){
        return this.tipoPost;
    };

    this.getCategoria = function(){
        return this.categoria;
    };

    this.getSottoCategoria = function(){
        return this.sottoCategoria;
    };

    this.getImmagine = function(){
        return this.immagine;
    };

    this.getData = function(){
        return this.data;
    };

    this.getLuogo = function(){
        return this.luogo;
    };

    this.getRicompensa = function(){
        return this.ricompensa;
    };

    this.getDescrizione = function(){
        return this.descrizione;
    };

    this.toString = function(){
        return "tipoPost: "+this.tipoPost+", categoria: "+this.categoria+
            ", sottoCategoria: "+this.sottoCategoria+", immagine: "+this.immagine+
            ", data: "+this.data+", luogo: "+this.luogo+
            ", ricompensa: "+this.ricompensa+", descrizione: "+this.descrizione;
    }
}

exports.Post = Post;
