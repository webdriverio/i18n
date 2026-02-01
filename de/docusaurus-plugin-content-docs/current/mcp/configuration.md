---
id: configuration
title: Konfiguration
---

Diese Seite dokumentiert alle Konfigurationsoptionen für den WebdriverIO MCP-Server.

## MCP-Server-Konfiguration

Der MCP-Server wird über die Claude Desktop- oder Claude Code-Konfigurationsdateien konfiguriert.

### Grundlegende Konfiguration

#### macOS

Bearbeiten Sie `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

#### Windows

Bearbeiten Sie `%APPDATA%\Claude\claude_desktop_config.json`:

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

#### Claude Code

Bearbeiten Sie die `.claude/settings.json` Ihres Projekts:

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

---

## Umgebungsvariablen

Konfigurieren Sie die Appium-Server-Verbindung und andere Einstellungen über Umgebungsvariablen.

### Appium-Verbindung

| Variable | Typ | Standardwert | Beschreibung |
|----------|------|---------|-------------|
| `APPIUM_URL` | string | `127.0.0.1` | Appium-Server-Hostname |
| `APPIUM_URL_PORT` | number | `4723` | Appium-Server-Port |
| `APPIUM_PATH` | string | `/` | Appium-Server-Pfad |

### Beispiel mit Umgebungsvariablen

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724",
                "APPIUM_PATH": "/wd/hub"
            }
        }
    }
}
```

---

## Browser-Sitzungsoptionen

Verfügbare Optionen beim Starten einer Browser-Sitzung über das `start_browser`-Tool.

### `headless`

-   **Typ:** `boolean`
-   **Obligatorisch:** Nein
-   **Standardwert:** `false`

Führt Chrome im Headless-Modus aus (kein sichtbares Browser-Fenster). Nützlich für CI/CD-Umgebungen oder wenn Sie den Browser nicht sehen müssen.

### `windowWidth`

-   **Typ:** `number`
-   **Obligatorisch:** Nein
-   **Standardwert:** `1920`
-   **Bereich:** `400` - `3840`

Anfängliche Browser-Fensterbreite in Pixeln.

### `windowHeight`

-   **Typ:** `number`
-   **Obligatorisch:** Nein
-   **Standardwert:** `1080`
-   **Bereich:** `400` - `2160`

Anfängliche Browser-Fensterhöhe in Pixeln.

### `navigationUrl`

-   **Typ:** `string`
-   **Obligatorisch:** Nein

URL, zu der sofort nach dem Starten des Browsers navigiert werden soll. Dies ist effizienter als das separate Aufrufen von `start_browser` gefolgt von `navigate`.

**Beispiel:** Browser starten und in einem Aufruf navigieren:
```
Start Chrome and navigate to https://webdriver.io
```

---

## Mobile Sitzungsoptionen

Verfügbare Optionen beim Starten einer mobilen App-Sitzung über das `start_app_session`-Tool.

### Plattformoptionen

#### `platform`

-   **Typ:** `string`
-   **Obligatorisch:** Ja
-   **Werte:** `iOS` | `Android`

Die zu automatisierende mobile Plattform.

#### `platformVersion`

-   **Typ:** `string`
-   **Obligatorisch:** Nein

Die OS-Version des Geräts/Simulators/Emulators (z.B. `17.0` für iOS, `14` für Android).

#### `automationName`

-   **Typ:** `string`
-   **Obligatorisch:** Nein
-   **Werte:** `XCUITest` (iOS), `UiAutomator2` | `Espresso` (Android)

Der zu verwendende Automatisierungstreiber. Standardmäßig `XCUITest` für iOS und `UiAutomator2` für Android.

### Geräteoptionen

#### `deviceName`

-   **Typ:** `string`
-   **Obligatorisch:** Ja

Name des zu verwendenden Geräts, Simulators oder Emulators.

**Beispiele:**
-   iOS-Simulator: `iPhone 15 Pro`, `iPad Air (5th generation)`
-   Android-Emulator: `Pixel 7`, `Nexus 5X`
-   Echtes Gerät: Der Gerätename, wie er in Ihrem System angezeigt wird

#### `udid`

-   **Typ:** `string`
-   **Obligatorisch:** Nein (Erforderlich für echte iOS-Geräte)

Eindeutige Gerätekennung. Erforderlich für echte iOS-Geräte (40-stellige Kennung) und empfohlen für echte Android-Geräte.

**UDID finden:**
-   **iOS:** Gerät anschließen, Finder/iTunes öffnen, auf Gerät klicken → Seriennummer (klicken, um UDID anzuzeigen)
-   **Android:** `adb devices` im Terminal ausführen

### App-Optionen

#### `appPath`

-   **Typ:** `string`
-   **Obligatorisch:** Nein*

Pfad zur Anwendungsdatei, die installiert und gestartet werden soll.

**Unterstützte Formate:**
-   iOS-Simulator: `.app`-Verzeichnis
-   iOS-Echtgerät: `.ipa`-Datei
-   Android: `.apk`-Datei

*Entweder muss `appPath` angegeben werden oder `noReset: true`, um eine Verbindung zu einer bereits laufenden App herzustellen.

#### `appWaitActivity`

-   **Typ:** `string`
-   **Obligatorisch:** Nein (nur Android)

Activity, auf die beim App-Start gewartet werden soll. Wenn nicht angegeben, wird die Haupt-/Launcher-Activity der App verwendet.

**Beispiel:** `com.example.app.MainActivity`

### Sitzungszustand-Optionen

#### `noReset`

-   **Typ:** `boolean`
-   **Obligatorisch:** Nein
-   **Standardwert:** `false`

App-Zustand zwischen Sitzungen beibehalten. Bei `true`:
-   App-Daten werden beibehalten (Anmeldestatus, Einstellungen usw.)
-   Sitzung wird **abgekoppelt** statt geschlossen (App bleibt aktiv)
-   Nützlich für das Testen von Benutzerreisen über mehrere Sitzungen hinweg
-   Kann ohne `appPath` verwendet werden, um eine Verbindung zu einer bereits laufenden App herzustellen

#### `fullReset`

-   **Typ:** `boolean`
-   **Obligatorisch:** Nein
-   **Standardwert:** `true`

App vor der Sitzung vollständig zurücksetzen. Bei `true`:
-   iOS: Deinstalliert und installiert die App neu
-   Android: Löscht App-Daten und Cache
-   Nützlich, um mit einem sauberen Zustand zu beginnen

Setzen Sie `fullReset: false` mit `noReset: true`, um den App-Zustand vollständig zu erhalten.

### Sitzungs-Timeout

#### `newCommandTimeout`

-   **Typ:** `number`
-   **Obligatorisch:** Nein
-   **Standardwert:** `60`

Wie lange (in Sekunden) Appium auf einen neuen Befehl wartet, bevor angenommen wird, dass der Client beendet wurde und die Sitzung beendet wird. Erhöhen Sie diesen Wert für längere Debugging-Sitzungen.

**Beispiele:**
-   `60` - Standard, geeignet für die meisten Automatisierungen
-   `300` - 5 Minuten, für Debugging oder langsamere Operationen
-   `600` - 10 Minuten, für sehr lang laufende Tests

### Optionen für automatische Behandlung

#### `autoGrantPermissions`

-   **Typ:** `boolean`
-   **Obligatorisch:** Nein
-   **Standardwert:** `true`

App-Berechtigungen bei Installation/Start automatisch gewähren. Bei `true`:
-   Berechtigungen für Kamera, Mikrofon, Standort usw. werden automatisch gewährt
-   Keine manuelle Behandlung von Berechtigungsdialogen erforderlich
-   Optimiert die Automatisierung durch Vermeidung von Berechtigungs-Popups

:::note Nur Android
Diese Option betrifft hauptsächlich Android. iOS-Berechtigungen müssen aufgrund von Systembeschränkungen anders behandelt werden.
:::

#### `autoAcceptAlerts`

-   **Typ:** `boolean`
-   **Obligatorisch:** Nein
-   **Standardwert:** `true`

System-Alerts (Dialoge), die während der Automatisierung erscheinen, automatisch akzeptieren.

**Beispiele für automatisch akzeptierte Alerts:**
-   "Benachrichtigungen zulassen?"
-   "App möchte auf Ihren Standort zugreifen"
-   "App Zugriff auf Fotos erlauben?"

#### `autoDismissAlerts`

-   **Typ:** `boolean`
-   **Obligatorisch:** Nein
-   **Standardwert:** `false`

System-Alerts ablehnen (abbrechen) anstatt sie zu akzeptieren. Hat Vorrang vor `autoAcceptAlerts`, wenn auf `true` gesetzt.

### Appium-Server-Überschreibung

Sie können die Appium-Server-Verbindung pro Sitzung überschreiben:

#### `appiumHost`

-   **Typ:** `string`
-   **Obligatorisch:** Nein

Appium-Server-Hostname. Überschreibt die Umgebungsvariable `APPIUM_URL`.

#### `appiumPort`

-   **Typ:** `number`
-   **Obligatorisch:** Nein

Appium-Server-Port. Überschreibt die Umgebungsvariable `APPIUM_URL_PORT`.

#### `appiumPath`

-   **Typ:** `string`
-   **Obligatorisch:** Nein

Appium-Server-Pfad. Überschreibt die Umgebungsvariable `APPIUM_PATH`.

---

## Elementerkennungs-Optionen

Optionen für das `get_visible_elements`-Tool.

### `elementType`

-   **Typ:** `string`
-   **Obligatorisch:** Nein
-   **Standardwert:** `interactable`
-   **Werte:** `interactable` | `visual` | `all`

Typ der zurückzugebenden Elemente:
-   `interactable`: Schaltflächen, Links, Eingabefelder und andere anklickbare Elemente
-   `visual`: Bilder, SVGs und visuelle Elemente
-   `all`: Sowohl interaktive als auch visuelle Elemente

### `inViewportOnly`

-   **Typ:** `boolean`
-   **Obligatorisch:** Nein
-   **Standardwert:** `true`

Nur Elemente zurückgeben, die im aktuellen Viewport sichtbar sind. Bei `false` werden alle Elemente in der Ansichtshierarchie zurückgegeben (nützlich zum Finden von Elementen außerhalb des Bildschirms).

### `includeContainers`

-   **Typ:** `boolean`
-   **Obligatorisch:** Nein
-   **Standardwert:** `false`

Container-/Layout-Elemente in die Ergebnisse einbeziehen. Bei `true`:

**Eingeschlossene Android-Container:**
-   `ViewGroup`, `FrameLayout`, `LinearLayout`
-   `RelativeLayout`, `ConstraintLayout`
-   `ScrollView`, `RecyclerView`

**Eingeschlossene iOS-Container:**
-   `View`, `StackView`, `CollectionView`
-   `ScrollView`, `TableView`

Nützlich zum Debuggen von Layout-Problemen oder zum Verständnis der Ansichtshierarchie.

### `includeBounds`

-   **Typ:** `boolean`
-   **Obligatorisch:** Nein
-   **Standardwert:** `false`

Element-Grenzen/Koordinaten (x, y, Breite, Höhe) in die Antwort einbeziehen. Auf `true` setzen für:
-   Koordinatenbasierte Interaktionen
-   Layout-Debugging
-   Positionierung visueller Elemente

### Paginierungsoptionen

Für große Seiten mit vielen Elementen verwenden Sie die Paginierung, um den Token-Verbrauch zu reduzieren:

#### `limit`

-   **Typ:** `number`
-   **Obligatorisch:** Nein
-   **Standardwert:** `0` (unbegrenzt)

Maximale Anzahl der zurückzugebenden Elemente.

#### `offset`

-   **Typ:** `number`
-   **Obligatorisch:** Nein
-   **Standardwert:** `0`

Anzahl der zu überspringenden Elemente, bevor Ergebnisse zurückgegeben werden.

**Beispiel:** Elemente 21-40 abrufen:
```
Get visible elements with limit 20 and offset 20
```

---

## Zugänglichkeitsbaum-Optionen

Optionen für das `get_accessibility`-Tool (nur Browser).

### `limit`

-   **Typ:** `number`
-   **Obligatorisch:** Nein
-   **Standardwert:** `100`

Maximale Anzahl der zurückzugebenden Knoten. Verwenden Sie `0` für unbegrenzt (nicht empfohlen für große Seiten).

### `offset`

-   **Typ:** `number`
-   **Obligatorisch:** Nein
-   **Standardwert:** `0`

Anzahl der zu überspringenden Knoten für die Paginierung.

### `roles`

-   **Typ:** `string[]`
-   **Obligatorisch:** Nein
-   **Standardwert:** Alle Rollen

Filtern nach bestimmten Zugänglichkeitsrollen.

**Häufige Rollen:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Beispiel:** Nur Schaltflächen und Links abrufen:
```
Get accessibility tree filtered to button and link roles
```

### `namedOnly`

-   **Typ:** `boolean`
-   **Obligatorisch:** Nein
-   **Standardwert:** `true`

Nur Knoten zurückgeben, die einen Namen/ein Label haben. Filtert anonyme Container aus und reduziert das Rauschen in den Ergebnissen.

---

## Screenshot-Optionen

Optionen für das `take_screenshot`-Tool.

### `outputPath`

-   **Typ:** `string`
-   **Obligatorisch:** Nein

Pfad, unter dem die Screenshot-Datei gespeichert werden soll. Wenn nicht angegeben, werden base64-kodierte Bilddaten zurückgegeben.

### Automatische Optimierung

Screenshots werden automatisch verarbeitet, um für den LLM-Verbrauch optimiert zu werden:

| Optimierung | Wert | Beschreibung |
|--------------|-------|-------------|
| Max. Abmessung | 2000px | Bilder größer als 2000px werden verkleinert |
| Max. Dateigröße | 1MB | Bilder werden komprimiert, um unter 1MB zu bleiben |
| Format | PNG/JPEG | PNG mit maximaler Komprimierung; JPEG wenn nötig für die Größe |

Diese Optimierung stellt sicher, dass Screenshots effizient verarbeitet werden können, ohne die Token-Grenzen zu überschreiten.

---

## Sitzungsverhalten

### Sitzungstypen

Der MCP-Server verfolgt Sitzungstypen, um geeignete Tools und Verhaltensweisen bereitzustellen:

| Typ | Beschreibung | Auto-Detach |
|------|-------------|-------------|
| `browser` | Chrome-Browser-Sitzung | Nein |
| `ios` | iOS-App-Sitzung | Ja (wenn `noReset: true` oder kein `appPath`) |
| `android` | Android-App-Sitzung | Ja (wenn `noReset: true` oder kein `appPath`) |

### Einzel-Sitzungs-Modell

Der MCP-Server arbeitet mit einem **Einzel-Sitzungs-Modell**:

-   Nur eine Browser- ODER App-Sitzung kann gleichzeitig aktiv sein
-   Das Starten einer neuen Sitzung schließt/löst die aktuelle Sitzung
-   Der Sitzungszustand wird global über Tool-Aufrufe hinweg beibehalten

### Detach vs Close

| Aktion | `detach: false` (Schließen) | `detach: true` (Abkoppeln) |
|--------|-------------------------|-------------------------|
| Browser | Schließt Chrome vollständig | Hält Chrome am Laufen, trennt WebDriver |
| Mobile App | Beendet die App | Hält die App im aktuellen Zustand am Laufen |
| Anwendungsfall | Sauberer Neuanfang für die nächste Sitzung | Zustand beibehalten, manuelle Inspektion |

---

## Leistungsüberlegungen

Der MCP-Server ist für die effiziente LLM-Kommunikation unter Verwendung des **TOON (Token-Oriented Object Notation)**-Formats optimiert, das den Token-Verbrauch beim Senden von Daten an Claude minimiert.

### Browser-Automatisierung

-   **Headless-Modus** ist schneller, rendert aber keine visuellen Elemente
-   **Kleinere Fenstergrößen** reduzieren die Screenshot-Erfassungszeit
-   **Elementerkennung** ist mit einer einzigen Skriptausführung optimiert
-   **Screenshot-Optimierung** hält Bilder unter 1MB für eine effiziente Verarbeitung
-   **`inViewportOnly: true`** (Standard) filtert auf nur sichtbare Elemente

### Mobile Automatisierung

-   **XML-Seitenquellparsing** verwendet nur 2 HTTP-Aufrufe (gegenüber 600+ für traditionelle Elementabfragen)
-   **Accessibility ID-Selektoren** sind am schnellsten und zuverlässigsten
-   **XPath-Selektoren** sind am langsamsten - nur als letzten Ausweg verwenden
-   **`inViewportOnly: true`** (Standard) reduziert die Elementanzahl erheblich
-   **Paginierung** (`limit` und `offset`) reduziert den Token-Verbrauch für Bildschirme mit vielen Elementen
-   **`includeBounds: false`** (Standard) lässt Koordinatendaten weg, sofern nicht benötigt

### Tipps zum Token-Verbrauch

| Einstellung | Auswirkung |
|---------|--------|
| `inViewportOnly: true` | Filtert Elemente außerhalb des Bildschirms, reduziert die Antwortgröße |
| `includeContainers: false` | Schließt Layout-Elemente aus (ViewGroup usw.) |
| `includeBounds: false` | Lässt x/y/Breite/Höhe-Daten weg |
| `limit` mit Paginierung | Verarbeitet Elemente in Batches anstatt alle auf einmal |
| `namedOnly: true` (Barrierefreiheit) | Filtert anonyme Knoten |

---

## Appium-Server-Setup

Bevor Sie mobile Automatisierung verwenden, stellen Sie sicher, dass Appium richtig konfiguriert ist.

### Grundlegende Einrichtung

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

# Mit Protokollierung starten
appium --log-level debug

# Mit spezifischem Basispfad starten
appium --base-path /wd/hub
```

### Installation überprüfen

```sh
# Installierte Treiber überprüfen
appium driver list --installed

# Appium-Version überprüfen
appium --version

# Verbindung testen
curl http://localhost:4723/status
```

---

## Konfiguration zur Fehlerbehebung

### MCP-Server startet nicht

1. Überprüfen Sie, ob npm/npx installiert ist: `npm --version`
2. Versuchen Sie, manuell auszuführen: `npx @wdio/mcp`
3. Überprüfen Sie Claude Desktop-Logs auf Fehler

### Appium-Verbindungsprobleme

1. Überprüfen Sie, ob Appium läuft: `curl http://localhost:4723/status`
2. Überprüfen Sie, ob Umgebungsvariablen mit Appium-Server-Einstellungen übereinstimmen
3. Stellen Sie sicher, dass die Firewall Verbindungen auf dem Appium-Port zulässt

### Sitzung startet nicht

1. **Browser:** Stellen Sie sicher, dass Chrome installiert ist
2. **iOS:** Überprüfen Sie, ob Xcode und Simulatoren verfügbar sind
3. **Android:** Überprüfen Sie `ANDROID_HOME` und ob der Emulator läuft
4. Überprüfen Sie Appium-Server-Logs auf detaillierte Fehlermeldungen

### Sitzungs-Timeouts

Wenn Sitzungen während des Debuggens zeitlich überschritten werden:
1. Erhöhen Sie `newCommandTimeout` beim Starten der Sitzung
2. Verwenden Sie `noReset: true`, um den Zustand zwischen Sitzungen zu erhalten
3. Verwenden Sie `detach: true` beim Schließen, um die App am Laufen zu halten