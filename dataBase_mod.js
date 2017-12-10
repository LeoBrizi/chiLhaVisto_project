/*
modulo per gestire l'interazione con un data base
*/

/*
classe per identificare il gestore del data base non relazionale
*/
class gestoreDataBase{
    constructor(ip, porta){
        this.ip = ip;
        this.porta = porta;
    }
};

/*
classe per identificare il data base
*/
class dataBase{
    constructor(nome){
        this.nome = nome;
    }
};

/*
classe per identificare un post
*/
class post{
    constructor(tipoPost,categoria,sottoCategoria,immagine,data,luogo,riconpensa,descrizione){
        this.tipoPost = tipoPost; 
        this.categoria = categoria;
        this.sottoCategoria = sottoCategoria;
        this.immagine = immagine;
        this.data = data;
        this.luogo = luogo;
        this.riconpensa = riconpensa;
        this.descrizione = descrizione;
    }
};

var gestoreDataBase;

//funzione per aggiungere un nuovo post al data base
var aggiungiPost = function(dataBase,post){

}
//funzione per rimuovere un post da un data base
var rimuoviPost = function(dataBase,post){

}
//funzione per creare un data base vuoto
var creaDataBase = function(dataBase){

 }
//funzione per irmuovere un data base
var eliminaDataBase = function(dataBase){

}
//funzione per cercare tutti post che coincidono con il postDiPartenza 
var cerca = function(dataBase,postDiPartenza){

}

exports.aggiungiPost = aggiungiPost;
exports.rimuoviPost = rimuoviPost;
exports.creaDataBase = creaDataBase;
exports.eliminaDataBase = eliminaDataBase;
exports.cerca = cerca;
module.exports = (ip,porta) => {
    gestoreDataBase = gestoreDataBase(ip,porta);
};
