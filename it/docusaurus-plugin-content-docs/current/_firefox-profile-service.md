---
id: firefox-profile-service
title: Servizio Profilo Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---


Vuoi eseguire il tuo browser Firefox con un'estensione specifica o hai bisogno di impostare alcune preferenze? Selenium ti permette di utilizzare un profilo per il browser Firefox passando questo profilo come stringa `base64` alla proprietà `moz:firefoxOptions.profile` nelle tue capacità desiderate. Questo richiede la creazione di quel profilo e la sua conversione in `base64`. Questo servizio per il [testrunner wdio](https://webdriver.io/docs/clioptions) ti solleva dal lavoro di compilazione del profilo e ti consente di definire comodamente le opzioni desiderate dal file `wdio.conf.js`.

Per trovare tutte le opzioni possibili apri [about:config](about:config) nel tuo browser Firefox o vai al sito web [mozillaZine](http://kb.mozillazine.org/About:config_entries) per trovare la documentazione completa su ogni impostazione. Oltre a ciò, puoi definire estensioni Firefox compilate (come `*.xpi`) che dovrebbero essere installate prima dell'inizio del test.

## Installazione

Il modo più semplice è mantenere `@wdio/firefox-profile-service` come devDependency nel tuo `package.json`, tramite:

```sh
npm install @wdio/firefox-profile-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` si possono trovare [qui.](https://webdriver.io/docs/gettingstarted)

## Configurazione

Configura il tuo profilo aggiungendo il servizio `firefox-profile` alla tua lista di servizi. Quindi definisci le tue impostazioni nella proprietà `firefoxProfile` in questo modo:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // percorso al file .xpi
                '/path/to/extensionB' // o percorso all'estensione Firefox decompressa
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // usa solo per firefox <= 55
        }]
    ],
    // ...
};
```

Se hai creato un'estensione Firefox personalizzata che desideri installare nel browser, assicurati di impostare `'xpinstall.signatures.required': false` come flag del profilo poiché le estensioni Firefox devono essere [firmate da Mozilla](https://wiki.mozilla.org/Add-ons/Extension_Signing).

Per utilizzare estensioni personalizzate non firmate, dovrai anche utilizzare [Firefox Developer Edition](https://www.mozilla.org/en-GB/firefox/developer/) poiché il Firefox regolare dalla versione 48 in poi [non lo consente](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline).

## Opzioni

Contiene tutte le impostazioni come coppie chiave-valore. Puoi trovare tutte le impostazioni disponibili nella pagina `about:config`.

### extensions

Aggiungi una o più estensioni alla sessione del browser. Tutte le voci possono essere un percorso assoluto al file `.xpi` o il percorso a una directory di estensione Firefox decompressa.

Tipo: `String[]`<br />
Default: `[]`

### profileDirectory

Crea un profilo Firefox basato su uno esistente impostando un percorso assoluto a quel profilo.

Tipo: `String`<br />
Default: `null`

### proxy

Imposta le impostazioni del proxy di rete. Il parametro `proxy` è un hash la cui struttura dipende dal valore della chiave obbligatoria `proxyType`, che può assumere uno dei seguenti valori di stringa:

 * `direct` - connessione diretta (nessun proxy)
 * `system` - usa le impostazioni proxy del sistema operativo
 * `pac` - usa una configurazione proxy automatica impostata in base al valore della chiave `autoconfigUrl`
 * `manual` - impostazioni proxy manuali definite separatamente per diversi protocolli utilizzando valori dalle seguenti chiavi: `ftpProxy`, `httpProxy`, `sslProxy`, `socksProxy`

Tipo: `Object`<br />
Default: `null`<br />
Esempio:

- Proxy Automatico:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'pac',
                    autoconfigUrl: 'http://myserver/proxy.pac'
                }
            }]
        ],
        // ...
    };
    ```

- Proxy HTTP Manuale:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

- Proxy HTTP e HTTPS Manuale:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080',
                    sslProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

### legacy

Imposta questo flag su `true` se usi Firefox v55 o inferiore.

Tipo: `Boolean`<br />
Default: `false`

----

Per ulteriori informazioni su WebdriverIO consulta la [homepage](https://webdriver.io).