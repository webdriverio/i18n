---
id: configuration
title: Configuration
---

Cette page documente toutes les options de configuration pour le serveur WebdriverIO MCP.

## Configuration du serveur MCP

Le serveur MCP est configuré via les fichiers de configuration de Claude Desktop ou Claude Code.

### Configuration de base

#### macOS

Modifiez `~/Library/Application Support/Claude/claude_desktop_config.json` :

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

#### Windows

Modifiez `%APPDATA%\Claude\claude_desktop_config.json` :

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

#### Claude Code

Modifiez le fichier `.claude/settings.json` de votre projet :

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

---

## Variables d'environnement

Configurez la connexion au serveur Appium et autres paramètres via des variables d'environnement.

### Connexion Appium

| Variable | Type | Par défaut | Description |
|----------|------|------------|-------------|
| `APPIUM_URL` | string | `127.0.0.1` | Nom d'hôte du serveur Appium |
| `APPIUM_URL_PORT` | number | `4723` | Port du serveur Appium |
| `APPIUM_PATH` | string | `/` | Chemin du serveur Appium |

### Exemple avec variables d'environnement

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724",
                "APPIUM_PATH": "/wd/hub"
            }
        }
    }
}
```

---

## Options de session de navigateur

Options disponibles lors du démarrage d'une session de navigateur via l'outil `start_browser`.

### `headless`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Par défaut:** `false`

Exécuter Chrome en mode headless (sans fenêtre de navigateur visible). Utile pour les environnements CI/CD ou lorsque vous n'avez pas besoin de voir le navigateur.

### `windowWidth`

-   **Type:** `number`
-   **Obligatoire:** Non
-   **Par défaut:** `1920`
-   **Plage:** `400` - `3840`

Largeur initiale de la fenêtre du navigateur en pixels.

### `windowHeight`

-   **Type:** `number`
-   **Obligatoire:** Non
-   **Par défaut:** `1080`
-   **Plage:** `400` - `2160`

Hauteur initiale de la fenêtre du navigateur en pixels.

### `navigationUrl`

-   **Type:** `string`
-   **Obligatoire:** Non

URL vers laquelle naviguer immédiatement après le démarrage du navigateur. C'est plus efficace que d'appeler `start_browser` suivi de `navigate` séparément.

**Exemple:** Démarrer le navigateur et naviguer en un seul appel:
```
Start Chrome and navigate to https://webdriver.io
```

---

## Options de session mobile

Options disponibles lors du démarrage d'une session d'application mobile via l'outil `start_app_session`.

### Options de plateforme

#### `platform`

-   **Type:** `string`
-   **Obligatoire:** Oui
-   **Valeurs:** `iOS` | `Android`

La plateforme mobile à automatiser.

#### `platformVersion`

-   **Type:** `string`
-   **Obligatoire:** Non

La version du système d'exploitation de l'appareil/simulateur/émulateur (par ex., `17.0` pour iOS, `14` pour Android).

#### `automationName`

-   **Type:** `string`
-   **Obligatoire:** Non
-   **Valeurs:** `XCUITest` (iOS), `UiAutomator2` | `Espresso` (Android)

Le pilote d'automatisation à utiliser. Par défaut, `XCUITest` pour iOS et `UiAutomator2` pour Android.

### Options d'appareil

#### `deviceName`

-   **Type:** `string`
-   **Obligatoire:** Oui

Nom de l'appareil, du simulateur ou de l'émulateur à utiliser.

**Exemples:**
-   Simulateur iOS: `iPhone 15 Pro`, `iPad Air (5th generation)`
-   Émulateur Android: `Pixel 7`, `Nexus 5X`
-   Appareil réel: Le nom de l'appareil tel qu'affiché dans votre système

#### `udid`

-   **Type:** `string`
-   **Obligatoire:** Non (Requis pour les appareils iOS réels)

Identifiant unique d'appareil. Requis pour les appareils iOS réels (identifiant de 40 caractères) et recommandé pour les appareils Android réels.

**Pour trouver l'UDID:**
-   **iOS:** Connectez l'appareil, ouvrez Finder/iTunes, cliquez sur l'appareil → Numéro de série (cliquez pour révéler l'UDID)
-   **Android:** Exécutez `adb devices` dans le terminal

### Options d'application

#### `appPath`

-   **Type:** `string`
-   **Obligatoire:** Non*

Chemin vers le fichier d'application à installer et lancer.

**Formats pris en charge:**
-   Simulateur iOS: répertoire `.app`
-   Appareil iOS réel: fichier `.ipa`
-   Android: fichier `.apk`

*Soit `appPath` doit être fourni, soit `noReset: true` pour se connecter à une application déjà en cours d'exécution.

#### `appWaitActivity`

-   **Type:** `string`
-   **Obligatoire:** Non (Android uniquement)

Activité à attendre au lancement de l'application. Si non spécifié, l'activité principale/de lancement de l'application est utilisée.

**Exemple:** `com.example.app.MainActivity`

### Options d'état de session

#### `noReset`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Par défaut:** `false`

Préserver l'état de l'application entre les sessions. Quand `true`:
-   Les données de l'application sont préservées (état de connexion, préférences, etc.)
-   La session se **détachera** au lieu de se fermer (garde l'application en cours d'exécution)
-   Utile pour tester les parcours utilisateur sur plusieurs sessions
-   Peut être utilisé sans `appPath` pour se connecter à une application déjà en cours d'exécution

#### `fullReset`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Par défaut:** `true`

Réinitialise complètement l'application avant la session. Quand `true`:
-   iOS: Désinstalle et réinstalle l'application
-   Android: Efface les données et le cache de l'application
-   Utile pour commencer avec un état propre

Définissez `fullReset: false` avec `noReset: true` pour préserver complètement l'état de l'application.

### Délai d'expiration de session

#### `newCommandTimeout`

-   **Type:** `number`
-   **Obligatoire:** Non
-   **Par défaut:** `60`

Combien de temps (en secondes) Appium attendra une nouvelle commande avant de supposer que le client a quitté et de mettre fin à la session. Augmentez cette valeur pour des sessions de débogage plus longues.

**Exemples:**
-   `60` - Par défaut, convient à la plupart des automatisations
-   `300` - 5 minutes, pour le débogage ou les opérations plus lentes
-   `600` - 10 minutes, pour les tests très longs

### Options de gestion automatique

#### `autoGrantPermissions`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Par défaut:** `true`

Accorde automatiquement les permissions de l'application lors de l'installation/du lancement. Quand `true`:
-   Les permissions pour caméra, microphone, localisation, etc. sont accordées automatiquement
-   Aucune gestion manuelle des boîtes de dialogue de permission n'est nécessaire
-   Simplifie l'automatisation en évitant les popups de permission

:::note Android uniquement
Cette option affecte principalement Android. Les permissions iOS doivent être gérées différemment en raison des restrictions du système.
:::

#### `autoAcceptAlerts`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Par défaut:** `true`

Accepte automatiquement les alertes système (boîtes de dialogue) qui apparaissent pendant l'automatisation.

**Exemples d'alertes auto-acceptées:**
-   "Autoriser les notifications ?"
-   "L'application souhaite accéder à votre localisation"
-   "Autoriser l'application à accéder aux photos ?"

#### `autoDismissAlerts`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Par défaut:** `false`

Rejette (annule) les alertes système au lieu de les accepter. A priorité sur `autoAcceptAlerts` quand défini à `true`.

### Remplacement du serveur Appium

Vous pouvez remplacer la connexion au serveur Appium pour chaque session:

#### `appiumHost`

-   **Type:** `string`
-   **Obligatoire:** Non

Nom d'hôte du serveur Appium. Remplace la variable d'environnement `APPIUM_URL`.

#### `appiumPort`

-   **Type:** `number`
-   **Obligatoire:** Non

Port du serveur Appium. Remplace la variable d'environnement `APPIUM_URL_PORT`.

#### `appiumPath`

-   **Type:** `string`
-   **Obligatoire:** Non

Chemin du serveur Appium. Remplace la variable d'environnement `APPIUM_PATH`.

---

## Options de détection d'éléments

Options pour l'outil `get_visible_elements`.

### `elementType`

-   **Type:** `string`
-   **Obligatoire:** Non
-   **Par défaut:** `interactable`
-   **Valeurs:** `interactable` | `visual` | `all`

Type d'éléments à retourner:
-   `interactable`: Boutons, liens, champs de saisie et autres éléments cliquables
-   `visual`: Images, SVGs et éléments visuels
-   `all`: Éléments interactifs et visuels

### `inViewportOnly`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Par défaut:** `true`

Retourne uniquement les éléments visibles dans la fenêtre actuelle. Quand `false`, retourne tous les éléments dans la hiérarchie de vue (utile pour trouver des éléments hors écran).

### `includeContainers`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Par défaut:** `false`

Inclut les éléments conteneurs/de mise en page dans les résultats. Quand `true`:

**Conteneurs Android inclus:**
-   `ViewGroup`, `FrameLayout`, `LinearLayout`
-   `RelativeLayout`, `ConstraintLayout`
-   `ScrollView`, `RecyclerView`

**Conteneurs iOS inclus:**
-   `View`, `StackView`, `CollectionView`
-   `ScrollView`, `TableView`

Utile pour déboguer les problèmes de mise en page ou comprendre la hiérarchie des vues.

### `includeBounds`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Par défaut:** `false`

Inclut les limites/coordonnées des éléments (x, y, largeur, hauteur) dans la réponse. Définissez à `true` pour:
-   Interactions basées sur les coordonnées
-   Débogage de mise en page
-   Positionnement des éléments visuels

### Options de pagination

Pour les grandes pages avec de nombreux éléments, utilisez la pagination pour réduire l'utilisation de tokens:

#### `limit`

-   **Type:** `number`
-   **Obligatoire:** Non
-   **Par défaut:** `0` (illimité)

Nombre maximum d'éléments à retourner.

#### `offset`

-   **Type:** `number`
-   **Obligatoire:** Non
-   **Par défaut:** `0`

Nombre d'éléments à ignorer avant de retourner les résultats.

**Exemple:** Obtenir les éléments 21 à 40:
```
Get visible elements with limit 20 and offset 20
```

---

## Options d'arborescence d'accessibilité

Options pour l'outil `get_accessibility` (navigateur uniquement).

### `limit`

-   **Type:** `number`
-   **Obligatoire:** Non
-   **Par défaut:** `100`

Nombre maximum de nœuds à retourner. Utilisez `0` pour illimité (non recommandé pour les grandes pages).

### `offset`

-   **Type:** `number`
-   **Obligatoire:** Non
-   **Par défaut:** `0`

Nombre de nœuds à ignorer pour la pagination.

### `roles`

-   **Type:** `string[]`
-   **Obligatoire:** Non
-   **Par défaut:** Tous les rôles

Filtrer par rôles d'accessibilité spécifiques.

**Rôles courants:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**Exemple:** Obtenir uniquement les boutons et liens:
```
Get accessibility tree filtered to button and link roles
```

### `namedOnly`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Par défaut:** `true`

Retourne uniquement les nœuds qui ont un nom/étiquette. Filtre les conteneurs anonymes et réduit le bruit dans les résultats.

---

## Options de capture d'écran

Options pour l'outil `take_screenshot`.

### `outputPath`

-   **Type:** `string`
-   **Obligatoire:** Non

Chemin où enregistrer le fichier de capture d'écran. Si non fourni, retourne les données d'image encodées en base64.

### Optimisation automatique

Les captures d'écran sont automatiquement traitées pour optimiser la consommation par le LLM:

| Optimisation | Valeur | Description |
|--------------|--------|-------------|
| Dimension max | 2000px | Les images plus grandes que 2000px sont redimensionnées |
| Taille max de fichier | 1MB | Les images sont compressées pour rester sous 1MB |
| Format | PNG/JPEG | PNG avec compression maximale; JPEG si nécessaire pour la taille |

Cette optimisation garantit que les captures d'écran peuvent être traitées efficacement sans dépasser les limites de tokens.

---

## Comportement de session

### Types de session

Le serveur MCP suit les types de sessions pour fournir des outils et comportements appropriés:

| Type | Description | Auto-Détachement |
|------|-------------|------------------|
| `browser` | Session de navigateur Chrome | Non |
| `ios` | Session d'application iOS | Oui (si `noReset: true` ou pas d'`appPath`) |
| `android` | Session d'application Android | Oui (si `noReset: true` ou pas d'`appPath`) |

### Modèle à session unique

Le serveur MCP fonctionne avec un **modèle à session unique**:

-   Une seule session de navigateur OU d'application peut être active à la fois
-   Démarrer une nouvelle session fermera/détachera la session actuelle
-   L'état de la session est maintenu globalement à travers les appels d'outils

### Détacher vs Fermer

| Action | `detach: false` (Fermer) | `detach: true` (Détacher) |
|--------|--------------------------|----------------------------|
| Navigateur | Ferme complètement Chrome | Garde Chrome en cours d'exécution, déconnecte WebDriver |
| Application mobile | Termine l'application | Garde l'application en cours d'exécution dans son état actuel |
| Cas d'utilisation | Départ propre pour la prochaine session | Préserve l'état, inspection manuelle |

---

## Considérations de performance

Le serveur MCP est optimisé pour une communication LLM efficace en utilisant le format **TOON (Token-Oriented Object Notation)**, qui minimise l'utilisation de tokens lors de l'envoi de données à Claude.

### Automatisation de navigateur

-   Le **mode headless** est plus rapide mais ne rend pas les éléments visuels
-   Les **tailles de fenêtre plus petites** réduisent le temps de capture d'écran
-   La **détection d'éléments** est optimisée avec une seule exécution de script
-   L'**optimisation des captures d'écran** maintient les images sous 1MB pour un traitement efficace
-   **`inViewportOnly: true`** (par défaut) filtre pour n'avoir que les éléments visibles

### Automatisation mobile

-   L'**analyse de la source de page XML** utilise seulement 2 appels HTTP (contre 600+ pour les requêtes d'éléments traditionnelles)
-   Les **sélecteurs d'ID d'accessibilité** sont les plus rapides et les plus fiables
-   Les **sélecteurs XPath** sont les plus lents - à n'utiliser qu'en dernier recours
-   **`inViewportOnly: true`** (par défaut) réduit significativement le nombre d'éléments
-   La **pagination** (`limit` et `offset`) réduit l'utilisation de tokens pour les écrans avec de nombreux éléments
-   **`includeBounds: false`** (par défaut) omet les données de coordonnées sauf si nécessaire

### Conseils d'utilisation des tokens

| Paramètre | Impact |
|-----------|--------|
| `inViewportOnly: true` | Filtre les éléments hors écran, réduisant la taille de la réponse |
| `includeContainers: false` | Exclut les éléments de mise en page (ViewGroup, etc.) |
| `includeBounds: false` | Omet les données x/y/largeur/hauteur |
| `limit` avec pagination | Traite les éléments par lots au lieu de tous à la fois |
| `namedOnly: true` (accessibilité) | Filtre les nœuds anonymes |

---

## Configuration du serveur Appium

Avant d'utiliser l'automatisation mobile, assurez-vous que Appium est correctement configuré.

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

### Configuration de serveur personnalisée

```sh
# Démarrer avec un hôte et un port personnalisés
appium --address 0.0.0.0 --port 4724

# Démarrer avec journalisation
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

---

## Dépannage de la configuration

### Le serveur MCP ne démarre pas

1. Vérifiez que npm/npx est installé: `npm --version`
2. Essayez de l'exécuter manuellement: `npx @wdio/mcp`
3. Vérifiez les journaux de Claude Desktop pour les erreurs

### Problèmes de connexion Appium

1. Vérifiez qu'Appium est en cours d'exécution: `curl http://localhost:4723/status`
2. Vérifiez que les variables d'environnement correspondent aux paramètres du serveur Appium
3. Assurez-vous que le pare-feu autorise les connexions sur le port Appium

### La session ne démarre pas

1. **Navigateur:** Assurez-vous que Chrome est installé
2. **iOS:** Vérifiez que Xcode et les simulateurs sont disponibles
3. **Android:** Vérifiez `ANDROID_HOME` et que l'émulateur est en cours d'exécution
4. Consultez les journaux du serveur Appium pour des messages d'erreur détaillés

### Délais d'expiration de session

Si les sessions expirent pendant le débogage:
1. Augmentez `newCommandTimeout` lors du démarrage de la session
2. Utilisez `noReset: true` pour préserver l'état entre les sessions
3. Utilisez `detach: true` lors de la fermeture pour maintenir l'application en cours d'exécution