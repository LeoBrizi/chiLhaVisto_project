# chiLhaVisto_project
Progetto universitario per l'esame di reti di calcolatori. È un'applicazione web che ha lo scopo di:
* aiutare di utenti a ritrovare i propri oggetti smarriti;
* ritrovare il legittimo proprietario di un oggetto trovato.

## Prerequisiti
L'applicazione è scritta in Javascript utilizzando il framework nodejs (version 8.x).
Essa richiede quindi l'installazione di nodejs attraverso i comandi (in sistemi debian e ubuntu based, per altri sistemi si riporta al sito [ufficiale](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)):
'''
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install -y nodejs
'''

## Configurazione ed esecuzione

### Configurazione
L'applicazione richiede i seguenti servizi:
* [mongodb](https://www.mongodb.com/);
* [rabbitmq](https://www.rabbitmq.com/);
* un browser che supporta l'utilizzo dei websocket.

Una volta clonata la repo github in una directory bisognerà:
1. Modificare il file './config/amqp_const.js' in modo tale da mettere nel campo *url* l'indirizzo ip e la porta dove il server rabbitmq è in ascolto.
2. Registrare l'applicazione su [facebook](https://developers.facebook.com/docs/graph-api/) e creare nella cartella './config' un file di nome 'auth.js' per la configurazione del servizio oauth di facebook. Il file dovrà essere [così](https://pastebin.com/bu3PgRZX) strutturato.
3. Registrare l'applicazione su [nexmo](https://www.nexmo.com/) e creare nella cartella './config' un file di nome 'cost_proc.js'. Il file dovrà essere [così](https://pastebin.com/aR3xGE1U) strutturato.
4. Modificare il file './config/database.js' in modo da mettere nel campo *url* l'indirizzo ip e la porta dove il server mongodb è in ascolto.
5. modificare il file './config/costanti.js' in modo da mettere nel campo *defaultPort* la porta sulla quale si intende mettere in ascolto l'applicazione server e in *ipServer* l'indirizzo ip del pc su quale gira.

Ora aprire la directory della repo in un terminale e eseguire il seguente comando per installare tutte le dipendenze del progetto:
'''
$ npm install 
'''

### Esecuzione
Aprire la directory della repo in un terminale e eseguire il seguente comando:
'''
$ node server.js
'''
In un altro terminale:
'''
$node processo.js
'''

## Come utilizzarlo
Utilizzare un browser e recarsi all'indirizzo *ip:porta* sul quale il server è in ascolto.

## EndPoints
Gli endPoints sono descritti [qui](https://github.com/LeoBrizi/chiLhaVisto_project/tree/master/app/routes/Endpoints.md).

## Servizi REST utilizzati
- [FaceBook](https://developers.facebook.com/)
- [Nexmo](https://www.nexmo.com/)

