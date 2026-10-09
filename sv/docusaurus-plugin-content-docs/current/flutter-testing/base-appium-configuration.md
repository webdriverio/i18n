---
id: base-appium-configuration
title: Grundläggande Appium-konfiguration
description: "Installera Appium-tjänsten och Flutter finder-paketet och konfigurera den grundläggande Appium-installationen för att testa Flutter-appar med WebdriverIO."
---

WebdriverIO använder Appium för att köra tester på mobila emulatorer, simulatorer och riktiga enheter. `@wdio/appium-service` hanterar automatiskt Appium-serverns livscykel under testkörningen.

För allmän Appium-installation och capability-alternativ, se [Appium Service-dokumentationen](https://webdriver.io/docs/appium-service/).

## Installera beroenden

För att testa Flutter-applikationer, installera Appium-tjänsten och Flutter finder-paketet:

```bash
npm install --save-dev @wdio/appium-service appium appium-flutter-finder
```

### Installera Appium Flutter Driver

Du kan installera Appium Flutter Driver (`appium-flutter-driver`) på ett av två sätt:

#### Alternativ 1: Som ett utvecklingsberoende (rekommenderas för CI/CD)

Genom att lägga till drivrutinen direkt i dina `devDependencies` säkerställer du att alla teammedlemmar och CI/CD-pipelines får drivrutinen installerad automatiskt utan att det krävs extra installationssteg:

```bash
npm install --save-dev appium-flutter-driver
```

> Du kan också installera alla nödvändiga paket på en gång med ett enda kommando:
> ```bash
> npm install --save-dev @wdio/appium-service appium appium-flutter-finder appium-flutter-driver
> ```

#### Alternativ 2: Via Appium CLI (lokal installation)

Alternativt kan du installera drivrutinen lokalt i din Appium-miljö med hjälp av Appium CLI:

```bash
npx appium driver install flutter
```

### Paketöversikt

Dessa paket tillhandahåller:
- **`@wdio/appium-service` & `appium`**: Startar och hanterar Appium-servern under testkörningar.
- **`appium-flutter-driver`**: Appium-drivrutinen som ansvarar för kommunikationen med Flutters testtillägg.
- **`appium-flutter-finder`**: Hjälpbibliotek som tillhandahåller Flutter-specifika lokaliseringsstrategier (`byValueKey`, `byText`, `byTooltip`).