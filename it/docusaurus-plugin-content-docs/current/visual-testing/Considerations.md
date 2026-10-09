---
index: 1
id: considerations
title: Considerazioni
description: "Comprendi i limiti del confronto tra immagini, la coerenza tra piattaforme, le percentuali di discrepanza e i browser headless prima di affidarti ai test visivi."
---

# Considerazioni chiave per un utilizzo ottimale

Prima di immergerti nelle potenti funzionalità di `@wdio/visual-service`, è fondamentale comprendere alcune considerazioni chiave che ti permettono di ottenere il massimo da questo strumento. I punti seguenti sono pensati per guidarti attraverso le best practice e le insidie più comuni, aiutandoti a ottenere risultati di test visivi accurati ed efficienti. Queste considerazioni non sono semplici raccomandazioni, ma aspetti essenziali da tenere a mente per utilizzare efficacemente il servizio in scenari reali.

## Natura del confronto

-   **Confronto percettivo:** Il modulo esegue un confronto percettivo dei pixel delle immagini utilizzando lo spazio colore YIQ, che si avvicina maggiormente al modo in cui gli esseri umani percepiscono le differenze di colore. Alcuni aspetti possono essere regolati tramite le [Opzioni di confronto](./compare-options).
-   **Impatto degli aggiornamenti dei browser:** Tieni presente che gli aggiornamenti dei browser, come Chrome, possono influire sul rendering dei font, rendendo potenzialmente necessario aggiornare le tue immagini di baseline.

## Coerenza tra piattaforme

-   **Confrontare piattaforme identiche:** Assicurati che gli screenshot vengano confrontati all'interno della stessa piattaforma. Ad esempio, uno screenshot di Chrome su Mac non dovrebbe essere confrontato con uno di Chrome su Ubuntu o Windows.
-   **Analogia:** Per dirla in modo semplice, confronta _'mele con mele, non mele con Android'_.

## Cautela con la percentuale di discrepanza

-   **Rischio di accettare discrepanze:** Presta attenzione quando accetti una percentuale di discrepanza. Questo vale soprattutto per gli screenshot di grandi dimensioni, dove accettare una discrepanza potrebbe involontariamente far trascurare differenze significative, come pulsanti o elementi mancanti.

## Simulazione di schermi mobili

-   **Evita il ridimensionamento del browser per simulare dispositivi mobili:** Non tentare di simulare le dimensioni degli schermi mobili ridimensionando i browser desktop e trattandoli come browser mobili. I browser desktop, anche se ridimensionati, non replicano accuratamente il rendering dei veri browser mobili.
-   **Autenticità nel confronto:** Questo strumento ha lo scopo di confrontare gli elementi visivi così come apparirebbero a un utente finale. Un browser desktop ridimensionato non riflette la reale esperienza su un dispositivo mobile.

## Posizione sui browser headless

-   **Sconsigliato per i browser headless:** L'uso di questo modulo con browser headless è sconsigliato. Il motivo è che gli utenti finali non interagiscono con i browser headless e, pertanto, i problemi derivanti da tale utilizzo non saranno supportati.