---
id: protocols
title: Protokoll-Befehle
---

WebdriverIO ist ein Automatisierungs-Framework, das auf verschiedenen Automatisierungsprotokollen basiert, um einen Remote-Agenten zu steuern, z.B. für einen Browser, ein mobiles Gerät oder Fernseher. Je nach Remote-Gerät kommen verschiedene Protokolle zum Einsatz. Diese Befehle werden dem [Browser](/docs/api/browser) oder [Element](/docs/api/element) Objekt zugewiesen, abhängig von den Sitzungsinformationen des Remote-Servers (z.B. Browser-Treiber).

Intern verwendet WebdriverIO Protokollbefehle für fast alle Interaktionen mit dem Remote-Agenten. Allerdings vereinfachen zusätzliche Befehle, die dem [Browser](/docs/api/browser) oder [Element](/docs/api/element) Objekt zugewiesen sind, die Verwendung von WebdriverIO. Zum Beispiel würde das Abrufen des Textes eines Elements mit Protokollbefehlen so aussehen:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

Mit den praktischen Befehlen des [Browser](/docs/api/browser) oder [Element](/docs/api/element) Objekts kann dies reduziert werden auf:

```js
$('#lst-ib').getText()
```

Der folgende Abschnitt erklärt jedes einzelne Protokoll.

## WebDriver Protokoll

Das [WebDriver](https://w3c.github.io/webdriver/#elements) Protokoll ist ein Web-Standard für die Automatisierung von Browsern. Im Gegensatz zu einigen anderen E2E-Tools garantiert es, dass die Automatisierung mit tatsächlichen Browsern durchgeführt werden kann, die von Ihren Benutzern verwendet werden, z.B. Firefox, Safari und Chrome und Chromium-basierte Browser wie Edge, und nicht nur mit Browser-Engines wie WebKit, die sich stark unterscheiden.

Der Vorteil der Verwendung des WebDriver-Protokolls im Gegensatz zu Debugging-Protokollen wie [Chrome DevTools](https://w3c.github.io/webdriver/#elements) ist, dass Sie einen spezifischen Satz von Befehlen haben, die es ermöglichen, auf die gleiche Weise mit dem Browser über alle Browser hinweg zu interagieren, was die Wahrscheinlichkeit für Instabilität verringert. Darüber hinaus bietet dieses Protokoll Möglichkeiten für massive Skalierbarkeit durch die Nutzung von Cloud-Anbietern wie [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) und [anderen](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## WebDriver Bidi Protokoll

Das [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) Protokoll ist die zweite Generation des Protokolls und wird derzeit von den meisten Browser-Herstellern entwickelt. Im Vergleich zu seinem Vorgänger unterstützt das Protokoll eine bidirektionale Kommunikation (daher "Bidi") zwischen dem Framework und dem Remote-Gerät. Es führt außerdem zusätzliche Primitive für eine bessere Browser-Inspektion ein, um moderne Webanwendungen in Browsern besser zu automatisieren.

Da dieses Protokoll derzeit in Arbeit ist, werden im Laufe der Zeit weitere Funktionen hinzugefügt und von Browsern unterstützt. Wenn Sie WebdriverIOs praktische Befehle verwenden, wird sich für Sie nichts ändern. WebdriverIO wird diese neuen Protokollfunktionen nutzen, sobald sie verfügbar sind und vom Browser unterstützt werden.

## Appium

Das [Appium](https://appium.io/) Projekt bietet Möglichkeiten zur Automatisierung von mobilen Geräten, Desktop-Computern und allen anderen Arten von IoT-Geräten. Während WebDriver sich auf Browser und das Web konzentriert, besteht die Vision von Appium darin, denselben Ansatz für beliebige Geräte zu verwenden. Zusätzlich zu den Befehlen, die WebDriver definiert, verfügt es über spezielle Befehle, die oft speziell für das ferngesteuerte Gerät sind, das automatisiert wird. Für mobile Testszenarien ist dies ideal, wenn Sie dieselben Tests für Android- und iOS-Anwendungen schreiben und ausführen möchten.

Laut Appium [Dokumentation](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) wurde es entwickelt, um den Anforderungen der mobilen Automatisierung gemäß einer Philosophie zu entsprechen, die durch die folgenden vier Grundsätze umrissen wird:

- Sie sollten Ihre App nicht neu kompilieren oder in irgendeiner Weise modifizieren müssen, um sie zu automatisieren.
- Sie sollten nicht an eine bestimmte Sprache oder ein bestimmtes Framework gebunden sein, um Ihre Tests zu schreiben und auszuführen.
- Ein mobiles Automatisierungs-Framework sollte das Rad nicht neu erfinden, wenn es um Automatisierungs-APIs geht.
- Ein mobiles Automatisierungs-Framework sollte sowohl im Geist und in der Praxis als auch im Namen Open Source sein!

## Chromium

Das Chromium-Protokoll bietet einen Satz von Befehlen zusätzlich zum WebDriver-Protokoll, die nur unterstützt werden, wenn automatisierte Sitzungen über [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) oder [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver) ausgeführt werden.

## Firefox

Das Firefox-Protokoll bietet einen Satz von Befehlen zusätzlich zum WebDriver-Protokoll, die nur unterstützt werden, wenn automatisierte Sitzungen über [Geckodriver](https://github.com/mozilla/geckodriver) ausgeführt werden.

## Sauce Labs

Das [Sauce Labs](https://saucelabs.com/) Protokoll bietet einen Satz von Befehlen zusätzlich zum WebDriver-Protokoll, die nur unterstützt werden, wenn automatisierte Sitzungen mit der Sauce Labs Cloud ausgeführt werden.

## Selenium Standalone

Das [Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) Protokoll bietet einen Satz von Befehlen zusätzlich zum WebDriver-Protokoll, die nur unterstützt werden, wenn automatisierte Sitzungen mit dem Selenium Grid ausgeführt werden.

## JSON Wire Protocol

Das [JSON Wire Protocol](https://www.selenium.dev/documentation/legacy/json_wire_protocol/) ist der Vorgänger des WebDriver-Protokolls und ist heute __veraltet__. Obwohl einige Befehle in bestimmten Umgebungen noch unterstützt werden könnten, wird die Verwendung seiner Befehle nicht empfohlen.

## Mobile JSON Wire Protocol

Das [Mobile JSON Wire Protocol](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) ist ein Satz von mobilen Befehlen zusätzlich zum JSON Wire Protocol. Da dieses veraltet ist, ist auch das Mobile JSON Wire Protocol __veraltet__. Appium könnte einige seiner Befehle noch unterstützen, aber es wird nicht empfohlen, sie zu verwenden.