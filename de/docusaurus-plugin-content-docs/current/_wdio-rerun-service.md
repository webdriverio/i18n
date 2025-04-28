---
id: wdio-rerun-service
title: Wiederholungs-Service
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-rerun-service ist ein Paket von Drittanbietern, weitere Informationen finden Sie auf [GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service)

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

Dieser Service verfolgt fehlgeschlagene Mocha- oder Jasmine-Tests und Cucumber-Szenarien, die innerhalb des [WebdriverIO](https://webdriver.io)-Testframeworks ausgeführt werden. Er ermöglicht die Wiederholung fehlgeschlagener oder instabiler Tests oder Szenarien.

_HINWEIS_: Cucumber-Framework-Benutzer, die WebdriverIO-Versionen `5.x` und `6.x` verwenden, sollten Version `1.6.x` verwenden. Wenn Sie die neueste Hauptversion `7.x` verwenden, nutzen Sie die neueste `1.7.x`-Version dieses Service.

## Wiederholung vs. Retry

Die in WebdriverIO eingebaute `retry`-Logik für Cucumber und Mocha/Jasmine ist hilfreich für den Umgang mit instabilen Schritten in Cucumber und Mocha/Jasmine. Das Wiederholen in jedem Framework hat Einschränkungen:
* Cucumber: Es berücksichtigt nicht, dass einige Schritte möglicherweise nicht in der Mitte eines Tests wiederholt werden können. Das zweimalige Ausführen eines Schritts kann den Rest des Szenarios beeinträchtigen oder im Testkontext nicht möglich sein.
* Mocha/Jasmine: Die `retry`-Logik kann auf einen einzelnen Test angewendet werden, dies geschieht jedoch in Echtzeit und berücksichtigt möglicherweise keine zeitlichen Probleme oder Netzwerkverbindungsprobleme.

Die Hauptunterschiede des `re-run`:
* Wiederholt ein komplettes individuelles Cucumber-Szenario und nicht nur einen einzelnen Schritt
* Ermöglicht die erneute Ausführung einer gesamten Spec-Datei nach Abschluss der Haupttestausführung
* Kann lokal kopiert und ausgeführt werden (`retry` kann das nicht)
* Kann immer noch in Verbindung mit `retry`-Methoden verwendet werden
* Erfordert keine Codeänderung, um `retry`-Logik auf instabile oder problematische Tests anzuwenden

Es wird empfohlen, sich Zeit zu nehmen, um die verfügbaren Optionen zu bewerten. Eine Hybridlösung könnte die beste Lösung sein, um die besten realen und verwertbaren Testergebnisse zu liefern.

## Installation

Am einfachsten ist es, `wdio-rerun-service` zu den `devDependencies` in Ihrer `package.json` hinzuzufügen.

```json
{
    "devDependencies": {
        "wdio-rerun-service": "^1.6.2"
    }
}
```

Es kann mit `npm` installiert werden:

```bash
npm install wdio-rerun-service
```

Nach Abschluss der Paketinstallation fügen Sie es dem `services`-Array in `wdio.conf.js` hinzu:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [RerunService, {
        // ...
    }]
};
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier.](https://webdriver.io/docs/gettingstarted.html)

## Konfiguration

Die folgenden Optionen können zur wdio.conf.js-Datei hinzugefügt werden. Um Optionen für den Service zu definieren, müssen Sie den Service auf folgende Weise zur `services`-Liste hinzufügen:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            // Re-run service options here...
        }]
    ],
    // ...
};
```

### rerunDataDir
Verzeichnis, in dem alle Re-run-JSON-Daten während der Ausführung gespeichert werden.

Typ: `String`

Standard: `./results/rerun`

Beispiel:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunDataDir: './custom-rerun-directory'
        }]
    ],
    // ...
}
```

### rerunScriptPath
Pfad zum Schreiben des Re-run-Bash-Skripts.

Typ: `String`

Standard: `./rerun.sh`

Beispiel:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunScriptPath: './custom-path-for-rerun.sh'
        }]
    ],
    // ...
}
```

### ignoredTags
(Nur Cucumber) Set von Cucumber-Tags zum Ausschließen. Wenn ein Szenario ein Tag enthält, überspringt der Re-run-Service die Analyse.

Typ: `Array`

Standard: `[]`

Beispiel:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            ignoredTags: ['@known_bug']
        }]
    ],
    // ...
}
```

### commandPrefix
Präfix, das dem generierten Re-run-Befehl hinzugefügt wird.

Typ: `String`

Standard: `''`

Beispiel:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            commandPrefix: "VARIABLE=true"
        }]
    ],
    // ...
}
```
----