---
id: mcp
title: MCP (Model Context Protocol)
---

## Was kann es tun?

WebdriverIO MCP ist ein **Model Context Protocol (MCP) Server**, der es KI-Assistenten wie Claude Desktop und Claude Code ermöglicht, Webbrowser und mobile Anwendungen zu automatisieren und mit ihnen zu interagieren.

### Warum WebdriverIO MCP?

-   **Mobile-First**: Im Gegensatz zu reinen Browser-MCP-Servern unterstützt WebdriverIO MCP die Automatisierung von iOS- und Android-Apps über Appium
-   **Plattformübergreifende Selektoren**: Intelligente Elementerfassung generiert automatisch mehrere Lokalisierungsstrategien (Accessibility ID, XPath, UiAutomator, iOS Predicates)
-   **WebdriverIO-Ökosystem**: Aufgebaut auf dem bewährten WebdriverIO-Framework mit seinem reichhaltigen Ökosystem an Services und Reportern

Es bietet eine einheitliche Schnittstelle für:

-   🖥️ **Desktop-Browser** (Chrome - im sichtbaren oder Headless-Modus)
-   📱 **Native Mobile Apps** (iOS-Simulatoren / Android-Emulatoren / Echte Geräte über Appium)
-   📳 **Hybride Mobile Apps** (Wechsel zwischen nativem und WebView-Kontext über Appium)

über das [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp) Paket.

Dies ermöglicht KI-Assistenten:

-   **Browser zu starten und zu steuern** mit konfigurierbaren Abmessungen, Headless-Modus und optionaler initialer Navigation
-   **Websites zu navigieren** und mit Elementen zu interagieren (Klicken, Tippen, Scrollen)
-   **Seiteninhalt zu analysieren** über Accessibility-Tree und Erkennung sichtbarer Elemente mit Paginierungsunterstützung
-   **Screenshots zu erstellen**, die automatisch optimiert werden (angepasste Größe, komprimiert auf max. 1MB)
-   **Cookies zu verwalten** für Session-Handling
-   **Mobile Geräte zu steuern** einschließlich Gesten (Tippen, Wischen, Drag and Drop)
-   **Kontexte zu wechseln** in Hybrid-Apps zwischen nativem und WebView-Kontext
-   **Skripte auszuführen** - JavaScript in Browsern, Appium mobile Befehle auf Geräten
-   **Gerätefunktionen zu verwalten** wie Rotation, Tastatur, Geolokalisierung
-   und vieles mehr, siehe die [Tools](./mcp/tools) und [Konfigurationsmöglichkeiten](./mcp/configuration)

:::info

HINWEIS für Mobile Apps
Mobile Automatisierung erfordert einen laufenden Appium-Server mit den entsprechenden Treibern. Siehe [Voraussetzungen](#prerequisites) für Installationsanweisungen.

:::

## Installation

Der einfachste Weg, `@wdio/mcp` zu nutzen, ist über npx ohne lokale Installation:

```sh
npx @wdio/mcp
```

Oder installieren Sie es global:

```sh
npm install -g @wdio/mcp
```

## Verwendung mit Claude

Um WebdriverIO MCP mit Claude zu verwenden, modifizieren Sie die Konfigurationsdatei:

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

Nach dem Hinzufügen der Konfiguration starten Sie Claude neu. Die WebdriverIO MCP-Tools werden für Browser- und mobile Automatisierungsaufgaben verfügbar sein.

### Verwendung mit Claude Code

Claude Code erkennt MCP-Server automatisch. Sie können ihn in der `.claude/settings.json` oder `.mcp.json` Ihres Projekts konfigurieren.

Oder fügen Sie ihn global in .claude.json hinzu, indem Sie ausführen:
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
Überprüfen Sie es, indem Sie den Befehl `/mcp` in Claude Code ausführen.

## Schnellstart-Beispiele

### Browser-Automatisierung

Bitten Sie Claude, Browser-Aufgaben zu automatisieren:

```
"Öffne Chrome und navigiere zu https://webdriver.io"
"Klicke auf den 'Get Started' Button"
"Mache einen Screenshot der Seite"
"Finde alle sichtbaren Links auf der Seite"
```

### Mobile App-Automatisierung

Bitten Sie Claude, mobile Apps zu automatisieren:

```
"Starte meine iOS-App auf dem iPhone 15 Simulator"
"Tippe auf den Login-Button"
"Wische nach oben, um nach unten zu scrollen"
"Mache einen Screenshot des aktuellen Bildschirms"
```

## Fähigkeiten

### Browser-Automatisierung (Chrome)

| Funktion | Beschreibung |
|---------|-------------|
| **Session-Management** | Chrome im sichtbaren/Headless-Modus mit benutzerdefinierten Abmessungen und optionaler Navigations-URL starten |
| **Navigation** | Zu URLs navigieren |
| **Element-Interaktion** | Elemente anklicken, Text eingeben, Elemente mit verschiedenen Selektoren finden |
| **Seitenanalyse** | Sichtbare Elemente abrufen (mit Paginierung), Accessibility-Tree (mit Filterung) |
| **Screenshots** | Screenshots aufnehmen (automatisch optimiert auf max. 1MB) |
| **Scrollen** | Nach oben/unten scrollen mit konfigurierbaren Pixelwerten |
| **Cookie-Management** | Cookies abrufen, setzen und löschen |
| **Skriptausführung** | Benutzerdefiniertes JavaScript im Browser-Kontext ausführen |

### Mobile App-Automatisierung (iOS/Android)

| Funktion | Beschreibung |
|---------|-------------|
| **Session-Management** | Apps auf Simulatoren, Emulatoren oder echten Geräten starten |
| **Touch-Gesten** | Tippen, Wischen, Ziehen und Ablegen |
| **Element-Erkennung** | Intelligente Elementerkennung mit mehreren Lokalisierungsstrategien und Paginierung |
| **App-Lebenszyklus** | App-Status abrufen (über `execute_script` für Aktivieren/Beenden) |
| **Kontextwechsel** | Zwischen nativem und WebView-Kontext in Hybrid-Apps wechseln |
| **Gerätesteuerung** | Gerät drehen, Tastatursteuerung |
| **Geolokalisierung** | GPS-Koordinaten des Geräts abrufen und setzen |
| **Berechtigungen** | Automatisches Berechtigungs- und Benachrichtigungshandling |
| **Skriptausführung** | Appium mobile Befehle ausführen (pressKey, deepLink, shell, etc.) |

## Voraussetzungen

### Browser-Automatisierung

-   **Chrome** muss auf Ihrem System installiert sein
-   WebdriverIO übernimmt die automatische ChromeDriver-Verwaltung

### Mobile Automatisierung

#### iOS

1. **Xcode installieren** aus dem Mac App Store
2. **Xcode Command Line Tools installieren**:
   ```sh
   xcode-select --install
   ```
3. **Appium installieren**:
   ```sh
   npm install -g appium
   ```
4. **XCUITest-Treiber installieren**:
   ```sh
   appium driver install xcuitest
   ```
5. **Appium-Server starten**:
   ```sh
   appium
   ```
6. **Für Simulatoren**: Xcode öffnen → Fenster → Geräte und Simulatoren, um Simulatoren zu erstellen/verwalten
7. **Für echte Geräte**: Sie benötigen die UDID des Geräts (40-stellige eindeutige Kennung)

#### Android

1. **Android Studio installieren** und Android SDK einrichten
2. **Umgebungsvariablen setzen**:
   ```sh
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. **Appium installieren**:
   ```sh
   npm install -g appium
   ```
4. **UiAutomator2-Treiber installieren**:
   ```sh
   appium driver install uiautomator2
   ```
5. **Appium-Server starten**:
   ```sh
   appium
   ```
6. **Emulator erstellen** über Android Studio → Virtual Device Manager
7. **Emulator starten** vor dem Ausführen von Tests

## Architektur

### Wie es funktioniert

WebdriverIO MCP fungiert als Brücke zwischen KI-Assistenten und Browser-/Mobilgerät-Automatisierung:

```
┌─────────────────┐     MCP Protocol      ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  or Claude Code │      (stdio)          │     Server      │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             WebDriverIO API
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Chrome     │             │    Appium     │             │    Appium     │
            │   (Browser)   │             │     (iOS)     │             │   (Android)   │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### Session-Management

-   **Einzel-Session-Modell**: Nur eine Browser- ODER App-Session kann gleichzeitig aktiv sein
-   **Session-Status** wird global über Tool-Aufrufe hinweg beibehalten
-   **Auto-Detach**: Sessions mit bewahrtem Status (`noReset: true`) trennen sich beim Schließen automatisch

### Element-Erkennung

#### Browser (Web)

-   Verwendet ein optimiertes Browser-Skript, um alle sichtbaren, interagierbaren Elemente zu finden
-   Gibt Elemente mit CSS-Selektoren, IDs, Klassen und ARIA-Informationen zurück
-   Filtert standardmäßig auf im Viewport sichtbare Elemente

#### Mobile (Native Apps)

-   Verwendet effiziente XML-Quellcode-Analyse (2 HTTP-Aufrufe vs. 600+ für traditionelle Abfragen)
-   Plattformspezifische Elementklassifizierung für Android und iOS
-   Generiert mehrere Lokalisierungsstrategien pro Element:
    -   Accessibility ID (plattformübergreifend, am stabilsten)
    -   Resource ID / Name-Attribut
    -   Text- / Label-Übereinstimmung
    -   XPath (vollständig und vereinfacht)
    -   UiAutomator (Android) / Predicates (iOS)

## Selektor-Syntax

Der MCP-Server unterstützt mehrere Selektor-Strategien. Siehe [Selektoren](./mcp/selectors) für detaillierte Dokumentation.

### Web (CSS/XPath)

```
# CSS Selectors
button.my-class
#element-id
[data-testid="login"]

# XPath
//button[@class='submit']
//a[contains(text(), 'Click')]

# Text Selectors (WebdriverIO specific)
button=Exact Button Text
a*=Partial Link Text
```

### Mobile (Plattformübergreifend)

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

Der MCP-Server bietet 25 Tools für Browser- und Mobile-Automatisierung. Siehe [Tools](./mcp/tools) für die vollständige Referenz.

### Browser-Tools

| Tool | Beschreibung |
|------|-------------|
| `start_browser` | Chrome-Browser starten (mit optionaler Start-URL) |
| `close_session` | Session schließen oder trennen |
| `navigate` | Zu einer URL navigieren |
| `click_element` | Element anklicken |
| `set_value` | Text in Eingabefeld eingeben |
| `get_visible_elements` | Sichtbare/interagierbare Elemente abrufen (mit Paginierung) |
| `get_accessibility` | Accessibility-Tree abrufen (mit Filterung) |
| `take_screenshot` | Screenshot aufnehmen (automatisch optimiert) |
| `scroll` | Seite nach oben oder unten scrollen |
| `get_cookies` / `set_cookie` / `delete_cookies` | Cookie-Verwaltung |
| `execute_script` | JavaScript im Browser ausführen |

### Mobile Tools

| Tool | Beschreibung |
|------|-------------|
| `start_app_session` | iOS/Android-App starten |
| `tap_element` | Element oder Koordinaten antippen |
| `swipe` | In eine Richtung wischen |
| `drag_and_drop` | Zwischen Positionen ziehen |
| `get_app_state` | Prüfen, ob App läuft |
| `get_contexts` / `switch_context` | Kontextwechsel in Hybrid-Apps |
| `rotate_device` | In Hochformat/Querformat drehen |
| `get_geolocation` / `set_geolocation` | GPS-Koordinaten abrufen oder setzen |
| `hide_keyboard` | Bildschirmtastatur ausblenden |
| `execute_script` | Appium mobile Befehle ausführen |

## Automatisches Handling

### Berechtigungen

Standardmäßig gewährt der MCP-Server automatisch App-Berechtigungen (`autoGrantPermissions: true`), wodurch die manuelle Behandlung von Berechtigungsdialogen während der Automatisierung entfällt.

### System-Benachrichtigungen

System-Benachrichtigungen (wie "Benachrichtigungen zulassen?") werden standardmäßig automatisch akzeptiert (`autoAcceptAlerts: true`). Dies kann mit `autoDismissAlerts: true` konfiguriert werden, um stattdessen Benachrichtigungen abzulehnen.

## Konfiguration

### Umgebungsvariablen

Konfigurieren Sie die Appium-Server-Verbindung:

| Variable | Standard | Beschreibung |
|----------|---------|-------------|
| `APPIUM_URL` | `127.0.0.1` | Appium-Server-Hostname |
| `APPIUM_URL_PORT` | `4723` | Appium-Server-Port |
| `APPIUM_PATH` | `/` | Appium-Server-Pfad |

### Beispiel mit benutzerdefiniertem Appium-Server

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724"
            }
        }
    }
}
```

## Leistungsoptimierung

Der MCP-Server ist für effiziente KI-Assistenten-Kommunikation optimiert:

-   **TOON-Format**: Verwendet Token-Oriented Object Notation für minimale Token-Nutzung
-   **XML-Analyse**: Mobile Elementerkennung verwendet 2 HTTP-Aufrufe (vs. traditionell 600+)
-   **Screenshot-Komprimierung**: Bilder werden automatisch auf max. 1MB mit Sharp komprimiert
-   **Viewport-Filterung**: Standardmäßig werden nur sichtbare Elemente zurückgegeben
-   **Paginierung**: Große Elementlisten können paginiert werden, um die Antwortgröße zu reduzieren

## TypeScript-Unterstützung

Der MCP-Server ist in TypeScript geschrieben und enthält vollständige Typdefinitionen. Wenn Sie den Server programmatisch erweitern oder integrieren, profitieren Sie von Auto-Vervollständigung und Typsicherheit.

## Fehlerbehandlung

Alle Tools sind mit robuster Fehlerbehandlung konzipiert:

-   Fehler werden als Textinhalt zurückgegeben (niemals geworfen), um die MCP-Protokollstabilität aufrechtzuerhalten
-   Beschreibende Fehlermeldungen helfen bei der Diagnose von Problemen
-   Der Session-Status bleibt erhalten, auch wenn einzelne Operationen fehlschlagen

## Anwendungsfälle

### Qualitätssicherung

-   KI-gestützte Testfallausführung
-   Visuelle Regressionstests mit Screenshots
-   Zugänglichkeitsprüfung über Accessibility-Tree-Analyse

### Web-Scraping & Datenextraktion

-   Komplexe mehrseitige Abläufe navigieren
-   Strukturierte Daten aus dynamischen Inhalten extrahieren
-   Authentifizierung und Session-Management verwalten

### Mobile App-Tests

-   Plattformübergreifende Testautomatisierung (iOS + Android)
-   Validierung des Onboarding-Prozesses
-   Deep-Linking- und Navigationstest

### Integrationstests

-   End-to-End-Workflow-Tests
-   API + UI-Integrationsverifikation
-   Plattformübergreifende Konsistenzprüfungen

## Fehlerbehebung

### Browser startet nicht

-   Stellen Sie sicher, dass Chrome installiert ist
-   Überprüfen Sie, dass kein anderer Prozess den Standard-Debug-Port (9222) verwendet
-   Versuchen Sie den Headless-Modus, wenn Anzeigeprobleme auftreten

### Appium-Verbindung fehlgeschlagen

-   Überprüfen Sie, ob der Appium-Server läuft (`appium`)
-   Kontrollieren Sie die Appium-URL und Port-Konfiguration
-   Stellen Sie sicher, dass der entsprechende Treiber installiert ist (`appium driver list`)

### iOS-Simulator-Probleme

-   Stellen Sie sicher, dass Xcode installiert und aktuell ist
-   Prüfen Sie, ob Simulatoren verfügbar sind (`xcrun simctl list devices`)
-   Bei echten Geräten überprüfen Sie, ob die UDID korrekt ist

### Android-Emulator-Probleme

-   Stellen Sie sicher, dass das Android SDK korrekt konfiguriert ist
-   Überprüfen Sie, ob der Emulator läuft (`adb devices`)
-   Prüfen Sie, ob die Umgebungsvariable `ANDROID_HOME` gesetzt ist

## Ressourcen

-   [Tools-Referenz](./mcp/tools) - Vollständige Liste verfügbarer Tools
-   [Selektoren-Guide](./mcp/selectors) - Selektor-Syntax-Dokumentation
-   [Konfiguration](./mcp/configuration) - Konfigurationsoptionen
-   [FAQ](./mcp/faq) - Häufig gestellte Fragen
-   [GitHub-Repository](https://github.com/webdriverio/mcp) - Quellcode und Issues
-   [NPM-Paket](https://www.npmjs.com/package/@wdio/mcp) - Paket auf npm
-   [Model Context Protocol](https://modelcontextprotocol.io/) - MCP-Spezifikation