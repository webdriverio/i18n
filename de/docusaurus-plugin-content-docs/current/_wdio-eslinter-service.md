---
id: wdio-eslinter-service
title: Auto-erkennung fehlender Importe mit eslint Service
custom_edit_url: https://github.com/jamesmortensen/wdio-eslinter-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-eslinter-service ist ein Drittanbieter-Paket, weitere Informationen finden Sie auf [GitHub](https://github.com/jamesmortensen/wdio-eslinter-service) | [npm](https://www.npmjs.com/package/wdio-eslinter-service)

Haben Sie jemals Ihre E2E-Tests ausgeführt, nur um 10, 15 oder 30 Minuten später festzustellen, dass ein fehlender/falsch geschriebener Import vorlag, der erst in der Mitte des Testlaufs aufgetreten ist? Wenn dies passiert, meldet der Test-Runner diese Tests als fehlerhaft.

eslint ist ein großartiges Werkzeug, um verschiedene Fehler vor der Laufzeit zu erkennen, und dieser Service führt das eslint-Tool vor der Ausführung von WebdriverIO-Tests als automatisierten Schritt anstelle eines manuellen aus.

Es ist oft besser, schneller zu scheitern, damit wir Probleme früher und nicht später beheben können.

Die empfohlene Konfiguration ist, den "unresolved"-Runner zu verwenden, um nur fehlende Importe zu überprüfen. Falls gewünscht, können Sie den Service aber auch so konfigurieren, dass er den eslinter in Ihrem Projekt mit dem npm- oder yarn-Runner ausführt oder indem Sie ein Flag übergeben, das dem System mitteilt, auch Ihre .eslintrc-Konfiguration zu verwenden.

## Installation

Installieren Sie den wdio-eslinter-service:

```
$ npm i wdio-eslinter-service --save-dev 
```


### Schnellstart - Nur auf fehlende oder nicht aufgelöste Importe prüfen

Standardmäßig überprüft diese minimale Konfiguration, der "unresolved"-Runner, nicht aufgelöste require-Importe und löst einen Fehler aus, wenn nicht aufgelöste Importe gefunden werden. Der Service stoppt dann die Ausführung. Sie können .eslintrc.js anpassen, um mit den "npm"- oder "yarn"-Runnern mehr Prüfungen durchzuführen, falls gewünscht. Weitere Details finden Sie unter [eslint](https://www.npmjs.com/package/eslint).

Wenn Sie keine `.eslintrc.js`-Konfiguration in Ihrem Projekt haben, kann wdio-eslinter-service so konfiguriert werden, dass eine Standardkonfiguration verwendet wird, die vor dem Ausführen der Tests nur auf fehlende Importe prüft. Dies ist praktisch, damit Sie früher und nicht später von falschen Importen erfahren. Um dies zu konfigurieren, fügen Sie die folgende eslinter-Konfiguration zu Ihrem Services-Array hinzu (unter der Annahme, dass Sie bereits den chromedriver-Service verwenden; andernfalls lassen Sie diesen Teil weg):

**wdio.conf.js:**
```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved'
        }
    ]],
```

An diesem Punkt starten Sie die Ausführung der Tests, und wenn es einen fehlenden oder falschen Import gibt, wird WebdriverIO ihn protokollieren und den Testlauf sofort beenden:

```
$ npx wdio
```


#### Optional - falls Sie module-alias verwenden

Wenn Sie das Modul [module-alias](https://www.npmjs.com/package/module-alias) verwenden, das Ihnen die Konfiguration von Aliasen zum Ersetzen relativer Pfade ermöglicht, müssen Sie dies mit dem eslint-import-resolver-custom-alias-Plugin in die eslinter-Konfiguration einfügen. Hier ist ein Beispiel:

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

Installieren Sie das Plugin in Ihrem Projekt:

```
$ npm i eslint-import-resolver-custom-alias
```

Führen Sie die Tests aus und überprüfen Sie, ob das System falsche Importe findet, die Modulaliase verwenden:

```
$ npx wdio
```

#### Experimentell - Verwendung zusammen mit einer vorhandenen eslintrc-Konfiguration in Ihrem Projekt

Um den eslinter-Service auch mit einer vorhandenen eslintrc-Konfiguration in Ihrem Projekt zu verwenden, setzen Sie `includeProjectEslintrc` in der wdio.conf.js-Konfiguration im Services-Array auf true.

Ich habe Probleme mit widersprüchlichen Plugins erlebt. Wenn Ihr Projekt-eslint-Setup auch nach nicht aufgelösten Importen sucht, funktioniert dies möglicherweise nicht und erfordert Anpassungen an Ihrer .eslintrc.js. Dies wird derzeit nicht empfohlen.


### Erweiterte Alternativen - Verwendung der npm- und yarn-Runner

Die npm- und yarn-Runner helfen Ihnen, zusätzliche Kontrolle über die Ausführung eines vorhandenen eslinter-Setups in Ihrem Projekt zu erhalten. Mit dieser Konfiguration können Sie zusätzliche Befehle definieren, die im Abschnitt run-scripts Ihrer package.json ausgeführt werden sollen:

Fügen Sie in Ihrer `package.json` diesen Eintrag zu Ihren Run-Scripts hinzu:

```json
{
    "scripts": {
        "eslint": "eslint ."
    }
}
```

**HINWEIS: Das Hinzufügen von eslint zur package.json ist erforderlich, damit der Service funktioniert, wenn die npm- oder yarn-Runner verwendet werden.**

Wenn Sie eslint noch nicht installiert und konfiguriert haben, müssen Sie es in Ihrem Projekt installieren und konfigurieren, sowie alle Plugins, die Sie verwenden, wie z.B. eslint-plugin-import:

```
$ npm i eslint eslint-plugin-import
```

Wenn Sie das eslint-import-resolver-custom-alias-Plugin verwenden, um Modulaliase ihren realen Pfaden zuzuordnen, müssen Sie es ebenfalls installieren:

```
$ npm i eslint-import-resolver-custom-alias
```

Sie müssen auch eine `.eslintrc.js`-Datei erstellen, falls Sie noch keine der eslintrc-Konfigurationsdateien in Ihrem Projekt haben. Hier ist eine grundlegende Einrichtung, um nur nach nicht aufgelösten Importen zu suchen, und Sie können diese Konfiguration erweitern, um andere Codequalitätsprüfungen vor dem Ausführen von Tests zu validieren:

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

Fügen Sie abschließend den `eslinter`-Service zum Services-Array in `wdio.conf.js` hinzu:

```javascript
    services: ['eslinter']
```

Führen Sie `npm run eslint` aus, um zu überprüfen und nach Fehlern zu suchen.

Wenn Sie `yarn` verwenden, können Sie die `runnerType`-Service-Option konfigurieren:

```javascript
    services: [
        ['eslinter', { runnerType: 'yarn' }]
    ]
```

Wenn Sie bereits ein Linter-Skript haben, das Sie wiederverwenden möchten (anstelle von `eslint`), können Sie die `scriptName`-Service-Option konfigurieren:

```javascript
    services: [
        ['eslinter', { scriptName: 'eslint:check' }]
    ]
```

## Verwendung in WebdriverIO

Starten Sie den Test-Runner von WebdriverIO wie gewohnt. eslint überprüft den Code. Wenn Fehler gefunden werden, wird die Ausführung sofort beendet.

```bash
$ npx wdio
```


**Beispiel:**

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