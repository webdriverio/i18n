---
id: setting-up-webdriverio
title: Configurer WebdriverIO dans votre environnement
description: "Configurez wdio.conf.ts et les capabilities Appium pour démarrer une application Flutter avec Appium Flutter Driver sur Android et iOS."
---

Le fichier `wdio.conf.ts` est le fichier de configuration central de tout projet WebdriverIO. C'est ici que vous définissez où les tests s'exécutent, quels frameworks de test utiliser, ainsi que les `capabilities` nécessaires pour qu'Appium initialise correctement l'application Flutter.

:::warning
Le `appium-flutter-driver` fonctionne différemment des drivers natifs traditionnels (tels que `UiAutomator2` ou `XCUITest`). Il communique avec l'extension de test de Flutter (`flutter_driver`) via un protocole personnalisé. De ce fait, les commandes d'automatisation natives standard peuvent ne pas fonctionner de la même manière ou nécessiter impérativement l'utilisation de `appium-flutter-finder`.

Pour bien comprendre les limitations, les commandes prises en charge et les extensions du protocole, consultez le dépôt officiel de l'outil : [Appium Flutter Driver sur GitHub](https://github.com/appium/appium-flutter-driver).
:::

### Configuration des capabilities (Android et iOS)

```typescript
export const config: WebdriverIO.Config = {
    // ... autres configurations de wdio.conf.ts (runner, specs, etc.)
    

    services: [
        ['appium', {
            // WebdriverIO gère le cycle de vie du serveur Appium
            args: {},
            command: 'appium'
        }]
    ],

    capabilities: [
        // ==========================================
        // CONFIGURATION ANDROID
        // ==========================================
        {
            'platformName': 'Android',
            'appium:automationName': 'Flutter', // Impose l'utilisation du driver Flutter
            'appium:deviceName': 'Android_Emulator', // Nom de votre émulateur configuré ou de votre appareil réel
            // REMARQUE SUR LE CHEMIN (voir la note sur les systèmes d'exploitation ci-dessous)
            'appium:app': './build/app/outputs/flutter-apk/app-debug.apk', 
            'appium:autoGrantPermissions': true
        },
        
        // ==========================================
        // CONFIGURATION IOS (nécessite macOS)
        // ==========================================
        {
            'platformName': 'iOS',
            'appium:automationName': 'Flutter', // Impose l'utilisation du driver Flutter
            'appium:deviceName': 'iPhone Simulator', // Nom du simulateur iOS ou de l'appareil réel
            'appium:platformVersion': '17.2', // Remplacez par la version de l'OS cible
            // REMARQUE SUR LE CHEMIN (voir la note sur les systèmes d'exploitation ci-dessous)
            // Utilisez .app pour le simulateur iOS, ou .ipa pour les appareils iOS réels
            'appium:app': './ios/build/Build/Products/Debug-iphonesimulator/Runner.app',
            'appium:noReset': false
        }
    ],

    // ... reste de la configuration
};
```

### Remarques importantes sur les chemins de fichiers (appium:app)

La définition du chemin du binaire de l'application (`.apk` pour Android, `.app` ou `.ipa` pour iOS) dans la propriété `appium:app` demande une attention particulière selon le système d'exploitation et l'environnement cible :

- **Sous Windows** : le système d'exploitation utilise des barres obliques inverses (`\`) pour les chemins de répertoires. Lorsque vous indiquez le chemin vers votre fichier `.apk` sous Windows, veillez à échapper les barres obliques inverses dans votre fichier de configuration (par exemple, `.\\build\\app\\outputs\\flutter-apk\\app-debug.apk`) ou à utiliser systématiquement des barres obliques (`/`), qui sont correctement interprétées par Node.js.
- **Sous macOS / Linux** : les chemins standard avec des barres obliques (`/`) sont utilisés. N'oubliez pas que les builds iOS (`.app` pour le simulateur ou `.ipa` pour les appareils réels) ne peuvent être compilés que dans des environnements macOS.
- **Simulateur iOS vs appareils réels** : utilisez des bundles `.app` lors de l'exécution sur le simulateur iOS et des packages `.ipa` signés lors de l'exécution sur des appareils iOS physiques.
- **Chemins absolus vs relatifs** : il est fortement recommandé d'utiliser des chemins relatifs à partir de la racine du projet (en utilisant `./`) afin de garantir la portabilité entre les différentes machines de développement et les environnements d'intégration continue (CI).