---
id: mcp
title: MCP (Model Context Protocol)
description: "Permettez aux assistants IA d'automatiser les navigateurs et les applications mobiles grâce au serveur MCP de WebdriverIO, y compris l'installation, l'utilisation avec Claude et les outils disponibles."
---

## Que peut-il faire ?

WebdriverIO MCP est un **serveur Model Context Protocol (MCP)** qui permet aux assistants IA d'automatiser et d'interagir avec les navigateurs web et les applications mobiles.

### Pourquoi WebdriverIO MCP ?

-   **Mobile-First** : Contrairement aux serveurs MCP limités aux navigateurs, WebdriverIO MCP prend en charge l'automatisation des applications natives iOS et Android via Appium
-   **Sélecteurs multiplateformes** : La détection intelligente des éléments génère automatiquement plusieurs stratégies de localisation (accessibility ID, XPath, UiAutomator, prédicats iOS)
-   **Écosystème WebdriverIO** : Construit sur le framework éprouvé WebdriverIO avec son riche écosystème de services et de reporters

Il fournit une interface unifiée pour :

-   🖥️ **Navigateurs de bureau** (Chrome, Firefox, Edge, Safari, avec ou sans interface graphique)
-   📱 **Applications mobiles natives** (Simulateurs iOS / Émulateurs Android / Appareils réels via Appium)
-   📳 **Applications mobiles hybrides** (Basculement de contexte Natif + WebView via Appium)
-   ☁️ **Appareils cloud** (Clouds d'appareils réels et de navigateurs BrowserStack, Sauce Labs, TestMu)

via le package [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp).

Cela permet aux assistants IA de :

-   **Lancer et contrôler des navigateurs** avec des dimensions configurables, un mode headless et une navigation initiale optionnelle
-   **Naviguer sur des sites web** et interagir avec les éléments (cliquer, saisir, faire défiler)
-   **Analyser le contenu des pages** via l'arbre d'accessibilité et la détection des éléments visibles avec prise en charge de la pagination
-   **Prendre des captures d'écran** automatiquement optimisées (redimensionnées, compressées à 1 Mo maximum)
-   **Gérer les cookies** pour la gestion des sessions
-   **Contrôler les appareils mobiles** y compris les gestes (appui, balayage, glisser-déposer)
-   **Changer de contexte** dans les applications hybrides entre natif et webview
-   **Exécuter des scripts** - JavaScript dans les navigateurs, commandes mobiles Appium sur les appareils
-   **Gérer les fonctionnalités des appareils** comme la rotation, le clavier, la géolocalisation
-   et bien plus encore, consultez les options [Outils](./mcp/tools) et [Configuration](./mcp/configuration)

:::info

REMARQUE pour les applications mobiles
L'automatisation mobile nécessite un serveur Appium en cours d'exécution avec les pilotes appropriés installés. Consultez les [Prérequis](#prerequisites) pour les instructions d'installation.

:::

## Installation

La façon la plus simple d'utiliser `@wdio/mcp` est via npx, sans aucune installation locale :

```sh
npx @wdio/mcp
```

Ou installez-le globalement :

```sh
npm install -g @wdio/mcp
```

## Utilisation avec Claude

Pour utiliser WebdriverIO MCP avec Claude, modifiez le fichier de configuration :

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

Après avoir ajouté la configuration, redémarrez votre environnement. Les outils WebdriverIO MCP seront disponibles pour les tâches d'automatisation de navigateurs et d'applications mobiles.

### Utilisation avec Claude Code

Claude Code détecte automatiquement les serveurs MCP. Vous pouvez le configurer dans le fichier `.claude/settings.json` ou `.mcp.json` de votre projet.

Ou ajoutez-le globalement à .claude.json en exécutant :
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
Validez-le en exécutant la commande `/mcp` dans Claude Code.

## Exemples de démarrage rapide

### Automatisation de navigateur

Demandez à Claude d'automatiser des tâches de navigateur :

```
"Open Chrome and navigate to https://webdriver.io"
"Click the 'Get Started' button"
"Take a screenshot of the page"
"Find all visible links on the page"
```

### Automatisation d'applications mobiles

Demandez à Claude d'automatiser des applications mobiles :

```
"Start my iOS app on the iPhone 15 simulator"
"Tap the login button"
"Swipe up to scroll down"
"Take a screenshot of the current screen"
```

## Fonctionnalités

### Automatisation de navigateur

| Fonctionnalité | Description |
|---------|-------------|
| **Gestion des sessions** | Lancer Chrome, Firefox, Edge ou Safari en mode avec/sans interface graphique avec des dimensions personnalisées ; s'attacher à une instance Chrome existante via CDP |
| **Navigation** | Naviguer vers des URL ; gérer plusieurs onglets |
| **Interaction avec les éléments** | Cliquer sur des éléments, saisir du texte, trouver des éléments par divers sélecteurs |
| **Analyse de page** | Obtenir les éléments interactifs (avec pagination), l'arbre d'accessibilité (avec filtrage par rôle) |
| **Captures d'écran** | Capturer des captures d'écran (optimisées automatiquement à 1 Mo maximum) |
| **Défilement** | Faire défiler vers le haut/bas d'un nombre de pixels configurable |
| **Gestion des cookies** | Obtenir, définir et supprimer des cookies |
| **Émulation d'appareils** | Émuler des viewports mobile/tablette dans le navigateur (BiDi requis) |
| **Exécution de scripts** | Exécuter du JavaScript personnalisé dans le contexte du navigateur |

### Automatisation d'applications mobiles (iOS/Android)

| Fonctionnalité | Description |
|---------|-------------|
| **Gestion des sessions** | Lancer des applications sur des simulateurs, émulateurs ou appareils réels |
| **Gestes tactiles** | Appui (élément ou coordonnées), balayage, glisser-déposer |
| **Détection des éléments** | Détection intelligente des éléments avec plusieurs stratégies de localisation et pagination |
| **Cycle de vie de l'application** | Obtenir l'état de l'application (premier plan, arrière-plan, non lancée, non installée) |
| **Changement de contexte** | Basculer entre les contextes natif et webview dans les applications hybrides |
| **Contrôle de l'appareil** | Rotation de l'appareil, contrôle du clavier, remplacement du GPS |
| **Autorisations** | Gestion automatique des autorisations et des alertes |
| **Exécution de scripts** | Exécuter des commandes mobiles Appium (pressKey, deepLink, shell, etc.) |

### Fournisseurs cloud

| Fonctionnalité | Description |
|---------|-------------|
| **Sessions de navigateur** | Exécuter des sessions de navigateur sur BrowserStack, Sauce Labs, TestMu ou TestingBot (Windows, macOS, Linux) |
| **Sessions mobiles** | Exécuter des sessions d'application sur des appareils réels via BrowserStack, Sauce Labs, TestMu ou TestingBot |
| **Gestion des applications** | Téléverser des fichiers `.apk`/`.ipa` ; lister les applications précédemment téléversées sur les quatre fournisseurs |
| **Tunnel local** | Gestion automatique des binaires de tunnel propres à chaque fournisseur pour accéder à localhost |
| **Rapports** | Étiqueter les sessions avec des libellés de projet/build/session (fonctionne de manière identique chez tous les fournisseurs) |

## Prérequis

### Automatisation de navigateur

-   **Chrome, Firefox, Edge ou Safari** doit être installé
-   WebdriverIO gère automatiquement les pilotes

### Automatisation mobile

#### iOS

1. **Installez Xcode** depuis le Mac App Store
2. **Installez les outils en ligne de commande Xcode** :
   ```sh
   xcode-select --install
   ```
3. **Installez Appium** :
   ```sh
   npm install -g appium
   ```
4. **Installez le pilote XCUITest** :
   ```sh
   appium driver install xcuitest
   ```
5. **Démarrez le serveur Appium** :
   ```sh
   appium
   ```
6. **Pour les simulateurs** : Ouvrez Xcode → Window → Devices and Simulators pour créer/gérer les simulateurs
7. **Pour les appareils réels** : Vous aurez besoin de l'UDID de l'appareil (identifiant unique de 40 caractères)

#### Android

1. **Installez Android Studio** et configurez le SDK Android
2. **Définissez les variables d'environnement** :
   ```sh
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. **Installez Appium** :
   ```sh
   npm install -g appium
   ```
4. **Installez le pilote UiAutomator2** :
   ```sh
   appium driver install uiautomator2
   ```
5. **Démarrez le serveur Appium** :
   ```sh
   appium
   ```
6. **Créez un émulateur** via Android Studio → Virtual Device Manager
7. **Démarrez l'émulateur** avant d'exécuter les tests

## Architecture

### Comment ça fonctionne

WebdriverIO MCP agit comme un pont entre les assistants IA et l'automatisation de navigateurs/applications mobiles :

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

### Gestion des sessions

-   **Modèle à session unique** : Une seule session de navigateur OU d'application peut être active à la fois
-   **L'état de la session** est maintenu globalement entre les appels d'outils
-   **Détachement automatique** : Les sessions dont l'état est préservé (`noReset: true`) se détachent automatiquement à la fermeture

### Détection des éléments

#### Navigateur (Web)

-   Utilise un script de navigateur optimisé pour trouver tous les éléments visibles et interactifs
-   Renvoie les éléments avec les sélecteurs CSS, les ID, les classes et les informations ARIA
-   Prend en charge le filtrage par viewport et la pagination

#### Mobile (Applications natives)

-   Utilise une analyse efficace du code source XML de la page (2 appels HTTP contre plus de 600 pour les requêtes traditionnelles)
-   Classification des éléments spécifique à chaque plateforme pour Android et iOS
-   Génère plusieurs stratégies de localisation par élément :
    -   Accessibility ID (multiplateforme, le plus stable)
    -   Attribut Resource ID / Name
    -   Correspondance Text / Label
    -   XPath (complet et simplifié)
    -   UiAutomator (Android) / Predicates (iOS)

## Syntaxe des sélecteurs

Le serveur MCP prend en charge plusieurs stratégies de sélecteurs. Consultez [Sélecteurs](./mcp/selectors) pour une documentation détaillée.

### Web (CSS/XPath)

```
# Sélecteurs CSS
button.my-class
#element-id
[data-testid="login"]

# XPath
//button[@class='submit']
//a[contains(text(), 'Click')]

# Sélecteurs de texte (spécifiques à WebdriverIO)
button=Exact Button Text
a*=Partial Link Text
```

### Mobile (multiplateforme)

```
# Accessibility ID (recommandé - fonctionne sur iOS et Android)
~loginButton

# Android UiAutomator
android=new UiSelector().text("Login")

# iOS Predicate String
-ios predicate string:label == "Login"

# iOS Class Chain
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# XPath (fonctionne sur les deux plateformes)
//android.widget.Button[@text="Login"]
//XCUIElementTypeButton[@label="Login"]
```

## Outils disponibles

Le serveur MCP fournit 29 outils pour l'automatisation de navigateurs et d'applications mobiles. Consultez [Outils](./mcp/tools) pour la référence complète.

| Outil | Plateforme | Description |
|------|----------|-------------|
| `start_session` | all | Démarrer une session de navigateur ou mobile (locale ou chez un fournisseur cloud) |
| `close_session` | all | Fermer la session en cours ou s'en détacher |
| `launch_chrome` | browser | Ouvrir Chrome avec le débogage à distance pour l'attachement CDP |
| `navigate` | browser | Charger une URL dans l'onglet actuel |
| `get_tabs` | browser | Lister tous les onglets ouverts |
| `switch_tab` | browser | Activer un onglet par handle ou par index |
| `switch_frame` | browser | Basculer dans une iframe par sélecteur, ou revenir au niveau supérieur |
| `click_element` | browser | Cliquer sur un élément |
| `set_value` | all | Saisir du texte dans un champ |
| `scroll` | browser | Faire défiler la page vers le haut ou vers le bas |
| `get_elements` | all | Obtenir les éléments interactifs (avec filtrage + pagination) |
| `get_accessibility_tree` | browser | Obtenir l'arbre d'accessibilité (avec filtrage par rôle) |
| `get_screenshot` | all | Prendre une capture d'écran (optimisée automatiquement) |
| `get_cookies` | browser | Obtenir tous les cookies ou un cookie spécifique |
| `set_cookie` | browser | Définir un cookie de navigateur |
| `delete_cookies` | browser | Supprimer tous les cookies ou un seul |
| `emulate_device` | browser | Émuler le viewport d'un appareil mobile/tablette |
| `execute_script` | all | Exécuter du JavaScript (navigateur) ou des commandes Appium (mobile) |
| `tap_element` | mobile | Appuyer sur un élément ou sur des coordonnées de l'écran |
| `swipe` | mobile | Geste de balayage dans une direction |
| `drag_and_drop` | mobile | Glisser entre des éléments ou des coordonnées |
| `get_contexts` | mobile | Lister les contextes natif/webview disponibles |
| `switch_context` | mobile | Basculer entre les contextes natif et webview |
| `rotate_device` | mobile | Passer en mode portrait ou paysage |
| `hide_keyboard` | mobile | Masquer le clavier logiciel |
| `set_geolocation` | all | Remplacer les coordonnées GPS de l'appareil |
| `get_app_state` | mobile | Obtenir l'état du cycle de vie de l'application |
| `list_apps` | cloud | Lister les applications téléversées (BrowserStack, Sauce Labs, TestMu, TestingBot) |
| `upload_app` | cloud | Téléverser un fichier `.apk`/`.ipa` vers un fournisseur cloud |

## Ressources MCP

En plus des outils, le serveur expose l'état de la session en temps réel sous forme de ressources MCP. Consultez [Ressources](./mcp/resources) pour la référence complète.

| URI de la ressource | Description |
|-------------|-------------|
| `wdio://sessions` | Index de toutes les sessions |
| `wdio://session/current/elements` | Éléments interactifs (à privilégier par rapport à la capture d'écran) |
| `wdio://session/current/screenshot` | Capture d'écran en base64 |
| `wdio://session/current/accessibility` | Arbre d'accessibilité |
| `wdio://session/current/cookies` | Cookies du navigateur |
| `wdio://session/current/tabs` | Onglets ouverts du navigateur |
| `wdio://session/current/contexts` | Contextes mobiles disponibles |
| `wdio://session/current/context` | Contexte mobile actif |
| `wdio://session/current/app-state/{bundleId}` | État du cycle de vie de l'application mobile |
| `wdio://session/current/geolocation` | Remplacement GPS actuel |
| `wdio://session/current/logs` | Journaux de session (console du navigateur, logcat, crashlog) |
| `wdio://session/current/capabilities` | Capabilities WebDriver brutes |
| `wdio://session/current/code` | Code JS WebdriverIO généré |
| `wdio://session/current/steps` | Journal des étapes de la session |
| `wdio://session/{sessionId}/code` | Code JS généré pour une session passée |
| `wdio://session/{sessionId}/steps` | Étapes d'une session passée |
| `wdio://browserstack/local-binary` | Instructions de configuration de BrowserStack Local |
| `wdio://saucelabs/local-binary` | Instructions de configuration de Sauce Connect Proxy |
| `wdio://testmu/local-binary` | Instructions de configuration de TestMu Tunnel |
| `wdio://testingbot/local-binary` | Instructions de configuration de TestingBot Tunnel |

## Gestion automatique

### Autorisations

Par défaut, le serveur MCP accorde automatiquement les autorisations aux applications (`autoGrantPermissions: true`), ce qui élimine le besoin de gérer manuellement les boîtes de dialogue d'autorisation pendant l'automatisation.

### Alertes système

Les alertes système (comme « Autoriser les notifications ? ») sont automatiquement acceptées par défaut (`autoAcceptAlerts: true`). Il est possible de configurer leur refus à la place avec `autoDismissAlerts: true`.

## Transport

Par défaut, le serveur fonctionne via **stdio** (lancé en tant que sous-processus par le client IA). Pour les clients qui ne prennent pas en charge le MCP basé sur des sous-processus (llama.cpp, mode sécurisé de Codex), utilisez le **transport HTTP** :

```bash
npx @wdio/mcp --http --port 3000
```

Consultez [Transport](./mcp/transport) pour toutes les options, y compris `--allowedHosts` et `--allowedOrigins`.

## Optimisation des performances

Le serveur MCP est optimisé pour une communication efficace avec les assistants IA :

-   **Format TOON** : Utilise la Token-Oriented Object Notation pour minimiser l'utilisation de tokens
-   **Analyse XML** : La détection des éléments mobiles utilise 2 appels HTTP (contre plus de 600 traditionnellement)
-   **Compression des captures d'écran** : Images compressées automatiquement à 1 Mo maximum
-   **Filtrage par viewport** : Seuls les éléments visibles sont renvoyés par défaut
-   **Pagination** : Les grandes listes d'éléments peuvent être paginées pour réduire la taille des réponses

## Gestion des erreurs

Tous les outils sont conçus avec une gestion robuste des erreurs :

-   Les erreurs sont renvoyées sous forme de contenu textuel (jamais levées), ce qui préserve la stabilité du protocole MCP
-   Des messages d'erreur descriptifs aident à diagnostiquer les problèmes
-   L'état de la session est préservé même lorsque des opérations individuelles échouent

## Cas d'utilisation

### Assurance qualité

-   Exécution de cas de test assistée par l'IA
-   Tests de régression visuelle avec captures d'écran
-   Audit d'accessibilité via l'analyse de l'arbre d'accessibilité

### Web scraping et extraction de données

-   Naviguer dans des parcours complexes sur plusieurs pages
-   Extraire des données structurées à partir de contenu dynamique
-   Gérer l'authentification et la gestion des sessions

### Test d'applications mobiles

-   Automatisation de tests multiplateforme (iOS + Android)
-   Validation des parcours d'intégration (onboarding)
-   Tests de deep linking et de navigation

### Tests d'intégration

-   Tests de workflows de bout en bout
-   Vérification de l'intégration API + UI
-   Contrôles de cohérence multiplateforme

## Dépannage

### Le navigateur ne démarre pas

-   Assurez-vous que le navigateur cible est installé
-   Vérifiez qu'aucun autre processus n'utilise le port de débogage par défaut (9222)
-   Essayez le mode headless en cas de problèmes d'affichage

### Échec de la connexion à Appium

-   Vérifiez que le serveur Appium est en cours d'exécution (`appium`)
-   Vérifiez l'hôte et le port d'Appium dans `appiumConfig`
-   Assurez-vous que le pilote approprié est installé (`appium driver list`)

### Problèmes avec le simulateur iOS

-   Assurez-vous que Xcode est installé et à jour
-   Vérifiez que des simulateurs sont disponibles (`xcrun simctl list devices`)
-   Pour les appareils réels, vérifiez que l'UDID est correct

### Problèmes avec l'émulateur Android

-   Assurez-vous que le SDK Android est correctement configuré
-   Vérifiez que l'émulateur est en cours d'exécution (`adb devices`)
-   Vérifiez que la variable d'environnement `ANDROID_HOME` est définie

## Ressources

-   [Référence des outils](./mcp/tools) - Liste complète des outils disponibles
-   [Référence des ressources](./mcp/resources) - Ressources MCP pour l'état de la session en temps réel
-   [Guide des sélecteurs](./mcp/selectors) - Documentation de la syntaxe des sélecteurs
-   [Configuration](./mcp/configuration) - Options de configuration
-   [Transport](./mcp/transport) - Configuration du transport HTTP
-   [Fournisseurs cloud](./mcp/cloud-providers) - Intégration cloud BrowserStack, Sauce Labs, TestMu et TestingBot
-   [FAQ](./mcp/faq) - Questions fréquemment posées
-   [Dépôt GitHub](https://github.com/webdriverio/mcp) - Code source et tickets
-   [Package NPM](https://www.npmjs.com/package/@wdio/mcp) - Package sur npm
-   [Model Context Protocol](https://modelcontextprotocol.io/) - Spécification MCP