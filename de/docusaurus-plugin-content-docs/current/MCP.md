---
id: mcp
title: MCP (Model Context Protocol)
description: "Ermöglichen Sie KI-Assistenten, Browser und mobile Apps über den WebdriverIO MCP-Server zu automatisieren, einschließlich Installation, Verwendung mit Claude und verfügbaren Tools."
---

## Was kann es?

WebdriverIO MCP ist ein **Model Context Protocol (MCP) Server**, der es KI-Assistenten ermöglicht, Webbrowser und mobile Anwendungen zu automatisieren und mit ihnen zu interagieren.

### Warum WebdriverIO MCP?

-   **Mobile-First**: Im Gegensatz zu reinen Browser-MCP-Servern unterstützt WebdriverIO MCP die Automatisierung nativer iOS- und Android-Apps über Appium
-   **Plattformübergreifende Selektoren**: Die intelligente Elementerkennung generiert automatisch mehrere Locator-Strategien (Accessibility ID, XPath, UiAutomator, iOS-Predicates)
-   **WebdriverIO-Ökosystem**: Basiert auf dem bewährten WebdriverIO-Framework mit seinem umfangreichen Ökosystem an Services und Reportern

Es bietet eine einheitliche Schnittstelle für:

-   🖥️ **Desktop-Browser** (Chrome, Firefox, Edge, Safari, mit oder ohne Benutzeroberfläche (headless))
-   📱 **Native mobile Apps** (iOS-Simulatoren / Android-Emulatoren / echte Geräte über Appium)
-   📳 **Hybride mobile Apps** (Kontextwechsel zwischen Native und WebView über Appium)
-   ☁️ **Cloud-Geräte** (BrowserStack, Sauce Labs, TestMu Clouds für echte Geräte und Browser)

über das Paket [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp).

Dies ermöglicht KI-Assistenten:

-   **Browser starten und steuern** mit konfigurierbaren Abmessungen, Headless-Modus und optionaler initialer Navigation
-   **Websites navigieren** und mit Elementen interagieren (klicken, tippen, scrollen)
-   **Seiteninhalte analysieren** über den Accessibility Tree und die Erkennung sichtbarer Elemente mit Paginierungsunterstützung
-   **Screenshots aufnehmen**, die automatisch optimiert werden (skaliert, auf maximal 1MB komprimiert)
-   **Cookies verwalten** für das Session-Handling
-   **Mobile Geräte steuern** einschließlich Gesten (Tippen, Wischen, Drag and Drop)
-   **Kontexte wechseln** in hybriden Apps zwischen Native und WebView
-   **Skripte ausführen** - JavaScript in Browsern, Appium-Mobile-Befehle auf Geräten
-   **Gerätefunktionen handhaben** wie Rotation, Tastatur, Geolokalisierung
-   und vieles mehr, siehe die Optionen unter [Tools](./mcp/tools) und [Konfiguration](./mcp/configuration)

:::info

HINWEIS für mobile Apps
Die mobile Automatisierung erfordert einen laufenden Appium-Server mit den entsprechenden installierten Treibern. Siehe [Voraussetzungen](#prerequisites) für Anweisungen zur Einrichtung.

:::

## Installation

Der einfachste Weg, `@wdio/mcp` zu verwenden, ist über npx ohne lokale Installation:

```sh
npx @wdio/mcp
```

Oder installieren Sie es global:

```sh
npm install -g @wdio/mcp
```

## Verwendung mit Claude

Um WebdriverIO MCP mit Claude zu verwenden, ändern Sie die Konfigurationsdatei:

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

Starten Sie nach dem Hinzufügen der Konfiguration Ihre Umgebung neu. Die WebdriverIO MCP-Tools stehen dann für Browser- und mobile Automatisierungsaufgaben zur Verfügung.

### Verwendung mit Claude Code

Claude Code erkennt MCP-Server automatisch. Sie können es in der `.claude/settings.json` oder `.mcp.json` Ihres Projekts konfigurieren.

Oder fügen Sie es global zur .claude.json hinzu, indem Sie Folgendes ausführen:
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
Überprüfen Sie es, indem Sie den Befehl `/mcp` in Claude Code ausführen.

## Schnellstart-Beispiele

### Browser-Automatisierung

Bitten Sie Claude, Browser-Aufgaben zu automatisieren:

```
"Open Chrome and navigate to https://webdriver.io"
"Click the 'Get Started' button"
"Take a screenshot of the page"
"Find all visible links on the page"
```

### Automatisierung mobiler Apps

Bitten Sie Claude, mobile Apps zu automatisieren:

```
"Start my iOS app on the iPhone 15 simulator"
"Tap the login button"
"Swipe up to scroll down"
"Take a screenshot of the current screen"
```

## Funktionen

### Browser-Automatisierung

| Funktion | Beschreibung |
|---------|-------------|
| **Session-Verwaltung** | Chrome, Firefox, Edge oder Safari im Headed-/Headless-Modus mit benutzerdefinierten Abmessungen starten; Verbindung zu einer bestehenden Chrome-Instanz über CDP herstellen |
| **Navigation** | Zu URLs navigieren; mehrere Tabs verwalten |
| **Element-Interaktion** | Elemente anklicken, Text eingeben, Elemente über verschiedene Selektoren finden |
| **Seitenanalyse** | Interagierbare Elemente (mit Paginierung) und Accessibility Tree (mit Rollenfilterung) abrufen |
| **Screenshots** | Screenshots aufnehmen (automatisch auf maximal 1MB optimiert) |
| **Scrollen** | Um konfigurierbare Pixelwerte nach oben/unten scrollen |
| **Cookie-Verwaltung** | Cookies abrufen, setzen und löschen |
| **Geräteemulation** | Mobile/Tablet-Viewports im Browser emulieren (BiDi erforderlich) |
| **Skriptausführung** | Benutzerdefiniertes JavaScript im Browser-Kontext ausführen |

### Automatisierung mobiler Apps (iOS/Android)

| Funktion | Beschreibung |
|---------|-------------|
| **Session-Verwaltung** | Apps auf Simulatoren, Emulatoren oder echten Geräten starten |
| **Touch-Gesten** | Tippen (Element oder Koordinaten), Wischen, Drag and Drop |
| **Elementerkennung** | Intelligente Elementerkennung mit mehreren Locator-Strategien und Paginierung |
| **App-Lebenszyklus** | App-Status abrufen (Vordergrund, Hintergrund, nicht laufend, nicht installiert) |
| **Kontextwechsel** | Zwischen Native- und WebView-Kontexten in hybriden Apps wechseln |
| **Gerätesteuerung** | Gerät drehen, Tastatursteuerung, GPS-Überschreibung |
| **Berechtigungen** | Automatische Behandlung von Berechtigungen und Alerts |
| **Skriptausführung** | Appium-Mobile-Befehle ausführen (pressKey, deepLink, shell usw.) |

### Cloud-Anbieter

| Funktion | Beschreibung |
|---------|-------------|
| **Browser-Sessions** | Browser-Sessions auf BrowserStack, Sauce Labs, TestMu oder TestingBot ausführen (Windows, macOS, Linux) |
| **Mobile Sessions** | App-Sessions auf echten Geräten über BrowserStack, Sauce Labs, TestMu oder TestingBot ausführen |
| **App-Verwaltung** | `.apk`/`.ipa`-Dateien hochladen; zuvor hochgeladene Apps bei allen vier Anbietern auflisten |
| **Lokaler Tunnel** | Anbieterspezifische Tunnel-Binaries für den Zugriff auf localhost automatisch verwalten |
| **Reporting** | Sessions mit Projekt-/Build-/Session-Labels versehen (funktioniert bei allen Anbietern identisch) |

## Voraussetzungen

### Browser-Automatisierung

-   **Chrome, Firefox, Edge oder Safari** muss installiert sein
-   WebdriverIO übernimmt die automatisierte Treiberverwaltung

### Mobile Automatisierung

#### iOS

1. **Installieren Sie Xcode** aus dem Mac App Store
2. **Installieren Sie die Xcode Command Line Tools**:
   ```sh
   xcode-select --install
   ```
3. **Installieren Sie Appium**:
   ```sh
   npm install -g appium
   ```
4. **Installieren Sie den XCUITest-Treiber**:
   ```sh
   appium driver install xcuitest
   ```
5. **Starten Sie den Appium-Server**:
   ```sh
   appium
   ```
6. **Für Simulatoren**: Öffnen Sie Xcode → Window → Devices and Simulators, um Simulatoren zu erstellen/verwalten
7. **Für echte Geräte**: Sie benötigen die UDID des Geräts (40-stellige eindeutige Kennung)

#### Android

1. **Installieren Sie Android Studio** und richten Sie das Android SDK ein
2. **Setzen Sie die Umgebungsvariablen**:
   ```sh
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. **Installieren Sie Appium**:
   ```sh
   npm install -g appium
   ```
4. **Installieren Sie den UiAutomator2-Treiber**:
   ```sh
   appium driver install uiautomator2
   ```
5. **Starten Sie den Appium-Server**:
   ```sh
   appium
   ```
6. **Erstellen Sie einen Emulator** über Android Studio → Virtual Device Manager
7. **Starten Sie den Emulator**, bevor Sie Tests ausführen

## Architektur

### Wie es funktioniert

WebdriverIO MCP fungiert als Brücke zwischen KI-Assistenten und Browser-/Mobile-Automatisierung:

```
┌─────────────────┐     MCP Protocol      ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  or Claude Code │   (stdio or HTTP)     │     Server      │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             WebDriverIO API
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Browser    │             │    Appium     │             │   Cloud        │
            │ (local/CDP)   │             │  (iOS/Android)│             │   Providers    │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### Session-Verwaltung

-   **Single-Session-Modell**: Es kann immer nur eine Browser- ODER App-Session gleichzeitig aktiv sein
-   **Der Session-Status** wird global über Tool-Aufrufe hinweg beibehalten
-   **Automatisches Trennen**: Sessions mit beibehaltenem Status (`noReset: true`) werden beim Schließen automatisch getrennt

### Elementerkennung

#### Browser (Web)

-   Verwendet ein optimiertes Browser-Skript, um alle sichtbaren, interagierbaren Elemente zu finden
-   Gibt Elemente mit CSS-Selektoren, IDs, Klassen und ARIA-Informationen zurück
-   Unterstützt Viewport-Filterung und Paginierung

#### Mobile (native Apps)

-   Verwendet effizientes Parsen des XML-Seitenquelltexts (2 HTTP-Aufrufe vs. 600+ bei herkömmlichen Abfragen)
-   Plattformspezifische Elementklassifizierung für Android und iOS
-   Generiert mehrere Locator-Strategien pro Element:
    -   Accessibility ID (plattformübergreifend, am stabilsten)
    -   Resource ID / Name-Attribut
    -   Text- / Label-Abgleich
    -   XPath (vollständig und vereinfacht)
    -   UiAutomator (Android) / Predicates (iOS)

## Selektor-Syntax

Der MCP-Server unterstützt mehrere Selektor-Strategien. Siehe [Selektoren](./mcp/selectors) für eine ausführliche Dokumentation.

### Web (CSS/XPath)

```
# CSS-Selektoren
button.my-class
#element-id
[data-testid="login"]

# XPath
//button[@class='submit']
//a[contains(text(), 'Click')]

# Text-Selektoren (WebdriverIO-spezifisch)
button=Exact Button Text
a*=Partial Link Text
```

### Mobile (plattformübergreifend)

```
# Accessibility ID (empfohlen - funktioniert auf iOS & Android)
~loginButton

# Android UiAutomator
android=new UiSelector().text("Login")

# iOS Predicate String
-ios predicate string:label == "Login"

# iOS Class Chain
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# XPath (funktioniert auf beiden Plattformen)
//android.widget.Button[@text="Login"]
//XCUIElementTypeButton[@label="Login"]
```

## Verfügbare Tools

Der MCP-Server bietet 29 Tools für Browser- und mobile Automatisierung. Siehe [Tools](./mcp/tools) für die vollständige Referenz.

| Tool | Plattform | Beschreibung |
|------|----------|-------------|
| `start_session` | alle | Eine Browser- oder mobile Session starten (lokal oder Cloud-Anbieter) |
| `close_session` | alle | Die aktuelle Session schließen oder trennen |
| `launch_chrome` | Browser | Chrome mit Remote-Debugging für CDP-Verbindung öffnen |
| `navigate` | Browser | Eine URL im aktuellen Tab laden |
| `get_tabs` | Browser | Alle geöffneten Tabs auflisten |
| `switch_tab` | Browser | Einen Tab über Handle oder Index fokussieren |
| `switch_frame` | Browser | Per Selektor in einen iframe oder zurück zur obersten Ebene wechseln |
| `click_element` | Browser | Ein Element anklicken |
| `set_value` | alle | Text in ein Eingabefeld eingeben |
| `scroll` | Browser | Die Seite nach oben oder unten scrollen |
| `get_elements` | alle | Interagierbare Elemente abrufen (mit Filterung + Paginierung) |
| `get_accessibility_tree` | Browser | Accessibility Tree abrufen (mit Rollenfilterung) |
| `get_screenshot` | alle | Screenshot aufnehmen (automatisch optimiert) |
| `get_cookies` | Browser | Alle Cookies oder ein bestimmtes Cookie abrufen |
| `set_cookie` | Browser | Ein Browser-Cookie setzen |
| `delete_cookies` | Browser | Alle oder ein Cookie löschen |
| `emulate_device` | Browser | Den Viewport eines Mobil-/Tablet-Geräts emulieren |
| `execute_script` | alle | JavaScript (Browser) oder Appium-Befehle (Mobile) ausführen |
| `tap_element` | Mobile | Auf ein Element oder Bildschirmkoordinaten tippen |
| `swipe` | Mobile | Wischgeste in eine Richtung |
| `drag_and_drop` | Mobile | Zwischen Elementen oder Koordinaten ziehen |
| `get_contexts` | Mobile | Verfügbare Native-/WebView-Kontexte auflisten |
| `switch_context` | Mobile | Zwischen Native- und WebView-Kontexten wechseln |
| `rotate_device` | Mobile | In Hoch- oder Querformat drehen |
| `hide_keyboard` | Mobile | Die Software-Tastatur ausblenden |
| `set_geolocation` | alle | GPS-Koordinaten des Geräts überschreiben |
| `get_app_state` | Mobile | Lebenszyklus-Status der App abrufen |
| `list_apps` | Cloud | Hochgeladene Apps auflisten (BrowserStack, Sauce Labs, TestMu, TestingBot) |
| `upload_app` | Cloud | Eine `.apk`/`.ipa` zu einem Cloud-Anbieter hochladen |

## MCP-Ressourcen

Zusätzlich zu den Tools stellt der Server den Live-Session-Status als MCP-Ressourcen bereit. Siehe [Ressourcen](./mcp/resources) für die vollständige Referenz.

| Ressourcen-URI | Beschreibung |
|-------------|-------------|
| `wdio://sessions` | Index aller Sessions |
| `wdio://session/current/elements` | Interagierbare Elemente (gegenüber Screenshot bevorzugen) |
| `wdio://session/current/screenshot` | Screenshot als base64 |
| `wdio://session/current/accessibility` | Accessibility Tree |
| `wdio://session/current/cookies` | Browser-Cookies |
| `wdio://session/current/tabs` | Geöffnete Browser-Tabs |
| `wdio://session/current/contexts` | Verfügbare mobile Kontexte |
| `wdio://session/current/context` | Aktiver mobiler Kontext |
| `wdio://session/current/app-state/{bundleId}` | Lebenszyklus-Status der mobilen App |
| `wdio://session/current/geolocation` | Aktuelle GPS-Überschreibung |
| `wdio://session/current/logs` | Session-Logs (Browser-Konsole, logcat, crashlog) |
| `wdio://session/current/capabilities` | Rohe WebDriver-Capabilities |
| `wdio://session/current/code` | Generiertes WebdriverIO-JS |
| `wdio://session/current/steps` | Schrittprotokoll der Session |
| `wdio://session/{sessionId}/code` | Generiertes JS für vergangene Session |
| `wdio://session/{sessionId}/steps` | Schritte für vergangene Session |
| `wdio://browserstack/local-binary` | Einrichtungsanweisungen für BrowserStack Local |
| `wdio://saucelabs/local-binary` | Einrichtungsanweisungen für Sauce Connect Proxy |
| `wdio://testmu/local-binary` | Einrichtungsanweisungen für TestMu Tunnel |
| `wdio://testingbot/local-binary` | Einrichtungsanweisungen für TestingBot Tunnel |

## Automatische Behandlung

### Berechtigungen

Standardmäßig erteilt der MCP-Server App-Berechtigungen automatisch (`autoGrantPermissions: true`), sodass Berechtigungsdialoge während der Automatisierung nicht manuell behandelt werden müssen.

### System-Alerts

System-Alerts (wie „Benachrichtigungen erlauben?") werden standardmäßig automatisch akzeptiert (`autoAcceptAlerts: true`). Dies kann so konfiguriert werden, dass sie stattdessen mit `autoDismissAlerts: true` abgelehnt werden.

## Transport

Standardmäßig läuft der Server über **stdio** (vom KI-Client als Unterprozess gestartet). Für Clients, die kein unterprozessbasiertes MCP unterstützen (llama.cpp, Codex Secure Mode), verwenden Sie den **HTTP-Transport**:

```bash
npx @wdio/mcp --http --port 3000
```

Siehe [Transport](./mcp/transport) für alle Optionen, einschließlich `--allowedHosts` und `--allowedOrigins`.

## Performance-Optimierung

Der MCP-Server ist für eine effiziente Kommunikation mit KI-Assistenten optimiert:

-   **TOON-Format**: Verwendet die Token-Oriented Object Notation für minimalen Token-Verbrauch
-   **XML-Parsing**: Die mobile Elementerkennung verwendet 2 HTTP-Aufrufe (vs. 600+ herkömmlich)
-   **Screenshot-Komprimierung**: Bilder werden automatisch auf maximal 1MB komprimiert
-   **Viewport-Filterung**: Standardmäßig werden nur sichtbare Elemente zurückgegeben
-   **Paginierung**: Große Elementlisten können paginiert werden, um die Antwortgröße zu reduzieren

## Fehlerbehandlung

Alle Tools sind mit einer robusten Fehlerbehandlung ausgestattet:

-   Fehler werden als Textinhalt zurückgegeben (niemals geworfen), wodurch die Stabilität des MCP-Protokolls erhalten bleibt
-   Aussagekräftige Fehlermeldungen helfen bei der Diagnose von Problemen
-   Der Session-Status bleibt erhalten, auch wenn einzelne Operationen fehlschlagen

## Anwendungsfälle

### Qualitätssicherung

-   KI-gestützte Ausführung von Testfällen
-   Visuelle Regressionstests mit Screenshots
-   Barrierefreiheitsprüfung durch Analyse des Accessibility Trees

### Web Scraping & Datenextraktion

-   Durch komplexe mehrseitige Abläufe navigieren
-   Strukturierte Daten aus dynamischen Inhalten extrahieren
-   Authentifizierung und Session-Verwaltung handhaben

### Testen mobiler Apps

-   Plattformübergreifende Testautomatisierung (iOS + Android)
-   Validierung von Onboarding-Abläufen
-   Testen von Deep Linking und Navigation

### Integrationstests

-   End-to-End-Tests von Workflows
-   Überprüfung der API- + UI-Integration
-   Konsistenzprüfungen über mehrere Plattformen

## Fehlerbehebung

### Browser startet nicht

-   Stellen Sie sicher, dass der Zielbrowser installiert ist
-   Prüfen Sie, dass kein anderer Prozess den Standard-Debugging-Port (9222) verwendet
-   Versuchen Sie den Headless-Modus, falls Anzeigeprobleme auftreten

### Appium-Verbindung fehlgeschlagen

-   Überprüfen Sie, ob der Appium-Server läuft (`appium`)
-   Prüfen Sie Appium-Host und -Port in `appiumConfig`
-   Stellen Sie sicher, dass der entsprechende Treiber installiert ist (`appium driver list`)

### Probleme mit dem iOS-Simulator

-   Stellen Sie sicher, dass Xcode installiert und auf dem neuesten Stand ist
-   Prüfen Sie, ob Simulatoren verfügbar sind (`xcrun simctl list devices`)
-   Überprüfen Sie bei echten Geräten, ob die UDID korrekt ist

### Probleme mit dem Android-Emulator

-   Stellen Sie sicher, dass das Android SDK korrekt konfiguriert ist
-   Überprüfen Sie, ob der Emulator läuft (`adb devices`)
-   Prüfen Sie, ob die Umgebungsvariable `ANDROID_HOME` gesetzt ist

## Ressourcen

-   [Tools-Referenz](./mcp/tools) - Vollständige Liste der verfügbaren Tools
-   [Ressourcen-Referenz](./mcp/resources) - MCP-Ressourcen für den Live-Session-Status
-   [Selektoren-Leitfaden](./mcp/selectors) - Dokumentation der Selektor-Syntax
-   [Konfiguration](./mcp/configuration) - Konfigurationsoptionen
-   [Transport](./mcp/transport) - Einrichtung des HTTP-Transports
-   [Cloud-Anbieter](./mcp/cloud-providers) - Cloud-Integration von BrowserStack, Sauce Labs, TestMu und TestingBot
-   [FAQ](./mcp/faq) - Häufig gestellte Fragen
-   [GitHub-Repository](https://github.com/webdriverio/mcp) - Quellcode und Issues
-   [NPM-Paket](https://www.npmjs.com/package/@wdio/mcp) - Paket auf npm
-   [Model Context Protocol](https://modelcontextprotocol.io/) - MCP-Spezifikation