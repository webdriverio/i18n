---
id: configuration
title: Konfiguration
description: "Konfigurieren Sie den WebdriverIO MCP-Server, einschließlich Sitzungs-, Browser-, Mobil-, Cloud-Anbieter-, Elementerkennungs- und Appium-Optionen."
---

Diese Seite dokumentiert alle Konfigurationsoptionen für den WebdriverIO MCP-Server.

## MCP-Server-Konfiguration

Der MCP-Server wird über Konfigurationsdateien oder Befehle konfiguriert.

### Grundkonfiguration

Bearbeiten Sie Ihre MCP-Konfigurationsdatei (z. B. `./.mcp.json`) und fügen Sie Folgendes hinzu:

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

## Sitzungsoptionen

Alle Sitzungsoptionen werden an das Tool `start_session` übergeben. Es gibt ein einziges, einheitliches Tool für Browser- und mobile Sitzungen; der Parameter `platform` bestimmt den Sitzungstyp.

### Allgemeine Optionen

#### `platform`

<Option type={`"browser" | "ios" | "android"`} required="Ja">

Die zu automatisierende Plattform.

</Option>
#### `provider`

<Option type={`"local" | "browserstack" | "saucelabs" | "testmu" | "testingbot"`} default={`"local"`} required="Nein">

Wo die Sitzung ausgeführt wird. Verwenden Sie den Namen eines Cloud-Anbieters für Remote-Geräte; jeder benötigt eigene Umgebungsvariablen. Details finden Sie unter [Cloud-Anbieter](./cloud-providers).

</Option>
## Browser-Sitzungsoptionen

Optionen für Sitzungen mit `platform: "browser"`.

### `browser`

<Option type={`"chrome" | "firefox" | "edge" | "safari"`} required="Ja (für Browser-Plattform)">

Zu startender Browser.

</Option>
### `browserVersion`

<Option type="string" default={`"latest"`} required="Nein">

Browser-Version. Nur für Cloud-Anbieter (Standard: latest).

</Option>
### `os` / `osVersion`

<Option type="string" required="Nein">

Betriebssystem für Browser-Sitzungen bei Cloud-Anbietern. Beispiele: `os: "Windows"`, `osVersion: "11"` oder `os: "OS X"`, `osVersion: "Sequoia"`.

</Option>
### `headless`

<Option type="boolean" default="true" required="Nein">

Browser im Headless-Modus ausführen (kein sichtbares Fenster). Auf `false` setzen, um den Browser zu sehen.

</Option>
### `windowWidth`

<Option type="number" default="1920" required="Nein">

-   **Bereich:** `400` - `3840`

Anfängliche Breite des Browserfensters in Pixeln.

</Option>
### `windowHeight`

<Option type="number" default="1080" required="Nein">

-   **Bereich:** `400` - `2160`

Anfängliche Höhe des Browserfensters in Pixeln.

</Option>
### `navigationUrl`

<Option type="string" required="Nein">

URL, zu der unmittelbar nach dem Start des Browsers navigiert wird. Effizienter, als `start_session` und anschließend separat `navigate` aufzurufen.

</Option>
### `attach`

<Option type="boolean" default="false" required="Nein">

An eine bestehende Chrome-Instanz anhängen, anstatt eine neue zu starten. Nach `launch_chrome` verwenden, um sich über CDP zu verbinden.

</Option>
### `attachConfig`

<Option type={`{ port?: number; host?: string }`} default={`{ port: 9222, host: "localhost" }`} required="Nein">

Verbindungskonfiguration für das Chrome Remote Debugging. Gilt nur bei `attach: true`.

</Option>
## Mobile Sitzungsoptionen

Optionen für Sitzungen mit `platform: "ios"` oder `platform: "android"`.

### `deviceName`

<Option type="string" required="Ja (für mobile Plattformen)">

Name des Geräts, Simulators oder Emulators.

**Beispiele:**
-   iOS-Simulator: `"iPhone 16"`, `"iPad Air (5th generation)"`
-   Android-Emulator: `"Pixel 7"`, `"Nexus 5X"`
-   Echtes Gerät: Der Gerätename, wie er in Ihrem System angezeigt wird

</Option>
### `platformVersion`

<Option type="string" required="Nein">

Betriebssystemversion des Geräts/Simulators/Emulators (z. B. `"18.0"` für iOS, `"14"` für Android).

</Option>
### `automationName`

<Option type={`"XCUITest" | "UiAutomator2"`} required="Nein">

Automatisierungstreiber. Standardmäßig `XCUITest` für iOS und `UiAutomator2` für Android.

</Option>
### `udid`

<Option type="string" required="Nein (Erforderlich für echte iOS-Geräte)">

Eindeutige Gerätekennung (Unique Device Identifier). Erforderlich für echte iOS-Geräte (40-stellige Kennung).

**UDID ermitteln:**
-   **iOS:** Gerät verbinden, Finder öffnen, auf das Gerät klicken → Seriennummer (klicken, um die UDID anzuzeigen)
-   **Android:** `adb devices` im Terminal ausführen

</Option>
### `appPath`

<Option type="string" required="Nein">

Pfad zur Anwendungsdatei, die installiert und gestartet werden soll.

**Unterstützte Formate:**
-   iOS-Simulator: `.app`-Verzeichnis
-   Echtes iOS-Gerät: `.ipa`-Datei
-   Android: `.apk`-Datei

Entweder muss `appPath` angegeben werden, oder `noReset: true`, um sich mit einer bereits laufenden App zu verbinden.

</Option>
### `app`

<Option type="string" required="Nein">

App-URL des Cloud-Anbieters (`bs://...` für BrowserStack, `storage:filename=` für Sauce Labs, `lt://...` für TestMu, TestingBot app_url) oder `customId`. Wird bei mobilen Cloud-Sitzungen anstelle von `appPath` verwendet.

</Option>
### `appWaitActivity`

<Option type="string" required="Nein (nur Android)">

Activity, auf die beim App-Start gewartet wird. Wenn nicht angegeben, wird die Haupt-/Launcher-Activity der App verwendet.

**Beispiel:** `"com.example.app.MainActivity"`

</Option>
### Optionen für den Sitzungszustand

#### `noReset`

<Option type="boolean" required="Nein">

Den App-Zustand zwischen Sitzungen beibehalten. Bei `true`:
-   App-Daten bleiben erhalten (Anmeldestatus, Einstellungen usw.)
-   Die Sitzung wird **getrennt** statt geschlossen (die App läuft weiter)
-   Kann ohne `appPath` verwendet werden, um sich mit einer bereits laufenden App zu verbinden

</Option>
#### `fullReset`

<Option type="boolean" required="Nein">

Die App vor der Sitzung vollständig zurücksetzen:
-   iOS: Deinstalliert die App und installiert sie neu
-   Android: Löscht App-Daten und Cache

Setzen Sie `fullReset: false` zusammen mit `noReset: true`, um den App-Zustand vollständig zu erhalten.

</Option>
### Sitzungs-Timeout

#### `newCommandTimeout`

<Option type="number" default="300" required="Nein">

Wie lange (in Sekunden) Appium auf einen neuen Befehl wartet, bevor die Sitzung beendet wird. Für längere Debugging-Sitzungen erhöhen.

</Option>
### Automatische Behandlung

#### `autoGrantPermissions`

<Option type="boolean" default="true" required="Nein">

App-Berechtigungen bei Installation/Start automatisch erteilen (Kamera, Mikrofon, Standort usw.).

:::note Nur Android
Diese Option betrifft hauptsächlich Android. iOS-Berechtigungen müssen aufgrund von Systemeinschränkungen anders behandelt werden.
:::

</Option>
#### `autoAcceptAlerts`

<Option type="boolean" default="true" required="Nein">

Systemmeldungen (Dialoge) während der Automatisierung automatisch akzeptieren („Benachrichtigungen erlauben?“ usw.).

</Option>
#### `autoDismissAlerts`

<Option type="boolean" default="false" required="Nein">

Systemmeldungen ablehnen statt akzeptieren. Hat bei `true` Vorrang vor `autoAcceptAlerts`.

</Option>
### Appium-Server-Verbindung

Überschreiben Sie die Appium-Server-Verbindung pro Sitzung mit `appiumConfig`:

```js
start_session({
  platform: "ios",
  deviceName: "iPhone 16",
  appPath: "/path/to/app.app",
  appiumConfig: { host: "192.168.1.100", port: 4724, path: "/wd/hub" }
})
```

#### `appiumConfig`

<Option type={`{ host?: string; port?: number; path?: string }`} required="Nein">

Appium-Server-Verbindung. Standardmäßig `{ host: "127.0.0.1", port: 4723, path: "/" }`.

</Option>
## Cloud-Anbieter-Optionen

### Zugangsdaten

Jeder Cloud-Anbieter benötigt eigene Umgebungsvariablen:

| Anbieter     | Benutzername-Variable   | Access-Key-Variable       |
| ------------ | ----------------------- | ------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME` | `BROWSERSTACK_ACCESS_KEY` |
| Sauce Labs   | `SAUCE_USERNAME`        | `SAUCE_ACCESS_KEY`        |
| TestMu       | `TESTMU_USERNAME`       | `TESTMU_ACCESS_KEY`       |
| TestingBot   | `TESTINGBOT_KEY`        | `TESTINGBOT_SECRET`       |

Setzen Sie diese, bevor Sie den MCP-Server starten.

### `region`

<Option type={`"us-west-1" | "eu-central-1" | "apac-southeast-1"`} default={`"eu-central-1"`} required="Nein">

Rechenzentrumsregion von Sauce Labs. Wird bei anderen Anbietern ignoriert.

</Option>
### `tunnel`

<Option type={`boolean | "external"`} default="false" required="Nein">

Lokales Tunnel-Routing für Sitzungen bei Cloud-Anbietern aktivieren (Zugriff auf localhost, Staging-Umgebungen, interne Dienste).

-   `true` — Startet den Tunnel automatisch vor der Sitzung und stoppt ihn beim Schließen
-   `"external"` — Tunnel läuft bereits extern; setzt nur die für den Anbieter passenden Flags

Bevor Sie `true` verwenden, lesen Sie die Local-Binary-Ressource des Anbieters (`wdio://browserstack/local-binary`, `wdio://saucelabs/local-binary`, `wdio://testmu/local-binary` oder `wdio://testingbot/local-binary`) für Einrichtungsanweisungen, die spezifisch für Ihr Betriebssystem und Ihre Architektur sind.

</Option>
### `tunnelName`

<Option type="string" required="Nein">

Name zur Identifizierung des Tunnels. Erforderlich bei `tunnel: "external"`, um den laufenden Tunnel zuzuordnen. Bei `tunnel: true` wird automatisch ein eindeutiger Name generiert, falls keiner angegeben ist.

</Option>
### `reporting`

<Option type={`{ project?: string; build?: string; session?: string }`} required="Nein">

Sitzungsbezeichnungen, die im Dashboard des Cloud-Anbieters sichtbar sind. Funktioniert identisch bei BrowserStack, Sauce Labs, TestMu und TestingBot.

</Option>
### `trace`

<Option type="boolean" default="false" required="Nein">

Trace-Aufzeichnung aktivieren. Erzeugt eine Playwright-kompatible `.trace`-Zip-Datei, die bei `close_session` in `.trace/` gespeichert wird. Traces können unter [player.vibium.dev](https://player.vibium.dev) angesehen werden.

</Option>
## Optionen zur Elementerkennung

Optionen für das Tool `get_elements`.

### `inViewportOnly`

<Option type="boolean" default="false" required="Nein">

Nur Elemente zurückgeben, die im aktuellen Viewport sichtbar sind. Auf `true` setzen, um die Ergebnisse auf langen Seiten zu reduzieren.

</Option>
### `includeContainers`

<Option type="boolean" default="false" required="Nein">

Container-/Layout-Elemente in die Ergebnisse einbeziehen:

**Android-Container:** `ViewGroup`, `FrameLayout`, `LinearLayout`, `RelativeLayout`, `ConstraintLayout`, `ScrollView`, `RecyclerView`

**iOS-Container:** `View`, `StackView`, `CollectionView`, `ScrollView`, `TableView`

</Option>
### `includeBounds`

<Option type="boolean" default="false" required="Nein">

Koordinaten der Element-Bounding-Box (x, y, Breite, Höhe) in die Antwort einbeziehen.

</Option>
### Paginierung

#### `limit`

<Option type="number" default="0 (unbegrenzt)" required="Nein">

Maximale Anzahl der zurückzugebenden Elemente.

</Option>
#### `offset`

<Option type="number" default="0" required="Nein">

Anzahl der Elemente, die übersprungen werden, bevor Ergebnisse zurückgegeben werden.

**Beispiel:** Elemente 21–40 abrufen:
```text
Get elements with limit 20 and offset 20
```

</Option>
## Optionen für den Barrierefreiheitsbaum

Optionen für das Tool `get_accessibility_tree` (nur Browser).

### `limit`

<Option type="number" default="0 (unbegrenzt)" required="Nein">

Maximale Anzahl der zurückzugebenden Knoten.

</Option>
### `offset`

<Option type="number" default="0" required="Nein">

Anzahl der für die Paginierung zu überspringenden Knoten.

</Option>
### `roles`

<Option type="string[]" default="Alle Rollen" required="Nein">

Auf bestimmte Barrierefreiheitsrollen filtern.

**Häufige Rollen:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Beispiel:** Nur Buttons und Links abrufen:
```text
Get accessibility tree filtered to button and link roles
```

</Option>
## Screenshot

Das Tool `get_screenshot` nimmt keine Parameter entgegen. Screenshots werden automatisch verarbeitet:

| Optimierung       | Wert     | Beschreibung                                                  |
| ----------------- | -------- | ------------------------------------------------------------- |
| Max. Abmessung    | 2000px   | Bilder größer als 2000px werden herunterskaliert              |
| Max. Dateigröße   | 1MB      | Bilder werden komprimiert, um unter 1MB zu bleiben            |
| Format            | PNG/JPEG | PNG mit maximaler Kompression; JPEG, falls für Größe nötig    |

## Sitzungsverhalten

### Sitzungstypen

| Typ       | Beschreibung          | Automatisches Trennen                         |
| --------- | --------------------- | --------------------------------------------- |
| `browser` | Browser-Sitzung       | Nein                                          |
| `ios`     | iOS-App-Sitzung       | Ja (bei `noReset: true` oder ohne `appPath`)  |
| `android` | Android-App-Sitzung   | Ja (bei `noReset: true` oder ohne `appPath`)  |

### Einzelsitzungsmodell

Der MCP-Server arbeitet mit einem **Einzelsitzungsmodell**:

-   Es kann jeweils nur eine Browser- ODER App-Sitzung aktiv sein
-   Das Starten einer neuen Sitzung schließt/trennt die aktuelle Sitzung
-   Der Sitzungszustand wird global über Tool-Aufrufe hinweg beibehalten

### Trennen vs. Schließen

| Aktion       | `detach: false` (Schließen)           | `detach: true` (Trennen)                          |
| ------------ | ------------------------------------- | ------------------------------------------------- |
| Browser      | Schließt den Browser vollständig      | Browser läuft weiter, WebDriver wird getrennt     |
| Mobile App   | Beendet die App                       | App läuft im aktuellen Zustand weiter             |
| Anwendungsfall | Sauberer Neustart für nächste Sitzung | Zustand beibehalten, manuelle Inspektion        |

## Leistungsaspekte

### Browser-Automatisierung

-   **Headless-Modus** ist schneller, rendert aber keine visuellen Elemente
-   **Kleinere Fenstergrößen** verkürzen die Zeit für Screenshot-Aufnahmen
-   **Elementerkennung** ist durch eine einzige Skriptausführung optimiert
-   **Screenshot-Optimierung** hält Bilder für eine effiziente Verarbeitung unter 1MB

### Mobile Automatisierung

-   **XML-Page-Source-Parsing** verwendet nur 2 HTTP-Aufrufe (gegenüber 600+ bei herkömmlichen Elementabfragen)
-   **Accessibility-ID-Selektoren** sind am schnellsten und zuverlässigsten
-   **XPath-Selektoren** sind am langsamsten; nur als letzte Möglichkeit verwenden
-   **Paginierung** (`limit` und `offset`) reduziert den Token-Verbrauch bei Bildschirmen mit vielen Elementen

### Tipps zum Token-Verbrauch

| Einstellung                | Auswirkung                                                       |
| -------------------------- | ---------------------------------------------------------------- |
| `inViewportOnly: true`     | Filtert Elemente außerhalb des Bildschirms, verkleinert Antwort  |
| `includeContainers: false` | Schließt Layout-Elemente aus (ViewGroup usw.)                    |
| `includeBounds: false`     | Lässt x/y/Breite/Höhe-Daten weg                                  |
| `limit` mit Paginierung    | Elemente in Stapeln statt alle auf einmal verarbeiten            |

## Appium-Server-Einrichtung

Stellen Sie vor der Verwendung der mobilen Automatisierung sicher, dass Appium korrekt konfiguriert ist.

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

1. Prüfen Sie, ob npm/npx installiert ist: `npm --version`
2. Versuchen Sie, ihn manuell auszuführen: `npx @wdio/mcp`
3. Prüfen Sie die Logs Ihres Harness auf Fehler

### Probleme mit der Appium-Verbindung

1. Prüfen Sie, ob Appium läuft: `curl http://localhost:4723/status`
2. Prüfen Sie, ob `appiumConfig` in `start_session` mit den Einstellungen des Appium-Servers übereinstimmt
3. Stellen Sie sicher, dass die Firewall Verbindungen auf dem Appium-Port zulässt

### Sitzung startet nicht

1. **Browser:** Stellen Sie sicher, dass der Zielbrowser installiert ist
2. **iOS:** Prüfen Sie, ob Xcode und Simulatoren verfügbar sind
3. **Android:** Prüfen Sie `ANDROID_HOME` und ob der Emulator läuft
4. Prüfen Sie die Logs des Appium-Servers auf detaillierte Fehlermeldungen

### Sitzungs-Timeouts

Wenn Sitzungen während des Debuggings in ein Timeout laufen:
1. Erhöhen Sie `newCommandTimeout` beim Starten der Sitzung
2. Verwenden Sie `noReset: true`, um den Zustand zwischen Sitzungen zu erhalten
3. Verwenden Sie `detach: true` beim Schließen, damit die App weiterläuft