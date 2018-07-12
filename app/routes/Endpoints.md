# ChiLhaVisto: Endpoints
* ### '/'
    * **GET**: mostra un' introduzione all'applicazione e permette di fare il login
    * POST:
    * PUT:
    * DELETE:

* ### '/login'
    * **GET**: reindirizza alla pagina per fare il login con facebook
    * POST:
    * PUT:
    * DELETE:

* ### '/callbackfacebook'
    * **GET**: callback chiamata da FaceBook una volta che l’utente ha loggato su FaceBook e ha rilasciato i permessi necessari all’applicazione: se l’utente non è nel database viene aggiunto e viene reindirizzato alla pagina di inserimento del numero di telefono, sennò viene reindirizzato alla propria pagina profilo 
    * POST:
    * PUT:
    * DELETE:

* ### '/numero/:id'
    * **GET**: mostra la form per l’inserimento del numero di telefono dell’utente id
    * **POST**: aggiunge il numero di telefono dell’utente id al database e reindirizza verso la pagina profilo dell’utente id
    * PUT:
    * DELETE:

* ### '/profilo/:id'
    * **GET**: mostra la pagina profilo dell’utente id
    * **POST**: effettua il logout dell’utente id
    * PUT:
    * DELETE:

* ### '/nuovo_post/:id'
    * **GET**: mostra la form per creare un nuovo post per un oggetto perduto o ritrovato
    * **POST**: verifica se le informazioni inserite sono corrette (in caso contrario reindirizza la form), aggiunge nel database il post creato, inserisce nella coda di messaggi amqp le informazioni relative al nuovo post al fine di cercare post complementari e se il post è relativo ad un oggetto perso condivide sul profilo dell’utente id uno stato 
    * PUT:
    * DELETE:

* ### '/delete_post/:id'
    * **GET**: elimina il post id del database e dalla lista dei complementari
    * POST:
    * PUT:
    * DELETE:

* ### '/refresh/:utentiDaInformare'
    * **GET**: informa la pagina profilo degli utentiDaInformare che ci sono nuovi post correlati per l’utente
    * POST:
    * PUT:
    * DELETE:

