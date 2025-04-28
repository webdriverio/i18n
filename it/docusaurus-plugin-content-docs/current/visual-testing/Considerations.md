---
index: 1
id: considerations
title: Considerazioni
---

# Considerazioni chiave per un uso ottimale

Prima di immergersi nelle potenti funzionalità del `@wdio/visual-service`, è fondamentale comprendere alcune considerazioni chiave che garantiscono di ottenere il massimo da questo strumento. I seguenti punti sono progettati per guidarti attraverso le migliori pratiche e le insidie comuni, aiutandoti a raggiungere risultati di test visivi accurati ed efficienti. Queste considerazioni non sono solo raccomandazioni, ma aspetti essenziali da tenere a mente per utilizzare efficacemente il servizio in scenari reali.

## Natura del confronto

-   **Base pixel per pixel:** Il modulo esegue un confronto pixel per pixel delle immagini. Sebbene alcuni aspetti possano essere regolati (vedi Opzioni di confronto), l'approccio di base rimane un confronto pixel di base.
-   **Impatto degli aggiornamenti del browser:** Tieni presente che gli aggiornamenti dei browser, come Chrome, possono influire sul rendering dei font, potenzialmente richiedendo un aggiornamento delle immagini di riferimento.

## Coerenza nelle piattaforme

-   **Confronto tra piattaforme identiche:** Assicurati che gli screenshot vengano confrontati all'interno della stessa piattaforma. Ad esempio, uno screenshot da Chrome su Mac non dovrebbe essere utilizzato per confrontarlo con uno da Chrome su Ubuntu o Windows.
-   **Analogia:** Per dirla semplicemente, confronta _'Mele con Mele, non Mele con Android'_.

## Cautela con la percentuale di mancata corrispondenza

-   **Rischio di accettare discrepanze:** Esercita cautela quando accetti una percentuale di mancata corrispondenza. Questo è particolarmente vero per gli screenshot di grandi dimensioni, dove l'accettazione di una discrepanza potrebbe inavvertitamente trascurare differenze significative, come pulsanti o elementi mancanti.

## Simulazione dello schermo mobile

-   **Evita il ridimensionamento del browser per simulare dispositivi mobili:** Non tentare di simulare dimensioni dello schermo mobile ridimensionando i browser desktop e trattandoli come browser mobili. I browser desktop, anche quando ridimensionati, non replicano accuratamente il rendering dei browser mobili effettivi.
-   **Autenticità nel confronto:** Questo strumento mira a confrontare gli elementi visivi come apparirebbero a un utente finale. Un browser desktop ridimensionato non riflette la vera esperienza su un dispositivo mobile.

## Posizione sui browser headless

-   **Non raccomandato per browser headless:** L'uso di questo modulo con browser headless non è consigliato. La logica è che gli utenti finali non interagiscono con browser headless, e pertanto i problemi derivanti da tale uso non saranno supportati.