---
id: base-appium-configuration
title: Basis-Appium-Konfiguration
description: "Installiere den Appium-Service und das Flutter-Finder-Paket und konfiguriere die grundlegende Appium-Einrichtung zum Testen von Flutter-Apps mit WebdriverIO."
---

WebdriverIO verwendet Appium, um Tests auf mobilen Emulatoren, Simulatoren und echten Geräten auszuführen. Der `@wdio/appium-service` verwaltet den Lebenszyklus des Appium-Servers während der Testausführung automatisch.

Informationen zur allgemeinen Appium-Einrichtung und zu den Capability-Optionen findest du in der [Appium Service Dokumentation](https://webdriver.io/docs/appium-service/).

## Abhängigkeiten installieren

Um Flutter-Anwendungen zu testen, installiere den Appium-Service und das Flutter-Finder-Paket:

```bash
npm install --save-dev @wdio/appium-service appium appium-flutter-finder
```

### Den Appium Flutter Driver installieren

Du kannst den Appium Flutter Driver (`appium-flutter-driver`) auf eine von zwei Arten installieren:

#### Option 1: Als Dev-Abhängigkeit (empfohlen für CI/CD)

Wenn du den Treiber direkt zu deinen `devDependencies` hinzufügst, wird sichergestellt, dass alle Teammitglieder und CI/CD-Pipelines den Treiber automatisch installiert haben, ohne dass zusätzliche Einrichtungsschritte erforderlich sind:

```bash
npm install --save-dev appium-flutter-driver
```

> Du kannst auch alle erforderlichen Pakete zusammen mit einem einzigen Befehl installieren:
> ```bash
> npm install --save-dev @wdio/appium-service appium appium-flutter-finder appium-flutter-driver
> ```

#### Option 2: Über die Appium CLI (lokale Einrichtung)

Alternativ kannst du den Treiber mithilfe der Appium CLI lokal in deiner Appium-Umgebung installieren:

```bash
npx appium driver install flutter
```

### Paketübersicht

Diese Pakete bieten Folgendes:
- **`@wdio/appium-service` & `appium`**: Startet und verwaltet den Appium-Server während der Testläufe.
- **`appium-flutter-driver`**: Der Appium-Treiber, der für die Kommunikation mit der Test-Extension von Flutter zuständig ist.
- **`appium-flutter-finder`**: Hilfsbibliothek, die Flutter-spezifische Locator-Strategien bereitstellt (`byValueKey`, `byText`, `byTooltip`).