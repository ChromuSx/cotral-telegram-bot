# Cotral Telegram Bot

Cotral Telegram Bot è un'interfaccia Telegram che consente agli utenti di interagire facilmente con le API del sistema di trasporto Cotral. Questo bot fornisce un accesso immediato a informazioni su paline, fermate, transiti e veicoli del servizio Cotral direttamente dalla piattaforma Telegram.

## Funzionalità

### Paline 🪧
- **Preferiti ✨**: Visualizza e gestisci le tue paline preferite
- **Ricerca per Codice 🔢**: Trova paline utilizzando il loro codice identificativo
- **Ricerca per Posizione 📍**: Trova paline nelle vicinanze della tua posizione attuale o di una posizione specificata
- **Ricerca per Arrivo e Destinazione 🚶🏁**: Cerca paline che collegano una località di partenza e una di arrivo
- **Ricerca per Località di Arrivo 🚶**: Visualizza tutte le possibili destinazioni da una località di partenza

### Fermate 🚏
- **Fermate per Località 🌐**: Visualizza tutte le fermate disponibili in una specifica località
- **Prima Fermata per Località ☝️🌐**: Ottieni informazioni sulla prima fermata disponibile in una località

### Transiti 🚦
- **Transiti per Codice Palina 🔢**: Visualizza gli orari e le informazioni sui transiti per una specifica palina

### Veicoli 🚎
- **Posizione Veicolo 🔢**: Traccia la posizione in tempo reale di un veicolo tramite il suo codice identificativo

## Tecnologie Utilizzate

- **TypeScript**: Linguaggio di programmazione principale per lo sviluppo del bot
- **Telegraf**: Framework per la creazione di bot Telegram in Node.js
- **Axios**: Libreria per effettuare richieste HTTP al server API Cotral
- **date-fns**: Libreria per la gestione e formattazione delle date
- **dotenv**: Gestione delle variabili d'ambiente
- **telegraf-session-local**: Gestione delle sessioni locali per il bot Telegram

## Architettura del Progetto

Il bot è strutturato secondo un'architettura modulare che separa i diversi livelli di funzionalità:

- **Handlers**: Gestiscono gli input degli utenti e le callback degli eventi Telegram
- **Commands**: Definiscono i comandi disponibili per gli utenti
- **API Handlers**: Intermediari tra il bot e le API Cotral Server
- **Actions**: Definiscono le azioni eseguibili dal bot
- **Services**: Servizi per le richieste HTTP e altre funzionalità
- **Interfaces**: Definizioni TypeScript per garantire la tipizzazione del codice

## Installazione

1. Clona il repository:
   ```
   git clone https://github.com/tuoutente/cotral-telegram-bot.git
   ```

2. Installa le dipendenze:
   ```
   cd cotral-telegram-bot
   npm install
   ```

3. Configura le variabili d'ambiente:
   - Crea un file `.env` nella root del progetto
   - Aggiungi il token del tuo bot Telegram:
     ```
     TELEGRAM_BOT_TOKEN=il_tuo_token_qui
     ```

4. Avvia il bot:
   ```
   npm start
   ```

## Utilizzo

### Comandi Principali

Il bot supporta i seguenti comandi:

- `/start` - Avvia il bot e mostra il menu principale
- `/getfavoritepoles` - Visualizza le tue paline preferite
- `/getpolesbycode` - Cerca paline per codice
- `/getpolesbyposition` - Cerca paline per posizione
- `/getpolebyarrivalanddestination` - Cerca paline per arrivo e destinazione
- `/getallpolesdestinationsbyarrival` - Visualizza destinazioni disponibili da una località
- `/getstopsbylocality` - Visualizza fermate per località
- `/getfirststopbylocality` - Visualizza la prima fermata per località
- `/gettransitsbypolecode` - Visualizza transiti per codice palina
- `/getvehiclerealtimepositions` - Visualizza posizione veicolo per codice

### Interazione con il Bot

1. **Menu a Tastiera**: Naviga facilmente tra le funzioni usando i pulsanti della tastiera personalizzata
2. **Posizione**: Puoi condividere la tua posizione attuale per trovare le paline nelle vicinanze
3. **Preferiti**: Aggiungi paline ai preferiti per un accesso rapido alle informazioni sui transiti
4. **Callback Inline**: Interagisci con i risultati attraverso pulsanti inline per azioni rapide

## Dipendenze dal Server

Questo bot si connette al [Cotral Server API](https://github.com/ChromuSx/cotral-server-api), che funge da intermediario con i servizi Cotral. Il server API deve essere in esecuzione affinché il bot funzioni correttamente.

Per configurare correttamente la connessione al server:
1. Modifica il file `src/services/axiosService.ts` impostando il corretto URL base del server
2. Assicurati che il server API sia accessibile dalla macchina su cui è in esecuzione il bot

## Contributi

Se desideri contribuire a questo progetto, ti invitiamo a:

1. Fare fork del repository
2. Creare un branch per la tua feature (`git checkout -b feature/nome-feature`)
3. Committare le tue modifiche (`git commit -am 'Aggiungi una nuova feature'`)
4. Pushare sul branch (`git push origin feature/nome-feature`)
5. Creare una Pull Request

## Licenza

Questo progetto è rilasciato sotto licenza MIT.

*Nota: Questo bot è stato sviluppato come interfaccia per il Cotral Server API, che a sua volta interagisce con i servizi ufficiali di Cotral. Non è un prodotto ufficiale di Cotral.*
