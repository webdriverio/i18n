---
id: base-appium-configuration
title: Grundlegende Appium-Konfiguration
description: "Installieren Sie den Appium-Service und das Flutter-Finder-Paket und konfigurieren Sie die grundlegende Appium-Einrichtung zum Testen von Flutter-Apps mit WebdriverIO."
---

WebdriverIO verwendet Appium, um Tests auf mobilen Emulatoren, Simulatoren und echten Geräten auszuführen. Der `@wdio/appium-service` verwaltet den Lebenszyklus des Appium-Servers während der Testausführung automatisch.

Informationen zur allgemeinen Appium-Einrichtung und zu den Capability-Optionen finden Sie in der [Appium-Service-Dokumentation](https://webdriver.io/docs/appium-service/).

## Abhängigkeiten installieren

Um Flutter-Anwendungen zu testen, installieren Sie den Appium-Service und das Flutter-Finder-Paket:

```bash
npm install --save-dev @wdio/appium-service appium appium-flutter-finder
```

### Den Appium Flutter Driver installieren

Sie können den Appium Flutter Driver (`appium-flutter-driver`) auf eine von zwei Arten installieren:

#### Option 1: Als Dev-Dependency (empfohlen für CI/CD)

Wenn Sie den Driver direkt zu Ihren `devDependencies` hinzufügen, wird sichergestellt, dass alle Teammitglieder und CI/CD-Pipelines den Driver automatisch installiert haben, ohne dass zusätzliche Einrichtungsschritte erforderlich sind:

```bash
npm install --save-dev appium-flutter-driver
```

> Sie können auch alle erforderlichen Pakete zusammen mit einem einzigen Befehl installieren:
> ```bash
> npm install --save-dev @wdio/appium-service appium appium-flutter-finder appium-flutter-driver
> ```

#### Option 2: Über die Appium CLI (lokale Einrichtung)

Alternativ können Sie den Driver mithilfe der Appium CLI lokal in Ihrer Appium-Umgebung installieren:

```bash
npx appium driver install flutter
```

### Paketübersicht

Diese Pakete bieten Folgendes:
- **`@wdio/appium-service` & `appium`**: Startet und verwaltet den Appium-Server während der Testläufe.
- **`appium-flutter-driver`**: Der Appium-Driver, der für die Kommunikation mit der Test-Extension von Flutter zuständig ist.
- **`appium-flutter-finder`**: Hilfsbibliothek, die Flutter-spezifische Locator-Strategien bereitstellt (`byValueKey`, `byText`, `byTooltip`).