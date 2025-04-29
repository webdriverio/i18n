---
id: wdio-teamcity-reporter
title: Teamcity Reporter Reporter
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-teamcity-reporter è un pacchetto di terze parti, per maggiori informazioni consulta [GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter)

WebdriverIO Teamcity reporter che rende possibile visualizzare i risultati dei test in tempo reale, rende le informazioni sui test disponibili nella scheda Test della pagina Risultati di Build.


## Installazione

```bash
npm install wdio-teamcity-reporter --save-dev
```

Le istruzioni su come installare WebdriverIO possono essere trovate qui: https://webdriver.io/docs/gettingstarted


## Configurazione

Aggiungi il reporter nel tuo file [wdio.conf.js](http://webdriver.io/guide/testrunner/configurationfile.html):

```javascript
exports.config = {
  // ...
  reporters: [
    [
      'teamcity',
      {
        captureStandardOutput: false, // optional
        flowId: true, // optional
        message: '[title]', // optional
      }
    ]
  ],
  // ...
}
```

### Opzioni

- `captureStandardOutput (boolean)` — se `true`, tutti i messaggi di output standard (e di errore standard) ricevuti tra i messaggi `testStarted` e `testFinished` saranno considerati output di test. Il valore predefinito è `false` e presuppone l'utilizzo dei messaggi di servizio testStdOut e testStdErr per riportare l'output del test. Predefinito `false`.
- `flowId (boolean)` — se `true`, la proprietà `flowId` verrà aggiunta a tutti i messaggi. Il tracciamento del flusso è necessario ad esempio per distinguere processi separati in esecuzione in parallelo. Predefinito `true`.
- `message (string)` — possibilità di fornire un formato particolare per la proprietà name. Chiavi possibili: `[browser]`, `[title]`. Esempio, `[browser] / [title]`. Predefinito `[title]`.


## Link

- Riferimento alla documentazione di Teamcity sui messaggi di reporting: https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- Teamcity testdrive: https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/


## Licenza

> The MIT License