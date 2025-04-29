---
id: wdio-video-reporter
title: Video Reporter
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---


> wdio-video-reporter ist ein Paket von Drittanbietern, weitere Informationen finden Sie auf [GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter)

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

Dies ist ein Reporter für [Webdriver IO v6 und höher](https://webdriver.io/), der Videos Ihrer wdio-Testausführungen generiert. Wenn Sie Allure verwenden, werden die Testfälle automatisch mit den Videos versehen. (Für Webdriver IO v5 verwenden Sie bitte wdio-video-reporter Version ^2.0.0.)

Videos landen in `wdio.config.outputDir`

Sehen Sie sich ein Beispiel für einen Allure-Bericht mit enthaltenen Videos bei fehlgeschlagenen Tests hier an:
https://presidenten.github.io/wdio-video-reporter-example-report/

![example-allure-report](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

Vorteile:
- Schöne Videos in Ihren Allure-Berichten
- Schöne Videos in menschlicher Geschwindigkeit, obwohl Tests schnell sind
- Funktioniert mit Selenium Grid
- Funktioniert mit allen Webdrivern, die `saveScreenshot` unterstützen
- Verifiziert auf den folgenden Desktop-Browsern mit Selenium 3.141.59:
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- Verifiziert auf den folgenden iOS- und Android-Geräten mit [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3:
  - Iphone 8
  - Ipad Gen 6
  - Samsung galaxy S9
  - Samsung galaxy tab A10

Nachteile:
- Funktioniert durch Screenshots nach "Aktionen", was die Tests etwas langsamer macht. Dies wird gemildert, indem sorgfältig ausgewählt wird, welche [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol)-Nachrichten zu einem Screenshot führen sollen
- Selenium-Treiber beinhalten keine Alert-Boxen und Popups in Screenshots, daher sind diese in den Videos nicht sichtbar


Schnellstart
===========

Schauen Sie sich die einfache Vorlage unter [wdio-template](https://github.com/presidenten/wdio-template) an, um schnell zu starten.

Klonen Sie eines der Repositories und installieren Sie die Abhängigkeiten mit `yarn` oder `npm install`. Führen Sie dann `yarn e2e` oder `npm run e2e` im Demo-Verzeichnis aus und schließlich `yarn report` oder `npm run report`, um den Allure-Bericht zu sehen.


Installation
============

Installieren Sie den Reporter
--------------------

`yarn add wdio-video-reporter`
oder
`npm install wdio-video-reporter`


Fügen Sie den Reporter zur Konfiguration hinzu
--------------------------

Am Anfang der `wdio.conf.js`-Datei, importieren Sie die Bibliothek:
```
const video = require('wdio-video-reporter');
```

Dann fügen Sie den Video-Reporter zur Konfiguration in der reporters-Eigenschaft hinzu:

```
 reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
  ],
```


Verwendung mit Allure
-----------------

Durch das Hinzufügen des Allure-Reporters werden die Berichte automatisch mit Videos aktualisiert, ohne dass eine Konfiguration erforderlich ist :-)

```
 reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
```


Konfiguration
=============

Normale Konfigurationsparameter
-------------------------------

Die meisten Benutzer möchten möglicherweise Folgendes festlegen

- `saveAllVideos` Auf true setzen, um Videos für bestandene Tests zu speichern. `Standard: false`
- `videoSlowdownMultiplier` Ganzzahl zwischen [1-100]. Erhöhen, wenn Videos zu schnell abgespielt werden. `Standard: 3`
- `videoRenderTimeout` Maximale Sekunden, die auf das Rendern eines Videos gewartet werden. `Standard: 5`
- `outputDir` Wenn nicht festgelegt, wird wdio.config.outputDir verwendet. `Standard: undefined`
- `outputDir` Wenn nicht festgelegt, wird wdio.config.outputDir verwendet. `Standard: undefined`
- `maxTestNameCharacters` Maximale Länge des Testnamens. `Standard: 250`

Erweiterte Konfigurationsparameter
---------------------------------

Fortgeschrittene Benutzer, die ändern möchten, wann die Engine einen Screenshot macht, können Folgendes bearbeiten. Diese Arrays können mit dem letzten Wort einer [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol)-Nachricht gefüllt werden, z.B. /session/:sessionId/`buttondown`.

- `addExcludedActions` Aktionen hinzufügen, bei denen Screenshots unnötig sind. `Standard: []`
- `addJsonWireActions` Aktionen hinzufügen, bei denen Screenshots fehlen. `Standard: []`
- `recordAllActions` Filtere nicht und mache von allem Screenshots. (Nicht empfohlen) `Standard: false`

Um verarbeitete Nachrichten zu sehen, setzen Sie `wdio.config.logLevel: 'debug'` und überprüfen Sie `outputDir/wdio-X-Y-Video-reporter.log`. Dies belässt auch das Screenshots-Ausgabeverzeichnis zur Überprüfung intakt.

Um zusätzliche Protokollierung ganz zu vermeiden und nur die Videodateien zu erhalten, setzen Sie `wdio.config.logLevel: 'silent'`.

Cucumber-Unterstützung
----------------

Wenn Sie den Allure-Reporter verwenden, müssen Sie Folgendes sicherstellen:

- Verwenden Sie `chai` anstelle der eingebauten Node-Assertions, da sonst die fehlgeschlagenen Tests als defekt in Ihren Schritt-Definitionen gemeldet werden
- Fügen Sie `useCucumberStepReporter: true` zur Allure-Option in der Datei `wdio.conf.js` hinzu, eine typische Konfiguration würde so aussehen:
```
  reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
  ],
```
Ein vollständiges Beispiel finden Sie im Cucumber-Branch unter [wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber)


Appium-Setup
------------

Seit `wdio-video-reporter` v1.2.4 gibt es Unterstützung, um Allure bei der Unterscheidung zwischen Safari- und Chrome-Browsern auf Desktop und Geräten zu helfen.
Der Reporter verwendet die benutzerdefinierte Eigenschaft `deviceType`, um die verschiedenen Geräte zu identifizieren.
Empfohlene Werte sind `phone` und `tablet`.
Es wird empfohlen, auch `browserVersion` für _alle_ Browser anzugeben, um einen Fehler im Chrome-Webdriver zu vermeiden, wenn Geräte im selben Selenium-Grid wie Desktop-Chrome-Browser verwendet werden.

Die generierten Videodateien erhalten auch `deviceType`, das zum Browsernamen hinzugefügt wird.

Beispiel für eine Appium-Konfiguration:
```
  "capabilities": [
    {
      ...
      "deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    }
  ],
```

Und `wdio-config.json`:
```
  "capabilities": [
    {
      ...
      "appium:deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    },
  ],
```


Beitragen
============

Fork, machen Sie Änderungen, schreiben Sie einige Tests, lint, führen Sie Tests aus, bauen Sie und überprüfen Sie in der Demo, dass Änderungen wie gewünscht funktionieren, und erstellen Sie dann einen PR.

Der Demo-Ordner arbeitet mit der gebauten Version der Bibliothek, also stellen Sie sicher, dass Sie bauen, wenn Sie neue Funktionen hinzugefügt haben und diese ausprobieren möchten.


Danke
======

Danke an [Johnson E](https://github.com/jonn-set) für die Bereitstellung der Cucumber-Unterstützung, nach der viele Benutzer gefragt haben.