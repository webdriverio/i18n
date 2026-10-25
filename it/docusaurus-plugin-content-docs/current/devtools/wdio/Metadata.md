---
id: metadata
title: Metadati
description: "Esamina le capability, l'ambiente e le tempistiche di ogni sessione del browser nella scheda Metadata di DevTools per diagnosticare i fallimenti specifici dell'ambiente."
---

Esamina il contesto completo di ogni sessione del browser aperta dal tuo test. La scheda Metadata mostra le capability, l'ambiente e le tempistiche alla base di ogni esecuzione, così puoi verificare esattamente cosa è stato testato senza dover scavare nei log.

**Cosa viene registrato:**
- **Capability della sessione** - Nome e versione del browser, piattaforma e le capability WebDriver negoziate
- **Dettagli della sessione** - ID della sessione, URL di base e dimensioni del viewport
- **Tempistiche di esecuzione** - Durata del test, stato e timestamp di inizio/fine
- **Vista per sessione** - Ogni sessione del browser (incluse le sessioni create da `browser.reloadSession()`) viene conservata in modo indipendente ed è selezionabile da un menu a tendina

Questo è prezioso per diagnosticare i fallimenti specifici dell'ambiente, verificare che siano state applicate le capability corrette e comprendere come si sono comportati i test con più sessioni.

## Demo

### 📋 Metadati
![Metadata Demo](/img/devtools/metadata.gif)