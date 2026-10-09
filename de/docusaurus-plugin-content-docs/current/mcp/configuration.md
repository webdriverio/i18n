---
id: configuration
title: Konfiguration
description: "Konfiguriere den WebdriverIO MCP-Server, einschließlich Session-, Browser-, Mobile-, Cloud-Provider-, Elementerkennungs- und Appium-Optionen."
---

Diese Seite dokumentiert alle Konfigurationsoptionen für den WebdriverIO MCP-Server.

## MCP-Server-Konfiguration

Der MCP-Server wird über Konfigurationsdateien oder Befehle konfiguriert.

### Grundkonfiguration

Bearbeite deine MCP-Konfigurationsdatei (z. B. `./.mcp.json`) und füge Folgendes hinzu:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

## Session-Optionen

Alle Session-Optionen werden an das Tool `start_session` übergeben. Es gibt ein einziges, einheitliches Tool für Browser- und Mobile-Sessions; der Parameter `platform` bestimmt den Session-Typ.

### Allgemeine Optionen

#### `platform`

<Option type={`"browser" | "ios" | "android"`} required="Yes">

Die zu automatisierende Plattform.

</Option>
#### `provider`

<Option type={`"local" | "browserstack" | "saucelabs" | "testmu" | "testingbot"`} default={`"local"`} required="No">

Wo die Session ausgeführt wird. Verwende den Namen eines Cloud-Providers für Remote-Geräte; jeder benötigt eigene Umgebungsvariablen. Siehe [Cloud Providers](./cloud-providers) für Details.

</Option>
## Browser-Session-Optionen

Optionen für Sessions mit `platform: "browser"`.

### `browser`

<Option type={`"chrome" | "firefox" | "edge" | "safari"`} required="Yes (for browser platform)">

Zu startender Browser.

</Option>
### `browserVersion`

<Option type="string" default={`"latest"`} required="No">

Browser-Version. Nur für Cloud-Provider (Standard: latest).

</Option>
### `os` / `osVersion`

<Option type="string" required="No">

Betriebssystem für Browser-Sessions bei Cloud-Providern. Beispiele: `os: "Windows"`, `osVersion: "11"` oder `os: "OS X"`, `osVersion: "Sequoia"`.

</Option>
### `headless`

<Option type="boolean" default="true" required="No">

Führt den Browser im Headless-Modus aus (kein sichtbares Fenster). Setze den Wert auf `false`, um den Browser zu sehen.

</Option>
### `windowWidth`

<Option type="number" default="1920" required="No">

-   **Bereich:** `400` - `3840`

Anfängliche Breite des Browserfensters in Pixeln.

</Option>
### `windowHeight`

<Option type="number" default="1080" required="No">

-   **Bereich:** `400` - `2160`

Anfängliche Höhe des Browserfensters in Pixeln.

</Option>
### `navigationUrl`

<Option type="string" required="No">

URL, zu der unmittelbar nach dem Start des Browsers navigiert wird. Effizienter als `start_session` und anschließend separat `navigate` aufzurufen.

</Option>
### `attach`

<Option type="boolean" default="false" required="No">

Verbindet sich mit einer bestehenden Chrome-Instanz, anstatt eine neue zu starten. Verwende dies nach `launch_chrome`, um dich über CDP zu verbinden.

</Option>
### `attachConfig`

<Option type={`{ port?: number; host?: string }`} default={`{ port: 9222, host: "localhost" }`} required="No">

Verbindungskonfiguration für das Chrome Remote Debugging. Gilt nur bei `attach: true`.

</Option>
## Mobile-Session-Optionen

Optionen für Sessions mit `platform: "ios"` oder `platform: "android"`.

### `deviceName`

<Option type="string" required="Yes (for mobile platforms)">

Name des Geräts, Simulators oder Emulators.

**Beispiele:**
-   iOS-Simulator: `"iPhone 16"`, `"iPad Air (5th generation)"`
-   Android-Emulator: `"Pixel 7"`, `"Nexus 5X"`
-   Echtes Gerät: Der Gerätename, wie er in deinem System angezeigt wird

</Option>
### `platformVersion`

<Option type="string" required="No">

OS-Version des Geräts/Simulators/Emulators (z. B. `"18.0"` für iOS, `"14"` für Android).

</Option>
### `automationName`

<Option type={`"XCUITest" | "UiAutomator2"`} required="No">

Automatisierungstreiber. Standardmäßig `XCUITest` für iOS und `UiAutomator2` für Android.

</Option>
### `udid`

<Option type="string" required="No (Required for real iOS devices)">

Unique Device Identifier. Erforderlich für echte iOS-Geräte (40-stellige Kennung).

**UDID finden:**
-   **iOS:** Gerät verbinden, Finder öffnen, auf das Gerät klicken → Seriennummer (klicken, um die UDID anzuzeigen)
-   **Android:** `adb devices` im Terminal ausführen

</Option>
### `appPath`

<Option type="string" required="No">

Pfad zur Anwendungsdatei, die installiert und gestartet werden soll.

**Unterstützte Formate:**
-   iOS-Simulator: `.app`-Verzeichnis
-   Echtes iOS-Gerät: `.ipa`-Datei
-   Android: `.apk`-Datei

Entweder muss `appPath` angegeben werden, oder `noReset: true`, um sich mit einer bereits laufenden App zu verbinden.

</Option>
### `app`

<Option type="string" required="No">

App-URL des Cloud-Providers (`bs://...` für BrowserStack, `storage:filename=` für Sauce Labs, `lt://...` für TestMu, TestingBot app_url) oder `customId`. Wird anstelle von `appPath` für mobile Cloud-Sessions verwendet.

</Option>
### `appWaitActivity`

<Option type="string" required="No (Android only)">

Activity, auf die beim App-Start gewartet wird. Wenn nicht angegeben, wird die Haupt-/Launcher-Activity der App verwendet.

**Beispiel:** `"com.example.app.MainActivity"`

</Option>
### Optionen für den Session-Zustand

#### `noReset`

<Option type="boolean" required="No">

Bewahrt den App-Zustand zwischen Sessions. Bei `true`:
-   App-Daten bleiben erhalten (Login-Status, Einstellungen usw.)
-   Die Session wird **getrennt (detach)** statt geschlossen (die App läuft weiter)
-   Kann ohne `appPath` verwendet werden, um sich mit einer bereits laufenden App zu verbinden

</Option>
#### `fullReset`

<Option type="boolean" required="No">

Setzt die App vor der Session vollständig zurück:
-   iOS: Deinstalliert die App und installiert sie neu
-   Android: Löscht App-Daten und Cache

Setze `fullReset: false` zusammen mit `noReset: true`, um den App-Zustand vollständig zu erhalten.

</Option>
### Session-Timeout

#### `newCommandTimeout`

<Option type="number" default="300" required="No">

Wie lange (in Sekunden) Appium auf einen neuen Befehl wartet, bevor die Session beendet wird. Erhöhe den Wert für längere Debugging-Sessions.

</Option>
### Automatische Behandlung

#### `autoGrantPermissions`

<Option type="boolean" default="true" required="No">

Erteilt App-Berechtigungen bei Installation/Start automatisch (Kamera, Mikrofon, Standort usw.).

:::note Nur Android
Diese Option betrifft hauptsächlich Android. iOS-Berechtigungen müssen aufgrund von Systemeinschränkungen anders behandelt werden.
:::

</Option>
#### `autoAcceptAlerts`

<Option type="boolean" default="true" required="No">

Akzeptiert System-Alerts (Dialoge) während der Automatisierung automatisch („Mitteilungen erlauben?“ usw.).

</Option>
#### `autoDismissAlerts`

<Option type="boolean" default="false" required="No">

Verwirft System-Alerts, anstatt sie zu akzeptieren. Hat bei `true` Vorrang vor `autoAcceptAlerts`.

</Option>
### Appium-Server-Verbindung

Überschreibe die Appium-Server-Verbindung pro Session mit `appiumConfig`:

```js
start_session({
  platform: "ios",
  deviceName: "iPhone 16",
  appPath: "/path/to/app.app",
  appiumConfig: { host: "192.168.1.100", port: 4724, path: "/wd/hub" }
})
```

#### `appiumConfig`

<Option type={`{ host?: string; port?: number; path?: string }`} required="No">

Appium-Server-Verbindung. Standardmäßig `{ host: "127.0.0.1", port: 4723, path: "/" }`.

</Option>
## Cloud-Provider-Optionen

### Zugangsdaten

Jeder Cloud-Provider benötigt eigene Umgebungsvariablen:

| Provider     | Variable für Benutzername | Variable für Access Key   |
| ------------ | ------------------------- | ------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME`   | `BROWSERSTACK_ACCESS_KEY` |
| Sauce Labs   | `SAUCE_USERNAME`          | `SAUCE_ACCESS_KEY`        |
| TestMu       | `TESTMU_USERNAME`         | `TESTMU_ACCESS_KEY`       |
| TestingBot   | `TESTINGBOT_KEY`          | `TESTINGBOT_SECRET`       |

Setze diese, bevor du den MCP-Server startest.

### `region`

<Option type={`"us-west-1" | "eu-central-1" | "apac-southeast-1"`} default={`"eu-central-1"`} required="No">

Rechenzentrumsregion von Sauce Labs. Wird bei anderen Providern ignoriert.

</Option>
### `tunnel`

<Option type={`boolean | "external"`} default="false" required="No">

Aktiviert lokales Tunnel-Routing für Cloud-Provider-Sessions (Zugriff auf localhost, Staging-Umgebungen, interne Dienste).

-   `true` — Startet den Tunnel automatisch vor der Session und stoppt ihn beim Schließen
-   `"external"` — Der Tunnel läuft bereits extern; setzt nur die für den Provider passenden Flags

Bevor du `true` verwendest, lies die Local-Binary-Ressource des Providers (`wdio://browserstack/local-binary`, `wdio://saucelabs/local-binary`, `wdio://testmu/local-binary` oder `wdio://testingbot/local-binary`), um Einrichtungsanweisungen speziell für dein Betriebssystem und deine Architektur zu erhalten.

</Option>
### `tunnelName`

<Option type="string" required="No">

Name zur Identifikation des Tunnels. Erforderlich bei `tunnel: "external"`, um dem laufenden Tunnel zu entsprechen. Bei `tunnel: true` wird automatisch ein eindeutiger Name generiert, falls keiner angegeben ist.

</Option>
### `reporting`

<Option type={`{ project?: string; build?: string; session?: string }`} required="No">

Session-Labels des Cloud-Providers, die im Dashboard des Providers sichtbar sind. Funktioniert identisch bei BrowserStack, Sauce Labs, TestMu und TestingBot.

</Option>
### `trace`

<Option type="boolean" default="false" required="No">

Aktiviert die Trace-Aufzeichnung. Erzeugt eine Playwright-kompatible `.trace`-Zip-Datei, die bei `close_session` in `.trace/` gespeichert wird. Traces kannst du unter [player.vibium.dev](https://player.vibium.dev) ansehen.

</Option>
## Optionen zur Elementerkennung

Optionen für das Tool `get_elements`.

### `inViewportOnly`

<Option type="boolean" default="false" required="No">

Gibt nur Elemente zurück, die im aktuellen Viewport sichtbar sind. Setze den Wert auf `true`, um die Ergebnisse auf langen Seiten zu reduzieren.

</Option>
### `includeContainers`

<Option type="boolean" default="false" required="No">

Schließt Container-/Layout-Elemente in die Ergebnisse ein:

**Android-Container:** `ViewGroup`, `FrameLayout`, `LinearLayout`, `RelativeLayout`, `ConstraintLayout`, `ScrollView`, `RecyclerView`

**iOS-Container:** `View`, `StackView`, `CollectionView`, `ScrollView`, `TableView`

</Option>
### `includeBounds`

<Option type="boolean" default="false" required="No">

Schließt die Koordinaten der Bounding Box des Elements (x, y, Breite, Höhe) in die Antwort ein.

</Option>
### Paginierung

#### `limit`

<Option type="number" default="0 (unlimited)" required="No">

Maximale Anzahl zurückzugebender Elemente.

</Option>
#### `offset`

<Option type="number" default="0" required="No">

Anzahl der Elemente, die übersprungen werden, bevor Ergebnisse zurückgegeben werden.

**Beispiel:** Elemente 21–40 abrufen:
```text
Get elements with limit 20 and offset 20
```

</Option>
## Optionen für den Accessibility Tree

Optionen für das Tool `get_accessibility_tree` (nur Browser).

### `limit`

<Option type="number" default="0 (unlimited)" required="No">

Maximale Anzahl zurückzugebender Knoten.

</Option>
### `offset`

<Option type="number" default="0" required="No">

Anzahl der Knoten, die für die Paginierung übersprungen werden.

</Option>
### `roles`

<Option type="string[]" default="All roles" required="No">

Filtert nach bestimmten Accessibility-Rollen.

**Häufige Rollen:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Beispiel:** Nur Buttons und Links abrufen:
```text
Get accessibility tree filtered to button and link roles
```

</Option>
## Screenshot

Das Tool `get_screenshot` nimmt keine Parameter entgegen. Screenshots werden automatisch verarbeitet:

| Optimierung        | Wert     | Beschreibung                                                   |
| ------------------ | -------- | -------------------------------------------------------------- |
| Max. Abmessung     | 2000px   | Bilder größer als 2000px werden verkleinert                    |
| Max. Dateigröße    | 1MB      | Bilder werden komprimiert, um unter 1MB zu bleiben             |
| Format             | PNG/JPEG | PNG mit maximaler Kompression; JPEG, falls für die Größe nötig |

## Session-Verhalten

### Session-Typen

| Typ       | Beschreibung        | Auto-Detach                                |
| --------- | ------------------- | ------------------------------------------ |
| `browser` | Browser-Session     | Nein                                       |
| `ios`     | iOS-App-Session     | Ja (bei `noReset: true` oder ohne `appPath`) |
| `android` | Android-App-Session | Ja (bei `noReset: true` oder ohne `appPath`) |

### Single-Session-Modell

Der MCP-Server arbeitet mit einem **Single-Session-Modell**:

-   Es kann jeweils nur eine Browser- ODER App-Session aktiv sein
-   Das Starten einer neuen Session schließt/trennt die aktuelle Session
-   Der Session-Zustand wird global über Tool-Aufrufe hinweg beibehalten

### Detach vs. Close

| Aktion     | `detach: false` (Close)            | `detach: true` (Detach)                           |
| ---------- | ---------------------------------- | ------------------------------------------------- |
| Browser    | Schließt den Browser vollständig   | Browser läuft weiter, WebDriver wird getrennt     |
| Mobile App | Beendet die App                    | App läuft im aktuellen Zustand weiter             |
| Anwendungsfall | Sauberer Neustart für die nächste Session | Zustand erhalten, manuelle Inspektion |

## Hinweise zur Performance

### Browser-Automatisierung

-   **Headless-Modus** ist schneller, rendert aber keine visuellen Elemente
-   **Kleinere Fenstergrößen** verkürzen die Zeit für Screenshots
-   **Elementerkennung** ist durch eine einzige Skriptausführung optimiert
-   **Screenshot-Optimierung** hält Bilder unter 1MB für eine effiziente Verarbeitung

### Mobile-Automatisierung

-   **XML-Page-Source-Parsing** benötigt nur 2 HTTP-Aufrufe (gegenüber 600+ bei herkömmlichen Elementabfragen)
-   **Accessibility-ID-Selektoren** sind am schnellsten und zuverlässigsten
-   **XPath-Selektoren** sind am langsamsten; verwende sie nur als letzte Option
-   **Paginierung** (`limit` und `offset`) reduziert den Token-Verbrauch bei Bildschirmen mit vielen Elementen

### Tipps zum Token-Verbrauch

| Einstellung                | Auswirkung                                                       |
| -------------------------- | ---------------------------------------------------------------- |
| `inViewportOnly: true`     | Filtert Elemente außerhalb des Bildschirms, verkleinert die Antwort |
| `includeContainers: false` | Schließt Layout-Elemente aus (ViewGroup usw.)                    |
| `includeBounds: false`     | Lässt x/y/Breite/Höhe-Daten weg                                  |
| `limit` mit Paginierung    | Verarbeitet Elemente in Batches statt alle auf einmal            |

## Appium-Server-Einrichtung

Stelle vor der Nutzung der Mobile-Automatisierung sicher, dass Appium korrekt konfiguriert ist.

### Grundeinrichtung

```sh
# Appium global installieren
npm install -g appium

# Treiber installieren
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# Server starten
appium
```

### Benutzerdefinierte Server-Konfiguration

```sh
# Mit benutzerdefiniertem Host und Port starten
appium --address 0.0.0.0 --port 4724

# Mit Logging starten
appium --log-level debug

# Mit bestimmtem Basispfad starten
appium --base-path /wd/hub
```

### Installation überprüfen

```sh
# Installierte Treiber prüfen
appium driver list --installed

# Appium-Version prüfen
appium --version

# Verbindung testen
curl http://localhost:4723/status
```

## Fehlerbehebung bei der Konfiguration

### MCP-Server startet nicht

1. Überprüfe, ob npm/npx installiert ist: `npm --version`
2. Versuche, ihn manuell auszuführen: `npx @wdio/mcp`
3. Prüfe die Logs deines Harness auf Fehler

### Probleme mit der Appium-Verbindung

1. Überprüfe, ob Appium läuft: `curl http://localhost:4723/status`
2. Prüfe, ob `appiumConfig` in `start_session` mit den Einstellungen des Appium-Servers übereinstimmt
3. Stelle sicher, dass die Firewall Verbindungen auf dem Appium-Port zulässt

### Session startet nicht

1. **Browser:** Stelle sicher, dass der Zielbrowser installiert ist
2. **iOS:** Überprüfe, ob Xcode und Simulatoren verfügbar sind
3. **Android:** Prüfe `ANDROID_HOME` und ob der Emulator läuft
4. Sieh dir die Logs des Appium-Servers für detaillierte Fehlermeldungen an

### Session-Timeouts

Wenn Sessions während des Debuggings in ein Timeout laufen:
1. Erhöhe `newCommandTimeout` beim Starten der Session
2. Verwende `noReset: true`, um den Zustand zwischen Sessions zu erhalten
3. Verwende `detach: true` beim Schließen, damit die App weiterläuft