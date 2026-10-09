---
id: setting-up-webdriverio
title: Konfigurera WebdriverIO i din miljö
description: "Konfigurera wdio.conf.ts och Appium-capabilities för att starta en Flutter-app med Appium Flutter Driver på Android och iOS."
---

Filen `wdio.conf.ts` är den centrala konfigurationsfilen i alla WebdriverIO-projekt. Det är här du definierar var testerna körs, vilka testramverk som ska användas och de `capabilities` som krävs för att Appium ska kunna initiera Flutter-applikationen korrekt.

:::warning
`appium-flutter-driver` fungerar annorlunda än traditionella native-drivrutiner (som `UiAutomator2` eller `XCUITest`). Den kommunicerar med Flutters testtillägg (`flutter_driver`) via ett anpassat protokoll. På grund av detta kanske vanliga native-automatiseringskommandon inte fungerar på samma sätt, eller så kan de strikt kräva att `appium-flutter-finder` används.

För att helt förstå begränsningarna, de kommandon som stöds och protokolltilläggen, se verktygets officiella repository: [Appium Flutter Driver på GitHub](https://github.com/appium/appium-flutter-driver).
:::

### Konfiguration av capabilities (Android & iOS)

```typescript
export const config: WebdriverIO.Config = {
    // ... andra wdio.conf.ts-konfigurationer (runner, specs, etc.)
    

    services: [
        ['appium', {
            // WebdriverIO hanterar Appium-serverns livscykel
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
            'appium:automationName': 'Flutter', // Anger att Flutter-drivrutinen obligatoriskt ska användas
            'appium:deviceName': 'Android_Emulator', // Namnet på din konfigurerade emulator eller riktiga enhet
            // OBSERVERA SÖKVÄGEN (Se anteckningen om operativsystem nedan)
            'appium:app': './build/app/outputs/flutter-apk/app-debug.apk', 
            'appium:autoGrantPermissions': true
        },
        
        // ==========================================
        // IOS-KONFIGURATION (Kräver macOS)
        // ==========================================
        {
            'platformName': 'iOS',
            'appium:automationName': 'Flutter', // Anger att Flutter-drivrutinen obligatoriskt ska användas
            'appium:deviceName': 'iPhone Simulator', // Namnet på iOS-simulatorn eller den riktiga enheten
            'appium:platformVersion': '17.2', // Ändra till din mål-OS-version
            // OBSERVERA SÖKVÄGEN (Se anteckningen om operativsystem nedan)
            // Använd .app för iOS-simulatorn, eller .ipa för riktiga iOS-enheter
            'appium:app': './ios/build/Build/Products/Debug-iphonesimulator/Runner.app',
            'appium:noReset': false
        }
    ],

    // ... resten av konfigurationen
};
```

### Viktiga observationer om filsökvägar (appium:app)

Att definiera sökvägen till applikationens binärfil (`.apk` för Android, `.app` eller `.ipa` för iOS) i egenskapen `appium:app` kräver noggrannhet beroende på operativsystem och målmiljö:

- **På Windows**: Operativsystemet använder omvända snedstreck (`\`) för katalogsökvägar. När du anger sökvägen till din `.apk`-fil på Windows, se till att du escapar de omvända snedstrecken i din konfigurationsfil (t.ex. `.\\build\\app\\outputs\\flutter-apk\\app-debug.apk`) eller använd konsekvent vanliga snedstreck (`/`), som tolkas korrekt av Node.js.
- **På macOS / Linux**: Vanliga sökvägar med snedstreck (`/`) används. Kom ihåg att iOS-byggen (`.app` för simulatorn eller `.ipa` för riktiga enheter) endast kan kompileras i macOS-miljöer.
- **iOS-simulator vs riktiga enheter**: Använd `.app`-paket när du kör mot iOS-simulatorn och signerade `.ipa`-paket när du kör mot fysiska iOS-enheter.
- **Absoluta vs relativa sökvägar**: Det rekommenderas starkt att använda relativa sökvägar som utgår från projektets rot (med `./`) för att garantera portabilitet mellan olika utvecklingsmaskiner och miljöer för kontinuerlig integration (CI).