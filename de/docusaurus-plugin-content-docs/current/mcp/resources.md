---
id: resources
title: Ressourcen
description: "Lesen Sie den Live-Sitzungsstatus, den Sitzungsverlauf und Details zur Einrichtung von Cloud-Anbietern über die schreibgeschützten wdio://-Ressourcen des WebdriverIO MCP-Servers."
---

MCP-Ressourcen bieten schreibgeschützten Zugriff auf den Live-Sitzungsstatus. Im Gegensatz zu Tools werden Ressourcen vom KI-Modell nach Bedarf abgerufen; sie führen keine Aktionen aus. Alle Ressourcen verwenden das URI-Schema `wdio://`.

## Wann Ressourcen und wann Tools verwenden

- **Ressourcen** — Umgebungszustand, der sich während der Interaktion ändert: aktuelle Elemente, Screenshot, Cookies, Accessibility-Baum. Lesen Sie diese vor einer Aktion, um zu verstehen, was auf dem Bildschirm zu sehen ist.
- **Tools** — Aktionen, die den Zustand ändern: klicken, navigieren, Wert setzen.

Bevorzugen Sie `wdio://session/current/elements` gegenüber `get_screenshot` für die Elementerkennung; es liefert sofort verwendbare Selektoren und verbraucht deutlich weniger Tokens.

## Sitzungsverlauf

### `wdio://sessions`

Index aller Browser- und App-Sitzungen mit Metadaten und Schrittanzahl.

```json
{
  "sessions": [
    {
      "sessionId": "abc-123",
      "type": "browser",
      "startedAt": "2024-01-15T10:00:00.000Z",
      "endedAt": "2024-01-15T10:05:00.000Z",
      "stepCount": 12,
      "isCurrent": false
    }
  ]
}
```

---

### `wdio://session/current/steps`

JSON-Schrittprotokoll der aktuell aktiven Sitzung. Enthält alle aufgezeichneten Automatisierungsschritte mit Tool-Namen, Parametern und Zeitstempeln.

---

### `wdio://session/current/code`

Generiertes WebdriverIO-JavaScript für die aktuell aktive Sitzung. Wird automatisch aus den aufgezeichneten Schritten erzeugt. Fügen Sie es in eine WebdriverIO-Testdatei ein, um die Sitzung erneut abzuspielen.

---

### `wdio://session/{sessionId}/steps`

Schrittprotokoll einer bestimmten Sitzung anhand ihrer ID. URI-Template — ersetzen Sie `{sessionId}` durch die ID aus `wdio://sessions`.

---

### `wdio://session/{sessionId}/code`

Generiertes WebdriverIO-JavaScript für eine bestimmte Sitzung anhand ihrer ID. URI-Template — ersetzen Sie `{sessionId}` durch die ID aus `wdio://sessions`.

## Live-Seitenstatus (aktuelle Sitzung)

### `wdio://session/current/elements`

Interagierbare Elemente auf der aktuellen Seite. Liefert sofort verwendbare Selektoren, Elementtext und Sichtbarkeitsinformationen.

**Dies ist die primäre Ressource, um zu verstehen, was auf dem Bildschirm zu sehen ist.** Lesen Sie sie, bevor Sie klicken oder tippen. Deutlich schneller und günstiger als ein Screenshot.

Für erweiterte Filterung (nur Viewport, Container, Bounding Boxes, Paginierung) verwenden Sie stattdessen das Tool `get_elements`.

---

### `wdio://session/current/accessibility`

Accessibility-Baum der aktuellen Seite. Liefert standardmäßig alle Knoten mit Rolle, Name, Selektor und Statusattributen. Nur für Browser. Verwenden Sie auf Mobilgeräten `wdio://session/current/elements`.

```json
{
  "total": 84,
  "showing": 84,
  "hasMore": false,
  "nodes": [
    {
      "role": "button",
      "name": "Submit",
      "selector": "button.submit-btn",
      "disabled": false
    }
  ]
}
```

Für gefilterte Ergebnisse (nach Rolle, paginiert) verwenden Sie das Tool `get_accessibility_tree`.

---

### `wdio://session/current/screenshot`

Screenshot der aktuellen Seite bzw. des aktuellen Bildschirms als base64-kodiertes Bild. Wird automatisch skaliert (max. 2000px) und komprimiert (max. 1 MB).

Verwenden Sie dies zur visuellen Überprüfung oder zum Debuggen des Layouts. Für die Elementerkennung bevorzugen Sie `wdio://session/current/elements`.

---

### `wdio://session/current/cookies`

Alle Cookies der aktuellen Browser-Sitzung.

```json
[
  {
    "name": "session_token",
    "value": "abc123",
    "domain": "example.com",
    "path": "/",
    "httpOnly": true,
    "secure": true
  }
]
```

---

### `wdio://session/current/tabs`

Alle geöffneten Browser-Tabs in der aktuellen Sitzung. Nur für Browser.

```json
[
  {
    "handle": "CDwindow-ABC",
    "title": "My App",
    "url": "https://example.com/dashboard",
    "isActive": true
  }
]
```

Verwenden Sie dies vor `switch_tab`, um das Ziel-Handle oder den Index zu finden.

---

### `wdio://session/current/contexts`

Verfügbare Automatisierungskontexte (NATIVE_APP, WEBVIEW). Nur für Mobilgeräte.

```json
["NATIVE_APP", "WEBVIEW_com.example.app"]
```

---

### `wdio://session/current/context`

Aktuell aktiver Automatisierungskontext. Nur für Mobilgeräte.

```json
"NATIVE_APP"
```

---

### `wdio://session/current/app-state/{bundleId}`

App-Lebenszyklusstatus für eine bestimmte Bundle-ID. Nur für Mobilgeräte. URI-Template — ersetzen Sie `{bundleId}` durch eine iOS-Bundle-ID oder einen Android-Paketnamen.

Gibt einen der folgenden Werte zurück:
- `0` — nicht installiert
- `1` — läuft nicht
- `2` — läuft im Hintergrund (angehalten)
- `3` — läuft im Hintergrund
- `4` — läuft im Vordergrund

Für eine benannte Ausgabe verwenden Sie stattdessen das Tool `get_app_state`.

---

### `wdio://session/current/geolocation`

Aktuelle Überschreibung der Geräte-Geolokalisierung, die durch `set_geolocation` gesetzt wurde.

```json
{
  "latitude": 51.5074,
  "longitude": -0.1278,
  "altitude": 0
}
```

---

### `wdio://session/current/logs`

Sitzungsprotokolle der aktuellen Sitzung. Liefert Browser-Konsolenmeldungen und JavaScript-Exceptions (Chromium-Sitzungen), Logcat-Ausgabe (Android) oder Crash-/Syslog (iOS).

```json
{
  "type": "browser",
  "logs": [
    { "level": "SEVERE", "message": "Uncaught TypeError: ...", "source": "javascript" },
    { "level": "INFO", "message": "Page loaded", "source": "console" }
  ]
}
```

---

### `wdio://session/current/capabilities`

Rohe Capabilities, die vom WebDriver- oder Appium-Server für die aktuelle Sitzung zurückgegeben wurden. Verwenden Sie dies zum Debuggen; es zeigt die tatsächlichen Werte, die der Treiber akzeptiert hat, einschließlich der vom Cloud-Anbieter oder von Appium angewendeten Standardwerte.

## Cloud-Anbieter

### `wdio://browserstack/local-binary`

Plattformspezifische Download-URL und Anweisungen zur Daemon-Einrichtung für das BrowserStack Local Binary. Lesen Sie dies, bevor Sie `tunnel: true` oder `tunnel: "external"` mit `provider: "browserstack"` verwenden; es enthält die genauen Befehle für Ihr Betriebssystem und Ihre Architektur.

```json
{
  "platform": "macOS",
  "arch": "arm64",
  "downloadUrl": "https://...",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./BrowserStackLocal --key YOUR_KEY",
    "stop": "...",
    "status": "..."
  }
}
```

---

### `wdio://saucelabs/local-binary`

Plattformspezifische Download-URL und Anweisungen zur Daemon-Einrichtung für Sauce Connect Proxy. Lesen Sie dies, bevor Sie `tunnel: "external"` mit `provider: "saucelabs"` verwenden; bei `tunnel: true` verwaltet das SDK Sauce Connect automatisch.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://saucelabs.com/downloads/sc-4.9.2-linux.tar.gz",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./sc -u YOUR_USERNAME -k YOUR_ACCESS_KEY --region eu-central-1",
    "stop": "./sc --stop",
    "status": "./sc --status"
  }
}
```

---

### `wdio://testmu/local-binary`

Plattformspezifische Download-URL und Anweisungen zur Daemon-Einrichtung für TestMu Tunnel. Nur erforderlich für `tunnel: "external"` mit `provider: "testmu"` — bei `tunnel: true` verwaltet das SDK den Tunnel automatisch über `@lambdatest/node-tunnel`.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://downloads.lambdatest.com/tunnel/v4/linux/64bit/LT_Linux.zip",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY",
    "stop": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY --stop",
    "status": "./LT --status"
  }
}
```

---

### `wdio://testingbot/local-binary`

Download-URL und Anweisungen zur Daemon-Einrichtung für TestingBot Tunnel. Der Tunnel ist ein plattformübergreifendes Java-JAR (erfordert Java 11+). Nur erforderlich für `tunnel: "external"` mit `provider: "testingbot"` — bei `tunnel: true` verwaltet das SDK den Tunnel automatisch über `testingbot-tunnel-launcher`.

```json
{
  "requirement": "MUST start the TestingBot Tunnel BEFORE calling start_session with tunnel: \"external\".",
  "runtime": "Java 11+ (17 LTS recommended)",
  "downloadUrl": "https://testingbot.com/downloads/testingbot-tunnel.zip",
  "setup": [
    "1. Download: curl -O https://testingbot.com/downloads/testingbot-tunnel.zip",
    "2. Unzip: unzip testingbot-tunnel.zip",
    "3. Start: java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET"
  ],
  "commands": {
    "start": "java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET",
    "stop": "Press Ctrl+C in the tunnel terminal, or kill the java process."
  }
}
```