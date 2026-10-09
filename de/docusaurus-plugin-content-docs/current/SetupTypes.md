---
id: setuptypes
title: Setup-Typen
description: "Vergleichen Sie die Möglichkeiten, WebdriverIO zu verwenden, von reinen Protokoll-Bindings über den Standalone-Modus bis hin zum WDIO-Testrunner, und wählen Sie die passende aus."
---

WebdriverIO kann für verschiedene Zwecke eingesetzt werden. Es implementiert die WebDriver-Protokoll-API und kann einen Browser automatisiert steuern. Das Framework ist so konzipiert, dass es in jeder beliebigen Umgebung und für jede Art von Aufgabe funktioniert. Es ist unabhängig von Frameworks von Drittanbietern und benötigt nur Node.js zur Ausführung.

## Protokoll-Bindings

Für grundlegende Interaktionen mit dem WebDriver-Protokoll verwendet WebdriverIO eigene Protokoll-Bindings, die auf dem NPM-Paket [`webdriver`](https://www.npmjs.com/package/webdriver) basieren:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

Alle [Protokollbefehle](api/webdriver) geben die rohe Antwort des Automatisierungstreibers zurück. Das Paket ist sehr schlank und enthält __keine__ intelligente Logik wie automatische Wartezeiten, um die Interaktion mit dem Protokoll zu vereinfachen.

Welche Protokollbefehle auf die Instanz angewendet werden, hängt von der initialen Session-Antwort des Treibers ab. Wenn die Antwort beispielsweise anzeigt, dass eine mobile Session gestartet wurde, wendet das Paket die Appium-Befehle auf den Prototyp der Instanz an.

Weitere Informationen zur Schnittstelle des `webdriver`-Pakets finden Sie unter [Modules API](/docs/api/modules).

[WebdriverIO DevTools](/docs/devtools) ist kein Automatisierungsprotokoll. Es ist die Debugging-Oberfläche, mit der Sie einen Testlauf live verfolgen und Traces anschließend erneut abspielen können.

## Standalone-Modus

Um die Interaktion mit dem WebDriver-Protokoll zu vereinfachen, implementiert das `webdriverio`-Paket eine Vielzahl von Befehlen auf Basis des Protokolls (z. B. den Befehl [`dragAndDrop`](api/element/dragAndDrop)) sowie Kernkonzepte wie [intelligente Selektoren](selectors) oder [automatische Wartezeiten](autowait). Das obige Beispiel lässt sich so vereinfachen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

Wenn Sie WebdriverIO im Standalone-Modus verwenden, haben Sie weiterhin Zugriff auf alle Protokollbefehle, erhalten aber zusätzlich eine Obermenge weiterer Befehle, die eine Interaktion mit dem Browser auf höherer Ebene ermöglichen. So können Sie dieses Automatisierungstool in Ihr eigenes (Test-)Projekt integrieren, um eine neue Automatisierungsbibliothek zu erstellen. Bekannte Beispiele sind [Oxygen](https://github.com/oxygenhq/oxygen) oder [CodeceptJS](http://codecept.io). Sie können auch einfache Node-Skripte schreiben, um Inhalte aus dem Web zu scrapen (oder für alles andere, was einen laufenden Browser erfordert).

Wenn keine spezifischen Optionen gesetzt sind, versucht WebdriverIO immer, den Browsertreiber herunterzuladen und einzurichten, der zur Eigenschaft `browserName` in Ihren Capabilities passt. Bei Chrome und Firefox werden diese gegebenenfalls auch installiert, je nachdem, ob der entsprechende Browser auf dem Rechner gefunden werden kann.

Weitere Informationen zu den Schnittstellen des `webdriverio`-Pakets finden Sie unter [Modules API](/docs/api/modules).

## Der WDIO-Testrunner

Der Hauptzweck von WebdriverIO ist jedoch End-to-End-Testing in großem Maßstab. Deshalb haben wir einen Testrunner implementiert, der Ihnen hilft, eine zuverlässige Testsuite aufzubauen, die leicht zu lesen und zu warten ist.

Der Testrunner löst viele Probleme, die bei der Arbeit mit reinen Automatisierungsbibliotheken häufig auftreten. Zum einen organisiert er Ihre Testläufe und teilt Test-Specs auf, sodass Ihre Tests mit maximaler Parallelität ausgeführt werden können. Außerdem übernimmt er das Session-Management und bietet zahlreiche Funktionen, die Ihnen helfen, Probleme zu debuggen und Fehler in Ihren Tests zu finden.

Hier ist dasselbe Beispiel wie oben, geschrieben als Test-Spec und ausgeführt von WDIO:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

Der Testrunner ist eine Abstraktion beliebter Test-Frameworks wie Mocha, Jasmine oder Cucumber. Um Ihre Tests mit dem WDIO-Testrunner auszuführen, finden Sie weitere Informationen im Abschnitt [Erste Schritte](gettingstarted).

Weitere Informationen zur Schnittstelle des Testrunner-Pakets `@wdio/cli` finden Sie unter [Modules API](/docs/api/modules).