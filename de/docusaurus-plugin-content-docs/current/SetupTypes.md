---
id: setuptypes
title: Setup-Typen
---

WebdriverIO kann für verschiedene Zwecke verwendet werden. Es implementiert die WebDriver-Protokoll-API und kann einen Browser automatisiert steuern. Das Framework ist so konzipiert, dass es in jeder beliebigen Umgebung und für jede Art von Aufgabe funktioniert. Es ist unabhängig von Drittanbieter-Frameworks und benötigt nur Node.js, um ausgeführt zu werden.

## Protokoll-Bindings

Für grundlegende Interaktionen mit dem WebDriver und anderen Automatisierungsprotokollen verwendet WebdriverIO seine eigenen Protokoll-Bindings, die auf dem NPM-Paket [`webdriver`](https://www.npmjs.com/package/webdriver) basieren:

<Tabs
  defaultValue="webdriver"
  values={[
    {label: 'WebDriver', value: 'webdriver'},
    {label: 'Chrome DevTools', value: 'devtools'},
  ]
}>
<TabItem value="webdriver">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

</TabItem>
<TabItem value="devtools">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/devtools.js#L2-L17
```

</TabItem>
</Tabs>

Alle [Protokollbefehle](api/webdriver) geben die Rohantworte vom Automatisierungstreiber zurück. Das Paket ist sehr leichtgewichtig und es gibt __keine__ intelligente Logik wie Auto-Waits, um die Interaktion mit der Protokollnutzung zu vereinfachen.

Die auf die Instanz angewendeten Protokollbefehle hängen von der anfänglichen Sitzungsantwort des Treibers ab. Wenn die Antwort beispielsweise anzeigt, dass eine mobile Sitzung gestartet wurde, wendet das Paket alle Appium- und Mobile JSON Wire-Protokollbefehle auf den Instanzprototyp an.

Sie können den gleichen Satz von Befehlen (außer mobilen) mit dem Chrome DevTools-Protokoll ausführen, wenn Sie das NPM-Paket [`devtools`](https://www.npmjs.com/package/devtools) importieren. Es hat die gleiche Schnittstelle wie das `webdriver`-Paket, führt aber seine Automatisierung auf Basis von [Puppeteer](https://pptr.dev/) aus.

Weitere Informationen zu diesen Paketschnittstellen finden Sie unter [Modules API](/docs/api/modules).

## Standalone-Modus

Um die Interaktion mit dem WebDriver-Protokoll zu vereinfachen, implementiert das `webdriverio`-Paket eine Vielzahl von Befehlen auf Basis des Protokolls (z.B. den Befehl [`dragAndDrop`](api/element/dragAndDrop)) und Kernkonzepte wie [intelligente Selektoren](selectors) oder [Auto-Waits](autowait). Das obige Beispiel kann wie folgt vereinfacht werden:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

Die Verwendung von WebdriverIO im Standalone-Modus gibt Ihnen weiterhin Zugriff auf alle Protokollbefehle, bietet aber einen Supersatz zusätzlicher Befehle, die eine Interaktion auf höherer Ebene mit dem Browser ermöglichen. Es ermöglicht Ihnen, dieses Automatisierungstool in Ihr eigenes (Test-)Projekt zu integrieren, um eine neue Automatisierungsbibliothek zu erstellen. Beliebte Beispiele sind [Oxygen](https://github.com/oxygenhq/oxygen) oder [CodeceptJS](http://codecept.io). Sie können auch einfache Node-Skripte schreiben, um das Web nach Inhalten zu durchsuchen (oder für alles andere, was einen laufenden Browser erfordert).

Wenn keine spezifischen Optionen festgelegt sind, versucht WebdriverIO immer, den Browser-Treiber herunterzuladen und einzurichten, der zur `browserName`-Eigenschaft in Ihren Capabilities passt. Im Falle von Chrome und Firefox kann es diese auch installieren, abhängig davon, ob es den entsprechenden Browser auf dem Computer finden kann.

Weitere Informationen zu den Schnittstellen des `webdriverio`-Pakets finden Sie unter [Modules API](/docs/api/modules).

## Der WDIO-Testrunner

Der Hauptzweck von WebdriverIO ist jedoch End-to-End-Tests in großem Maßstab. Wir haben daher einen Testrunner implementiert, der Ihnen hilft, eine zuverlässige Testsuite zu erstellen, die leicht zu lesen und zu warten ist.

Der Testrunner kümmert sich um viele Probleme, die bei der Arbeit mit einfachen Automatisierungsbibliotheken üblich sind. Zum einen organisiert er Ihre Testläufe und teilt Testspezifikationen auf, sodass Ihre Tests mit maximaler Parallelität ausgeführt werden können. Er verwaltet auch Sitzungen und bietet viele Funktionen, die Ihnen helfen, Probleme zu debuggen und Fehler in Ihren Tests zu finden.

Hier ist das gleiche Beispiel von oben, geschrieben als Testspezifikation und von WDIO ausgeführt:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

Der Testrunner ist eine Abstraktion beliebter Testframeworks wie Mocha, Jasmine oder Cucumber. Um Ihre Tests mit dem WDIO-Testrunner auszuführen, schauen Sie sich den Abschnitt [Erste Schritte](gettingstarted) für weitere Informationen an.

Weitere Informationen zur Schnittstelle des `@wdio/cli` Testrunner-Pakets finden Sie unter [Modules API](/docs/api/modules).