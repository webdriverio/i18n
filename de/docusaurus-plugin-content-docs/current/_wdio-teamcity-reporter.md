---
id: wdio-teamcity-reporter
title: Teamcity Reporter Reporter
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---


> wdio-teamcity-reporter ist ein Paket von Drittanbietern. Weitere Informationen finden Sie auf [GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter)

WebdriverIO Teamcity Reporter, der es ermöglicht, Testergebnisse in Echtzeit anzuzeigen und Testinformationen auf der Registerkarte "Tests" der Seite mit den Build-Ergebnissen verfügbar zu machen.


## Installation

```bash
npm install wdio-teamcity-reporter --save-dev
```

Anweisungen zur Installation von WebdriverIO finden Sie hier: https://webdriver.io/docs/gettingstarted


## Konfiguration

Fügen Sie den Reporter in Ihrer [wdio.conf.js](http://webdriver.io/guide/testrunner/configurationfile.html) Datei hinzu:

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

### Optionen

- `captureStandardOutput (boolean)` — wenn `true`, werden alle Standardausgaben (und Standardfehler), die zwischen den Meldungen `testStarted` und `testFinished` empfangen werden, als Testausgabe betrachtet. Der Standardwert ist `false` und geht davon aus, dass testStdOut- und testStdErr-Servicemeldungen verwendet werden, um die Testausgabe zu melden. Standard: `false`.
- `flowId (boolean)` — wenn `true`, wird allen Nachrichten die Eigenschaft `flowId` hinzugefügt. Flow-Tracking ist beispielsweise notwendig, um separate Prozesse zu unterscheiden, die parallel ausgeführt werden. Standard: `true`.
- `message (string)` — Möglichkeit, ein bestimmtes Format für die Namenseigenschaft bereitzustellen. Mögliche Schlüssel: `[browser]`, `[title]`. Beispiel, `[browser] / [title]`. Standard: `[title]`.


## Links

- Referenz zur Teamcity-Dokumentation zu Berichtsmeldungen: https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- Teamcity Testdrive: https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/


## Lizenz

> The MIT License