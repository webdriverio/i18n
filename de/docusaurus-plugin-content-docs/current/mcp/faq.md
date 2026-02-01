---
id: faq
title: FAQ
---

Häufig gestellte Fragen zu WebdriverIO MCP.

## Allgemeines

### Was ist MCP?

MCP (Model Context Protocol) ist ein offenes Protokoll, das KI-Assistenten wie Claude ermöglicht, mit externen Tools und Diensten zu interagieren. WebdriverIO MCP implementiert dieses Protokoll, um Browser- und Mobilautomatisierungsfunktionen für Claude Desktop und Claude Code bereitzustellen.

### Was kann ich mit WebdriverIO MCP automatisieren?

Sie können Folgendes automatisieren:
-   **Desktop-Browser** (Chrome) - Navigation, Klicken, Tippen, Screenshots
-   **iOS-Apps** - auf Simulatoren oder echten Geräten
-   **Android-Apps** - auf Emulatoren oder echten Geräten
-   **Hybrid-Apps** - Wechsel zwischen nativen und Web-Kontexten

### Muss ich Code schreiben?

Nein! Das ist der Hauptvorteil von MCP. Sie können in natürlicher Sprache beschreiben, was Sie tun möchten, und Claude wird die entsprechenden Tools verwenden, um die Aufgabe zu erfüllen.

**Beispiel-Prompts:**
-   "Öffne Chrome und navigiere zu webdriver.io"
-   "Klicke auf den Get Started Button"
-   "Mache einen Screenshot der aktuellen Seite"
-   "Starte meine iOS-App und melde dich als Testbenutzer an"

---

## Installation & Einrichtung

### Wie installiere ich WebdriverIO MCP?

Sie müssen es nicht separat installieren. Der MCP-Server läuft automatisch über npx, wenn Sie ihn in Claude Desktop oder Claude Code konfigurieren.

Fügen Sie dies zu Ihrer Claude Desktop-Konfiguration hinzu:

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

### Wo befindet sich die Claude Desktop-Konfigurationsdatei?

-   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
-   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### Brauche ich Appium für die Browser-Automatisierung?

Nein. Für die Browser-Automatisierung muss nur Chrome installiert sein. WebdriverIO verwaltet den ChromeDriver automatisch.

### Brauche ich Appium für die Mobile-Automatisierung?

Ja. Die Mobile-Automatisierung erfordert:
1. Laufenden Appium-Server (`npm install -g appium && appium`)
2. Installierte Plattform-Treiber (`appium driver install xcuitest` für iOS, `appium driver install uiautomator2` für Android)
3. Geeignete Entwicklungstools (Xcode für iOS, Android SDK für Android)

---

## Browser-Automatisierung

### Welche Browser werden unterstützt?

Derzeit wird nur **Chrome** unterstützt. Unterstützung für andere Browser könnte in zukünftigen Versionen hinzugefügt werden.

### Kann ich Chrome im Headless-Modus ausführen?

Ja! Bitten Sie Claude, den Browser im Headless-Modus zu starten:

"Starte Chrome im Headless-Modus"

Oder Claude wird diese Option verwenden, wenn es angebracht ist (z.B. in CI/CD-Kontexten).

### Kann ich die Größe des Browser-Fensters festlegen?

Ja. Sie können die Abmessungen beim Starten des Browsers angeben:

"Starte Chrome mit einer Fenstergröße von 1920x1080"

Unterstützte Abmessungen: 400-3840 Pixel Breite, 400-2160 Pixel Höhe. Standard ist 1920x1080.

### Kann ich den Browser starten und in einem Schritt navigieren?

Ja! Verwenden Sie den `navigationUrl`-Parameter:

"Starte Chrome und navigiere zu https://webdriver.io"

Dies ist effizienter als den Browser zu starten und dann separat zu navigieren.

### Wie mache ich Screenshots?

Fragen Sie einfach Claude:

"Mache einen Screenshot der aktuellen Seite"

Screenshots werden automatisch optimiert:
- Auf max. 2000px Dimension skaliert
- Auf max. 1MB Dateigröße komprimiert
- Format: PNG oder JPEG (automatisch für optimale Qualität ausgewählt)

### Kann ich mit iframes interagieren?

Derzeit arbeitet der MCP-Server auf dem Hauptdokument. Die Interaktion mit iframes könnte in zukünftigen Versionen hinzugefügt werden.

### Kann ich eigenes JavaScript ausführen?

Ja! Verwenden Sie das `execute_script`-Tool:

"Führe ein Skript aus, um den Seitentitel zu erhalten"
"Führe Skript aus: return document.querySelectorAll('button').length"

---

## Mobile Automatisierung

### Wie starte ich eine iOS-App?

Fragen Sie Claude mit den notwendigen Details:

"Starte meine iOS-App, die sich unter /path/to/MyApp.app auf dem iPhone 15-Simulator befindet"

Oder für eine installierte App:

"Starte die App mit aktiviertem noReset auf dem iPhone 15-Simulator"

### Wie starte ich eine Android-App?

"Starte meine Android-App unter /path/to/app.apk auf dem Pixel 7-Emulator"

Oder für eine installierte App:

"Starte die App mit aktiviertem noReset auf dem Pixel 7-Emulator"

### Kann ich auf echten Geräten testen?

Ja! Für echte Geräte benötigen Sie die UDID des Geräts:

-   **iOS:** Gerät anschließen, Finder öffnen, Gerät anklicken, Seriennummer anklicken, um UDID anzuzeigen
-   **Android:** `adb devices` im Terminal ausführen

Dann fragen Sie Claude:

"Starte meine iOS-App auf dem echten Gerät mit UDID abc123..."

### Wie gehe ich mit Berechtigungsdialogen um?

Standardmäßig werden Berechtigungen automatisch gewährt (`autoGrantPermissions: true`). Wenn Sie Berechtigungsabläufe testen müssen, können Sie dies deaktivieren:

"Starte meine App, ohne automatisch Berechtigungen zu gewähren"

### Welche Gesten werden unterstützt?

-   **Tippen:** Tippen auf Elemente oder Koordinaten
-   **Wischen:** Nach oben, unten, links oder rechts wischen
-   **Drag and Drop:** Von einem Element zu einem anderen oder zu Koordinaten ziehen

Hinweis: `long_press` ist über `execute_script` mit Appium-Mobile-Befehlen verfügbar.

### Wie scrolle ich in mobilen Apps?

Verwenden Sie Wischgesten:

"Wische nach oben, um nach unten zu scrollen"
"Wische nach unten, um nach oben zu scrollen"

### Kann ich das Gerät drehen?

Ja:

"Drehe das Gerät ins Querformat"
"Drehe das Gerät ins Hochformat"

### Wie gehe ich mit Hybrid-Apps um?

Bei Apps mit Webviews können Sie Kontexte wechseln:

"Zeige verfügbare Kontexte an"
"Wechsle zum Webview-Kontext"
"Wechsle zurück zum nativen Kontext"

### Kann ich Appium-Mobile-Befehle ausführen?

Ja! Verwenden Sie das `execute_script`-Tool:

```
Execute script "mobile: pressKey" with args [{ keycode: 4 }]  // Press BACK on Android
Execute script "mobile: activateApp" with args [{ appId: "com.example.app" }]
Execute script "mobile: terminateApp" with args [{ bundleId: "com.example.app" }]
```

---

## Elementauswahl

### Woher weiß Claude, mit welchem Element interagiert werden soll?

Claude verwendet das `get_visible_elements`-Tool, um interaktive Elemente auf der Seite/dem Bildschirm zu identifizieren. Jedes Element kommt mit mehreren Selektorstrategien.

### Was passiert, wenn zu viele Elemente auf der Seite sind?

Verwenden Sie Paginierung, um große Elementlisten zu verwalten:

"Hole die ersten 20 sichtbaren Elemente"
"Hole sichtbare Elemente mit Offset 20 und Limit 20"

Die Antwort enthält `total`, `showing` und `hasMore`, um durch die Elemente zu navigieren.

### Kann ich nur bestimmte Typen von Elementen abrufen?

Ja! Verwenden Sie den `elementType`-Parameter:

-   `interactable` (Standard): Buttons, Links, Eingabefelder
-   `visual`: Bilder, SVGs
-   `all`: Beide Typen

"Hole sichtbare visuelle Elemente auf der Seite"

### Was, wenn Claude auf das falsche Element klickt?

Sie können präziser sein:

-   Geben Sie den genauen Text an: "Klicke auf den Button mit dem Text 'Bestellung abschicken'"
-   Geben Sie den Selektor an: "Klicke auf das Element mit dem Selektor #submit-btn"
-   Geben Sie die Accessibility-ID an: "Klicke auf das Element mit der Accessibility-ID loginButton"

### Was ist die beste Selektorstrategie für mobile Geräte?

1. **Accessibility ID** (am besten) - `~loginButton`
2. **Resource ID** (Android) - `id=login_button`
3. **Predicate String** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (letzter Ausweg) - langsamer, funktioniert aber überall

### Was ist der Accessibility-Baum und wann sollte ich ihn verwenden?

Der Accessibility-Baum bietet semantische Informationen über Seitenelemente (Rollen, Namen, Zustände). Verwenden Sie `get_accessibility`, wenn:
- `get_visible_elements` nicht die erwarteten Elemente zurückgibt
- Sie Elemente nach Accessibility-Rolle (Button, Link, Textbox usw.) finden müssen
- Sie detaillierte semantische Informationen über Elemente benötigen

"Hole Accessibility-Baum gefiltert nach Button- und Link-Rollen"

---

## Session-Management

### Kann ich mehrere Sessions gleichzeitig haben?

Nein. Der MCP-Server verwendet ein Einzel-Session-Modell. Es kann nur eine Browser- oder App-Session gleichzeitig aktiv sein.

### Was passiert, wenn ich eine Session schließe?

Es hängt vom Session-Typ und den Einstellungen ab:

-   **Browser:** Chrome wird vollständig geschlossen
-   **Mobil mit `noReset: false`:** App wird beendet
-   **Mobil mit `noReset: true` oder ohne `appPath`:** App bleibt geöffnet (Session wird automatisch getrennt)

### Kann ich den App-Status zwischen Sessions beibehalten?

Ja! Verwenden Sie die `noReset`-Option:

"Starte meine App mit aktiviertem noReset"

Dies bewahrt Anmeldestatus, Präferenzen und andere App-Daten.

### Was ist der Unterschied zwischen Schließen und Trennen?

-   **Schließen:** Beendet den Browser/die App vollständig
-   **Trennen:** Trennt die Automatisierung, hält aber Browser/App am Laufen

Trennen ist nützlich, wenn Sie den Status nach der Automatisierung manuell überprüfen möchten.

### Meine Session läuft während des Debuggens immer wieder ab

Erhöhen Sie das Befehlstimeout:

"Starte meine App mit newCommandTimeout von 300 Sekunden"

Standard ist 60 Sekunden. Für lange Debugging-Sessions versuchen Sie 300-600 Sekunden.

---

## Fehlerbehebung

### "Session not found"-Fehler

Das bedeutet, dass keine aktive Session existiert. Starten Sie zuerst eine Browser- oder App-Session:

"Starte Chrome und navigiere zu google.com"

### "Element not found"-Fehler

Das Element ist möglicherweise nicht sichtbar oder hat einen anderen Selektor. Versuchen Sie:

1. Claude zuerst bitten, alle sichtbaren Elemente zu holen
2. Einen spezifischeren Selektor anzugeben
3. Zu warten, bis die Seite/App vollständig geladen ist
4. `inViewportOnly: false` zu verwenden, um Elemente außerhalb des sichtbaren Bereichs zu finden

### Browser startet nicht

1. Stellen Sie sicher, dass Chrome installiert ist
2. Prüfen Sie, ob ein anderer Prozess den Debugging-Port (9222) verwendet
3. Versuchen Sie den Headless-Modus

### Appium-Verbindung fehlgeschlagen

Dies ist das häufigste Problem beim Starten der mobilen Automatisierung.

1. **Überprüfen Sie, ob Appium läuft**: `curl http://localhost:4723/status`
2. Starten Sie Appium bei Bedarf: `appium`
3. Prüfen Sie, ob Ihre Appium-URL-Konfiguration mit dem Server übereinstimmt
4. Stellen Sie sicher, dass Treiber installiert sind: `appium driver list --installed`

:::tip
Der MCP-Server erfordert, dass Appium läuft, bevor mobile Sessions gestartet werden. Stellen Sie sicher, dass Sie Appium zuerst starten:
```sh
appium
```
Zukünftige Versionen könnten eine automatische Appium-Service-Verwaltung beinhalten.
:::

### iOS-Simulator startet nicht

1. Stellen Sie sicher, dass Xcode installiert ist: `xcode-select --install`
2. Listen Sie verfügbare Simulatoren auf: `xcrun simctl list devices`
3. Prüfen Sie in Console.app auf spezifische Simulator-Fehler

### Android-Emulator startet nicht

1. Setzen Sie `ANDROID_HOME`: `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. Prüfen Sie Emulatoren: `emulator -list-avds`
3. Starten Sie den Emulator manuell: `emulator -avd <avd-name>`
4. Überprüfen Sie, ob das Gerät verbunden ist: `adb devices`

### Screenshots funktionieren nicht

1. Bei mobilen Geräten: Stellen Sie sicher, dass die Session aktiv ist
2. Bei Browsern: Versuchen Sie eine andere Seite (einige Seiten blockieren Screenshots)
3. Prüfen Sie Claude Desktop-Logs auf Fehler

Screenshots werden automatisch auf maximal 1MB komprimiert, daher funktionieren große Screenshots, können aber eine niedrigere Qualität haben.

---

## Leistung

### Warum ist die mobile Automatisierung langsam?

Mobile Automatisierung beinhaltet:
1. Netzwerkkommunikation mit dem Appium-Server
2. Appium kommuniziert mit dem Gerät/Simulator
3. Geräterendering und -antwort

Tipps für schnellere Automatisierung:
-   Verwenden Sie Emulatoren/Simulatoren statt echter Geräte für die Entwicklung
-   Verwenden Sie Accessibility-IDs statt XPath
-   Aktivieren Sie `inViewportOnly: true` für die Elementerkennung
-   Verwenden Sie Paginierung (`limit`), um den Token-Verbrauch zu reduzieren

### Wie kann ich die Elementerkennung beschleunigen?

Der MCP-Server optimiert bereits die Elementerkennung durch XML-Quelltext-Parsing (2 HTTP-Aufrufe vs. 600+ für traditionelle Elementabfragen). Weitere Tipps:

-   Behalten Sie `inViewportOnly: true` bei (Standard)
-   Setzen Sie `includeContainers: false` (Standard)
-   Verwenden Sie `limit` und `offset` für Paginierung auf großen Bildschirmen
-   Verwenden Sie spezifische Selektoren statt alle Elemente zu finden

### Screenshots sind langsam oder fehlerhaft

Screenshots werden automatisch optimiert:
- Größe angepasst, wenn größer als 2000px
- Komprimiert, um unter 1MB zu bleiben
- Konvertiert zu JPEG, wenn PNG zu groß ist

Diese Optimierung reduziert die Verarbeitungszeit und stellt sicher, dass Claude das Bild verarbeiten kann.

---

## Einschränkungen

### Was sind die aktuellen Einschränkungen?

-   **Einzelne Session:** Nur ein Browser/App gleichzeitig
-   **Browser-Unterstützung:** Nur Chrome (vorerst)
-   **iframe-Unterstützung:** Begrenzte Unterstützung für iframes
-   **Datei-Uploads:** Nicht direkt über Tools unterstützt
-   **Audio/Video:** Keine Interaktion mit Medienwiedergabe
-   **Browser-Erweiterungen:** Nicht unterstützt

### Kann ich dies für Produktionstests verwenden?

WebdriverIO MCP ist für interaktive KI-unterstützte Automatisierung konzipiert. Für Produktions-CI/CD-Tests sollten Sie den traditionellen Test-Runner von WebdriverIO mit voller programmatischer Kontrolle in Betracht ziehen.

---

## Sicherheit

### Sind meine Daten sicher?

Der MCP-Server läuft lokal auf Ihrem Gerät. Die gesamte Automatisierung erfolgt über lokale Browser-/Appium-Verbindungen. Es werden keine Daten an externe Server gesendet, außer zu den Zielen, zu denen Sie explizit navigieren.

### Kann Claude auf meine Passwörter zugreifen?

Claude kann Seiteninhalte sehen und mit Elementen interagieren, aber:
-   Passwörter in `<input type="password">`-Feldern werden maskiert
-   Sie sollten vermeiden, sensible Anmeldeinformationen zu automatisieren
-   Verwenden Sie Testkonten für die Automatisierung

---

## Mitwirken

### Wie kann ich beitragen?

Besuchen Sie das [GitHub-Repository](https://github.com/webdriverio/mcp), um:
-   Fehler zu melden
-   Funktionen anzufordern
-   Pull-Requests einzureichen

### Wo kann ich Hilfe bekommen?

-   [WebdriverIO Discord](https://discord.webdriver.io/)
-   [GitHub Issues](https://github.com/webdriverio/mcp/issues)
-   [WebdriverIO Dokumentation](https://webdriver.io/)