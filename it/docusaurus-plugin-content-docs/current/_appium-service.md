---
id: appium-service
title: Servizio Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-appium-service/README.md
---


La gestione del server Appium è al di fuori dell'ambito del progetto WebdriverIO. Questo servizio ti aiuta ad eseguire il server Appium in modo fluido quando esegui test con il [WDIO testrunner](https://webdriver.io/docs/clioptions). Avvia l'[Appium Server](https://appium.github.io/appium.io/docs/en/about-appium/getting-started/index.html#starting-appium) in un processo figlio.

## Installazione

Il modo più semplice è mantenere `@wdio/appium-service` come devDependency nel tuo `package.json`, tramite:

```sh
npm install @wdio/appium-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui.](https://webdriver.io/docs/gettingstarted)

## Configurazione

Per utilizzare il servizio è necessario aggiungere `appium` al tuo array di servizi:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // default appium port
    services: ['appium'],
    // ...
};
```

## Opzioni

Le seguenti opzioni possono essere aggiunte al file wdio.conf.js. Per definire le opzioni per il servizio è necessario aggiungere il servizio alla lista `services` nel seguente modo:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // default appium port
    services: [
        ['appium', {
            // Appium service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath
Il percorso dove tutti i log del server Appium devono essere memorizzati.

Tipo: `String`

Esempio:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command
Per utilizzare la tua installazione di Appium, ad esempio installata globalmente, specifica il comando che dovrebbe essere avviato.

Tipo: `String`

Esempio:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            command : 'appium'
        }]
    ],
    // ...
}
```

### args
Mappa degli argomenti per il server Appium, passati direttamente a `appium`.

Vedi [la documentazione](https://github.com/appium/appium/blob/master/packages/appium/docs/en/cli/args.md) per possibili argomenti.
Gli argomenti sono forniti in lower camel case. Ad esempio, `debugLogSpacing: true` si trasforma in `--debug-log-spacing`, oppure possono essere forniti come descritto nella documentazione di Appium.

Tipo: `Object`

Default: `{}`

Esempio:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            args: {
                // ...
                debugLogSpacing: true,
                platformName: 'iOS'
                // ...
            }
        }]
    ],
    // ...
}
```
**Nota:** L'utilizzo di alias è sconsigliato e non supportato. Invece, si prega di utilizzare il nome completo della proprietà in lower camel case.

----

Per ulteriori informazioni su WebdriverIO vedere la [homepage](https://webdriver.io).