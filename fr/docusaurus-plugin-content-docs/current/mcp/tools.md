---
id: tools
title: Outils
---

Les outils suivants sont disponibles via le serveur WebdriverIO MCP. Ces outils permettent aux assistants IA d'automatiser les navigateurs et les applications mobiles.

## Gestion des sessions

### `start_browser`

Lance une session de navigateur Chrome.

#### Paramètres

| Paramètre | Type | Obligatoire | Par défaut | Description |
|-----------|------|-------------|------------|-------------|
| `headless` | boolean | Non | `false` | Exécuter Chrome en mode headless |
| `windowWidth` | number | Non | `1920` | Largeur de la fenêtre du navigateur (400-3840) |
| `windowHeight` | number | Non | `1080` | Hauteur de la fenêtre du navigateur (400-2160) |
| `navigationUrl` | string | Non | - | URL vers laquelle naviguer après le démarrage du navigateur |

#### Exemple

```
Start a browser with 1920x1080 resolution and navigate to webdriver.io
```

#### Support

- Navigateurs de bureau

---

### `start_app_session`

Lance une session d'application mobile sur iOS ou Android via Appium.

#### Paramètres

| Paramètre | Type | Obligatoire | Par défaut | Description |
|-----------|------|-------------|------------|-------------|
| `platform` | string | Oui | - | Plateforme à automatiser: `iOS` ou `Android` |
| `deviceName` | string | Oui | - | Nom de l'appareil ou du simulateur/émulateur |
| `appPath` | string | Non* | - | Chemin vers le fichier de l'application (.app, .ipa, ou .apk) |
| `platformVersion` | string | Non | - | Version du système d'exploitation (ex: `17.0`, `14`) |
| `automationName` | string | Non | Auto | `XCUITest` (iOS), `UiAutomator2` ou `Espresso` (Android) |
| `udid` | string | Non | - | Identifiant unique de l'appareil (requis pour les appareils iOS réels) |
| `noReset` | boolean | Non | `false` | Préserver l'état de l'application entre les sessions |
| `fullReset` | boolean | Non | `true` | Désinstaller et réinstaller l'application avant la session |
| `autoGrantPermissions` | boolean | Non | `true` | Accorder automatiquement les permissions à l'application |
| `autoAcceptAlerts` | boolean | Non | `true` | Accepter automatiquement les alertes système |
| `autoDismissAlerts` | boolean | Non | `false` | Rejeter (au lieu d'accepter) les alertes |
| `appWaitActivity` | string | Non | - | Activité à attendre au lancement (Android uniquement) |
| `newCommandTimeout` | number | Non | `60` | Secondes avant l'expiration de la session due à l'inactivité |
| `appiumHost` | string | Non | `127.0.0.1` | Nom d'hôte du serveur Appium |
| `appiumPort` | number | Non | `4723` | Port du serveur Appium |
| `appiumPath` | string | Non | `/` | Chemin du serveur Appium |

*Soit `appPath` doit être fourni, soit `noReset: true` pour se connecter à une application déjà en cours d'exécution.

#### Exemple

```
Start an iOS app session on iPhone 15 simulator with my app at /path/to/app.app
```

#### Support

- Simulateurs iOS
- Appareils iOS réels
- Émulateurs Android
- Appareils Android réels

---

### `close_session`

Ferme la session de navigateur ou d'application en cours.

#### Paramètres

| Paramètre | Type | Obligatoire | Par défaut | Description |
|-----------|------|-------------|------------|-------------|
| `detach` | boolean | Non | `false` | Se détacher de la session au lieu de la fermer (garde le navigateur/l'application en cours d'exécution) |

#### Remarques

Les sessions avec `noReset: true` ou sans `appPath` se détachent automatiquement à la fermeture pour préserver l'état.

#### Support

- Navigateurs de bureau
- Applications mobiles

---

## Navigation

### `navigate`

Navigue vers une URL.

#### Paramètres

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `url` | string | Oui | L'URL vers laquelle naviguer |

#### Exemple

```
Navigate to https://webdriver.io
```

#### Support

- Navigateurs de bureau

---

## Interaction avec les éléments

### `click_element`

Clique sur un élément identifié par un sélecteur.

#### Paramètres

| Paramètre | Type | Obligatoire | Par défaut | Description |
|-----------|------|-------------|------------|-------------|
| `selector` | string | Oui | - | Sélecteur CSS, XPath ou sélecteur mobile |
| `scrollToView` | boolean | Non | `true` | Faire défiler l'élément dans la vue avant de cliquer |
| `timeout` | number | Non | `3000` | Temps maximum d'attente de l'élément (ms) |

#### Remarques

- Prend en charge les sélecteurs de texte WebdriverIO: `button=Exact text` ou `a*=Contains text`
- Utilise l'alignement central pour le positionnement du défilement

#### Exemple

```
Click the element with selector "#submit-button"
```

#### Support

- Navigateurs de bureau
- Applications natives mobiles

---

### `set_value`

Tape du texte dans un champ de saisie.

#### Paramètres

| Paramètre | Type | Obligatoire | Par défaut | Description |
|-----------|------|-------------|------------|-------------|
| `selector` | string | Oui | - | Sélecteur pour l'élément d'entrée |
| `value` | string | Oui | - | Texte à taper |
| `scrollToView` | boolean | Non | `true` | Faire défiler l'élément dans la vue avant de taper |
| `timeout` | number | Non | `3000` | Temps maximum d'attente de l'élément (ms) |

#### Remarques

Efface la valeur existante avant de taper le nouveau texte.

#### Exemple

```
Set the value "john@example.com" in the element with selector "#email"
```

#### Support

- Navigateurs de bureau
- Applications natives mobiles

---

## Analyse de page

### `get_visible_elements`

Récupère les éléments visibles et interactifs sur la page ou l'écran actuel. C'est l'outil principal pour découvrir quels éléments sont disponibles pour l'interaction.

#### Paramètres

| Paramètre | Type | Obligatoire | Par défaut | Description |
|-----------|------|-------------|------------|-------------|
| `elementType` | string | Non | `interactable` | Type d'éléments: `interactable` (boutons/liens/entrées), `visual` (images/SVGs), ou `all` |
| `inViewportOnly` | boolean | Non | `true` | Ne renvoyer que les éléments visibles dans la fenêtre d'affichage |
| `includeContainers` | boolean | Non | `false` | Inclure les conteneurs de mise en page (ViewGroup, ScrollView, etc.) |
| `includeBounds` | boolean | Non | `false` | Inclure les coordonnées des éléments (x, y, largeur, hauteur) |
| `limit` | number | Non | `0` | Nombre maximum d'éléments à renvoyer (0 = illimité) |
| `offset` | number | Non | `0` | Nombre d'éléments à ignorer (pour la pagination) |

#### Retourne

```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

**Les éléments web incluent:** tagName, type, id, className, textContent, value, placeholder, href, ariaLabel, role, cssSelector, isInViewport

**Les éléments mobiles incluent:** Plusieurs stratégies de localisation (ID d'accessibilité, ID de ressource, XPath, UiAutomator/predicates), type d'élément, texte, et optionnellement les limites

#### Remarques

- **Web**: Utilise un script de navigateur optimisé pour une détection rapide des éléments
- **Mobile**: Utilise une analyse XML efficace de la source de page (2 appels HTTP contre 600+ pour les requêtes d'éléments)
- Utilisez la pagination (`limit` et `offset`) pour les grandes pages afin de réduire l'utilisation des tokens

#### Exemple

```
Get all visible elements on the page with their coordinates
```

#### Support

- Navigateurs de bureau
- Applications mobiles

---

### `get_accessibility`

Récupère l'arborescence d'accessibilité de la page actuelle avec des informations sémantiques sur les rôles, les noms et les états.

#### Paramètres

| Paramètre | Type | Obligatoire | Par défaut | Description |
|-----------|------|-------------|------------|-------------|
| `limit` | number | Non | `100` | Nombre maximum de nœuds à renvoyer (0 = illimité) |
| `offset` | number | Non | `0` | Nombre de nœuds à ignorer (pour la pagination) |
| `roles` | string[] | Non | Tous | Filtrer pour des rôles spécifiques (ex: `["button", "link", "textbox"]`) |
| `namedOnly` | boolean | Non | `true` | Ne renvoyer que les nœuds avec un nom/étiquette |

#### Retourne

```json
{
  "total": 85,
  "showing": 100,
  "hasMore": false,
  "nodes": [
    { "role": "button", "name": "Submit" },
    { "role": "link", "name": "Home" }
  ]
}
```

#### Remarques

- Navigateur uniquement. Pour les applications mobiles, utilisez `get_visible_elements` à la place
- Utile lorsque `get_visible_elements` ne renvoie pas les éléments attendus
- `namedOnly: true` filtre les conteneurs anonymes et réduit le bruit

#### Support

- Navigateurs de bureau

---

## Captures d'écran

### `take_screenshot`

Capture une capture d'écran de la fenêtre d'affichage actuelle.

#### Paramètres

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `outputPath` | string | Non | Chemin pour enregistrer le fichier de capture d'écran. Si omis, renvoie les données en base64 |

#### Retourne

Données d'image encodées en base64 (PNG ou JPEG) avec des informations de taille.

#### Remarques

Les captures d'écran sont automatiquement optimisées:
- Dimension maximale: 2000px (réduite si plus grande)
- Taille de fichier maximale: 1MB
- Format: PNG avec compression maximale, ou JPEG si nécessaire pour respecter la limite de taille

#### Support

- Navigateurs de bureau
- Applications mobiles

---

## Défilement

### `scroll`

Fait défiler la page vers le haut ou vers le bas d'un nombre spécifié de pixels.

#### Paramètres

| Paramètre | Type | Obligatoire | Par défaut | Description |
|-----------|------|-------------|------------|-------------|
| `direction` | string | Oui | - | Direction de défilement: `up` ou `down` |
| `pixels` | number | Non | `500` | Nombre de pixels à faire défiler |

#### Remarques

Navigateur uniquement. Pour le défilement mobile, utilisez l'outil `swipe` à la place.

#### Support

- Navigateurs de bureau

---

## Gestion des cookies

### `get_cookies`

Récupère les cookies de la session actuelle.

#### Paramètres

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `name` | string | Non | Nom de cookie spécifique à récupérer (omettre pour tous les cookies) |

#### Retourne

Objets de cookie avec des propriétés name, value, domain, path, expiry, secure et httpOnly.

#### Support

- Navigateurs de bureau

---

### `set_cookie`

Définit un cookie dans la session actuelle.

#### Paramètres

| Paramètre | Type | Obligatoire | Par défaut | Description |
|-----------|------|-------------|------------|-------------|
| `name` | string | Oui | - | Nom du cookie |
| `value` | string | Oui | - | Valeur du cookie |
| `domain` | string | Non | Actuel | Domaine du cookie |
| `path` | string | Non | `/` | Chemin du cookie |
| `expiry` | number | Non | - | Expiration en timestamp Unix (secondes) |
| `secure` | boolean | Non | - | Indicateur secure |
| `httpOnly` | boolean | Non | - | Indicateur HttpOnly |
| `sameSite` | string | Non | - | Attribut SameSite: `strict`, `lax`, ou `none` |

#### Support

- Navigateurs de bureau

---

### `delete_cookies`

Supprime les cookies de la session actuelle.

#### Paramètres

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `name` | string | Non | Nom de cookie spécifique à supprimer (omettre pour supprimer tous) |

#### Support

- Navigateurs de bureau

---

## Gestes tactiles (Mobile)

### `tap_element`

Tape sur un élément ou des coordonnées d'écran.

#### Paramètres

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `selector` | string | Non* | Sélecteur pour l'élément à taper |
| `x` | number | Non* | Coordonnée X pour le tap |
| `y` | number | Non* | Coordonnée Y pour le tap |

*Soit `selector`, soit `x` et `y` sont requis.

#### Support

- Applications mobiles

---

### `swipe`

Effectue un geste de balayage dans la direction spécifiée.

#### Paramètres

| Paramètre | Type | Obligatoire | Par défaut | Description |
|-----------|------|-------------|------------|-------------|
| `direction` | string | Oui | - | Direction de balayage: `up`, `down`, `left`, `right` |
| `duration` | number | Non | `500` | Durée du balayage en millisecondes (100-5000) |
| `percent` | number | Non | 0.5/0.95 | Pourcentage de l'écran à balayer (0-1) |

#### Remarques

- Pourcentage par défaut: 0.5 pour les balayages verticaux, 0.95 pour les balayages horizontaux
- La direction indique le mouvement du contenu: "swipe up" fait défiler le contenu vers le haut

#### Exemple

```
Swipe up to scroll down the screen
```

#### Support

- Applications mobiles

---

### `drag_and_drop`

Fait glisser un élément vers un autre élément ou des coordonnées.

#### Paramètres

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `sourceSelector` | string | Oui | Sélecteur de l'élément source à faire glisser |
| `targetSelector` | string | Non* | Sélecteur de l'élément cible sur lequel déposer |
| `x` | number | Non* | Décalage X cible (si pas de targetSelector) |
| `y` | number | Non* | Décalage Y cible (si pas de targetSelector) |
| `duration` | number | Non | Par défaut | Durée du glissement en millisecondes (100-5000) |

*Soit `targetSelector`, soit `x` et `y` sont requis.

#### Support

- Applications mobiles

---

## Cycle de vie de l'application (Mobile)

### `get_app_state`

Récupère l'état actuel d'une application.

#### Paramètres

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `bundleId` | string | Oui | Identifiant d'application (bundle ID pour iOS, nom de package pour Android) |

#### Retourne

État de l'application: `not installed`, `not running`, `running in background (suspended)`, `running in background`, ou `running in foreground`.

#### Support

- Applications mobiles

---

## Changement de contexte (Applications hybrides)

### `get_contexts`

Liste tous les contextes disponibles (natifs et webviews).

#### Paramètres

Aucun

#### Retourne

Tableau de noms de contexte (ex: `["NATIVE_APP", "WEBVIEW_com.example.app"]`).

#### Support

- Applications hybrides mobiles

---

### `get_current_context`

Récupère le contexte actuellement actif.

#### Paramètres

Aucun

#### Retourne

Nom du contexte actuel (ex: `NATIVE_APP` ou `WEBVIEW_*`).

#### Support

- Applications hybrides mobiles

---

### `switch_context`

Bascule entre les contextes natifs et webview.

#### Paramètres

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `context` | string | Oui | Nom du contexte ou index (base 1) de `get_contexts` |

#### Exemple

```
Switch to the WEBVIEW_com.example.app context
```

#### Support

- Applications hybrides mobiles

---

## Contrôle de l'appareil (Mobile)

### `rotate_device`

Fait pivoter l'appareil vers une orientation spécifique.

#### Paramètres

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `orientation` | string | Oui | `PORTRAIT` ou `LANDSCAPE` |

#### Support

- Applications mobiles

---

### `hide_keyboard`

Masque le clavier à l'écran.

#### Paramètres

Aucun

#### Support

- Applications mobiles

---

### `get_geolocation`

Récupère les coordonnées GPS actuelles.

#### Paramètres

Aucun

#### Retourne

Objet avec `latitude`, `longitude`, et `altitude`.

#### Support

- Applications mobiles

---

### `set_geolocation`

Définit les coordonnées GPS de l'appareil.

#### Paramètres

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `latitude` | number | Oui | Coordonnée de latitude (-90 à 90) |
| `longitude` | number | Oui | Coordonnée de longitude (-180 à 180) |
| `altitude` | number | Non | Altitude en mètres |

#### Exemple

```
Set geolocation to San Francisco (37.7749, -122.4194)
```

#### Support

- Applications mobiles

---

## Exécution de scripts

### `execute_script`

Exécute du JavaScript dans le navigateur ou des commandes mobiles via Appium.

#### Paramètres

| Paramètre | Type | Obligatoire | Description |
|-----------|------|-------------|-------------|
| `script` | string | Oui | Code JavaScript (navigateur) ou commande mobile (ex: `mobile: pressKey`) |
| `args` | array | Non | Arguments pour le script |

#### Exemples de navigateur

```javascript
// Get page title
execute_script({ script: "return document.title" })

// Get scroll position
execute_script({ script: "return window.scrollY" })

// Click element by selector
execute_script({ script: "arguments[0].click()", args: ["#myButton"] })
```

#### Exemples mobiles (Appium)

```javascript
// Press back key (Android)
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Activate app
execute_script({ script: "mobile: activateApp", args: [{ appId: "com.example" }] })

// Terminate app
execute_script({ script: "mobile: terminateApp", args: [{ appId: "com.example" }] })

// Deep link
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://screen", package: "com.example" }] })

// Shell command (Android)
execute_script({ script: "mobile: shell", args: [{ command: "dumpsys", args: ["battery"] }] })
```

#### Codes de touches Android courants

| Touche | Code |
|--------|------|
| BACK | 4 |
| HOME | 3 |
| ENTER | 66 |
| MENU | 82 |
| SEARCH | 84 |

#### Plus de commandes mobiles

Pour une liste complète des commandes mobiles Appium disponibles, voir:
- [XCUITest Mobile Commands](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/) (iOS)
- [UiAutomator2 Mobile Commands](https://github.com/appium/appium-uiautomator2-driver#mobile-commands) (Android)

#### Support

- Navigateurs de bureau
- Applications mobiles (via les commandes mobiles Appium)