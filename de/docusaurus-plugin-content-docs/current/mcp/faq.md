---
id: faq
title: FAQ
description: "Finden Sie Antworten auf häufige Fragen zur Installation, Nutzung und Fehlerbehebung des WebdriverIO MCP-Servers für Browser- und Mobile-Automatisierung."
---

Häufig gestellte Fragen zu WebdriverIO MCP.

## Allgemein

### Was ist MCP?

MCP (Model Context Protocol) ist ein offenes Protokoll, das es KI-Assistenten wie Claude ermöglicht, mit externen Tools und Diensten zu interagieren. WebdriverIO MCP implementiert dieses Protokoll, um Claude Desktop und Claude Code Funktionen zur Browser- und Mobile-Automatisierung bereitzustellen.

### Was kann ich mit WebdriverIO MCP automatisieren?

Sie können Folgendes automatisieren:
-   **Desktop-Browser** (Chrome, Firefox, Edge, Safari) - Navigation, Klicken, Tippen, Screenshots
-   **iOS-Apps** - auf Simulatoren oder echten Geräten
-   **Android-Apps** - auf Emulatoren oder echten Geräten
-   **Hybrid-Apps** - Wechsel zwischen nativen und Web-Kontexten
-   **Cloud-Geräte** - über die Geräte-Clouds von BrowserStack, Sauce Labs, TestMu und TestingBot

### Muss ich Code schreiben?

Nein! Das ist der Hauptvorteil von MCP. Sie können in natürlicher Sprache beschreiben, was Sie tun möchten, und Claude verwendet die passenden Tools, um die Aufgabe zu erledigen.

**Beispiel-Prompts:**
-   "Öffne Chrome und navigiere zu webdriver.io"
-   "Klicke auf den Get Started-Button"
-   "Mache einen Screenshot der aktuellen Seite"
-   "Starte meine iOS-App und melde dich als Testbenutzer an"

## Installation & Einrichtung

### Wie installiere ich WebdriverIO MCP?

Sie müssen es nicht separat installieren. Der MCP-Server wird automatisch über npx ausgeführt, wenn Sie ihn in Ihrem Harness konfigurieren. Fügen Sie Folgendes zu Ihrer Konfiguration hinzu:

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

### Wo befindet sich die Konfigurationsdatei von Claude Desktop?

-   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
-   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### Benötige ich Appium für die Browser-Automatisierung?

Nein. Für die Browser-Automatisierung muss lediglich der Zielbrowser installiert sein. WebdriverIO übernimmt die Treiberverwaltung automatisch.

### Benötige ich Appium für die Mobile-Automatisierung?

Ja. Die Mobile-Automatisierung erfordert:
1. Einen laufenden Appium-Server (`npm install -g appium && appium`)
2. Installierte Plattformtreiber (`appium driver install xcuitest` für iOS, `appium driver install uiautomator2` für Android)
3. Passende Entwicklungstools (Xcode für iOS, Android SDK für Android)

## Browser-Automatisierung

### Welche Browser werden unterstützt?

Chrome, Firefox, Edge und Safari werden alle unterstützt. Verwenden Sie den Parameter `browser` in `start_session`:

```text
"Start a Firefox session"
"Start Chrome in headless mode"
```

### Kann ich den Browser im Headless-Modus ausführen?

Ja. Headless ist die Standardeinstellung (`headless: true`). Bitten Sie Claude, den Browser im Headed-Modus auszuführen, wenn Sie ihn sehen möchten:

"Starte Chrome im Headed-Modus (nicht headless)"

### Kann ich die Größe des Browserfensters festlegen?

Ja. Sie können beim Starten des Browsers Abmessungen angeben:

"Starte Chrome mit einer Fenstergröße von 1920x1080"

Unterstützte Abmessungen: 400–3840 Pixel Breite, 400–2160 Pixel Höhe. Standard ist 1920×1080.

### Kann ich den Browser in einem Schritt starten und navigieren?

Ja! Verwenden Sie den Parameter `navigationUrl`:

"Starte Chrome und navigiere zu https://webdriver.io"

Das ist effizienter, als den Browser zu starten und anschließend separat zu navigieren.

### Wie mache ich Screenshots?

Fragen Sie einfach:

"Mache einen Screenshot der aktuellen Seite"

Screenshots werden automatisch optimiert:
- Skaliert auf maximal 2000px Kantenlänge
- Komprimiert auf maximal 1MB Dateigröße
- Format: PNG oder JPEG (automatisch für optimale Qualität ausgewählt)

### Kann ich mit iframes interagieren?

Ja. Verwenden Sie das Tool `switch_frame`, um per CSS- oder XPath-Selektor in einen iframe zu wechseln. Alle nachfolgenden Aufrufe von `click_element`, `set_value` und `get_elements` werden innerhalb des gewechselten Frames ausgeführt. Lassen Sie den Selektor weg, um zum Frame der obersten Ebene zurückzukehren. iframes müssen denselben Ursprung wie die Hauptseite haben.

### Kann ich benutzerdefiniertes JavaScript ausführen?

Ja! Verwenden Sie das Tool `execute_script`:

"Führe ein Skript aus, um den Seitentitel abzurufen"
"Führe Skript aus: return document.querySelectorAll('button').length"

### Kann ich mich an eine bestehende Chrome-Sitzung anhängen?

Ja. Verwenden Sie zuerst `launch_chrome` (öffnet Chrome mit Remote-Debugging) und anschließend `start_session` mit `attach: true`.

"Starte Chrome mit Remote-Debugging und hänge dich dann daran an"

### Kann ich mit mehreren Tabs arbeiten?

Ja. Verwenden Sie `get_tabs`, um geöffnete Tabs aufzulisten, und `switch_tab`, um einen bestimmten Tab zu fokussieren:

"Rufe alle geöffneten Tabs ab"
"Wechsle zum Tab mit Index 1"

## Mobile-Automatisierung

### Wie starte ich eine iOS- oder Android-Sitzung?

Verwenden Sie `start_session` mit der entsprechenden Plattform:

"Starte meine iOS-App unter /path/to/MyApp.app auf dem iPhone 15-Simulator"

"Starte meine Android-App unter /path/to/app.apk auf dem Pixel 7-Emulator"

Oder für eine bereits installierte App:

"Starte die App mit aktiviertem noReset auf dem iPhone 15-Simulator"

### Kann ich auf echten Geräten testen?

Ja! Für echte Geräte benötigen Sie die UDID des Geräts:

-   **iOS:** Gerät verbinden, Finder öffnen, auf das Gerät klicken, auf die Seriennummer klicken, um die UDID anzuzeigen
-   **Android:** `adb devices` im Terminal ausführen

Fragen Sie dann:

"Starte meine iOS-App auf dem echten Gerät mit der UDID abc123..."

### Wie gehe ich mit Berechtigungsdialogen um?

Standardmäßig werden Berechtigungen automatisch erteilt (`autoGrantPermissions: true`). Wenn Sie Berechtigungsabläufe testen müssen, können Sie dies deaktivieren:

"Starte meine App, ohne Berechtigungen automatisch zu erteilen"

### Welche Gesten werden unterstützt?

-   **Tippen:** Auf Elemente oder Koordinaten tippen (`tap_element`)
-   **Wischen:** Nach oben, unten, links oder rechts wischen (`swipe`)
-   **Drag and Drop:** Von einem Element zu einem anderen oder zu Koordinaten ziehen (`drag_and_drop`)

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

Bei Apps mit Webviews können Sie den Kontext wechseln:

"Rufe die verfügbaren Kontexte ab"
"Wechsle zum Webview-Kontext"
"Wechsle zurück zum nativen Kontext"

### Kann ich Appium-Mobile-Befehle ausführen?

Ja! Verwenden Sie das Tool `execute_script`:

```text
Execute script "mobile: pressKey" with args [{ keycode: 4 }]  // Drückt BACK auf Android
Execute script "mobile: activateApp" with args [{ bundleId: "com.example.app" }]
Execute script "mobile: terminateApp" with args [{ bundleId: "com.example.app" }]
```

## Elementauswahl

### Woher weiß der KI-Assistent, mit welchem Element er interagieren soll?

Er verwendet die Ressource `wdio://session/current/elements` oder das Tool `get_elements`, um interaktive Elemente auf der Seite bzw. dem Bildschirm zu identifizieren. Jedes Element wird mit sofort verwendbaren Selektoren geliefert.

### Was ist, wenn sich zu viele Elemente auf der Seite befinden?

Verwenden Sie Paginierung, um große Elementlisten zu verwalten:

"Rufe die ersten 20 Elemente ab"
"Rufe Elemente mit Offset 20 und Limit 20 ab"

Die Antwort enthält `total`, `showing` und `hasMore`, um die Navigation durch die Elemente zu erleichtern.

### Was ist, wenn Claude auf das falsche Element klickt?

Sie können genauer sein:

-   Exakten Text angeben: "Klicke auf den Button mit der Aufschrift 'Submit Order'"
-   Selektor angeben: "Klicke auf das Element mit dem Selektor #submit-btn"
-   Accessibility ID angeben: "Klicke auf das Element mit der Accessibility ID loginButton"

### Was ist die beste Selektorstrategie für Mobile?

1. **Accessibility ID** (am besten) - `~loginButton`
2. **Resource ID** (Android) - `id=login_button`
3. **Predicate String** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (letzter Ausweg) - langsamer, funktioniert aber überall

### Was ist der Accessibility Tree und wann sollte ich ihn verwenden?

Der Accessibility Tree liefert semantische Informationen über Seitenelemente (Rollen, Namen, Zustände). Verwenden Sie `get_accessibility_tree`, wenn:
- `get_elements` nicht die erwarteten Elemente zurückgibt
- Sie Elemente anhand ihrer Accessibility-Rolle finden müssen (button, link, textbox usw.)
- Sie detaillierte semantische Informationen über Elemente benötigen

"Rufe den Accessibility Tree gefiltert nach den Rollen button und link ab"

## Sitzungsverwaltung

### Kann ich mehrere Sitzungen gleichzeitig haben?

Nein. Der MCP-Server verwendet ein Einzelsitzungsmodell. Es kann immer nur eine Browser- oder App-Sitzung gleichzeitig aktiv sein.

### Was passiert, wenn ich eine Sitzung schließe?

Das hängt vom Sitzungstyp und den Einstellungen ab:

-   **Browser:** Der Browser wird vollständig geschlossen
-   **Mobile mit `noReset: false`:** Die App wird beendet
-   **Mobile mit `noReset: true` oder ohne `appPath`:** Die App bleibt geöffnet (die Sitzung wird automatisch getrennt)

### Kann ich den App-Zustand zwischen Sitzungen beibehalten?

Ja! Verwenden Sie die Option `noReset`:

"Starte meine App mit aktiviertem noReset"

Dadurch bleiben Anmeldestatus, Einstellungen und andere App-Daten erhalten.

### Was ist der Unterschied zwischen Schließen und Trennen?

-   **Schließen (Close):** Beendet den Browser bzw. die App vollständig
-   **Trennen (Detach):** Trennt die Automatisierung, lässt den Browser bzw. die App aber weiterlaufen

Trennen ist nützlich, wenn Sie den Zustand nach der Automatisierung manuell überprüfen möchten.

### Meine Sitzung läuft beim Debuggen ständig ab

Erhöhen Sie das Befehls-Timeout:

"Starte meine App mit einem newCommandTimeout von 300 Sekunden"

Der Standardwert beträgt 300 Sekunden. Für sehr lange Debugging-Sitzungen versuchen Sie 600 Sekunden.

## Fehlerbehebung

### Fehler "Session not found"

Das bedeutet, dass keine aktive Sitzung existiert. Starten Sie zuerst eine Browser- oder App-Sitzung:

"Starte Chrome und navigiere zu google.com"

### Fehler "Element not found"

Das Element ist möglicherweise nicht sichtbar oder hat einen anderen Selektor. Versuchen Sie Folgendes:

1. Bitten Sie Claude, zuerst alle sichtbaren Elemente abzurufen
2. Geben Sie einen spezifischeren Selektor an
3. Warten Sie, bis die Seite bzw. App vollständig geladen ist
4. Verwenden Sie `inViewportOnly: false`, um Elemente außerhalb des sichtbaren Bereichs zu finden

### Browser startet nicht

1. Stellen Sie sicher, dass der Zielbrowser installiert ist
2. Prüfen Sie, ob ein anderer Prozess den Debugging-Port (9222) verwendet
3. Versuchen Sie den Headless-Modus

### Appium-Verbindung fehlgeschlagen

Dies ist das häufigste Problem beim Start der Mobile-Automatisierung.

1. **Prüfen Sie, ob Appium läuft**: `curl http://localhost:4723/status`
2. Starten Sie Appium bei Bedarf: `appium`
3. Prüfen Sie, ob Ihre Appium-Verbindung mit dem Server übereinstimmt (verwenden Sie `appiumConfig` in `start_session`)
4. Stellen Sie sicher, dass die Treiber installiert sind: `appium driver list --installed`

:::tip
Der MCP-Server erfordert, dass Appium läuft, bevor mobile Sitzungen gestartet werden. Stellen Sie sicher, dass Sie Appium zuerst starten:
```sh
appium
```
Zukünftige Versionen könnten eine automatische Verwaltung des Appium-Dienstes enthalten.
:::

### iOS-Simulator startet nicht

1. Stellen Sie sicher, dass Xcode installiert ist: `xcode-select --install`
2. Listen Sie verfügbare Simulatoren auf: `xcrun simctl list devices`
3. Suchen Sie in Console.app nach spezifischen Simulatorfehlern

### Android-Emulator startet nicht

1. Setzen Sie `ANDROID_HOME`: `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. Prüfen Sie die Emulatoren: `emulator -list-avds`
3. Starten Sie den Emulator manuell: `emulator -avd <avd-name>`
4. Prüfen Sie, ob das Gerät verbunden ist: `adb devices`

### Screenshots funktionieren nicht

1. Stellen Sie bei Mobile sicher, dass die Sitzung aktiv ist
2. Versuchen Sie beim Browser eine andere Seite (manche Seiten blockieren Screenshots)
3. Prüfen Sie die Logs von Claude Desktop auf Fehler

Screenshots werden automatisch auf maximal 1MB komprimiert, sodass große Screenshots funktionieren, aber möglicherweise eine geringere Qualität aufweisen.

## Performance

### Warum ist die Mobile-Automatisierung langsam?

Die Mobile-Automatisierung umfasst:
1. Netzwerkkommunikation mit dem Appium-Server
2. Kommunikation von Appium mit dem Gerät bzw. Simulator
3. Rendering und Reaktion des Geräts

Tipps für eine schnellere Automatisierung:
-   Verwenden Sie für die Entwicklung Emulatoren/Simulatoren statt echter Geräte
-   Verwenden Sie Accessibility IDs statt XPath
-   Aktivieren Sie `inViewportOnly: true` für die Elementerkennung
-   Verwenden Sie Paginierung (`limit`), um den Token-Verbrauch zu reduzieren

### Wie kann ich die Elementerkennung beschleunigen?

Der MCP-Server optimiert die Elementerkennung bereits durch das Parsen des XML-Page-Source (2 HTTP-Aufrufe gegenüber 600+ bei herkömmlichen Elementabfragen). Weitere Tipps:

-   Setzen Sie `inViewportOnly: true`, um Elemente außerhalb des sichtbaren Bereichs herauszufiltern
-   Setzen Sie `includeContainers: false` (Standard)
-   Verwenden Sie `limit` und `offset` für die Paginierung auf großen Bildschirmen
-   Verwenden Sie spezifische Selektoren, anstatt alle Elemente zu suchen

### Screenshots sind langsam oder schlagen fehl

Screenshots werden automatisch optimiert:
- Verkleinert, wenn sie größer als 2000px sind
- Komprimiert, um unter 1MB zu bleiben
- In JPEG konvertiert, wenn PNG zu groß ist

Diese Optimierung verkürzt die Verarbeitungszeit und stellt sicher, dass Claude das Bild verarbeiten kann.

## Einschränkungen

### Was sind die aktuellen Einschränkungen?

-   **Einzelne Sitzung:** Nur ein Browser bzw. eine App gleichzeitig
-   **iframe-Unterstützung:** iframes mit gleichem Ursprung werden über `switch_frame` unterstützt; Cross-Origin-iframes sind aufgrund von Browser-Sicherheitsbeschränkungen nicht zugänglich
-   **Datei-Uploads:** Werden über Tools nicht direkt unterstützt
-   **Audio/Video:** Keine Interaktion mit der Medienwiedergabe möglich
-   **Browser-Erweiterungen:** Werden nicht unterstützt

### Kann ich dies für Produktionstests verwenden?

WebdriverIO MCP ist für interaktive, KI-gestützte Automatisierung konzipiert. Für Produktionstests in CI/CD sollten Sie den traditionellen Testrunner von WebdriverIO mit vollständiger programmatischer Kontrolle in Betracht ziehen.

## Sicherheit

### Sind meine Daten sicher?

Der MCP-Server läuft lokal auf Ihrem Rechner. Die gesamte Automatisierung erfolgt über lokale Browser- bzw. Appium-Verbindungen. Es werden keine Daten an externe Server gesendet, abgesehen von denen, zu denen Sie explizit navigieren.

Bei Verwendung des HTTP-Transportmodus (`--http`) akzeptiert der Server standardmäßig nur Verbindungen von `localhost`; verwenden Sie `--allowedHosts` und `--allowedOrigins`, um den Zugriff zu steuern. Weitere Details finden Sie unter [Transport](./transport).

### Kann Claude auf meine Passwörter zugreifen?

Claude kann Seiteninhalte sehen und mit Elementen interagieren, aber:
-   Passwörter in `<input type="password">`-Feldern sind maskiert
-   Sie sollten die Automatisierung sensibler Zugangsdaten vermeiden
-   Verwenden Sie Testkonten für die Automatisierung

## Mitwirken

### Wie kann ich mitwirken?

Besuchen Sie das [GitHub-Repository](https://github.com/webdriverio/mcp), um:
-   Fehler zu melden
-   Features anzufragen
-   Pull Requests einzureichen

### Wo erhalte ich Hilfe?

-   [WebdriverIO Discord](https://discord.webdriver.io/)
-   [GitHub Issues](https://github.com/webdriverio/mcp/issues)
-   [WebdriverIO-Dokumentation](https://webdriver.io/)