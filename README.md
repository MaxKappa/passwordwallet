# Password Wallet 

Autore:  Massimiliano Capparuccia 

L’applicazione permette all’utente di registrarsi inserendo uno username univoco ed una  password che poi verranno utilizzate per autenticarsi sulla piattaforma. Dopo essersi autenticati, verrà chiesta una chiave, che verrà utilizzata per cifrare i propri dati. Una volta inserita la chiave nella pagina principale verranno visualizzati i dati correlati alle password.
I dati che vengono salvati nel DB sono totalmente oscurati e incomprensibili, possono essere letti solamente se l’utente inserisce la propria chiave. Questa chiave non viene mai memorizzata in nessuna parte. L’algoritmo di cifratura utilizzato è AES-256-CBC, scelto perché è un buon compromesso tra velocità di esecuzione e sicurezza, implementato grazie a delle funzioni messe a disposizione dalla libreria Forge.  
**Forge**
Questa libreria è stata scelta dopo aver esplorato alcuni benchmark comparativi fra varie librerie Javascript: è risultata molto veloce anche al crescere dei dati cifrati. Va tenuto in considerazione che in questo tipo di applicazione il wallet potrebbe crescere in maniera rilevante nelle dimensioni.  

