---
id: configuration
title: Configuration
description: "Configurez le serveur MCP de WebdriverIO, y compris les options de session, de navigateur, mobiles, de fournisseur cloud, de détection d'éléments et d'Appium."
---

Cette page documente toutes les options de configuration du serveur MCP de WebdriverIO.

## Configuration du serveur MCP

Le serveur MCP se configure au moyen de fichiers de configuration ou de commandes.

### Configuration de base

Modifiez votre fichier de configuration MCP (par exemple `./.mcp.json`) et ajoutez ce qui suit :

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

## Options de session

Toutes les options de session sont transmises à l'outil `start_session`. Il existe un outil unique et unifié pour les sessions navigateur et mobiles ; le paramètre `platform` détermine le type de session.

### Options communes

#### `platform`

<Option type={`"browser" | "ios" | "android"`} required="Oui">

La plateforme à automatiser.

</Option>
#### `provider`

<Option type={`"local" | "browserstack" | "saucelabs" | "testmu" | "testingbot"`} default={`"local"`} required="Non">

L'endroit où la session s'exécute. Utilisez le nom d'un fournisseur cloud pour les appareils distants ; chacun nécessite ses propres variables d'environnement. Consultez [Fournisseurs cloud](./cloud-providers) pour plus de détails.

</Option>
## Options de session navigateur

Options pour les sessions `platform: "browser"`.

### `browser`

<Option type={`"chrome" | "firefox" | "edge" | "safari"`} required="Oui (pour la plateforme navigateur)">

Navigateur à lancer.

</Option>
### `browserVersion`

<Option type="string" default={`"latest"`} required="Non">

Version du navigateur. Fournisseurs cloud uniquement (par défaut : latest).

</Option>
### `os` / `osVersion`

<Option type="string" required="Non">

Système d'exploitation pour les sessions navigateur chez un fournisseur cloud. Exemples : `os: "Windows"`, `osVersion: "11"` ou `os: "OS X"`, `osVersion: "Sequoia"`.

</Option>
### `headless`

<Option type="boolean" default="true" required="Non">

Exécute le navigateur en mode headless (sans fenêtre visible). Définissez sur `false` pour voir le navigateur.

</Option>
### `windowWidth`

<Option type="number" default="1920" required="Non">

-   **Plage :** `400` - `3840`

Largeur initiale de la fenêtre du navigateur en pixels.

</Option>
### `windowHeight`

<Option type="number" default="1080" required="Non">

-   **Plage :** `400` - `2160`

Hauteur initiale de la fenêtre du navigateur en pixels.

</Option>
### `navigationUrl`

<Option type="string" required="Non">

URL vers laquelle naviguer immédiatement après le démarrage du navigateur. Plus efficace que d'appeler `start_session` puis `navigate` séparément.

</Option>
### `attach`

<Option type="boolean" default="false" required="Non">

S'attache à une instance Chrome existante au lieu d'en lancer une nouvelle. À utiliser après `launch_chrome` pour se connecter via CDP.

</Option>
### `attachConfig`

<Option type={`{ port?: number; host?: string }`} default={`{ port: 9222, host: "localhost" }`} required="Non">

Configuration de la connexion de débogage à distance de Chrome. S'applique uniquement lorsque `attach: true`.

</Option>
## Options de session mobile

Options pour les sessions `platform: "ios"` ou `platform: "android"`.

### `deviceName`

<Option type="string" required="Oui (pour les plateformes mobiles)">

Nom de l'appareil, du simulateur ou de l'émulateur.

**Exemples :**
-   Simulateur iOS : `"iPhone 16"`, `"iPad Air (5th generation)"`
-   Émulateur Android : `"Pixel 7"`, `"Nexus 5X"`
-   Appareil réel : le nom de l'appareil tel qu'affiché dans votre système

</Option>
### `platformVersion`

<Option type="string" required="Non">

Version du système d'exploitation de l'appareil/simulateur/émulateur (par exemple `"18.0"` pour iOS, `"14"` pour Android).

</Option>
### `automationName`

<Option type={`"XCUITest" | "UiAutomator2"`} required="Non">

Pilote d'automatisation. Par défaut `XCUITest` pour iOS et `UiAutomator2` pour Android.

</Option>
### `udid`

<Option type="string" required="Non (requis pour les appareils iOS réels)">

Identifiant unique de l'appareil (Unique Device Identifier). Requis pour les appareils iOS réels (identifiant de 40 caractères).

**Trouver l'UDID :**
-   **iOS :** Connectez l'appareil, ouvrez le Finder, cliquez sur l'appareil → Numéro de série (cliquez pour afficher l'UDID)
-   **Android :** Exécutez `adb devices` dans le terminal

</Option>
### `appPath`

<Option type="string" required="Non">

Chemin vers le fichier de l'application à installer et lancer.

**Formats pris en charge :**
-   Simulateur iOS : répertoire `.app`
-   Appareil iOS réel : fichier `.ipa`
-   Android : fichier `.apk`

Il faut fournir soit `appPath`, soit `noReset: true` pour se connecter à une application déjà en cours d'exécution.

</Option>
### `app`

<Option type="string" required="Non">

URL de l'application chez le fournisseur cloud (`bs://...` pour BrowserStack, `storage:filename=` pour Sauce Labs, `lt://...` pour TestMu, app_url pour TestingBot) ou `customId`. Utilisé à la place de `appPath` pour les sessions mobiles dans le cloud.

</Option>
### `appWaitActivity`

<Option type="string" required="Non (Android uniquement)">

Activité à attendre au lancement de l'application. Si elle n'est pas spécifiée, l'activité principale/de lancement de l'application est utilisée.

**Exemple :** `"com.example.app.MainActivity"`

</Option>
### Options d'état de session

#### `noReset`

<Option type="boolean" required="Non">

Préserve l'état de l'application entre les sessions. Lorsque `true` :
-   Les données de l'application sont conservées (état de connexion, préférences, etc.)
-   La session sera **détachée** au lieu d'être fermée (l'application continue de s'exécuter)
-   Peut être utilisé sans `appPath` pour se connecter à une application déjà en cours d'exécution

</Option>
#### `fullReset`

<Option type="boolean" required="Non">

Réinitialise complètement l'application avant la session :
-   iOS : désinstalle et réinstalle l'application
-   Android : efface les données et le cache de l'application

Définissez `fullReset: false` avec `noReset: true` pour préserver entièrement l'état de l'application.

</Option>
### Délai d'expiration de session

#### `newCommandTimeout`

<Option type="number" default="300" required="Non">

Durée (en secondes) pendant laquelle Appium attendra une nouvelle commande avant de mettre fin à la session. Augmentez cette valeur pour des sessions de débogage plus longues.

</Option>
### Gestion automatique

#### `autoGrantPermissions`

<Option type="boolean" default="true" required="Non">

Accorde automatiquement les autorisations de l'application lors de l'installation/du lancement (caméra, microphone, localisation, etc.).

:::note Android uniquement
Cette option concerne principalement Android. Les autorisations iOS doivent être gérées différemment en raison des restrictions du système.
:::

</Option>
#### `autoAcceptAlerts`

<Option type="boolean" default="true" required="Non">

Accepte automatiquement les alertes système (boîtes de dialogue) pendant l'automatisation (« Autoriser les notifications ? », etc.).

</Option>
#### `autoDismissAlerts`

<Option type="boolean" default="false" required="Non">

Rejette les alertes système au lieu de les accepter. Prend le pas sur `autoAcceptAlerts` lorsque `true`.

</Option>
### Connexion au serveur Appium

Remplacez la connexion au serveur Appium pour chaque session à l'aide de `appiumConfig` :

```js
start_session({
  platform: "ios",
  deviceName: "iPhone 16",
  appPath: "/path/to/app.app",
  appiumConfig: { host: "192.168.1.100", port: 4724, path: "/wd/hub" }
})
```

#### `appiumConfig`

<Option type={`{ host?: string; port?: number; path?: string }`} required="Non">

Connexion au serveur Appium. Par défaut `{ host: "127.0.0.1", port: 4723, path: "/" }`.

</Option>
## Options des fournisseurs cloud

### Identifiants

Chaque fournisseur cloud nécessite ses propres variables d'environnement :

| Fournisseur  | Variable du nom d'utilisateur | Variable de la clé d'accès |
| ------------ | ----------------------------- | -------------------------- |
| BrowserStack | `BROWSERSTACK_USERNAME`       | `BROWSERSTACK_ACCESS_KEY`  |
| Sauce Labs   | `SAUCE_USERNAME`              | `SAUCE_ACCESS_KEY`         |
| TestMu       | `TESTMU_USERNAME`             | `TESTMU_ACCESS_KEY`        |
| TestingBot   | `TESTINGBOT_KEY`              | `TESTINGBOT_SECRET`        |

Définissez-les avant de démarrer le serveur MCP.

### `region`

<Option type={`"us-west-1" | "eu-central-1" | "apac-southeast-1"`} default={`"eu-central-1"`} required="Non">

Région du centre de données Sauce Labs. Ignorée pour les autres fournisseurs.

</Option>
### `tunnel`

<Option type={`boolean | "external"`} default="false" required="Non">

Active le routage par tunnel local pour les sessions chez un fournisseur cloud (accès à localhost, aux environnements de préproduction, aux services internes).

-   `true` — Démarre automatiquement le tunnel avant la session et l'arrête à la fermeture
-   `"external"` — Le tunnel est déjà exécuté en externe ; définit uniquement les indicateurs appropriés au fournisseur

Avant d'utiliser `true`, consultez la ressource local-binary du fournisseur (`wdio://browserstack/local-binary`, `wdio://saucelabs/local-binary`, `wdio://testmu/local-binary` ou `wdio://testingbot/local-binary`) pour obtenir les instructions d'installation propres à votre système d'exploitation et à votre architecture.

</Option>
### `tunnelName`

<Option type="string" required="Non">

Nom identifiant le tunnel. Requis lorsque `tunnel: "external"` afin de correspondre au tunnel en cours d'exécution. Lorsque `tunnel: true`, un nom unique est généré automatiquement s'il n'est pas fourni.

</Option>
### `reporting`

<Option type={`{ project?: string; build?: string; session?: string }`} required="Non">

Libellés de session visibles dans le tableau de bord du fournisseur cloud. Fonctionne de manière identique avec BrowserStack, Sauce Labs, TestMu et TestingBot.

</Option>
### `trace`

<Option type="boolean" default="false" required="Non">

Active l'enregistrement de traces. Produit un fichier zip `.trace` compatible avec Playwright, enregistré dans `.trace/` lors de `close_session`. Visualisez les traces sur [player.vibium.dev](https://player.vibium.dev).

</Option>
## Options de détection d'éléments

Options pour l'outil `get_elements`.

### `inViewportOnly`

<Option type="boolean" default="false" required="Non">

Renvoie uniquement les éléments visibles dans la zone d'affichage actuelle. Définissez sur `true` pour réduire les résultats sur les pages longues.

</Option>
### `includeContainers`

<Option type="boolean" default="false" required="Non">

Inclut les éléments conteneurs/de mise en page dans les résultats :

**Conteneurs Android :** `ViewGroup`, `FrameLayout`, `LinearLayout`, `RelativeLayout`, `ConstraintLayout`, `ScrollView`, `RecyclerView`

**Conteneurs iOS :** `View`, `StackView`, `CollectionView`, `ScrollView`, `TableView`

</Option>
### `includeBounds`

<Option type="boolean" default="false" required="Non">

Inclut les coordonnées du cadre englobant de l'élément (x, y, largeur, hauteur) dans la réponse.

</Option>
### Pagination

#### `limit`

<Option type="number" default="0 (illimité)" required="Non">

Nombre maximal d'éléments à renvoyer.

</Option>
#### `offset`

<Option type="number" default="0" required="Non">

Nombre d'éléments à ignorer avant de renvoyer les résultats.

**Exemple :** obtenir les éléments 21 à 40 :
```text
Get elements with limit 20 and offset 20
```

</Option>
## Options de l'arbre d'accessibilité

Options pour l'outil `get_accessibility_tree` (navigateur uniquement).

### `limit`

<Option type="number" default="0 (illimité)" required="Non">

Nombre maximal de nœuds à renvoyer.

</Option>
### `offset`

<Option type="number" default="0" required="Non">

Nombre de nœuds à ignorer pour la pagination.

</Option>
### `roles`

<Option type="string[]" default="Tous les rôles" required="Non">

Filtre sur des rôles d'accessibilité spécifiques.

**Rôles courants :** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Exemple :** obtenir uniquement les boutons et les liens :
```text
Get accessibility tree filtered to button and link roles
```

</Option>
## Capture d'écran

L'outil `get_screenshot` ne prend aucun paramètre. Les captures d'écran sont traitées automatiquement :

| Optimisation         | Valeur   | Description                                                      |
| -------------------- | -------- | ---------------------------------------------------------------- |
| Dimension maximale   | 2000px   | Les images de plus de 2000px sont réduites                       |
| Taille de fichier max | 1MB     | Les images sont compressées pour rester sous 1MB                 |
| Format               | PNG/JPEG | PNG avec compression maximale ; JPEG si nécessaire pour la taille |

## Comportement des sessions

### Types de session

| Type      | Description                | Détachement automatique                    |
| --------- | -------------------------- | ------------------------------------------ |
| `browser` | Session navigateur         | Non                                        |
| `ios`     | Session d'application iOS  | Oui (si `noReset: true` ou sans `appPath`) |
| `android` | Session d'application Android | Oui (si `noReset: true` ou sans `appPath`) |

### Modèle à session unique

Le serveur MCP fonctionne selon un **modèle à session unique** :

-   Une seule session navigateur OU application peut être active à la fois
-   Démarrer une nouvelle session fermera/détachera la session en cours
-   L'état de la session est conservé globalement entre les appels d'outils

### Détacher ou fermer

| Action               | `detach: false` (Fermer)                 | `detach: true` (Détacher)                                 |
| -------------------- | ---------------------------------------- | --------------------------------------------------------- |
| Navigateur           | Ferme complètement le navigateur         | Laisse le navigateur ouvert, déconnecte WebDriver         |
| Application mobile   | Arrête l'application                     | Laisse l'application s'exécuter dans son état actuel      |
| Cas d'utilisation    | Repartir de zéro pour la session suivante | Préserver l'état, inspection manuelle                    |

## Considérations de performance

### Automatisation du navigateur

-   **Le mode headless** est plus rapide mais n'affiche pas les éléments visuels
-   **Des tailles de fenêtre plus petites** réduisent le temps de capture d'écran
-   **La détection d'éléments** est optimisée grâce à l'exécution d'un seul script
-   **L'optimisation des captures d'écran** maintient les images sous 1MB pour un traitement efficace

### Automatisation mobile

-   **L'analyse du source XML de la page** n'utilise que 2 appels HTTP (contre plus de 600 pour les requêtes d'éléments traditionnelles)
-   **Les sélecteurs Accessibility ID** sont les plus rapides et les plus fiables
-   **Les sélecteurs XPath** sont les plus lents ; à n'utiliser qu'en dernier recours
-   **La pagination** (`limit` et `offset`) réduit la consommation de tokens pour les écrans comportant de nombreux éléments

### Conseils pour la consommation de tokens

| Paramètre                  | Impact                                                       |
| -------------------------- | ------------------------------------------------------------ |
| `inViewportOnly: true`     | Filtre les éléments hors écran, réduisant la taille de la réponse |
| `includeContainers: false` | Exclut les éléments de mise en page (ViewGroup, etc.)        |
| `includeBounds: false`     | Omet les données x/y/largeur/hauteur                         |
| `limit` avec pagination    | Traite les éléments par lots au lieu de tous à la fois       |

## Configuration du serveur Appium

Avant d'utiliser l'automatisation mobile, assurez-vous qu'Appium est correctement configuré.

### Configuration de base

```sh
# Installer Appium globalement
npm install -g appium

# Installer les pilotes
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# Démarrer le serveur
appium
```

### Configuration personnalisée du serveur

```sh
# Démarrer avec un hôte et un port personnalisés
appium --address 0.0.0.0 --port 4724

# Démarrer avec la journalisation
appium --log-level debug

# Démarrer avec un chemin de base spécifique
appium --base-path /wd/hub
```

### Vérifier l'installation

```sh
# Vérifier les pilotes installés
appium driver list --installed

# Vérifier la version d'Appium
appium --version

# Tester la connexion
curl http://localhost:4723/status
```

## Dépannage de la configuration

### Le serveur MCP ne démarre pas

1. Vérifiez que npm/npx est installé : `npm --version`
2. Essayez de l'exécuter manuellement : `npx @wdio/mcp`
3. Consultez les journaux de votre environnement pour détecter des erreurs

### Problèmes de connexion à Appium

1. Vérifiez qu'Appium est en cours d'exécution : `curl http://localhost:4723/status`
2. Vérifiez que `appiumConfig` dans `start_session` correspond aux paramètres du serveur Appium
3. Assurez-vous que le pare-feu autorise les connexions sur le port d'Appium

### La session ne démarre pas

1. **Navigateur :** assurez-vous que le navigateur cible est installé
2. **iOS :** vérifiez que Xcode et les simulateurs sont disponibles
3. **Android :** vérifiez `ANDROID_HOME` et que l'émulateur est en cours d'exécution
4. Consultez les journaux du serveur Appium pour obtenir des messages d'erreur détaillés

### Expiration des sessions

Si les sessions expirent pendant le débogage :
1. Augmentez `newCommandTimeout` lors du démarrage de la session
2. Utilisez `noReset: true` pour préserver l'état entre les sessions
3. Utilisez `detach: true` lors de la fermeture pour que l'application continue de s'exécuter