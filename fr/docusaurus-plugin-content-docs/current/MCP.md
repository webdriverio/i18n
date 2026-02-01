---
id: mcp
title: MCP (Protocole de Contexte de Modèle)
---

## Que peut-il faire ?

WebdriverIO MCP est un **serveur de Protocole de Contexte de Modèle (MCP)** qui permet aux assistants IA comme Claude Desktop et Claude Code d'automatiser et d'interagir avec les navigateurs web et les applications mobiles.

### Pourquoi WebdriverIO MCP ?

-   **Mobile en premier** : Contrairement aux serveurs MCP limités aux navigateurs, WebdriverIO MCP prend en charge l'automatisation d'applications natives iOS et Android via Appium
-   **Sélecteurs multi-plateformes** : La détection intelligente des éléments génère automatiquement plusieurs stratégies de localisation (ID d'accessibilité, XPath, UiAutomator, prédicats iOS)
-   **Écosystème WebdriverIO** : Construit sur le framework WebdriverIO éprouvé avec son riche écosystème de services et de rapporteurs

Il fournit une interface unifiée pour :

-   🖥️ **Navigateurs de bureau** (Chrome - en mode visible ou headless)
-   📱 **Applications mobiles natives** (Simulateurs iOS / Émulateurs Android / Appareils réels via Appium)
-   📳 **Applications mobiles hybrides** (Changement de contexte natif + WebView via Appium)

grâce au package [`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp).

Cela permet aux assistants IA de :

-   **Lancer et contrôler des navigateurs** avec des dimensions configurables, en mode headless, et une navigation initiale optionnelle
-   **Naviguer sur des sites web** et interagir avec les éléments (cliquer, taper, défiler)
-   **Analyser le contenu de la page** via l'arbre d'accessibilité et la détection d'éléments visibles avec support de pagination
-   **Prendre des captures d'écran** automatiquement optimisées (redimensionnées, compressées à 1Mo maximum)
-   **Gérer les cookies** pour la gestion des sessions
-   **Contrôler les appareils mobiles** y compris les gestes (taper, glisser, glisser-déposer)
-   **Changer de contexte** dans les applications hybrides entre natif et webview
-   **Exécuter des scripts** - JavaScript dans les navigateurs, commandes mobiles Appium sur les appareils
-   **Gérer les fonctionnalités des appareils** comme la rotation, le clavier, la géolocalisation
-   et bien plus encore, voir les options [Outils](./mcp/tools) et [Configuration](./mcp/configuration)

:::info

REMARQUE pour les applications mobiles
L'automatisation mobile nécessite un serveur Appium en cours d'exécution avec les pilotes appropriés installés. Voir [Prérequis](#prerequisites) pour les instructions d'installation.

:::

## Installation

La façon la plus simple d'utiliser `@wdio/mcp` est via npx sans installation locale :

```sh
npx @wdio/mcp
```

Ou l'installer globalement :

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

Après avoir ajouté la configuration, redémarrez Claude. Les outils WebdriverIO MCP seront disponibles pour les tâches d'automatisation de navigateur et de mobile.

### Utilisation avec Claude Code

Claude Code détecte automatiquement les serveurs MCP. Vous pouvez le configurer dans le fichier `.claude/settings.json` ou `.mcp.json` de votre projet.

Ou l'ajouter globalement à .claude.json en exécutant :
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
Validez-le en exécutant la commande `/mcp` dans Claude Code.

## Exemples de démarrage rapide

### Automatisation de navigateur

Demandez à Claude d'automatiser les tâches du navigateur :

```
"Ouvrir Chrome et naviguer vers https://webdriver.io"
"Cliquer sur le bouton 'Get Started'"
"Prendre une capture d'écran de la page"
"Trouver tous les liens visibles sur la page"
```

### Automatisation d'applications mobiles

Demandez à Claude d'automatiser les applications mobiles :

```
"Démarrer mon application iOS sur le simulateur iPhone 15"
"Appuyer sur le bouton de connexion"
"Glisser vers le haut pour faire défiler vers le bas"
"Prendre une capture d'écran de l'écran actuel"
```

## Capacités

### Automatisation de navigateur (Chrome)

| Fonctionnalité | Description |
|---------|-------------|
| **Gestion des sessions** | Lancer Chrome en mode visible/headless avec dimensions personnalisées et URL de navigation optionnelle |
| **Navigation** | Naviguer vers des URLs |
| **Interaction avec les éléments** | Cliquer sur des éléments, taper du texte, trouver des éléments par divers sélecteurs |
| **Analyse de page** | Obtenir les éléments visibles (avec pagination), arbre d'accessibilité (avec filtrage) |
| **Captures d'écran** | Capturer des captures d'écran (auto-optimisées à 1Mo max) |
| **Défilement** | Défiler vers le haut/bas par nombre de pixels configurable |
| **Gestion des cookies** | Obtenir, définir et supprimer des cookies |
| **Exécution de scripts** | Exécuter du JavaScript personnalisé dans le contexte du navigateur |

### Automatisation d'applications mobiles (iOS/Android)

| Fonctionnalité | Description |
|---------|-------------|
| **Gestion des sessions** | Lancer des applications sur simulateurs, émulateurs ou appareils réels |
| **Gestes tactiles** | Taper, glisser, glisser-déposer |
| **Détection d'éléments** | Détection intelligente d'éléments avec stratégies de localisation multiples et pagination |
| **Cycle de vie de l'application** | Obtenir l'état de l'application (via `execute_script` pour activer/terminer) |
| **Changement de contexte** | Basculer entre les contextes natifs et webview dans les applications hybrides |
| **Contrôle de l'appareil** | Rotation de l'appareil, contrôle du clavier |
| **Géolocalisation** | Obtenir et définir les coordonnées GPS de l'appareil |
| **Permissions** | Gestion automatique des permissions et des alertes |
| **Exécution de scripts** | Exécuter des commandes mobiles Appium (pressKey, deepLink, shell, etc.) |

## Prérequis

### Automatisation de navigateur

-   **Chrome** doit être installé sur votre système
-   WebdriverIO gère automatiquement ChromeDriver

### Automatisation mobile

#### iOS

1. **Installer Xcode** depuis le Mac App Store
2. **Installer les outils de ligne de commande Xcode** :
   ```sh
   xcode-select --install
   ```
3. **Installer Appium** :
   ```sh
   npm install -g appium
   ```
4. **Installer le pilote XCUITest** :
   ```sh
   appium driver install xcuitest
   ```
5. **Démarrer le serveur Appium** :
   ```sh
   appium
   ```
6. **Pour les simulateurs** : Ouvrir Xcode → Fenêtre → Appareils et simulateurs pour créer/gérer les simulateurs
7. **Pour les appareils réels** : Vous aurez besoin de l'UDID de l'appareil (identifiant unique de 40 caractères)

#### Android

1. **Installer Android Studio** et configurer le SDK Android
2. **Définir les variables d'environnement** :
   ```sh
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. **Installer Appium** :
   ```sh
   npm install -g appium
   ```
4. **Installer le pilote UiAutomator2** :
   ```sh
   appium driver install uiautomator2
   ```
5. **Démarrer le serveur Appium** :
   ```sh
   appium
   ```
6. **Créer un émulateur** via Android Studio → Gestionnaire d'appareils virtuels
7. **Démarrer l'émulateur** avant d'exécuter les tests

## Architecture

### Comment ça fonctionne

WebdriverIO MCP agit comme un pont entre les assistants IA et l'automatisation du navigateur/mobile :

```
┌─────────────────┐     Protocole MCP      ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  ou Claude Code │      (stdio)          │     Serveur      │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             API WebDriverIO
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Chrome     │             │    Appium     │             │    Appium     │
            │   (Navigateur)│             │     (iOS)     │             │   (Android)   │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### Gestion des sessions

-   **Modèle mono-session** : Une seule session de navigateur OU d'application peut être active à la fois
-   **État de session** est maintenu globalement à travers les appels d'outils
-   **Auto-détachement** : Les sessions avec état préservé (`noReset: true`) se détachent automatiquement à la fermeture

### Détection d'éléments

#### Navigateur (Web)

-   Utilise un script de navigateur optimisé pour trouver tous les éléments visibles et interactifs
-   Retourne les éléments avec les sélecteurs CSS, IDs, classes et informations ARIA
-   Filtre par défaut les éléments visibles dans la fenêtre d'affichage

#### Mobile (Applications natives)

-   Utilise l'analyse efficace de la source de page XML (2 appels HTTP contre 600+ pour les requêtes traditionnelles)
-   Classification d'éléments spécifique à la plateforme pour Android et iOS
-   Génère plusieurs stratégies de localisation par élément :
    -   ID d'accessibilité (multi-plateforme, plus stable)
    -   ID de ressource / attribut Name
    -   Correspondance de texte / étiquette
    -   XPath (complet et simplifié)
    -   UiAutomator (Android) / Prédicats (iOS)

## Syntaxe des sélecteurs

Le serveur MCP prend en charge plusieurs stratégies de sélection. Voir [Sélecteurs](./mcp/selectors) pour une documentation détaillée.

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
button=Texte exact du bouton
a*=Texte partiel du lien
```

### Mobile (Multi-plateformes)

```
# ID d'accessibilité (recommandé - fonctionne sur iOS & Android)
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

Le serveur MCP fournit 25 outils pour l'automatisation de navigateurs et d'applications mobiles. Voir [Outils](./mcp/tools) pour la référence complète.

### Outils de navigateur

| Outil | Description |
|------|-------------|
| `start_browser` | Lancer le navigateur Chrome (avec URL initiale optionnelle) |
| `close_session` | Fermer ou se détacher d'une session |
| `navigate` | Naviguer vers une URL |
| `click_element` | Cliquer sur un élément |
| `set_value` | Taper du texte dans un champ |
| `get_visible_elements` | Obtenir les éléments visibles/interactifs (avec pagination) |
| `get_accessibility` | Obtenir l'arbre d'accessibilité (avec filtrage) |
| `take_screenshot` | Capturer une capture d'écran (auto-optimisée) |
| `scroll` | Faire défiler la page vers le haut ou le bas |
| `get_cookies` / `set_cookie` / `delete_cookies` | Gestion des cookies |
| `execute_script` | Exécuter du JavaScript dans le navigateur |

### Outils mobiles

| Outil | Description |
|------|-------------|
| `start_app_session` | Lancer une application iOS/Android |
| `tap_element` | Appuyer sur un élément ou des coordonnées |
| `swipe` | Glisser dans une direction |
| `drag_and_drop` | Glisser entre des emplacements |
| `get_app_state` | Vérifier si l'application est en cours d'exécution |
| `get_contexts` / `switch_context` | Changement de contexte pour applications hybrides |
| `rotate_device` | Faire pivoter en mode portrait/paysage |
| `get_geolocation` / `set_geolocation` | Obtenir ou définir les coordonnées GPS |
| `hide_keyboard` | Masquer le clavier à l'écran |
| `execute_script` | Exécuter des commandes mobiles Appium |

## Gestion automatique

### Permissions

Par défaut, le serveur MCP accorde automatiquement les permissions d'application (`autoGrantPermissions: true`), éliminant le besoin de gérer manuellement les boîtes de dialogue de permission pendant l'automatisation.

### Alertes système

Les alertes système (comme "Autoriser les notifications ?") sont automatiquement acceptées par défaut (`autoAcceptAlerts: true`). Cela peut être configuré pour les rejeter avec `autoDismissAlerts: true`.

## Configuration

### Variables d'environnement

Configurer la connexion au serveur Appium :

| Variable | Par défaut | Description |
|----------|---------|-------------|
| `APPIUM_URL` | `127.0.0.1` | Nom d'hôte du serveur Appium |
| `APPIUM_URL_PORT` | `4723` | Port du serveur Appium |
| `APPIUM_PATH` | `/` | Chemin du serveur Appium |

### Exemple avec serveur Appium personnalisé

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

## Optimisation des performances

Le serveur MCP est optimisé pour une communication efficace avec l'assistant IA :

-   **Format TOON** : Utilise Token-Oriented Object Notation pour minimiser l'utilisation de jetons
-   **Analyse XML** : La détection d'éléments mobiles utilise 2 appels HTTP (contre 600+ traditionnellement)
-   **Compression de captures d'écran** : Images auto-compressées à 1Mo maximum à l'aide de Sharp
-   **Filtrage de la vue** : Seuls les éléments visibles sont renvoyés par défaut
-   **Pagination** : Les grandes listes d'éléments peuvent être paginées pour réduire la taille de la réponse

## Support TypeScript

Le serveur MCP est écrit en TypeScript et inclut des définitions de types complètes. Si vous étendez ou intégrez le serveur par programmation, vous bénéficierez de l'auto-complétion et de la sécurité des types.

## Gestion des erreurs

Tous les outils sont conçus avec une gestion robuste des erreurs :

-   Les erreurs sont renvoyées sous forme de contenu textuel (jamais levées), maintenant la stabilité du protocole MCP
-   Les messages d'erreur descriptifs aident à diagnostiquer les problèmes
-   L'état de la session est préservé même lorsque des opérations individuelles échouent

## Cas d'utilisation

### Assurance qualité

-   Exécution de cas de test alimentée par l'IA
-   Tests de régression visuelle avec captures d'écran
-   Audit d'accessibilité via l'analyse de l'arbre d'accessibilité

### Web scraping et extraction de données

-   Navigation dans des flux complexes multi-pages
-   Extraction de données structurées à partir de contenu dynamique
-   Gestion de l'authentification et des sessions

### Test d'applications mobiles

-   Automatisation de tests multi-plateformes (iOS + Android)
-   Validation des flux d'intégration
-   Tests de liens profonds et de navigation

### Tests d'intégration

-   Tests de flux de travail de bout en bout
-   Vérification d'intégration API + UI
-   Vérifications de cohérence multi-plateformes

## Dépannage

### Le navigateur ne démarre pas

-   Assurez-vous que Chrome est installé
-   Vérifiez qu'aucun autre processus n'utilise le port de débogage par défaut (9222)
-   Essayez le mode headless si des problèmes d'affichage surviennent

### Échec de connexion à Appium

-   Vérifiez que le serveur Appium est en cours d'exécution (`appium`)
-   Vérifiez la configuration de l'URL et du port Appium
-   Assurez-vous que le pilote approprié est installé (`appium driver list`)

### Problèmes de simulateur iOS

-   Assurez-vous que Xcode est installé et à jour
-   Vérifiez que les simulateurs sont disponibles (`xcrun simctl list devices`)
-   Pour les appareils réels, vérifiez que l'UDID est correct

### Problèmes d'émulateur Android

-   Assurez-vous que le SDK Android est correctement configuré
-   Vérifiez que l'émulateur fonctionne (`adb devices`)
-   Vérifiez que la variable d'environnement `ANDROID_HOME` est définie

## Ressources

-   [Référence des outils](./mcp/tools) - Liste complète des outils disponibles
-   [Guide des sélecteurs](./mcp/selectors) - Documentation de syntaxe des sélecteurs
-   [Configuration](./mcp/configuration) - Options de configuration
-   [FAQ](./mcp/faq) - Questions fréquemment posées
-   [Dépôt GitHub](https://github.com/webdriverio/mcp) - Code source et problèmes
-   [Package NPM](https://www.npmjs.com/package/@wdio/mcp) - Package sur npm
-   [Protocole de Contexte de Modèle](https://modelcontextprotocol.io/) - Spécification MCP