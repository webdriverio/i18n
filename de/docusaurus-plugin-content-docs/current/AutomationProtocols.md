---
id: automationProtocols
title: Automatisierungsprotokolle
---

Mit WebdriverIO können Sie zwischen mehreren Automatisierungstechnologien wählen, wenn Sie Ihre E2E-Tests lokal oder in der Cloud ausführen. Standardmäßig versucht WebdriverIO, eine lokale Automatisierungssitzung mit dem [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) Protokoll zu starten.

## WebDriver Bidi Protokoll

Das [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) ist ein Automatisierungsprotokoll zur Automatisierung von Browsern mittels bidirektionaler Kommunikation. Es ist der Nachfolger des [WebDriver](https://w3c.github.io/webdriver/) Protokolls und ermöglicht deutlich mehr Introspektionsfähigkeiten für verschiedene Testanwendungsfälle.

Dieses Protokoll befindet sich derzeit in der Entwicklung und neue Primitive könnten in Zukunft hinzugefügt werden. Alle Browser-Anbieter haben sich verpflichtet, diesen Webstandard zu implementieren, und viele [Primitive](https://wpt.fyi/results/webdriver/tests/bidi?label=experimental&label=master&aligned) wurden bereits in Browsern eingeführt.

## WebDriver Protokoll

> [WebDriver](https://w3c.github.io/webdriver/) ist eine Fernsteuerungsschnittstelle, die Introspektion und Kontrolle von Benutzeragenten ermöglicht. Es bietet ein plattform- und sprachneutrales Drahtprotokoll als Möglichkeit für externe Programme, das Verhalten von Webbrowsern ferngesteuert anzuweisen.

Das WebDriver-Protokoll wurde entwickelt, um einen Browser aus der Benutzerperspektive zu automatisieren, was bedeutet, dass alles, was ein Benutzer tun kann, Sie auch mit dem Browser tun können. Es bietet eine Reihe von Befehlen, die häufige Interaktionen mit einer Anwendung abstrahieren (z.B. Navigieren, Klicken oder Lesen des Zustands eines Elements). Da es sich um einen Webstandard handelt, wird es von allen großen Browser-Anbietern gut unterstützt und wird auch als zugrunde liegendes Protokoll für die mobile Automatisierung mit [Appium](http://appium.io) verwendet.

Um dieses Automatisierungsprotokoll zu verwenden, benötigen Sie einen Proxy-Server, der alle Befehle übersetzt und in der Zielumgebung (d.h. im Browser oder in der mobilen App) ausführt.

Für die Browser-Automatisierung ist der Proxy-Server in der Regel der Browser-Treiber. Es gibt Treiber für alle Browser:

- Chrome – [ChromeDriver](http://chromedriver.chromium.org/downloads)
- Firefox – [Geckodriver](https://github.com/mozilla/geckodriver/releases)
- Microsoft Edge – [Edge Driver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
- Internet Explorer – [InternetExplorerDriver](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)
- Safari – [SafariDriver](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)

Für jede Art von mobiler Automatisierung müssen Sie [Appium](http://appium.io) installieren und einrichten. Damit können Sie mobile (iOS/Android) oder sogar Desktop-Anwendungen (macOS/Windows) mit der gleichen WebdriverIO-Konfiguration automatisieren.

Es gibt auch viele Dienste, die es Ihnen ermöglichen, Ihre Automatisierungstests in großem Umfang in der Cloud auszuführen. Anstatt all diese Treiber lokal einrichten zu müssen, können Sie einfach mit diesen Diensten (z.B. [Sauce Labs](https://saucelabs.com)) in der Cloud kommunizieren und die Ergebnisse auf deren Plattform überprüfen. Die Kommunikation zwischen Testskript und Automatisierungsumgebung sieht wie folgt aus:

![WebDriver Setup](/img/webdriver.png)