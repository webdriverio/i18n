---
id: faq
title: FAQ
description: "Trova le risposte alle domande più comuni sul visual testing, come l'aggiornamento delle baseline, la risoluzione degli errori di installazione di canvas e l'aggiornamento alla v10."
---

### Devo usare i metodi `save(Screen/Element/FullPageScreen)` quando voglio eseguire `check(Screen/Element/FullPageScreen)`?

No, non è necessario. Il metodo `check(Screen/Element/FullPageScreen)` lo farà automaticamente per te.

### I miei test visivi falliscono a causa di una differenza, come posso aggiornare la mia baseline?

Puoi aggiornare le immagini di baseline tramite la riga di comando aggiungendo l'argomento `--update-visual-baseline`. Questo

-   copierà automaticamente lo screenshot effettivamente acquisito e lo inserirà nella cartella della baseline
-   se ci sono differenze, farà passare il test perché la baseline è stata aggiornata

**Utilizzo:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Quando esegui i log in modalità info/debug vedrai aggiunti i seguenti log

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

Può capitare che venga generato l'errore `Width and height cannot be negative`. 9 volte su 10 questo è legato alla creazione di un'immagine di un elemento che non è visibile nella vista. Assicurati sempre che l'elemento sia visibile nella vista prima di provare a creare un'immagine dell'elemento.

### L'installazione di Canvas su Windows non è riuscita con log di Node-Gyp

Se riscontri problemi con l'installazione di Canvas su Windows a causa di errori di Node-Gyp, tieni presente che ciò si applica solo alla Versione 4 e precedenti. Per evitare questi problemi, valuta l'aggiornamento alla Versione 5 o successiva, che non ha queste dipendenze. Le versioni dalla 5 alla 9 utilizzavano [Jimp](https://github.com/jimp-dev/jimp) per l'elaborazione delle immagini; dalla Versione 10 in poi vengono utilizzati [fast-png](https://github.com/image-js/fast-png) e [Pixelmatch](https://github.com/mapbox/pixelmatch), senza dipendenze native.

Se hai ancora bisogno di risolvere i problemi con la Versione 4, consulta:

-   la sezione Node Canvas nella guida [Getting Started](/docs/visual-testing#system-requirements)
-   [questo post](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) per la risoluzione dei problemi di Node-Gyp su Windows. (Grazie a [IgorSasovets](https://github.com/IgorSasovets))

### Ho aggiornato alla v11, perché è cambiata la percentuale di mismatch?

Nella v11 il motore di confronto è pixelmatch 8, che misura le differenze di colore nello spazio colore OKLab con la distanza HyAB invece di YIQ. La scala della soglia (da `0` a `1`) e i preset `ignore*` non sono cambiati, ma il numero di pixel differenti può variare leggermente per le stesse immagini (circa da −3 % a +3 % su screenshot reali). Se un controllo dipende da una percentuale di mismatch esatta o da una tolleranza ristretta, verificalo di nuovo e aggiorna la baseline con `--update-visual-baseline` solo quando il nuovo risultato è corretto. Alcune correzioni possono anche modificare una baseline una sola volta, ad esempio gli screenshot su iOS di elementi più grandi del viewport, che non presentano più un'area nera. Consulta la [guida alla migrazione alla v11](https://github.com/webdriverio/visual-testing/blob/main/docs/v11-migration.md).

### Ho aggiornato alla v10, perché i miei test visivi falliscono?

Nella v10 il motore di confronto è passato da ResembleJS a [Pixelmatch](https://github.com/mapbox/pixelmatch). Pixelmatch utilizza un modello di colore percettivo (YIQ) invece dell'RGB grezzo, quindi le percentuali di mismatch differiscono dalla v9. I tuoi test non sono rotti; le baseline devono semplicemente essere rigenerate una volta. Esegui i tuoi test con `--update-visual-baseline` per accettare i nuovi valori, oppure elimina la cartella della baseline e lascia che `autoSaveBaseline` la ricrei.