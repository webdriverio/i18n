---
id: cloud-providers
title: Cloud-Anbieter
description: "Führe WebdriverIO-MCP-Browser- und Mobile-Sessions auf Cloud-Device-Farmen aus, inklusive Zugangsdaten, App-Uploads, Tunneln und Reporting."
---

Der WebdriverIO-MCP-Server bietet native Unterstützung für die Ausführung von Browser- und Mobile-Automatisierungssessions auf Cloud-Device-Farmen. Es werden keine lokalen Treiber, Emulatoren oder Simulatoren benötigt. Vier Anbieter werden unterstützt:

- **BrowserStack** — [Automate](https://www.browserstack.com/automate) (Browser) und [App Automate](https://www.browserstack.com/app-automate) (mobile Apps)
- **Sauce Labs** — [Sauce Labs](https://saucelabs.com) Real-Device-Cloud und virtuelle Browser
- **TestMu (ehemals LambdaTest)** — [TestMu](https://www.lambdatest.com) Real-Device- und Browser-Cloud
- **TestingBot** — [TestingBot](https://testingbot.com) Real-Device-Cloud und Browser-Grid

Alle vier Anbieter verwenden denselben Ablauf: Zugangsdaten festlegen, optional eine mobile App hochladen und anschließend `start_session` mit dem Anbieternamen aufrufen. Reporting-Labels, Tunnel-Konfiguration und der Lebenszyklus mobiler Apps sind bei allen Anbietern identisch.

## Voraussetzungen

Lege deine Zugangsdaten als Umgebungsvariablen fest, bevor du den MCP-Server startest:

```bash
# BrowserStack
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"

# Sauce Labs
export SAUCE_USERNAME="your_username"
export SAUCE_ACCESS_KEY="your_access_key"

# TestMu
export TESTMU_USERNAME="your_username"
export TESTMU_ACCESS_KEY="your_access_key"

# TestingBot
export TESTINGBOT_KEY="your_key"
export TESTINGBOT_SECRET="your_secret"
```

| Anbieter     | Benutzername-Variable   | Access-Key-Variable       | Wo zu finden                                                            |
| ------------ | ----------------------- | ------------------------- | ----------------------------------------------------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY` | [Kontoeinstellungen](https://www.browserstack.com/accounts/settings)    |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`        | [Benutzereinstellungen](https://app.saucelabs.com/user-settings)        |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`       | [Kontoeinstellungen](https://accounts.lambdatest.com/detail/profile)    |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`       | [Kontoeinstellungen](https://testingbot.com/membership)                 |

## Browser-Automatisierung

Führe eine Browser-Session bei einem beliebigen Cloud-Anbieter aus, indem du `provider` in `start_session` festlegst:

```js
// BrowserStack — Windows + Chrome
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})

// Sauce Labs — macOS + Safari
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "safari",
  browserVersion: "latest",
  os: "macOS",
  osVersion: "Sequoia"
})

// TestMu — Linux + Firefox
start_session({
  provider: "testmu",
  platform: "browser",
  browser: "firefox",
  browserVersion: "latest",
  os: "Linux"
})

// TestingBot — Windows + Chrome
start_session({
  provider: "testingbot",
  platform: "browser",
  browser: "chrome",
  browserVersion: "latest",
  os: "Windows",
  osVersion: "11"
})
```

Alle Anbieter unterstützen für `browser`: `"chrome"`, `"firefox"`, `"edge"`, `"safari"`. Wenn du `os` / `osVersion` weglässt, verwendet der Anbieter sinnvolle Standardwerte (in der Regel das neueste Linux für Browser-Sessions).

### Sauce-Labs-Regionen

Sauce Labs unterstützt mehrere Rechenzentrumsregionen. Lege den Parameter `region` in `start_session` fest:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  region: "us-west-1"
})
```

Unterstützte Werte: `"us-west-1"`, `"eu-central-1"` (Standard), `"apac-southeast-1"`.

## Mobile-App-Automatisierung

Der Mobile-Ablauf besteht aus drei Schritten, die bei allen Anbietern identisch sind:

### Schritt 1: App hochladen

```js
upload_app({ provider: "browserstack", path: "/absolute/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```

Jeder Aufruf gibt eine App-Referenz zurück, die du in `start_session` verwendest:
- BrowserStack: `bs://abc123...`
- Sauce Labs: `storage:filename=MyApp.ipa`
- TestMu: `lt://abc123...`
- TestingBot: `https://api.testingbot.com/v1/storage/<app_url>`

Optional kannst du eine `customId` für stabile Referenzen über mehrere Uploads hinweg festlegen:

```js
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", customId: "MyApp-v2.1" })
```

Füge bei Sauce Labs `region` hinzu, passend zu deiner Speicherregion (Standard `"eu-central-1"`).

### Schritt 2: Verfügbare Apps auflisten

```js
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

Optionale Parameter für alle Anbieter:
- `sortBy`: `"app_name"` oder `"uploaded_at"` (Standard)
- `limit`: maximale Anzahl an Ergebnissen (Standard 20)

BrowserStack unterstützt zusätzlich `organizationWide: true`, um alle Uploads der Organisation aufzulisten. Sauce Labs akzeptiert `region`.

### Schritt 3: Session starten

Verwende die App-Referenz aus `upload_app` oder eine `customId`:

```js
// BrowserStack — Android
start_session({
  provider: "browserstack",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "bs://abc123..."
})

// Sauce Labs — iOS
start_session({
  provider: "saucelabs",
  platform: "ios",
  deviceName: "iPhone 15",
  platformVersion: "17.0",
  app: "storage:filename=MyApp.ipa"
})

// TestMu — Android
start_session({
  provider: "testmu",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "lt://abc123..."
})

// TestingBot — Android
start_session({
  provider: "testingbot",
  platform: "android",
  deviceName: "Samsung Galaxy S24",
  platformVersion: "14.0",
  app: "<app_url from upload_app>"
})
```

## Lokaler Tunnel

Alle drei Anbieter unterstützen einen lokalen Tunnel, damit Cloud-Sessions Server auf deinem Rechner erreichen können (localhost, Staging-Umgebungen, interne Dienste).

Der MCP-Server verwendet einen **einheitlichen `tunnel`-Parameter**, der bei allen Anbietern identisch funktioniert:

### Automatisch verwalteter Tunnel (empfohlen)

Der MCP-Server startet und stoppt den Tunnel automatisch:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  tunnel: true
})
```

Vor deiner ersten Session mit `tunnel: true` übernimmt der MCP-Server das Herunterladen und Starten der Tunnel-Binary. Wenn du die Einrichtung manuell überprüfen möchtest, lies die Local-Binary-Ressource des Anbieters:

- `wdio://browserstack/local-binary`
- `wdio://saucelabs/local-binary`
- `wdio://testmu/local-binary`
- `wdio://testingbot/local-binary`

Der Tunnel wird automatisch gestoppt, wenn du die Session schließt.

### Externer Tunnel

Wenn du den Tunnel bereits in einem separaten Prozess ausführst:

```js
start_session({
  provider: "saucelabs",
  platform: "browser",
  browser: "chrome",
  tunnel: "external",
  tunnelName: "my-sauce-tunnel"
})
```

`"external"` teilt dem MCP-Server mit, dass bereits ein Tunnel läuft; er setzt die entsprechenden Capability-Flags, startet oder stoppt aber keinen Prozess. Lege `tunnelName` passend zum laufenden Tunnel fest.

### Manuelle Tunnel-Einrichtung

Wenn du den Tunnel lieber manuell ausführen möchtest, lies die Einrichtungsanweisungen aus der MCP-Ressource für deinen Anbieter und deine Plattform. Zum Beispiel:

```text
// Einrichtungsanweisungen lesen (aus deinem AI-Client)
wdio://saucelabs/local-binary
wdio://testingbot/local-binary
```

Jede Ressource liefert die Download-URL, plattformspezifische Befehle und Anweisungen für den Daemon-Betrieb.

## Reporting

Versieh Sessions mit Projekt-, Build- und Session-Labels für das Dashboard des Anbieters. Dies funktioniert bei allen drei Anbietern identisch:

```js
start_session({
  provider: "browserstack",
  platform: "browser",
  browser: "chrome",
  reporting: {
    project: "My Project",
    build: "v2.1.0",
    session: "Login flow test"
  }
})
```

Sessions erscheinen im Dashboard des Anbieters unter dem angegebenen Projekt und Build:
- BrowserStack: [Automate-Dashboard](https://automate.browserstack.com)
- Sauce Labs: [Testergebnisse](https://app.saucelabs.com/dashboard/builds)
- TestMu: [Automation-Dashboard](https://automation.lambdatest.com)
- TestingBot: [Testergebnisse](https://testingbot.com/members)

## Anbieterspezifische Hinweise

### BrowserStack

- Browser-Sessions: `os` akzeptiert `"Windows"` oder `"OS X"`. Windows-Versionen: `"10"`, `"11"`. macOS-Versionen: `"Ventura"`, `"Sonoma"`, `"Sequoia"`.
- App-Management-API: `organizationWide: true` bei `list_apps` listet alle Uploads des Teams auf.

### Sauce Labs

- **Regionen sind wichtig.** Die Standardregion ist `eu-central-1`. Wenn sich dein Konto in einer anderen Region befindet, lege `region` bei `start_session`, `list_apps` und `upload_app` entsprechend fest.
- Mobile-Sessions unterstützen `automationName` (`"XCUITest"` oder `"UiAutomator2"`); die Standardwerte sind pro Plattform sinnvoll gewählt.
- Der Sauce-Connect-Tunnel wird automatisch über das npm-Paket `saucelabs` verwaltet. Für `tunnel: true` ist keine externe Binary erforderlich.

### TestMu

- Der Anbietername lautet `"testmu"` in `start_session`, `list_apps` und `upload_app`.
- Browser-Sessions verbinden sich mit `hub.lambdatest.com`; Mobile-Sessions verbinden sich mit `mobile-hub.lambdatest.com`; dies wird automatisch gehandhabt.
- Der Tunnel wird automatisch über das npm-Paket `@lambdatest/node-tunnel` verwaltet.
- Die Verwaltung mobiler Apps ruft Android- und iOS-Apps über separate API-Aufrufe ab und führt die Ergebnisse anschließend zusammen.

### TestingBot

- Der Anbietername lautet `"testingbot"` in `start_session`, `list_apps` und `upload_app`.
- Browser- und Mobile-Sessions verbinden sich beide mit `hub.testingbot.com` auf Port 443 (wird automatisch gehandhabt).
- Die Zugangsdaten verwenden `TESTINGBOT_KEY` und `TESTINGBOT_SECRET` (kein Paar aus Benutzername und Access Key wie bei den anderen Anbietern).
- Der Tunnel wird automatisch über das npm-Paket `testingbot-tunnel-launcher` verwaltet (erfordert Java 11+).
- Kein Region-Parameter — der Hub von TestingBot ist global.
- Der mobile Browser-/Emulator-Modus wird unterstützt: Lege `platform: "android"` oder `"ios"` mit einem `browser`-Namen (z. B. `"chrome"`) anstelle von `app` fest.