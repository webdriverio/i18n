---
id: metadata
title: Metadati
description: "Ispeziona le capabilities, l'ambiente e le tempistiche di ogni sessione del browser nella scheda Metadata di DevTools per diagnosticare errori specifici dell'ambiente."
---

Ispeziona il contesto completo di ogni sessione del browser aperta dal tuo test. La scheda Metadata mostra le capabilities, l'ambiente e le tempistiche alla base di ogni esecuzione, così puoi verificare esattamente cosa è stato testato senza dover scavare tra i log.

**Cosa viene acquisito:**
- **Capabilities della sessione** - Nome e versione del browser, piattaforma e le capabilities WebDriver negoziate
- **Dettagli della sessione** - ID della sessione, URL di base e dimensioni del viewport
- **Tempistiche di esecuzione** - Durata del test, stato e timestamp di inizio/fine
- **Vista per sessione** - Ogni sessione del browser (incluse le sessioni create da `browser.reloadSession()`) viene conservata in modo indipendente ed è selezionabile da un menu a tendina

Questo è prezioso per diagnosticare errori specifici dell'ambiente, verificare che siano state applicate le capabilities corrette e comprendere come si sono comportati i test multi-sessione.

## Demo

### 📋 Metadati
![Metadata Demo](/img/devtools/metadata.gif)