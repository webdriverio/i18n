---
id: sumologic-reporter
title: Sumologic Reporter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---


> Ein WebdriverIO-Reporter, der Testergebnisse an [Sumologic](https://www.sumologic.com/) für Datenanalysen sendet

![Sumologic Dashboard](/img/sumologic.png "Sumologic Dashboard")

## Installation

Der einfachste Weg ist, `@wdio/sumologic-reporter` als devDependency in Ihrer `package.json` zu behalten, via:

```sh
npm install @wdio/sumologic-reporter --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier](https://webdriver.io/docs/gettingstarted).

## Konfiguration

Zuerst müssen wir einen neuen Collector erstellen, der alle Logs Ihrer Tests sammelt. Klicken Sie dazu in der Navigationsleiste auf __Manage__ und gehen Sie zu __Collection__. Dort müssen Sie einen neuen "Hosted Collector" hinzufügen. Geben Sie einen passenden Namen an, z.B. "test integration logs", eine Beschreibung und eine Kategorie, z.B. "wdio". Klicken Sie auf Speichern, um den Collector zu erstellen.

![Add Collector](https://webdriver.io/images/sumo-collector.png "Add Collector")

Der nächste Schritt ist das Hinzufügen einer Quelle. Es ist sinnvoll, für jede Ihrer Umgebungen (z.B. Branch-Build, Integration) eine eigene Quelle zu haben. Klicken Sie auf den Link "Add Source" neben Ihrem Collector und fügen Sie eine __HTTP Source__ hinzu. Geben Sie wieder einen passenden Namen und eine Beschreibung ein und setzen Sie eine "Source Category", die die Umgebung widerspiegelt. Lassen Sie die anderen Optionen im Standardzustand und klicken Sie auf Speichern.

![Add Source](https://webdriver.io/images/sumo-source.png "Add Source")

Ein Modal mit dem Quellendpunkt wird angezeigt. Kopieren Sie diese URL und fügen Sie sie in Ihre wdio.conf.js ein, damit der Reporter weiß, wohin die Daten gesendet werden sollen.

Der folgende Code zeigt die Standard-Konfiguration des wdio-Testrunners. Fügen Sie einfach `'sumologic'` als Reporter zum Array hinzu und fügen Sie Ihren Quellendpunkt hinzu:

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: [
    'spec',
    ['sumologic', {
        // define sync interval how often logs get pushed to Sumologic
        syncInterval: 100,
        // endpoint of collector source
        sourceAddress: process.env.SUMO_SOURCE_ADDRESS
    }]
  ],
  // ...
};
```

Nach dem Ausführen der ersten Tests mit dem Reporter sollten Sie die Testlogs mit der folgenden Abfrage überprüfen können:

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

Ich werde in Kürze einige nützliche Dashboard-Vorlagen für Sumologic bereitstellen.

----

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](https://webdriver.io).