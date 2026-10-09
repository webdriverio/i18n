---
id: faq
title: FAQ
description: "Trova le risposte alle domande più comuni sul visual testing, come l'aggiornamento delle baseline, la risoluzione degli errori di installazione di canvas e l'aggiornamento alla v10."
---

### Devo usare i metodi `save(Screen/Element/FullPageScreen)` quando voglio eseguire `check(Screen/Element/FullPageScreen)`?

No, non è necessario. Il metodo `check(Screen/Element/FullPageScreen)` lo farà automaticamente per te.

### I miei test visivi falliscono a causa di una differenza, come posso aggiornare la mia baseline?

Puoi aggiornare le immagini di baseline tramite la riga di comando aggiungendo l'argomento `--update-visual-baseline`. Questo

-   copierà automaticamente lo screenshot effettivo acquisito e lo inserirà nella cartella della baseline
-   in caso di differenze, farà passare il test perché la baseline è stata aggiornata

**Utilizzo:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Quando i log sono in modalità info/debug, vedrai aggiunti i seguenti log

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

### Width and height cannot be negative

Può capitare che venga generato l'errore `Width and height cannot be negative`. 9 volte su 10 questo è dovuto alla creazione di un'immagine di un elemento che non è visibile nella viewport. Assicurati sempre che l'elemento sia visibile nella viewport prima di provare a creare un'immagine dell'elemento.

### L'installazione di Canvas su Windows è fallita con log di Node-Gyp

Se riscontri problemi con l'installazione di Canvas su Windows a causa di errori di Node-Gyp, tieni presente che questo riguarda solo la versione 4 e precedenti. Per evitare questi problemi, valuta l'aggiornamento alla versione 5 o successiva, che non ha queste dipendenze. Dalla versione 5 alla 9 veniva utilizzato [Jimp](https://github.com/jimp-dev/jimp) per l'elaborazione delle immagini; dalla versione 10 in poi vengono utilizzati [fast-png](https://github.com/image-js/fast-png) e [Pixelmatch](https://github.com/mapbox/pixelmatch), senza dipendenze native.

Se hai ancora bisogno di risolvere i problemi con la versione 4, consulta:

-   la sezione Node Canvas nella guida [Getting Started](/docs/visual-testing#system-requirements)
-   [questo post](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) per la risoluzione dei problemi di Node-Gyp su Windows. (Grazie a [IgorSasovets](https://github.com/IgorSasovets))

### Ho aggiornato alla v10, perché i miei test visivi falliscono?

Nella v10 il motore di confronto è passato da ResembleJS a [Pixelmatch](https://github.com/mapbox/pixelmatch). Pixelmatch utilizza un modello di colore percettivo (YIQ) invece dell'RGB grezzo, quindi le percentuali di mismatch differiscono rispetto alla v9. I tuoi test non sono rotti; le baseline devono semplicemente essere rigenerate una volta. Esegui i tuoi test con `--update-visual-baseline` per accettare i nuovi valori, oppure elimina la cartella della baseline e lascia che `autoSaveBaseline` la ricrei.