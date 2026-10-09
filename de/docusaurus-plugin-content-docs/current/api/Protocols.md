---
id: protocols
title: Protokollbefehle
---

WebdriverIO ist ein Automatisierungs-Framework, das auf verschiedenen Automatisierungsprotokollen basiert, um einen Remote-Agenten zu steuern, z. B. für einen Browser, ein mobiles Gerät oder einen Fernseher. Je nach Remote-Gerät kommen unterschiedliche Protokolle zum Einsatz. Diese Befehle werden abhängig von den Sitzungsinformationen des Remote-Servers (z. B. Browser-Treiber) dem [Browser](/docs/api/browser)- oder [Element](/docs/api/element)-Objekt zugewiesen.

Intern verwendet WebdriverIO Protokollbefehle für fast alle Interaktionen mit dem Remote-Agenten. Zusätzliche Befehle, die dem [Browser](/docs/api/browser)- oder [Element](/docs/api/element)-Objekt zugewiesen sind, vereinfachen jedoch die Verwendung von WebdriverIO. Das Abrufen des Textes eines Elements mit Protokollbefehlen würde beispielsweise so aussehen:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

Mit den komfortablen Befehlen des [Browser](/docs/api/browser)- oder [Element](/docs/api/element)-Objekts lässt sich dies reduzieren auf:

```js
$('#lst-ib').getText()
```

Im folgenden Abschnitt wird jedes einzelne Protokoll erläutert.

## WebDriver Protocol

Das [WebDriver](https://w3c.github.io/webdriver/#elements)-Protokoll ist ein Webstandard zur Automatisierung von Browsern. Im Gegensatz zu einigen anderen E2E-Tools garantiert es, dass die Automatisierung in echten Browsern erfolgen kann, die von Ihren Nutzern verwendet werden, z. B. Firefox, Safari und Chrome sowie Chromium-basierte Browser wie Edge, und nicht nur in Browser-Engines wie z. B. WebKit, die sich stark davon unterscheiden.

Der Vorteil der Verwendung des WebDriver-Protokolls gegenüber Debugging-Protokollen wie [Chrome DevTools](https://w3c.github.io/webdriver/#elements) besteht darin, dass Sie über einen bestimmten Satz von Befehlen verfügen, mit denen Sie in allen Browsern auf die gleiche Weise mit dem Browser interagieren können, was die Wahrscheinlichkeit für instabile Tests (Flakiness) verringert. Darüber hinaus bietet dieses Protokoll Möglichkeiten für massive Skalierbarkeit durch die Nutzung von Cloud-Anbietern wie [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) und [anderen](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## WebDriver Bidi Protocol

Das [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/)-Protokoll ist die zweite Generation des Protokolls und wird derzeit von den meisten Browserherstellern entwickelt. Im Vergleich zu seinem Vorgänger unterstützt das Protokoll eine bidirektionale Kommunikation (daher „Bidi“) zwischen dem Framework und dem Remote-Gerät. Außerdem führt es zusätzliche Primitive für eine bessere Browser-Introspektion ein, um moderne Webanwendungen im Browser besser automatisieren zu können.

Da sich dieses Protokoll derzeit noch in Entwicklung befindet, werden im Laufe der Zeit weitere Funktionen hinzugefügt und von Browsern unterstützt. Wenn Sie die komfortablen Befehle von WebdriverIO verwenden, ändert sich für Sie nichts. WebdriverIO wird diese neuen Protokollfunktionen nutzen, sobald sie verfügbar sind und im Browser unterstützt werden.

## Appium

Das [Appium](https://appium.io/)-Projekt bietet Möglichkeiten zur Automatisierung von mobilen Geräten, Desktop-Geräten und allen anderen Arten von IoT-Geräten. Während sich WebDriver auf Browser und das Web konzentriert, besteht die Vision von Appium darin, denselben Ansatz für beliebige Geräte zu verwenden. Zusätzlich zu den von WebDriver definierten Befehlen verfügt es über spezielle Befehle, die häufig spezifisch für das zu automatisierende Remote-Gerät sind. Für mobile Testszenarien ist dies ideal, wenn Sie dieselben Tests sowohl für Android- als auch für iOS-Anwendungen schreiben und ausführen möchten.

Laut der Appium-[Dokumentation](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) wurde es entwickelt, um die Anforderungen der mobilen Automatisierung gemäß einer Philosophie zu erfüllen, die durch die folgenden vier Grundsätze beschrieben wird:

- Sie sollten Ihre App nicht neu kompilieren oder in irgendeiner Weise verändern müssen, um sie zu automatisieren.
- Sie sollten nicht an eine bestimmte Sprache oder ein bestimmtes Framework gebunden sein, um Ihre Tests zu schreiben und auszuführen.
- Ein Framework für mobile Automatisierung sollte das Rad nicht neu erfinden, wenn es um Automatisierungs-APIs geht.
- Ein Framework für mobile Automatisierung sollte Open Source sein – im Geiste und in der Praxis ebenso wie dem Namen nach!

## Chromium

Das Chromium-Protokoll bietet eine Obermenge von Befehlen zusätzlich zum WebDriver-Protokoll, die nur unterstützt wird, wenn automatisierte Sitzungen über [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) oder [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver) ausgeführt werden.

## Firefox

Das Firefox-Protokoll bietet eine Obermenge von Befehlen zusätzlich zum WebDriver-Protokoll, die nur unterstützt wird, wenn automatisierte Sitzungen über [Geckodriver](https://github.com/mozilla/geckodriver) ausgeführt werden.

## Sauce Labs

Das [Sauce Labs](https://saucelabs.com/)-Protokoll bietet eine Obermenge von Befehlen zusätzlich zum WebDriver-Protokoll, die nur unterstützt wird, wenn automatisierte Sitzungen in der Sauce Labs Cloud ausgeführt werden.

## Selenium Standalone

Das [Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/)-Protokoll bietet eine Obermenge von Befehlen zusätzlich zum WebDriver-Protokoll, die nur unterstützt wird, wenn automatisierte Sitzungen über das Selenium Grid ausgeführt werden.