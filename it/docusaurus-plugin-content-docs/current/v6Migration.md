---
id: v6-migration
title: Da v5 a v6
---

Questo tutorial è per le persone che stanno ancora utilizzando `v5` di WebdriverIO e vogliono migrare alla `v6` o all'ultima versione di WebdriverIO. Come menzionato nel nostro [post sul blog di rilascio](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released), le modifiche per questo aggiornamento di versione possono essere riassunte come segue:

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

- le configurazioni per i servizi sono state spostate nell'elenco dei servizi, ad es.

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

- alcune opzioni di servizio sono state rinominate per motivi di semplificazione
- abbiamo rinominato il comando `launchApp` in `launchChromeApp` per le sessioni Chrome WebDriver

:::info

Se stai utilizzando WebdriverIO `v4` o versioni precedenti, aggiorna prima alla `v5`.

:::

Anche se vorremmo avere un processo completamente automatizzato per questo, la realtà è diversa. Ognuno ha una configurazione diversa. Ogni passo dovrebbe essere visto come una guida e meno come un'istruzione passo passo. Se hai problemi con la migrazione, non esitare a [contattarci](https://github.com/webdriverio/codemod/discussions/new).

## Configurazione

Simile ad altre migrazioni, possiamo utilizzare il [codemod](https://github.com/webdriverio/codemod) di WebdriverIO. Per installare il codemod, esegui:

```sh
npm install jscodeshift @wdio/codemod
```

## Aggiorna le Dipendenze di WebdriverIO

Dato che tutte le versioni di WebdriverIO sono strettamente legate tra loro, è meglio aggiornare sempre a un tag specifico, ad es. `6.12.0`. Se decidi di aggiornare direttamente da `v5` a `v7` puoi omettere il tag e installare le versioni più recenti di tutti i pacchetti. Per farlo, copiamo tutte le dipendenze relative a WebdriverIO dal nostro `package.json` e le reinstalliamo tramite:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

Di solito le dipendenze di WebdriverIO fanno parte delle dipendenze di sviluppo, ma a seconda del tuo progetto questo può variare. Dopo questo, il tuo `package.json` e `package-lock.json` dovrebbero essere aggiornati. __Nota:__ queste sono dipendenze di esempio, le tue potrebbero differire. Assicurati di trovare l'ultima versione v6 chiamando, ad es.:

```sh
npm show webdriverio versions
```

Prova a installare l'ultima versione 6 disponibile per tutti i pacchetti core di WebdriverIO. Per i pacchetti della community questo può differire da pacchetto a pacchetto. Qui consigliamo di controllare il changelog per informazioni su quale versione è ancora compatibile con la v6.

## Trasforma il File di Configurazione

Un buon primo passo è iniziare con il file di configurazione. Tutte le modifiche che causano incompatibilità possono essere risolte usando il codemod in modo completamente automatico:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

Il codemod non supporta ancora progetti TypeScript. Vedi [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Stiamo lavorando per implementare il supporto a breve. Se stai utilizzando TypeScript, ti preghiamo di partecipare!

:::

## Aggiorna i File Spec e i Page Objects

Per aggiornare tutte le modifiche dei comandi, esegui il codemod su tutti i tuoi file e2e che contengono comandi WebdriverIO, ad es.:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

È tutto! Non sono necessarie altre modifiche 🎉

## Conclusione

Speriamo che questo tutorial ti guidi un po' attraverso il processo di migrazione a WebdriverIO `v6`. Ti consigliamo vivamente di continuare ad aggiornare all'ultima versione, dato che l'aggiornamento alla `v7` è banale grazie a quasi nessuna modifica che causa incompatibilità. Controlla la guida alla migrazione [per aggiornare alla v7](v7-migration).

La community continua a migliorare il codemod mentre lo testa con vari team in varie organizzazioni. Non esitare a [segnalare un problema](https://github.com/webdriverio/codemod/issues/new) se hai feedback o [avviare una discussione](https://github.com/webdriverio/codemod/discussions/new) se hai difficoltà durante il processo di migrazione.