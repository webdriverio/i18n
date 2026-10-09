---
id: setting-up-webdriverio
title: Configurare WebdriverIO nel proprio ambiente
description: "Configura wdio.conf.ts e le capabilities di Appium per avviare un'app Flutter con l'Appium Flutter Driver su Android e iOS."
---

Il file `wdio.conf.ts` è il file di configurazione principale di qualsiasi progetto WebdriverIO. È qui che si definisce dove vengono eseguiti i test, quali framework di test utilizzare e le `capabilities` necessarie affinché Appium inizializzi correttamente l'applicazione Flutter.

:::warning
L'`appium-flutter-driver` funziona in modo diverso rispetto ai driver nativi tradizionali (come `UiAutomator2` o `XCUITest`). Comunica con l'estensione di test di Flutter (`flutter_driver`) tramite un protocollo personalizzato. Per questo motivo, i comandi di automazione nativi standard potrebbero non funzionare allo stesso modo o potrebbero richiedere obbligatoriamente l'uso di `appium-flutter-finder`.

Per comprendere appieno le limitazioni, i comandi supportati e le estensioni del protocollo, consulta il repository ufficiale dello strumento: [Appium Flutter Driver su GitHub](https://github.com/appium/appium-flutter-driver).
:::

### Configurazione delle Capabilities (Android e iOS)

```typescript
export const config: WebdriverIO.Config = {
    // ... altre configurazioni di wdio.conf.ts (runner, specs, ecc.)
    

    services: [
        ['appium', {
            // WebdriverIO gestisce il ciclo di vita del server Appium
            args: {},
            command: 'appium'
        }]
    ],

    capabilities: [
        // ==========================================
        // CONFIGURAZIONE ANDROID
        // ==========================================
        {
            'platformName': 'Android',
            'appium:automationName': 'Flutter', // Imposta l'uso obbligatorio del driver Flutter
            'appium:deviceName': 'Android_Emulator', // Nome dell'emulatore configurato o del dispositivo reale
            // OSSERVAZIONE SUL PERCORSO (vedi la nota sui sistemi operativi più avanti)
            'appium:app': './build/app/outputs/flutter-apk/app-debug.apk', 
            'appium:autoGrantPermissions': true
        },
        
        // ==========================================
        // CONFIGURAZIONE IOS (Richiede macOS)
        // ==========================================
        {
            'platformName': 'iOS',
            'appium:automationName': 'Flutter', // Imposta l'uso obbligatorio del driver Flutter
            'appium:deviceName': 'iPhone Simulator', // Nome del simulatore iOS o del dispositivo reale
            'appium:platformVersion': '17.2', // Modifica con la versione del sistema operativo di destinazione
            // OSSERVAZIONE SUL PERCORSO (vedi la nota sui sistemi operativi più avanti)
            // Usa .app per il simulatore iOS o .ipa per i dispositivi iOS reali
            'appium:app': './ios/build/Build/Products/Debug-iphonesimulator/Runner.app',
            'appium:noReset': false
        }
    ],

    // ... resto della configurazione
};
```

### Osservazioni importanti sui percorsi dei file (appium:app)

La definizione del percorso del binario dell'applicazione (`.apk` per Android, `.app` o `.ipa` per iOS) all'interno della proprietà `appium:app` richiede particolare attenzione a seconda del sistema operativo e dell'ambiente di destinazione:

- **Su Windows**: il sistema operativo utilizza le barre rovesciate (`\`) per i percorsi delle directory. Quando si mappa il percorso del file `.apk` su Windows, assicurati di effettuare l'escape delle barre rovesciate nel file di configurazione (ad es. `.\\build\\app\\outputs\\flutter-apk\\app-debug.apk`) oppure usa in modo coerente le barre (`/`), che vengono interpretate correttamente da Node.js.
- **Su macOS / Linux**: si utilizzano i percorsi standard con le barre (`/`). Ricorda che le build iOS (`.app` per il simulatore o `.ipa` per i dispositivi reali) possono essere compilate solo in ambienti macOS.
- **Simulatore iOS vs dispositivi reali**: usa i bundle `.app` quando esegui i test sul simulatore iOS e i pacchetti `.ipa` firmati quando li esegui su dispositivi iOS fisici.
- **Percorsi assoluti vs relativi**: si consiglia vivamente di utilizzare percorsi relativi a partire dalla radice del progetto (usando `./`) per garantire la portabilità tra diverse macchine di sviluppo e ambienti di Continuous Integration (CI).