---
id: introduction
title: Einführung
description: "Verschaffen Sie sich einen Überblick über End-to-End-Tests von Flutter-Apps auf Android und iOS mit WebdriverIO, Appium und dem Appium Flutter Driver."
---

Dieser Leitfaden behandelt das Konfigurieren, Strukturieren und Ausführen von End-to-End-Tests (E2E) für **Flutter**-Anwendungen mit **WebdriverIO** und **Appium**.

WebdriverIO bietet ein Node.js-basiertes Test-Framework mit nativer Unterstützung für die WebDriver- und Appium-Protokolle, mit dem Sie Flutter-Anwendungen sowohl auf Android als auch auf iOS automatisieren können.

---

### Die architektonische Herausforderung: Warum Flutter anders ist

Bei der Automatisierung standardmäßiger nativer mobiler Apps (Kotlin/Java auf Android oder Swift/Objective-C auf iOS) dienen Appium-Treiber (`UiAutomator2` für Android, `XCUITest` für iOS) als Zugangspunkt, um die Anwendung zu inspizieren und mit ihr zu interagieren, indem sie den nativen Accessibility-Baum des Betriebssystems abfragen. Diese Treiber lesen UI-Komponenten auf Betriebssystemebene (Buttons, Eingabefelder, Labels) aus und stellen sie Inspektionswerkzeugen und Testskripten über Standard-Locator-Strategien wie ID, Accessibility ID oder XPath zur Verfügung.

Flutter funktioniert anders:

Flutter verwendet nicht die nativen UI-Komponenten des Betriebssystems. Stattdessen rendert es seine Benutzeroberfläche direkt auf eine Canvas, die über eine intern gehostete Grafik-Engine gerendert wird. Das Framework zeichnet seine eigenen Widgets Pixel für Pixel.

#### Auswirkungen auf die traditionelle Automatisierung
Für standardmäßige native Treiber und Inspektoren erscheint eine Flutter-App oft als eine einzige Grafikfläche. Interne Widgets (wie Buttons oder Textfelder) existieren standardmäßig nicht im Accessibility-Baum des Betriebssystems. Daher können standardmäßige native Locator-Strategien nicht direkt mit internen Flutter-Widgets interagieren.

---

### Wie WebdriverIO und Appium mit Flutter umgehen

WebdriverIO und Appium stellen die Werkzeuge bereit, die für die Interaktion mit dem internen Widget-Baum von Flutter erforderlich sind. Sie müssen jedoch den passenden Treiber und die entsprechenden Locator-Erweiterungen für Ihr Projekt installieren und konfigurieren.

Mithilfe des [Appium Flutter Driver](https://github.com/appium/appium-flutter-driver) verbindet sich Appium mit der Test-Erweiterung von Flutter (`flutter_driver`). Dadurch erhalten Sie Zugriff auf Flutter-spezifische Locator-Strategien (Finder), darunter:

* `byValueKey`: Findet Widgets anhand ihres expliziten `Key` im Flutter-Code.
* `byText`: Findet Widgets anhand ihres sichtbaren Textinhalts.
* `byTooltip`: Findet Widgets anhand ihres Tooltip-Textes.

Die folgenden Abschnitte führen Sie durch die Voraussetzungen, die Einrichtung der Umgebung und das Schreiben Ihrer ersten Testsuite.