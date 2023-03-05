# passwordwallet
Corso di Programmazione Web e 

Mobile 

A.A.** 2021-2022 

PASSWORD WALLET


Autore:  Massimiliano Capparuccia Ultima modifica:  07 settembre 2022 

Prima modifica:  01 luglio 2022 

*Password Wallet*   ¡ *Page 2-/12* 

Password Wallet 

L’applicazione permette all’utente di registrarsi inserendo uno username univoco ed una  password che poi verranno utilizzate per autenticarsi sulla piattaforma. Dopo essersi autenticati, verrà chiesta una chiave, che verrà utilizzata per cifrare i propri dati. Una volta inserita la chiave nella pagina principale verranno visualizzati i dati correlati alle password. Avremo quindi accesso ad una tabella dove ogni riga è composta da più campi: *titolo*, *username*, *password, url*, *note.* Vengono messe a disposizione 3 funzionalità: modifica del contenuto di una riga, aggiunta di una nuova riga, cancellazione di una riga. 

1.1.  Breve analisi dei requisiti

1. **Destinatari** 

**Capacità e possibilità tecniche**. 

L'interfaccia utente è molto semplice ed intuitiva per questo l'applicazione non richiede nessuna conoscenza pregressa, può essere usata da chiunque voglia salvare delle password in sicurezza. Le uniche conoscenze necessarie sono quelle di saper creare un proprio account per il login e capire l’importanza della complessità della chiave. 

**Motivazione.** 

Gli utenti che utilizzano l'applicazione vogliono avere sempre a portata di mano il proprio wallet, senza preoccuparsi che qualche malintenzionato possa leggerle, accedendovi da qualsiasi dispositivo che abbia accesso a internet. 

2. **Aspetti tecnologici** 

Il punto cardine del progetto è la sicurezza. Per curare questo aspetto ho utilizzato due livelli di sicurezza. Il primo gestito dalle credenziali che permettono di fare il login al sistema, questo permette di evitare che utenti esterni possano provare delle tecniche di bruteforce sul database con le password. Il secondo livello è basato sulla cifratura, i dati che vengono salvati nel DB sono totalmente oscurati e incomprensibili, possono essere letti solamente se l’utente inserisce la propria chiave. Questa chiave non viene mai memorizzata in nessuna parte. L’algoritmo di cifratura utilizzato è AES-256-CBC, scelto perché è un buon compromesso tra velocità di esecuzione e sicurezza, implementato grazie a delle funzioni messe a disposizione dalla libreria Forge.  

I dati vengono salvati sotto forma di documenti JSON, ho utilizzato il database MongoDB  perché semplifica il salvataggio di questi documenti. Ho creato due tipi di documenti, uno per la parte relativa all’autenticazione, uno che contiene effettivamente le password e i metadati. Nel momento in cui l’utente inserisce la chiave, il campo encryptedVault del documento viene decifrato e l’array di JSON risultante viene visualizzato sotto forma di tabella in cui ogni riga corrisponde ad un elemento dell’array. Il documento JSON decifrato non viene mai salvato da nessuna parte, per aumentare la sicurezza. 

Tutta la parte back-end viene gestita dal server NodeJS che risponde alle richieste e controlla gli accessi.  

*Password Wallet*   ¡ *Page 3-/12* 

Un'altra caratteristica del progetto è che l’applicazione ha un sistema di autenticazione stateless grazie all’utilizzo del JWT (JSON Web Token) che viene salvato nella richiesta da parte del client e validato ogni volta si voglia accedere alla pagina principale. Nel JWT è stata messa una scadenza in modo che la durata della sessione sia comunque limitata nel tempo. 


3. JSON 
1. **JSON decifrato** 

{ 

`  `"app": "massiPwdVaultApp\_decrypted", 

`  `"version": "0.1", 

`  `"user\_id": "user",  

`  `"decryptedVault": { 

"iv": "sàëk~ä½ö;¾¤}ebÜeÆÌæ½@¨Cpr{ì", 

"decryptedData": [ 

{ 

"title": "sito esempio", 

"username": "pippo", 

"password": "p4ssw0rd", 

"url": "http:\\sitoesempio.org",  

"notes": "Esempio di una nota"

}, 

{ 

"title": "PIN Bancomat", 

"username": "", 

"password": "12345", 

"url": "",  

"notes": "Bancomat 4508 0123 4567 9801 scad 11/24" } 

]} 

} 

*Password Wallet*   ¡ *Page 11-/12* 

2. **JSON cifrato** 

{ 

"app": "Password Wallet", 

"version":"0.0.1", 

"user\_id": "user", 

"encryptedVault":{ 

"iv": "sàëk~ä½ö;¾¤}ebÜeÆÌæ½@¨Cpr{ì",  

"encryptedData": [ "c87d791938b8218116ef7d4c06581b19d55a7fdd3a0727c6ef6186faef38e948d7a6be..." ] 

} 

} 

1. Note generali 

Il progetto è stato realizzato come progetto personale senza pretesa di esaustività. Ho cercato di curare il meglio possibile l’aspetto della sicurezza ma sicuramente non è abbastanza, una possibile miglioria potrebbe essere quella di utilizzare Auth0 per il login, ma ho scelto di implementarlo da solo con il JWT per apprendere più conoscenze sull’argomento.  Ovviamente ci sono molte funzionalità future implementabili, ad esempio la possibilità di recuperare le credenziali in caso di smarrimento, possibilità di cambiare password e chiave, sorting e pagination della tabella dove vengono visualizzate le password.  

Un’altra possibile estensione riguarda la possibilità di avere più wallet per uno stesso utente. L’applicazione, con il sistema di autenticazione già presente e la strutturazione del JSON permetterebbe di estendere questa funzionalità senza stravolgimenti.  

In ultimo, sarebbe possibile far salvare in locale il JSON con i dati cifrati, per backup e/o migrazione dei dati ad altro sistema.

2. Perché ho scelto forge?

Questa libreria è stata scelta dopo aver esplorato alcuni benchmark comparativi fra varie librerie Javascript: è risultata molto veloce anche al crescere dei dati cifrati. Va tenuto in considerazione che in questo tipo di applicazione il wallet potrebbe crescere in maniera rilevante nelle dimensioni.  

*Password Wallet*   ¡ *Page 12-/12* 

1) www.getbootstrap.com
1) www.stackoverflow.com
1) www.w3schools.com 
