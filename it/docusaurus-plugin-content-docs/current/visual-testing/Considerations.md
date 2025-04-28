---
index: 1
id: considerations
title: Considerazioni
---

# Considerazioni Chiave per un Utilizzo Ottimale

Prima di immergersi nelle potenti funzionalità del `@wdio/visual-service`, è fondamentale comprendere alcune considerazioni chiave che garantiscono di ottenere il massimo da questo strumento. I seguenti punti sono progettati per guidarti attraverso le migliori pratiche e le insidie comuni, aiutandoti a ottenere risultati di test visivi accurati ed efficienti. Queste considerazioni non sono solo raccomandazioni, ma aspetti essenziali da tenere a mente per utilizzare efficacemente il servizio in scenari reali.

## Natura del Confronto

-   **Base Pixel per Pixel:** Il modulo esegue un confronto pixel per pixel delle immagini. Mentre certi aspetti possono essere regolati (vedi Opzioni di Confronto), l'approccio di base rimane un confronto pixel di base.
-   **Impatto degli Aggiornamenti del Browser:** Tieni presente che gli aggiornamenti dei browser, come Chrome, possono influire sul rendering dei caratteri, potenzialmente richiedendo un aggiornamento delle tue immagini di base.

## Coerenza nelle Piattaforme

-   **Confronto tra Piattaforme Identiche:** Assicurati che gli screenshot vengano confrontati all'interno della stessa piattaforma. Ad esempio, uno screenshot da Chrome su Mac non dovrebbe essere utilizzato per confrontarlo con uno da Chrome su Ubuntu o Windows.
-   **Analogia:** Per dirla semplicemente, confronta _'Mele con Mele, non Mele con Android'_.

## Cautela con la Percentuale di Mancata Corrispondenza

-   **Rischio di Accettare Mancate Corrispondenze:** Esercita cautela nell'accettare una percentuale di mancata corrispondenza. Questo è particolarmente vero per gli screenshot di grandi dimensioni, dove accettare una mancata corrispondenza potrebbe inavvertitamente trascurare discrepanze significative, come pulsanti o elementi mancanti.

## Simulazione dello Schermo Mobile

-   **Evita il Ridimensionamento del Browser per la Simulazione Mobile:** Non tentare di simulare dimensioni dello schermo mobile ridimensionando i browser desktop e trattandoli come browser mobili. I browser desktop, anche se ridimensionati, non replicano accuratamente il rendering dei browser mobili effettivi.
-   **Autenticità nel Confronto:** Questo strumento mira a confrontare i contenuti visivi come apparirebbero a un utente finale. Un browser desktop ridimensionato non riflette la vera esperienza su un dispositivo mobile.

## Posizione sui Browser Headless

-   **Non Consigliato per Browser Headless:** L'uso di questo modulo con browser headless non è consigliato. Il motivo è che gli utenti finali non interagiscono con browser headless, e pertanto i problemi derivanti da tale utilizzo non saranno supportati.