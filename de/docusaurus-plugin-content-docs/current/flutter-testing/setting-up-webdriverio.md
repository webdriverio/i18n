---
id: setting-up-webdriverio
title: WebdriverIO in Ihrer Umgebung einrichten
description: "Konfigurieren Sie wdio.conf.ts und Appium-Capabilities, um eine Flutter-App mit dem Appium Flutter Driver auf Android und iOS zu starten."
---

Die Datei `wdio.conf.ts` ist die zentrale Konfigurationsdatei jedes WebdriverIO-Projekts. Hier legen Sie fest, wo Tests ausgeführt werden, welche Test-Frameworks verwendet werden sollen und welche `capabilities` Appium benötigt, um die Flutter-Anwendung korrekt zu initialisieren.

:::warning
Der `appium-flutter-driver` funktioniert anders als herkömmliche native Treiber (wie `UiAutomator2` oder `XCUITest`). Er kommuniziert über ein angepasstes Protokoll mit der Test-Erweiterung von Flutter (`flutter_driver`). Aus diesem Grund funktionieren standardmäßige native Automatisierungsbefehle möglicherweise nicht auf die gleiche Weise oder erfordern zwingend die Verwendung von `appium-flutter-finder`.

Um die Einschränkungen, unterstützten Befehle und Protokollerweiterungen vollständig zu verstehen, lesen Sie das offizielle Repository des Tools: [Appium Flutter Driver auf GitHub](https://github.com/appium/appium-flutter-driver).
:::

### Konfiguration der Capabilities (Android & iOS)

```typescript
export const config: WebdriverIO.Config = {
    // ... weitere wdio.conf.ts-Konfigurationen (runner, specs usw.)
    

    services: [
        ['appium', {
            // WebdriverIO verwaltet den Lebenszyklus des Appium-Servers
            args: {},
            command: 'appium'
        }]
    ],

    capabilities: [
        // ==========================================
        // ANDROID-KONFIGURATION
        // ==========================================
        {
            'platformName': 'Android',
            'appium:automationName': 'Flutter', // Legt die zwingende Verwendung des Flutter-Treibers fest
            'appium:deviceName': 'Android_Emulator', // Name Ihres konfigurierten Emulators oder realen Geräts
            // HINWEIS ZUM PFAD (siehe Hinweis zu Betriebssystemen unten)
            'appium:app': './build/app/outputs/flutter-apk/app-debug.apk', 
            'appium:autoGrantPermissions': true
        },
        
        // ==========================================
        // IOS-KONFIGURATION (erfordert macOS)
        // ==========================================
        {
            'platformName': 'iOS',
            'appium:automationName': 'Flutter', // Legt die zwingende Verwendung des Flutter-Treibers fest
            'appium:deviceName': 'iPhone Simulator', // Name des iOS-Simulators oder realen Geräts
            'appium:platformVersion': '17.2', // Ändern Sie dies auf Ihre Ziel-OS-Version
            // HINWEIS ZUM PFAD (siehe Hinweis zu Betriebssystemen unten)
            // Verwenden Sie .app für den iOS-Simulator oder .ipa für reale iOS-Geräte
            'appium:app': './ios/build/Build/Products/Debug-iphonesimulator/Runner.app',
            'appium:noReset': false
        }
    ],

    // ... restliche Konfiguration
};
```

### Wichtige Hinweise zu Dateipfaden (appium:app)

Die Angabe des Pfads zur Binäranwendung (`.apk` für Android, `.app` oder `.ipa` für iOS) in der Eigenschaft `appium:app` erfordert je nach Betriebssystem und Zielumgebung besondere Aufmerksamkeit:

- **Unter Windows**: Das Betriebssystem verwendet Backslashes (`\`) für Verzeichnispfade. Wenn Sie unter Windows den Pfad zu Ihrer `.apk`-Datei angeben, achten Sie darauf, die Backslashes in Ihrer Konfigurationsdatei zu escapen (z. B. `.\\build\\app\\outputs\\flutter-apk\\app-debug.apk`) oder durchgängig Schrägstriche (`/`) zu verwenden, die von Node.js korrekt verarbeitet werden.
- **Unter macOS / Linux**: Es werden Standardpfade mit Schrägstrichen (`/`) verwendet. Beachten Sie, dass iOS-Builds (`.app` für den Simulator oder `.ipa` für reale Geräte) nur in macOS-Umgebungen kompiliert werden können.
- **iOS-Simulator vs. reale Geräte**: Verwenden Sie `.app`-Bundles bei der Ausführung im iOS-Simulator und signierte `.ipa`-Pakete bei der Ausführung auf physischen iOS-Geräten.
- **Absolute vs. relative Pfade**: Es wird dringend empfohlen, relative Pfade ausgehend vom Projektstammverzeichnis (mit `./`) zu verwenden, um die Portabilität zwischen verschiedenen Entwicklungsrechnern und Continuous-Integration-Umgebungen (CI) zu gewährleisten.