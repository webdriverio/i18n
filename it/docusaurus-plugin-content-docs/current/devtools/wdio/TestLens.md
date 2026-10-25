---
id: testlens
title: TestLens
description: "Passa da un test o da un comando nell'interfaccia di DevTools direttamente alla relativa riga di codice sorgente, nella scheda Source o in VS Code, con TestLens."
---

TestLens offre una navigazione intelligente del codice tra l'interfaccia di DevTools e i file sorgente dei tuoi test. Fai clic su qualsiasi test o comando nell'interfaccia per aprirne il codice sorgente alla riga esatta nella scheda **Source** della dashboard e, da lì, aprire il file in VS Code.

**Come funziona:**
- **Gerarchia visiva dei test** - Visualizza la struttura dei tuoi test (suite, test, scenari) in una vista ad albero
- **Mappatura del codice sorgente** - Ogni test è collegato alla sua posizione esatta nei file sorgente
- **Navigazione con un clic** - Fai clic su qualsiasi test o comando per mostrarne la riga di codice sorgente nella scheda **Source**
- **Collegamento all'editor** - Il link **Open in editor** della scheda Source apre il file a quella riga in VS Code (`vscode://file/...`)

Questa connessione fluida tra interfaccia e codice velocizza il debugging, eliminando la ricerca manuale nel codice durante l'analisi dei test falliti.

## Demo

### 🔍︎ TestLens
![TestLens Demo](/img/devtools/testlens.gif)