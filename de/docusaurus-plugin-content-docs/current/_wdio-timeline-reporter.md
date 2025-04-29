---
id: wdio-timeline-reporter
title: Timeline Reporter
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---


> wdio-timeline-reporter ist ein Drittanbieter-Paket, weitere Informationen finden Sie auf [GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter)


> Eine Komplettlösung als WebdriverIO-Reporter für eine aggregierte Visualisierung Ihrer Testergebnisse, denn "Sehen ist Glauben"

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## Warum

Weil wir viel Zeit damit verbringen, fehlerhafte Tests zu debuggen, zwischen Terminalausgabe und der Anzeige von Fehlerscreenshots hin und her zu wechseln. Dieser Reporter fasst alle typischen Informationen, die Sie benötigen, in einem Bericht zusammen. Führen Sie Tests durch und erhalten Sie eine übersichtliche Zeitleiste der Ereignisse, die Sie zur weiteren Überprüfung einsehen können.

#### Zu den Funktionen gehören:

- Funktioniert hervorragend mit den Frameworks Mocha und Jasmine. Funktioniert auch mit Cucumber, wobei jeder Schritt als Test gemeldet wird
- Deutliche Zusammenfassung der Testergebnisse.
- Details zu jedem Testlauf, einschließlich aller während der Testausführung erstellten Screenshots.
- Filterung der Testergebnisse. Ideal, um sich auf fehlgeschlagene Tests zu konzentrieren
- Fehler-Stack-Trace dem Test beigefügt.
- Möglichkeit, dem Test zur Laufzeit zusätzliche Informationen hinzuzufügen.
- Keine Nachbearbeitung erforderlich. Nach Abschluss des wdio-Testprozesses wird eine statische HTML-Berichtsdatei erstellt.
- Timeline-Service zur Verwaltung der Erstellung von Screenshots, einschließlich der Größenänderung der Bilder.

Ein Beispiel für einen HTML-Bericht finden Sie [hier](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html)

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier](http://webdriver.io/guide/getstarted/install.html).

## Installation

**FÜR EINE VERSION, DIE MIT WEBDRIVERIO V4 KOMPATIBEL IST, SIEHE [HIER](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4)**

```shell
npm install --save wdio-timeline-reporter
```

Eine Abhängigkeit wird zu Ihrer `package.json` hinzugefügt

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### Verwendung

Fügen Sie `timeline` zum reporters-Array in Ihrer wdio-Konfigurationsdatei hinzu.

Importieren Sie außerdem `TimelineService` aus wdio-timeline-reporter und fügen Sie ihn hinzu.

Der Service ist zwingend erforderlich, um Berichte zu kombinieren und HTML zu erstellen, da Reporter in Webdriverio 5 jetzt pro Runner-Instanz initialisiert werden. [Siehe offene Diskussion bei Webdriverio](https://github.com/webdriverio/webdriverio/issues/3780)

Der TimelineService kann auch die Aufnahme von Screenshots während der Testausführung verwalten. Sie haben die Möglichkeit, die Größe und Qualität der Bilder zu reduzieren und die Bilder als Base64 in den Bericht einzubetten. Diese sind über die [Reporter-Optionen](#reporter-options) konfigurierbar.

```js
// wdio.conf.js
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
exports.config = {
  // ...
  reporters: [['timeline', { outputDir: './desired_location' }]],
  // ...
  services: [[TimelineService]]
};
```

### Reporter-Optionen

Wenn Sie die Standardkonfiguration des Reporters überschreiben möchten, fügen Sie ein reporterOptions-Objekt zum timeline-Array unter reporters hinzu, wie unten gezeigt.

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| Index | Beschreibung                                                                                                                                                                                                                         |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1.    | Verzeichnis, in dem die HTML-Datei und Screenshots erstellt werden. Obligatorische Option                                                                                                                                            |
| 2.    | Name der HTML-Berichtsdatei. Standardwert ist `timeline-report.html`                                                                                                                                                                 |
| 3.    | Bette Bilder als Base64 in die HTML-Datei ein. Standardwert ist `false`                                                                                                                                                              |
| 4.    | Objekt-Optionen für Bildmanipulation                                                                                                                                                                                                 |
| 5.    | JPEG-Qualität einstellen. Nur relevant, wenn die Option `resize` auf `true` gesetzt ist. Je kleiner der Wert, desto kleiner sind Bildgröße und Qualität. Standardwert ist `70`. Maximal zulässiger Wert ist `100`                    |
| 6.    | Bildgröße ändern. Standardwert ist `false`                                                                                                                                                                                           |
| 7.    | Wert, um den die Gesamtzahl der Pixel verringert werden soll. Nur relevant, wenn die Option `resize` auf true gesetzt ist. Standardwert ist `1`. Gültige Werte `1 - 5`                                                                |
| 8.    | wie oft Screenshots erstellt werden sollen. Unterstützte Werte sind `on:error`, `before:click`, `none`. Standard ist `none`. `before:click` ist eine gute Option, um eine Zeitleiste von Screenshots der getesteten App zu erstellen. |

### Zusätzliche Informationen zum Testkontext hinzufügen

Es ist möglich, einem Test mit der statischen Methode `addContext` zusätzliche Informationen hinzuzufügen. Dies kann nützlich sein, um wichtige Informationen hinzuzufügen, die beim Debuggen fehlgeschlagener Tests helfen könnten, z. B. ein während des Testlaufs erstellter Benutzer mit einem dynamischen Benutzernamen

#### Grundlegende Verwendung

Die statische Methode `TimelineReporter.addContext` akzeptiert entweder einen String-Parameter oder ein Objekt-Literal mit zwei Eigenschaften `title` und `value`, z.B.

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

value kann auch ein Link sein

##### Mocha-Beispiel

```js
const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Suite', function() {
  it('Test', function() {
    // object literal parameter
    TimelineReporter.addContext({
      title: 'Test User',
      value: 'user id created during the test'
    });

    // value as anchor tag
    TimelineReporter.addContext({
      title: 'Dynamic link',
      value: '<a href="">Some important link related to test</a>'
    });

    // string parameter
    TimelineReporter.addContext('This test might be flaky');
  });
});
```

## Danksagung

Ein großes Dankeschön an die Autoren und Betreuer von [wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter). Die Durchsicht ihrer v5-Lösung hat mir bei meiner Arbeit sehr geholfen