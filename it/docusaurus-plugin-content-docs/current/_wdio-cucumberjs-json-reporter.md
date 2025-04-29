---
id: wdio-cucumberjs-json-reporter
title: Reporter CucumberJS JSON
custom_edit_url: https://github.com/wswebcreation/wdio-cucumberjs-json-reporter/edit/main/README.md
---


> wdio-cucumberjs-json-reporter è un pacchetto di terze parti, per maggiori informazioni consulta [GitHub](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) | [npm](https://nodei.co/npm/wdio-cucumberjs-json-reporter)

Un reporter WDIO che crea file JSON CucumberJS per WebdriverIO v8 e versioni successive.

[![NPM](https://nodei.co/npm/wdio-cucumberjs-json-reporter.png)](https://nodei.co/npm/wdio-cucumberjs-json-reporter/)

## Cosa fa
Questo reporter genererà un **file JSON Cucumber** per ogni feature che viene testata. Il file JSON può essere utilizzato con qualsiasi report che si desidera utilizzare come ad esempio [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter).

Aggiungerà anche metadati sull'istanza in esecuzione al file feature e, non meno importante, ti darà l'opportunità di aggiungere allegati all'output JSON.

## Installazione
Il modo più semplice è mantenere `wdio-cucumberjs-json-reporter` come devDependency nel tuo `package.json`.

```json
{
  "devDependencies": {
    "wdio-cucumberjs-json-reporter": "^5.0.0"
  }
}
```

Puoi farlo semplicemente con:

```bash
npm install wdio-cucumberjs-json-reporter --save-dev
```

così verrà automaticamente aggiunto al tuo `package.json`

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui](https://webdriver.io/docs/gettingstarted).

## Configurazione
Configura la directory di output e la lingua nel tuo file wdio.conf.js:

```js
export const config = {
    // ...
    reporters: [
        // Così con le opzioni predefinite, vedi le opzioni di seguito
        'cucumberjs-json',

        // OPPURE così se vuoi impostare la cartella e la lingua
        [ 'cucumberjs-json', {
                jsonFolder: '.tmp/new/',
                language: 'en',
            },
        ],
    ],
  // ...
}
```

> NON USARE ENTRAMBI I MODI PER AGGIUNGERE IL REPORTER, QUESTO È SOLO UN ESEMPIO!

## Opzioni
### `jsonFolder`
- **Tipo:** `String`
- **Obbligatorio:** No
- **Predefinito:** `.tmp/json/`

La directory in cui verranno archiviati i file JSON generati da questo report, relativa da dove viene avviato lo script.

**N.B.:** Se usi uno script npm dalla riga di comando, come per esempio `npm run test`, il `jsonFolder` sarà relativo al percorso
da cui viene eseguito lo script. Eseguirlo dalla radice del tuo progetto creerà anche il `jsonFolder` nella radice del tuo progetto.

### `language`
- **Tipo:** `String`
- **Obbligatorio:** No
- **Predefinito:** `en`

La lingua in cui sono scritti gli scenari Gherkin (predefinito in inglese). L'elenco dei codici lingua e delle relative parole chiave può essere trovato [qui](https://cucumber.io/docs/gherkin/reference/#overview).

### `disableHooks`
- **Tipo:** `boolean`
- **Obbligatorio:** No
- **Predefinito:** `false`

I dettagli degli hook non faranno parte della generazione se questa proprietà è impostata su `true`.

### `reportFilePerRetry`
- **Tipo:** `boolean`
- **Obbligatorio:** No
- **Predefinito:** `true`

Quando una spec viene riprovata, il report verrà aggiunto al file di report esistente dai tentativi precedenti se questa proprietà è impostata su `false`.

**Esempio**:
`['cucumberjs-json', { jsonFolder: '.tmp/new/', language: 'en', disableHooks:true}]`

## Metadati

> **Nota:**\
> Questo non è attualmente supportato se stai utilizzando WebdriverIO V6, WebdriverIO V5 lo supporta ancora e WebdriverIO V7 lo supporta nuovamente

Come detto, questo report può memorizzare automaticamente i metadati della macchina/dispositivo corrente su cui è stata eseguita la feature.

Per personalizzarlo puoi aggiungerlo aggiungendo il seguente oggetto alle tue `capabilities`

```js
// Esempio wdio.conf.js
export const config = {
    //..
    capabilities: [
        {
            browserName: 'chrome',
            // Aggiungi questo
            'cjson:metadata': {
                // Per un browser
                browser: {
                    name: 'chrome',
                    version: '58',
                },
                // per un'app
                app: {
                  name: 'name.of.app.ipa',
                  version: '1.2.3',
                },
                device: 'MacBook Pro 15',
                platform: {
                    name: 'OSX',
                    version: '10.12.6'
                }
            },
        },
    ],
};
```

> L'oggetto metadata deve avere il prefisso `cjson`, altrimenti non funzionerà!

### Valori dei metadati
#### `metadata.app.name`
- **Tipo:** `string`

**es.:** Il nome dell'app.

#### `metadata.app.version`
- **Tipo:** `string`

**es.:** La versione dell'app.

#### `metadata.browser.name`
- **Tipo:** `string`
- **Valori possibili:** `internet explorer | edge | chrome | firefox | safari`

#### `metadata.browser.version`
- **Tipo:** `string`

**es.:** La versione del browser, questa può essere aggiunta manualmente o recuperata durante l'esecuzione dei test per ottenere il numero di versione esatto.

#### `metadata.device`
- **Tipo:** `string`

**es.:** Un nome che rappresenta il tipo di dispositivo. Ad esempio, se lo esegui su una macchina virtuale, puoi inserirlo qui `Virtual Machine`,
o il nome del cellulare, come ad esempio `iPhone 7 Plus`.

#### `metadata.platform.name`
- **Tipo:** `string`
- **Valori possibili:** `windows | osx | linux | ubuntu | android | ios`

#### `metadata.platform.version`
- **Tipo:** `string`

**es.:** La versione della piattaforma

> Se non fornisci l'oggetto `browser` nei metadati, questo modulo lo determinerà automaticamente per te. **Sovrascriverà sempre con il valore più recente che può determinare.**

> Se non fornisci il `device` e/o l'oggetto `platform` verrà impostato predefinito a `not known`

> Se non fornisci un `browser.name` o un `browser.version` il modulo cercherà di determinarlo automaticamente.

## Allegato
Hai l'opzione di allegare dati al file JSON in tutti questi hook/passaggi:

- Before(All)
- After(All)
- Given
- When
- Then
- And

L'unica cosa che devi fornire è il seguente codice nei tuoi file step.

Per ES Modules (ESM)
```js
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// Allega una stringa (se non viene fornito alcun tipo, per impostazione predefinita sarà automaticamente `text/plain`)
cucumberJson.attach('just a string');
cucumberJson.attach('just a second string', 'text/plain');

// Allega JSON
cucumberJson.attach({"json-string": true}, 'application/json');

// Allega uno screenshot in un hook before
cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
```
Per CommonJS (CJS)
```js
const { attach } = require("wdio-cucumberjs-json-reporter");

// Allega una stringa (se non viene fornito alcun tipo, per impostazione predefinita sarà automaticamente `text/plain`)
attach('just a string');
attach('just a second string', 'text/plain');

// Allega JSON
attach({"json-string": true}, 'application/json');

// Allega uno screenshot in un hook before
attach(await browser.takeScreenshot(), 'image/png');
```

## Utilizzalo con multiple-cucumber-html-reporter
Il modulo precedente per WebdriverIO V4, [wdio-multiple-cucumber-html-reporter](https://github.com/webdriverio-community/wdio-multiple-cucumber-html-reporter),
aveva una connessione integrata con il modulo [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter). **Questo non è il caso di questo
reporter** perché la nuova configurazione di WebdriverIO V5 è basata su un'istanza che non mi consente di utilizzare gli hook `onPrepare` e `onComplete`.

Se vuoi ancora utilizzare il modulo [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter) puoi aggiungere quanto segue al tuo file di configurazione.

- Installa il modulo con

    ```bash
    npm install multiple-cucumber-html-reporter --save-dev
    ```

- Aggiungi questo al tuo file di configurazione

    ```js
    import fs from 'node:fs/promises'
    // Importa il modulo
    import { generate } from 'multiple-cucumber-html-reporter'

    // Esempio wdio.conf.js
    export const config = {
      //..

      // =====
      // Hooks
      // =====
      /**
       * Viene eseguito una volta prima che tutti i worker vengano lanciati.
       */
      onPrepare: () => {
        // Rimuovi la cartella `.tmp/` che contiene i file json e report
        return fs.rm('.tmp/', { recursive: true });
      },
      /**
       * Viene eseguito dopo che tutti i worker sono stati spenti e il processo sta per terminare.
       */
      onComplete: () => {
        // Genera il report quando tutti i test sono terminati
        generate({
          // Richiesto
          // Questa parte deve essere lo stesso percorso in cui memorizzi i file JSON
          // default = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // per ulteriori opzioni vedi https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });
      }
    }
    ```

## Versioni precedenti di WebdriverIO

> **QUESTO MODULO PUÒ FUNZIONARE SOLO CON WebdriverIO V8+!**\
> **Per V6 controlla la documentazione [qui](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v6) e usa la versione 2.0.4**\
> **Per V5 controlla la documentazione [qui](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v5) e usa la versione 1.3.0**

> **QUESTO MODULO NON È UN SOSTITUTO DI [wdio-multiple-cucumber-html-reporter](https://github.com/wswebcreation/wdio-multiple-cucumber-html-reporter). QUEL MODULO SUPPORTA SOLO WEBDRIVERIO V4 E CREA ANCHE UN REPORT. QUESTO MODULO CREA SOLO UN JSON, NESSUN REPORT!!**