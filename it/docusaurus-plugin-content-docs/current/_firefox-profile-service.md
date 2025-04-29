---
id: firefox-profile-service
title: Servizio Profilo Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Vuoi eseguire il tuo browser Firefox con un'estensione specifica o hai bisogno di impostare alcune preferenze? Selenium ti permette di utilizzare un profilo per il browser Firefox passando questo profilo come stringa `base64` alla proprietà `moz:firefoxOptions.profile` nelle tue capacità desiderate. Questo richiede la creazione di quel profilo e la sua conversione in `base64`. Questo servizio per il [wdio testrunner](https://webdriver.io/docs/clioptions) si occupa del lavoro di compilazione del profilo e ti permette di definire comodamente le opzioni desiderate dal file `wdio.conf.js`.

Per trovare tutte le opzioni possibili, apri [about:config](about:config) nel tuo browser Firefox o visita il sito [mozillaZine](http://kb.mozillazine.org/About:config_entries) per trovare la documentazione completa su ogni impostazione. Oltre a ciò, puoi definire estensioni Firefox compilate (come `*.xpi`) che dovrebbero essere installate prima dell'inizio del test.

## Installazione

Il modo più semplice è mantenere `@wdio/firefox-profile-service` come devDependency nel tuo `package.json`, tramite:

```sh
npm install @wdio/firefox-profile-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui.](https://webdriver.io/docs/gettingstarted)

## Configurazione

Configura il tuo profilo aggiungendo il servizio `firefox-profile` alla tua lista di servizi. Quindi definisci le tue impostazioni nella proprietà `firefoxProfile` come questo:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // path to .xpi file
                '/path/to/extensionB' // or path to unpacked Firefox extension
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // only use for firefox <= 55
        }]
    ],
    // ...
};
```

Se hai creato un'estensione Firefox personalizzata che desideri installare nel browser, assicurati di impostare `'xpinstall.signatures.required': false` come flag del profilo poiché le estensioni Firefox devono essere [firmate da Mozilla](https://wiki.mozilla.org/Add-ons/Extension_Signing).

Per utilizzare estensioni personalizzate non firmate, dovrai anche utilizzare [Firefox Developer Edition](https://www.mozilla.org/en-GB/firefox/developer/) poiché le versioni regolari di Firefox 48 e successive [non lo consentono](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline).

## Opzioni

Contiene tutte le impostazioni come coppie chiave-valore. Puoi trovare tutte le impostazioni disponibili nella pagina `about:config`.

### extensions

Aggiungi una o più estensioni alla sessione del browser. Tutte le voci possono essere o un percorso assoluto al file `.xpi` o il percorso a una directory di estensione Firefox decompressa.

Tipo: `String[]`<br />
Predefinito: `[]`

### profileDirectory

Crea un profilo Firefox basato su uno esistente impostando un percorso assoluto a quel profilo.

Tipo: `String`<br />
Predefinito: `null`

### proxy

Imposta le impostazioni del proxy di rete. Il parametro `proxy` è un hash la cui struttura dipende dal valore della chiave obbligatoria `proxyType`, che prende uno dei seguenti valori di stringa:

 * `direct` - connessione diretta (nessun proxy)
 * `system` - usa le impostazioni proxy del sistema operativo
 * `pac` - usa una configurazione automatica del proxy impostata in base al valore della chiave `autoconfigUrl`
 * `manual` - impostazioni proxy manuali definite separatamente per diversi protocolli utilizzando valori dalle seguenti chiavi: `ftpProxy`, `httpProxy`, `sslProxy`, `socksProxy`

Tipo: `Object`<br />
Predefinito: `null`<br />
Esempio:

- Proxy automatico:
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

- Proxy HTTP manuale:
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

- Proxy HTTP e HTTPS manuale:
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

Si prega di impostare questo flag su `true` se si utilizza Firefox v55 o inferiore.

Tipo: `Boolean`<br />
Predefinito: `false`

----

Per ulteriori informazioni su WebdriverIO visita la [homepage](https://webdriver.io).