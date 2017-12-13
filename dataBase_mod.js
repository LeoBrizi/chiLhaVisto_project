/*
modulo per gestire l'interazione con un data base
*/

var post = require("./post");

var gestoreDB;

//funzione per aggiungere un nuovo post al data base
var aggiungiPost = function(dataBase,post){
    console.log(gestoreDB);
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

var init = function(ip,porta){
    gestoreDB = [ip,porta];
}

exports.aggiungiPost = aggiungiPost;
exports.rimuoviPost = rimuoviPost;
exports.creaDataBase = creaDataBase;
exports.eliminaDataBase = eliminaDataBase;
exports.cerca = cerca;
exports.init = init;

