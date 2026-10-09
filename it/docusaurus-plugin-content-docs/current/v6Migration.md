---
id: v6-migration
title: Dalla v5 alla v6
description: "Aggiorna un progetto WebdriverIO dalla v5 alla v6 aggiornando le dipendenze, trasformando il file di configurazione e aggiornando le spec e i page object."
---

Questo tutorial è rivolto a chi sta ancora utilizzando la `v5` di WebdriverIO e desidera migrare alla `v6` o all'ultima versione di WebdriverIO. Come menzionato nel nostro [post del blog sul rilascio](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released), le modifiche per questo aggiornamento di versione possono essere riassunte come segue:

- abbiamo consolidato i parametri per alcuni comandi (ad es. `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) e spostato tutti i parametri opzionali in un unico oggetto, ad es.

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- le configurazioni dei servizi sono state spostate nella lista dei servizi, ad es.

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- alcune opzioni dei servizi sono state rinominate per motivi di semplificazione
- abbiamo rinominato il comando `launchApp` in `launchChromeApp` per le sessioni Chrome WebDriver

:::info

Se stai utilizzando WebdriverIO `v4` o precedente, aggiorna prima alla `v5`.

:::

Anche se ci piacerebbe avere un processo completamente automatizzato, la realtà è diversa. Ognuno ha una configurazione differente. Ogni passaggio dovrebbe essere considerato come una guida piuttosto che come un'istruzione passo dopo passo. Se riscontri problemi con la migrazione, non esitare a [contattarci](https://github.com/webdriverio/codemod/discussions/new).

## Configurazione

Come per altre migrazioni, possiamo utilizzare il [codemod](https://github.com/webdriverio/codemod) di WebdriverIO. Per installare il codemod, esegui:

```sh
npm install jscodeshift @wdio/codemod
```

## Aggiornare le dipendenze di WebdriverIO

Dato che tutte le versioni di WebdriverIO sono strettamente legate tra loro, è meglio aggiornare sempre a un tag specifico, ad es. `6.12.0`. Se decidi di aggiornare dalla `v5` direttamente alla `v7`, puoi omettere il tag e installare le ultime versioni di tutti i pacchetti. Per farlo, copiamo tutte le dipendenze relative a WebdriverIO dal nostro `package.json` e le reinstalliamo tramite:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

Di solito le dipendenze di WebdriverIO fanno parte delle dev dependencies, ma questo può variare a seconda del progetto. Dopo questo passaggio, il tuo `package.json` e il tuo `package-lock.json` dovrebbero essere aggiornati. __Nota:__ queste sono dipendenze di esempio, le tue potrebbero essere diverse. Assicurati di trovare l'ultima versione v6 eseguendo, ad es.:

```sh
npm show webdriverio versions
```

Cerca di installare l'ultima versione 6 disponibile per tutti i pacchetti core di WebdriverIO. Per i pacchetti della community questo può variare da pacchetto a pacchetto. In questo caso consigliamo di consultare il changelog per sapere quale versione è ancora compatibile con la v6.

## Trasformare il file di configurazione

Un buon primo passo è iniziare dal file di configurazione. Tutte le breaking change possono essere risolte in modo completamente automatico tramite il codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

Il codemod non supporta ancora i progetti TypeScript. Vedi [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Stiamo lavorando per implementarne presto il supporto. Se usi TypeScript, partecipa anche tu!

:::

## Aggiornare i file di spec e i page object

Per aggiornare tutte le modifiche ai comandi, esegui il codemod su tutti i tuoi file e2e che contengono comandi WebdriverIO, ad es.:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

Ecco fatto! Non sono necessarie altre modifiche 🎉

## Conclusione

Speriamo che questo tutorial ti abbia guidato un po' attraverso il processo di migrazione a WebdriverIO `v6`. Consigliamo vivamente di continuare ad aggiornare all'ultima versione, dato che l'aggiornamento alla `v7` è banale grazie alla quasi totale assenza di breaking change. Consulta la guida alla migrazione [per aggiornare alla v7](v7-migration).

La community continua a migliorare il codemod testandolo con vari team in diverse organizzazioni. Non esitare ad [aprire una issue](https://github.com/webdriverio/codemod/issues/new) se hai feedback o ad [avviare una discussione](https://github.com/webdriverio/codemod/discussions/new) se incontri difficoltà durante il processo di migrazione.