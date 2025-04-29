---
id: wdio-eslinter-service
title: Rilevamento automatico di importazioni mancanti con il servizio eslint
custom_edit_url: https://github.com/jamesmortensen/wdio-eslinter-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-eslinter-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/jamesmortensen/wdio-eslinter-service) | [npm](https://www.npmjs.com/package/wdio-eslinter-service)

Ti è mai capitato di eseguire i tuoi test e2e, solo per scoprire 10, 15 o 30 minuti dopo che c'era un'importazione mancante/errata, che non è apparsa fino a metà dell'esecuzione del test? Quando ciò accade, il test runner segnala questi test come non funzionanti.

eslint è un ottimo strumento per rilevare diversi errori prima dell'esecuzione, e questo servizio esegue lo strumento eslint, prima di eseguire i test WebdriverIO, come un passaggio automatizzato invece di uno manuale.

È spesso meglio fallire più velocemente in modo da poter risolvere i problemi prima piuttosto che dopo.

La configurazione consigliata è utilizzare il runner "unresolved" per controllare solo le importazioni mancanti, ma se lo desideri, puoi anche configurare il servizio per eseguire l'eslinter nel tuo progetto utilizzando il runner npm o yarn, o passando un flag che indica al sistema di utilizzare anche la tua configurazione .eslintrc.

## Installazione

Installa il wdio-eslinter-service:

```
$ npm i wdio-eslinter-service --save-dev 
```


### Avvio rapido - Controlla solo le importazioni mancanti o non risolte

Per impostazione predefinita, questa configurazione minima, il runner "unresolved", verifica le importazioni require non risolte e genera un errore se vengono trovate importazioni non risolte. Il servizio quindi interrompe l'esecuzione. Puoi personalizzare .eslintrc.js per eseguire più controlli utilizzando i runner "npm" o "yarn", se lo desideri. Vedi [eslint](https://www.npmjs.com/package/eslint) per maggiori dettagli.

Se non hai una configurazione `.eslintrc.js` nel tuo progetto, wdio-eslinter-service può essere configurato per utilizzarne una predefinita che controlla solo le importazioni mancanti prima di eseguire i test. Questo è utile in modo da scoprire le importazioni errate prima piuttosto che dopo. Per configurare questo, aggiungi la seguente configurazione eslinter al tuo array dei servizi (supponendo che tu stia già utilizzando il servizio chromedriver; altrimenti, ometti quella parte):

**wdio.conf.js:**
```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved'
        }
    ]],
```

A questo punto, inizia a eseguire i test, e se c'è un'importazione mancante o errata, WebdriverIO la registrerà e terminerà immediatamente l'esecuzione del test:

```
$ npx wdio
```


#### Opzionale - se si utilizza module-alias

Se stai utilizzando il modulo [module-alias](https://www.npmjs.com/package/module-alias), che ti consente di configurare alias per sostituire i percorsi relativi, dovrai passarlo alla configurazione eslinter utilizzando il plugin eslint-import-resolver-custom-alias. Di seguito un esempio:

```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved',
            eslintOverride: {
                "settings": {
                    "import/resolver": {
                        "eslint-import-resolver-custom-alias": {
                            "alias": {
                                "@utils": "./utils",
                                "@specs": "./test-sync/specs",
                                "@pageobjects": "./test-sync/pageobjects",
                                "@": "./"
                            }
                        }
                    }
                }
            }
        }
    ]],
```

Installa il plugin nel tuo progetto:

```
$ npm i eslint-import-resolver-custom-alias
```

Esegui i test e verifica che il sistema trovi le importazioni errate che utilizzano alias di modulo:

```
$ npx wdio
```

#### Sperimentale - Usa insieme a una configurazione eslintrc esistente nel tuo progetto

Per fare in modo che anche il servizio eslinter utilizzi una configurazione eslintrc esistente nel tuo progetto, imposta `includeProjectEslintrc` su true nell'array dei servizi di configurazione wdio.conf.js.

Ho riscontrato problemi con plugin in conflitto. Se la configurazione eslint del tuo progetto sta anche cercando importazioni non risolte, questo potrebbe non funzionare e potrebbe richiedere modifiche al tuo .eslintrc.js. Questo non è consigliato al momento.


### Alternative avanzate - Utilizzo dei runner npm e yarn

I runner npm e yarn ti aiutano a ottenere un controllo aggiuntivo sull'esecuzione di una configurazione eslinter esistente nel tuo progetto. Con questa configurazione, puoi definire comandi aggiuntivi da eseguire nella sezione run-scripts del tuo package.json:

All'interno del tuo `package.json`, aggiungi questa voce ai tuoi script:

```json
{
    "scripts": {
        "eslint": "eslint ."
    }
}
```

**NOTA: Aggiungere eslint al package.json è necessario affinché il servizio funzioni quando si utilizzano i runner npm o yarn.**

Se non hai già installato e configurato eslint, dovrai installarlo e configurarlo nel tuo progetto, così come eventuali plugin che stai utilizzando, come eslint-plugin-import:

```
$ npm i eslint eslint-plugin-import
```

Se stai utilizzando il plugin eslint-import-resolver-custom-alias per mappare gli alias di modulo ai loro percorsi reali, dovrai installarlo anche:

```
$ npm i eslint-import-resolver-custom-alias
```

Dovrai anche creare un file `.eslintrc.js`, se non hai già uno dei file di configurazione eslintrc nel tuo progetto. Ecco una configurazione di base per cercare solo importazioni non risolte, e puoi espandere questa configurazione per convalidare altri controlli di qualità del codice prima di eseguire i test:

```
// .eslintrc.js
module.exports = {
    "parserOptions": {
        "ecmaVersion": 2022
    },
    "plugins": [
        "import"
    ],
    "rules": {
        "import/no-unresolved": [
            2,
            {
                "commonjs": true,
                "amd": false,
                "caseSensitive": true
            }
        ]
    }
}
```

Infine, aggiungi il servizio `eslinter` all'array dei servizi in `wdio.conf.js`:

```javascript
    services: ['eslinter']
```

Esegui `npm run eslint` per verificare e controllare gli errori.

Se usi `yarn` puoi configurare l'opzione `runnerType` del servizio:

```javascript
    services: [
        ['eslinter', { runnerType: 'yarn' }]
    ]
```

Se hai già uno script linter che vorresti riutilizzare (invece di `eslint`), puoi configurare l'opzione `scriptName` del servizio:

```javascript
    services: [
        ['eslinter', { scriptName: 'eslint:check' }]
    ]
```

## Utilizzo in WebdriverIO

Avvia il test runner di WebdriverIO normalmente. eslint controllerà il codice. Se vengono trovati errori, l'esecuzione cessa immediatamente.

```bash
$ npx wdio
```


**Esempio:**

```bash
$ npx wdio --spec ./test/specs/example.e2e.js 

Execution of 1 spec files started at 2021-05-15T12:04:05.388Z

2021-05-15T12:04:05.793Z WARN wdio-eslinter-service: initialize wdio-eslint-service using npm runner.
Deleted files and directories:
 /Users/jem/Dev/wdio-example/allure-results

/Users/jem/Dev/wdio-example/test/specs/login.js
  1:22  error  Unable to resolve path to module '.../pageObjects/Auth.page'  import/no-unresolved

✖ 1 problem (1 error, 0 warnings)

2021-05-15T12:04:08.581Z ERROR wdio-eslinter-service: SEVERE: Code contains eslint errors or eslint not installed.
```