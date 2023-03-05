# Password Wallet 

Autore:  Massimiliano Capparuccia 

L’applicazione permette all’utente di registrarsi inserendo uno username univoco ed una  password che poi verranno utilizzate per autenticarsi sulla piattaforma. Dopo essersi autenticati, verrà chiesta una chiave, che verrà utilizzata per cifrare i propri dati. Una volta inserita la chiave nella pagina principale verranno visualizzati i dati correlati alle password. Avremo quindi accesso ad una tabella dove ogni riga è composta da più campi: *titolo*, *username*, *password, url*, *note.* Vengono messe a disposizione 3 funzionalità: modifica del contenuto di una riga, aggiunta di una nuova riga, cancellazione di una riga. 

Ho utilizzato due livelli di sicurezza. Il primo gestito dalle credenziali che permettono di fare il login al sistema, questo permette di evitare che utenti esterni possano provare delle tecniche di bruteforce sul database con le password. Il secondo livello è basato sulla cifratura, i dati che vengono salvati nel DB sono totalmente oscurati e incomprensibili, possono essere letti solamente se l’utente inserisce la propria chiave. Questa chiave non viene mai memorizzata in nessuna parte. L’algoritmo di cifratura utilizzato è AES-256-CBC, scelto perché è un buon compromesso tra velocità di esecuzione e sicurezza, implementato grazie a delle funzioni messe a disposizione dalla libreria Forge.  

I dati vengono salvati sotto forma di documenti JSON, ho utilizzato il database MongoDB  perché semplifica il salvataggio di questi documenti. Ho creato due tipi di documenti, uno per la parte relativa all’autenticazione, uno che contiene effettivamente le password e i metadati. Nel momento in cui l’utente inserisce la chiave, il campo encryptedVault del documento viene decifrato e l’array di JSON risultante viene visualizzato sotto forma di tabella in cui ogni riga corrisponde ad un elemento dell’array. Il documento JSON decifrato non viene mai salvato da nessuna parte, per aumentare la sicurezza. 

**Forge**
Questa libreria è stata scelta dopo aver esplorato alcuni benchmark comparativi fra varie librerie Javascript: è risultata molto veloce anche al crescere dei dati cifrati. Va tenuto in considerazione che in questo tipo di applicazione il wallet potrebbe crescere in maniera rilevante nelle dimensioni.  

1) www.getbootstrap.com
1) www.stackoverflow.com
1) www.w3schools.com 
