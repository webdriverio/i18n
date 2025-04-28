---
id: faq
title: FAQ
---

### Devo utilizzare i metodi `save(Screen/Element/FullPageScreen)` quando voglio eseguire `check(Screen/Element/FullPageScreen)`?

No, non è necessario farlo. Il metodo `check(Screen/Element/FullPageScreen)` lo farà automaticamente per te.

### I miei test visivi falliscono con una differenza, come posso aggiornare la mia baseline?

Puoi aggiornare le immagini di baseline attraverso la riga di comando aggiungendo l'argomento `--update-visual-baseline`. Questo:

-   copierà automaticamente lo screenshot effettivo e lo inserirà nella cartella baseline
-   se ci sono differenze, farà passare il test perché la baseline è stata aggiornata

**Utilizzo:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Quando si eseguono i log in modalità info/debug, vedrai i seguenti log aggiunti

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

### Larghezza e altezza non possono essere negative

Potrebbe essere generato l'errore `Width and height cannot be negative`. 9 volte su 10 questo è legato alla creazione di un'immagine di un elemento che non è nella vista. Assicurati sempre che l'elemento sia nella vista prima di provare a creare un'immagine dell'elemento.

### L'installazione di Canvas su Windows è fallita con log di Node-Gyp

Se riscontri problemi con l'installazione di Canvas su Windows a causa di errori di Node-Gyp, tieni presente che questo si applica solo alla Versione 4 e precedenti. Per evitare questi problemi, considera l'aggiornamento alla Versione 5 o superiore, che non ha queste dipendenze e utilizza [Jimp](https://github.com/jimp-dev/jimp) per l'elaborazione delle immagini.

Se hai ancora bisogno di risolvere i problemi con la Versione 4, controlla:

-   la sezione Node Canvas nella guida [Getting Started](/docs/visual-testing#system-requirements)
-   [questo post](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) per la risoluzione dei problemi di Node-Gyp su Windows. (Grazie a [IgorSasovets](https://github.com/IgorSasovets))