---
id: tools
title: Outils
description: "Consultez les outils exposés par le serveur MCP WebdriverIO pour les sessions, la navigation, l'interaction avec les éléments, les captures d'écran, les gestes et le cycle de vie des applications."
---

Le serveur MCP WebdriverIO expose 29 outils organisés par fonction. Les outils marqués **navigateur uniquement** nécessitent une session `platform: "browser"`. Les outils marqués **mobile uniquement** nécessitent `platform: "ios"` ou `platform: "android"`.

## Gestion des sessions

### `start_session`

Démarre une nouvelle session d'automatisation navigateur ou mobile. Une seule session active à la fois ; en démarrer une nouvelle ferme la session existante.

| Paramètre              | Type                                                                   | Requis     | Par défaut          | Description                                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------- | ------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `platform`             | `"browser" \| "ios" \| "android"`                                      | ✓            | —                | Plateforme de la session                                                                                                                  |
| `provider`             | `"local" \| "browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | —            | `"local"`        | Fournisseur de la session                                                                                                                  |
| `browser`              | `"chrome" \| "firefox" \| "edge" \| "safari"`                          | navigateur uniquement | —                | Navigateur à lancer                                                                                                                 |
| `browserVersion`       | string                                                                 | —            | latest           | Version du navigateur (fournisseurs cloud uniquement, par défaut : latest)                                                                           |
| `os`                   | string                                                                 | —            | —                | Système d'exploitation (fournisseurs cloud uniquement, par ex. `"Windows"`, `"OS X"`)                                                               |
| `osVersion`            | string                                                                 | —            | —                | Version de l'OS (fournisseurs cloud uniquement, par ex. `"11"`, `"Sequoia"`)                                                                       |
| `headless`             | boolean                                                                | —            | `true`           | Exécuter le navigateur en mode headless                                                                                                            |
| `windowWidth`          | number                                                                 | —            | `1920`           | Largeur de la fenêtre du navigateur (400–3840)                                                                                                   |
| `windowHeight`         | number                                                                 | —            | `1080`           | Hauteur de la fenêtre du navigateur (400–2160)                                                                                                  |
| `navigationUrl`        | string                                                                 | —            | —                | URL vers laquelle naviguer après le démarrage                                                                                                 |
| `deviceName`           | string                                                                 | mobile uniquement  | —                | Nom de l'appareil/émulateur/simulateur                                                                                                    |
| `platformVersion`      | string                                                                 | —            | —                | Version de l'OS (par ex. `"17.0"`, `"14"`)                                                                                                |
| `appPath`              | string                                                                 | —            | —                | Chemin vers `.app` / `.apk` / `.ipa`                                                                                                  |
| `app`                  | string                                                                 | —            | —                | URL de l'application (`bs://...` pour BrowserStack, `storage:filename=` pour Sauce Labs, `lt://...` pour TestMu, app_url TestingBot) ou custom_id |
| `automationName`       | `"XCUITest" \| "UiAutomator2"`                                         | —            | auto             | Pilote d'automatisation                                                                                                                 |
| `autoGrantPermissions` | boolean                                                                | —            | `true`           | Accorder automatiquement les permissions de l'application                                                                                                        |
| `autoAcceptAlerts`     | boolean                                                                | —            | `true`           | Accepter automatiquement les alertes                                                                                                                |
| `autoDismissAlerts`    | boolean                                                                | —            | `false`          | Rejeter automatiquement les alertes                                                                                                               |
| `appWaitActivity`      | string                                                                 | —            | —                | Activité Android à attendre au lancement                                                                                            |
| `udid`                 | string                                                                 | —            | —                | UDID de l'appareil iOS réel                                                                                                              |
| `noReset`              | boolean                                                                | —            | —                | Conserver les données de l'application entre les sessions                                                                                                |
| `fullReset`            | boolean                                                                | —            | —                | Désinstaller l'application avant/après la session                                                                                                |
| `newCommandTimeout`    | number                                                                 | —            | `300`            | Délai d'expiration des commandes Appium (secondes)                                                                                                  |
| `attach`               | boolean                                                                | —            | `false`          | S'attacher à un Chrome existant via CDP                                                                                                 |
| `attachConfig`         | object                                                                 | —            | —                | Connexion CDP : `{ port: 9222, host: "localhost" }`                                                                               |
| `appiumConfig`         | object                                                                 | —            | —                | Serveur Appium : `{ host, port, path }`                                                                                             |
| `tunnel`               | `boolean \| "external"`                                                | —            | `false`          | Routage via tunnel local (fournisseurs cloud). `true` = démarrage automatique, `"external"` = tunnel déjà en cours d'exécution en externe                     |
| `reporting`            | object                                                                 | —            | —                | Libellés de rapport du fournisseur cloud : `{ project, build, session }`                                                                    |
| `trace`                | boolean                                                                | —            | `false`          | Activer l'enregistrement de traces — produit un zip `.trace` compatible Playwright                                                            |
| `region`               | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`                  | —            | `"eu-central-1"` | Région du centre de données Sauce Labs                                                                                                     |
| `tunnelName`           | string                                                                 | —            | —                | Nom d'identifiant du tunnel (requis pour `tunnel: "external"`)                                                                        |
| `capabilities`         | object                                                                 | —            | —                | Capacités brutes supplémentaires à fusionner                                                                                              |

```js
// Navigateur Chrome local
start_session({ platform: "browser", browser: "chrome" })

// Simulateur iOS
start_session({ platform: "ios", deviceName: "iPhone 16", platformVersion: "18.0", appPath: "/path/to/app.app" })

// BrowserStack Android
start_session({ platform: "android", provider: "browserstack", deviceName: "Samsung Galaxy S24", app: "bs://abc123" })

// Sauce Labs iOS
start_session({ platform: "ios", provider: "saucelabs", deviceName: "iPhone 15", platformVersion: "17.0", app: "storage:filename=MyApp.ipa" })

// Navigateur TestMu
start_session({ platform: "browser", provider: "testmu", browser: "chrome", os: "Windows", osVersion: "11" })

// Navigateur TestingBot
start_session({ platform: "browser", provider: "testingbot", browser: "chrome", os: "Windows", osVersion: "11" })

// Fournisseur cloud avec tunnel
start_session({ platform: "browser", provider: "browserstack", browser: "chrome", tunnel: true })

// S'attacher à un Chrome existant (après launch_chrome)
start_session({ platform: "browser", browser: "chrome", attach: true })
```

---

### `close_session`

Ferme la session en cours ou s'en détache.

| Paramètre | Type    | Requis | Par défaut | Description                                                    |
| --------- | ------- | -------- | ------- | -------------------------------------------------------------- |
| `detach`  | boolean | —        | `false` | Se déconnecter sans terminer (préserve l'état de l'application sur Appium) |

Les sessions démarrées avec `noReset: true` se détachent automatiquement par défaut.

---

### `launch_chrome`

Prépare une instance Chrome avec le débogage à distance activé afin que `start_session({ attach: true })` puisse s'y connecter. Deux modes :

- `newInstance` (par défaut) : ouvre Chrome à côté de votre instance existante en utilisant un répertoire de profil distinct ; votre session actuelle n'est pas modifiée.
- `freshSession` : lance Chrome avec un profil vide (pas de cookies, pas de connexions). Utilisez `copyProfileFiles: true` pour reprendre les cookies et les connexions.

| Paramètre          | Type                              | Requis | Par défaut         | Description                                                      |
| ------------------ | --------------------------------- | -------- | --------------- | ---------------------------------------------------------------- |
| `port`             | number                            | —        | `9222`          | Port de débogage à distance                                            |
| `mode`             | `"newInstance" \| "freshSession"` | —        | `"newInstance"` | Mode de lancement                                                      |
| `copyProfileFiles` | boolean                           | —        | `false`         | Copier le profil Chrome par défaut (cookies, connexions) dans la session de débogage |

Une fois cet outil exécuté avec succès, appelez `start_session({ platform: "browser", browser: "chrome", attach: true })`.

## Navigation et onglets

### `navigate`

Charge une URL dans l'onglet actuel et attend l'événement de chargement de la page. Réinitialise l'état de la page (DOM, environnement d'exécution JS). **Navigateur uniquement.**

| Paramètre | Type   | Requis | Description        |
| --------- | ------ | -------- | ------------------ |
| `url`     | string | ✓        | URL vers laquelle naviguer |

---

### `get_tabs`

Liste tous les onglets du navigateur avec leur handle, leur titre, leur URL et celui qui est actif. À utiliser avant `switch_tab` pour trouver le handle cible. **Navigateur uniquement.**

Aucun paramètre.

---

### `switch_tab`

Active un onglet du navigateur par son handle de fenêtre ou son index (commençant à 0). Tous les appels d'outils suivants opèrent sur l'onglet nouvellement actif. **Navigateur uniquement.**

| Paramètre | Type   | Requis | Description                |
| --------- | ------ | -------- | -------------------------- |
| `handle`  | string | —        | Handle de la fenêtre vers laquelle basculer |
| `index`   | number | —        | Index de l'onglet commençant à 0 (≥ 0)    |

Fournissez soit `handle`, soit `index`. Obtenez les handles depuis `get_tabs` ou `wdio://session/current/tabs`.

---

### `switch_frame`

Bascule le contexte de frame WebDriver dans une iframe via un sélecteur CSS/XPath, ou revient au niveau supérieur si le sélecteur est omis. Les changements persistent ; tous les appels suivants à `click_element`, `set_value`, `get_elements` opèrent dans la frame sélectionnée jusqu'à ce que vous en sortiez. Attend jusqu'à 5 s l'apparition de l'iframe. **Navigateur uniquement.**

| Paramètre  | Type   | Requis | Description                                                                            |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------------- |
| `selector` | string | —        | Sélecteur CSS/XPath de l'élément iframe. À omettre pour revenir à la frame de niveau supérieur. |

```js
// Basculer dans une iframe
switch_frame({ selector: "#my-iframe" })

// Interagir avec les éléments à l'intérieur de l'iframe
click_element({ selector: "button.submit" })

// Revenir au niveau supérieur
switch_frame()
```

## Interaction avec les éléments

### `click_element`

Attend qu'un élément existe, le fait défiler jusqu'à ce qu'il soit visible, puis clique dessus. Fonctionne sur navigateur et mobile. Sur iOS, préférez `tap_element` ; `click_element` est parfois ignoré par la couche native.

| Paramètre      | Type    | Requis | Par défaut | Description                              |
| -------------- | ------- | -------- | ------- | ---------------------------------------- |
| `selector`     | string  | ✓        | —       | Sélecteur CSS, XPath ou texte             |
| `scrollToView` | boolean | —        | `true`  | Faire défiler l'élément dans la vue avant de cliquer |
| `timeout`      | number  | —        | —       | Temps d'attente maximal (ms)                       |

---

### `set_value`

Vide un champ input ou textarea et saisit le texte donné. Remplace toujours le contenu existant.

| Paramètre      | Type    | Requis | Par défaut | Description                            |
| -------------- | ------- | -------- | ------- | -------------------------------------- |
| `selector`     | string  | ✓        | —       | Sélecteur CSS, XPath ou texte           |
| `value`        | string  | ✓        | —       | Texte à saisir                           |
| `scrollToView` | boolean | —        | `true`  | Faire défiler l'élément dans la vue avant la saisie |
| `timeout`      | number  | —        | —       | Temps d'attente maximal (ms)                     |

---

### `scroll`

Fait défiler la page d'un certain nombre de pixels. **Navigateur uniquement.** Sur mobile, utilisez `swipe`.

| Paramètre   | Type             | Requis | Par défaut | Description      |
| ----------- | ---------------- | -------- | ------- | ---------------- |
| `direction` | `"up" \| "down"` | ✓        | —       | Direction du défilement |
| `pixels`    | number           | —        | `500`   | Nombre de pixels à faire défiler |

## Analyse des éléments

### `get_elements`

Renvoie les éléments interactifs de la page actuelle avec des sélecteurs prêts à l'emploi. Préférez la ressource `wdio://session/current/elements` pour une connaissance contextuelle ; utilisez cet outil lorsque vous avez besoin de filtrage ou de pagination.

| Paramètre           | Type    | Requis | Par défaut | Description                                 |
| ------------------- | ------- | -------- | ------- | ------------------------------------------- |
| `inViewportOnly`    | boolean | —        | `false` | Ne renvoyer que les éléments visibles dans le viewport       |
| `includeContainers` | boolean | —        | `false` | Inclure les éléments conteneurs (divs, sections) |
| `includeBounds`     | boolean | —        | `false` | Inclure les coordonnées des boîtes englobantes            |
| `limit`             | number  | —        | `0`     | Nombre maximal d'éléments à renvoyer (0 = illimité)      |
| `offset`            | number  | —        | `0`     | Éléments à ignorer (pagination)               |

---

### `get_accessibility_tree`

Renvoie l'arbre d'accessibilité de la page avec les rôles, les noms et les sélecteurs. Prend en charge le filtrage et la pagination. **Navigateur uniquement.**

| Paramètre | Type     | Requis | Par défaut | Description                                                |
| --------- | -------- | -------- | ------- | ---------------------------------------------------------- |
| `limit`   | number   | —        | `0`     | Nombre maximal de nœuds à renvoyer (0 = illimité)                        |
| `offset`  | number   | —        | `0`     | Nœuds à ignorer (pagination)                                 |
| `roles`   | string[] | —        | —       | Filtrer par rôles ARIA, par ex. `["button", "link", "heading"]` |

## Captures d'écran

### `get_screenshot`

Prend une capture d'écran de la page ou de l'écran actuel. Renvoie une image encodée en base64, automatiquement redimensionnée et compressée pour rester dans les limites de contexte du modèle (1 Mo max, 2000 px max).

Aucun paramètre. Préférez `wdio://session/current/elements` aux captures d'écran pour la découverte d'éléments ; c'est plus rapide et consomme beaucoup moins de tokens. Utilisez les captures d'écran pour la vérification visuelle ou le débogage de la mise en page.

## Gestion des cookies

### `get_cookies`

Renvoie tous les cookies de la session en cours, ou un seul cookie par son nom. **Navigateur uniquement.**

| Paramètre | Type   | Requis | Description                              |
| --------- | ------ | -------- | ---------------------------------------- |
| `name`    | string | —        | Nom du cookie. À omettre pour renvoyer tous les cookies. |

---

### `set_cookie`

Définit un cookie du navigateur. Le navigateur doit déjà se trouver sur le domaine cible — les cookies ne peuvent pas être définis entre domaines. À utiliser pour injecter des jetons de session ou des feature flags sans passer par les parcours de connexion. **Navigateur uniquement.**

| Paramètre  | Type                          | Requis | Description                                |
| ---------- | ----------------------------- | -------- | ------------------------------------------ |
| `name`     | string                        | ✓        | Nom du cookie                                |
| `value`    | string                        | ✓        | Valeur du cookie                               |
| `domain`   | string                        | —        | Domaine du cookie (par défaut, le domaine actuel) |
| `path`     | string                        | —        | Chemin du cookie (par défaut `/`)              |
| `expiry`   | number                        | —        | Expiration sous forme de timestamp Unix (secondes)         |
| `httpOnly` | boolean                       | —        | Indicateur HttpOnly                              |
| `secure`   | boolean                       | —        | Indicateur Secure                                |
| `sameSite` | `"strict" \| "lax" \| "none"` | —        | Attribut SameSite                         |

---

### `delete_cookies`

Supprime tous les cookies ou un cookie spécifique par son nom. **Navigateur uniquement.**

| Paramètre | Type   | Requis | Description                                        |
| --------- | ------ | -------- | -------------------------------------------------- |
| `name`    | string | —        | Nom du cookie à supprimer. À omettre pour supprimer tous les cookies. |

## Gestes tactiles (Mobile)

### `tap_element`

Appelle `element.tap()` sur un élément correspondant ou tape à des coordonnées absolues de l'écran. À utiliser sur iOS lorsque `click_element` est ignoré ; le tap est le geste natif auquel iOS répond. **Mobile uniquement.**

| Paramètre  | Type   | Requis | Description                                  |
| ---------- | ------ | -------- | -------------------------------------------- |
| `selector` | string | —        | Sélecteur de l'élément                             |
| `x`        | number | —        | Coordonnée X du tap à l'écran (si aucun sélecteur) |
| `y`        | number | —        | Coordonnée Y du tap à l'écran (si aucun sélecteur) |

Fournissez soit `selector`, soit les coordonnées `x`/`y`.

---

### `swipe`

Effectue un geste de balayage sur tout l'écran. La direction correspond à la direction de déplacement du contenu (par ex. `"up"` fait défiler une liste vers le haut). À utiliser pour défiler au-delà des limites visibles. Pour déplacer un élément spécifique, utilisez `drag_and_drop`. **Mobile uniquement.** Pour les navigateurs, utilisez `scroll`.

| Paramètre   | Type                                  | Requis | Par défaut        | Description                       |
| ----------- | ------------------------------------- | -------- | -------------- | --------------------------------- |
| `direction` | `"up" \| "down" \| "left" \| "right"` | ✓        | —              | Direction du balayage                   |
| `duration`  | number                                | —        | `500`          | Durée du balayage (ms, 100–5000)     |
| `percent`   | number                                | —        | `0.5` / `0.95` | Fraction de l'écran à balayer (0–1) |

---

### `drag_and_drop`

Fait glisser un élément vers un autre élément ou vers des coordonnées. **Mobile uniquement.**

| Paramètre        | Type   | Requis | Par défaut | Description                            |
| ---------------- | ------ | -------- | ------- | -------------------------------------- |
| `sourceSelector` | string | ✓        | —       | Élément source à faire glisser                 |
| `targetSelector` | string | —        | —       | Élément cible sur lequel déposer            |
| `x`              | number | —        | —       | Décalage X cible (si aucun targetSelector) |
| `y`              | number | —        | —       | Décalage Y cible (si aucun targetSelector) |
| `duration`       | number | —        | —       | Durée du glissement (ms, 100–5000)           |

## Changement de contexte (Mobile)

### `get_contexts`

Renvoie les contextes d'automatisation disponibles et celui actuellement actif. À utiliser avant `switch_context` pour découvrir les cibles `NATIVE_APP` et `WEBVIEW_*`. **Mobile uniquement.**

Aucun paramètre.

---

### `switch_context`

Bascule entre les contextes d'automatisation natif et webview dans une application mobile hybride. Requis avant d'utiliser des sélecteurs CSS/XPath dans une webview intégrée. **Mobile uniquement.**

| Paramètre | Type   | Requis | Description                                                    |
| --------- | ------ | -------- | -------------------------------------------------------------- |
| `context` | string | ✓        | Nom du contexte, par ex. `"NATIVE_APP"`, `"WEBVIEW_com.example.app"` |

Obtenez les noms des contextes disponibles depuis `get_contexts` ou `wdio://session/current/contexts`.

```js
// 1. Vérifier ce qui est disponible
get_contexts()
// → { contexts: ["NATIVE_APP", "WEBVIEW_com.example.app"], currentContext: "NATIVE_APP" }

// 2. Basculer dans la webview pour CSS/XPath
switch_context({ context: "WEBVIEW_com.example.app" })

// 3. Interagir avec les éléments de la webview à l'aide de sélecteurs CSS
click_element({ selector: "#login-button" })

// 4. Revenir au natif pour l'interface native
switch_context({ context: "NATIVE_APP" })
```

## Contrôle de l'appareil (Mobile)

### `rotate_device`

Fait pivoter l'appareil en mode portrait ou paysage et attend que la rotation de l'OS soit terminée. À utiliser pour tester les mises en page dépendantes de l'orientation. **Mobile uniquement.**

| Paramètre     | Type                        | Requis | Description        |
| ------------- | --------------------------- | -------- | ------------------ |
| `orientation` | `"PORTRAIT" \| "LANDSCAPE"` | ✓        | Orientation cible |

---

### `hide_keyboard`

Masque le clavier logiciel. À appeler après une saisie de texte lorsque le clavier masque des éléments dont vous avez besoin ensuite. Sans effet s'il est déjà masqué. **Mobile uniquement.**

Aucun paramètre.

---

### `set_geolocation`

Remplace les coordonnées GPS de l'appareil pour la session. Affecte `navigator.geolocation` sur le web et les services de localisation sur mobile. Les autorisations de localisation doivent avoir été accordées à l'application au préalable.

| Paramètre   | Type   | Requis | Description             |
| ----------- | ------ | -------- | ----------------------- |
| `latitude`  | number | ✓        | Latitude (−90 à 90)    |
| `longitude` | number | ✓        | Longitude (−180 à 180) |
| `altitude`  | number | —        | Altitude en mètres      |

## Cycle de vie des applications (Mobile)

### `get_app_state`

Renvoie l'état actuel du cycle de vie d'une application mobile. **Mobile uniquement.**

| Paramètre  | Type   | Requis | Description                                                     |
| ---------- | ------ | -------- | --------------------------------------------------------------- |
| `bundleId` | string | ✓        | Bundle ID iOS ou nom de package Android, par ex. `"com.example.app"` |

Renvoie l'une des valeurs suivantes : `not installed`, `not running`, `background (suspended)`, `background`, `foreground`.

## Utilitaires navigateur

### `emulate_device`

Émule un appareil mobile ou une tablette dans la session de navigateur actuelle (définit le viewport, le DPR, le user-agent, les événements tactiles). Nécessite une session compatible BiDi : `start_session({ capabilities: { webSocketUrl: true } })`. **Navigateur uniquement.**

| Paramètre | Type   | Requis | Description                                                                                                             |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `device`  | string | —        | Nom du préréglage d'appareil (par ex. `"iPhone 15"`, `"Pixel 7"`). À omettre pour lister les préréglages. Passez `"reset"` pour restaurer les valeurs par défaut du bureau. |

---

### `execute_script`

Exécute du JavaScript dans le navigateur ou des commandes mobiles via Appium.

| Paramètre | Type   | Requis | Description                                                   |
| --------- | ------ | -------- | ------------------------------------------------------------- |
| `script`  | string | ✓        | Code JS (navigateur) ou commande Appium comme `"mobile: pressKey"` |
| `args`    | any[]  | —        | Arguments transmis au script ou à la commande                     |

**Navigateur :** utilisez `return` pour récupérer des valeurs.

```javascript
// Obtenir le titre de la page
execute_script({ script: "return document.title" })

// Faire défiler l'élément dans la vue
execute_script({ script: "arguments[0].scrollIntoView()", args: ["#my-element"] })
```

**Mobile (Appium) :** utilise la syntaxe `mobile: <command>`.

```javascript
// Appuyer sur la touche retour Android
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Activer l'application (iOS/Android)
execute_script({ script: "mobile: activateApp", args: [{ bundleId: "com.example.app" }] })

// Lien profond (iOS)
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://route", bundleId: "com.example.app" }] })
```

## Fournisseurs cloud

### `list_apps`

Liste les applications téléversées sur un fournisseur cloud (BrowserStack App Automate, Sauce Labs App Storage, TestMu ou TestingBot Storage). Lit les identifiants propres au fournisseur depuis l'environnement.

| Paramètre          | Type                                                        | Requis | Par défaut          | Description                              |
| ------------------ | ----------------------------------------------------------- | -------- | ---------------- | ---------------------------------------- |
| `provider`         | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓        | —                | Fournisseur cloud                           |
| `sortBy`           | `"app_name" \| "uploaded_at"`                               | —        | `"uploaded_at"`  | Ordre de tri                               |
| `organizationWide` | boolean                                                     | —        | `false`          | (BrowserStack uniquement) Lister tous les téléversements de l'organisation |
| `limit`            | number                                                      | —        | `20`             | Nombre maximal de résultats                              |
| `region`           | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —        | `"eu-central-1"` | Région Sauce Labs                        |

```js
// Lister pour les quatre fournisseurs
list_apps({ provider: "browserstack" })
list_apps({ provider: "saucelabs", region: "us-west-1" })
list_apps({ provider: "testmu" })
list_apps({ provider: "testingbot" })
```

---

### `upload_app`

Téléverse un fichier local `.apk` ou `.ipa` vers un fournisseur cloud (BrowserStack, Sauce Labs, TestMu ou TestingBot). Renvoie l'URL de l'application à utiliser dans `start_session`.

| Paramètre  | Type                                                        | Requis | Par défaut          | Description                                      |
| ---------- | ----------------------------------------------------------- | -------- | ---------------- | ------------------------------------------------ |
| `provider` | `"browserstack" \| "saucelabs" \| "testmu" \| "testingbot"` | ✓        | —                | Fournisseur cloud                                   |
| `path`     | string                                                      | ✓        | —                | Chemin absolu vers le fichier `.apk` ou `.ipa`       |
| `customId` | string                                                      | —        | —                | ID personnalisé facultatif pour référencer l'application ultérieurement |
| `region`   | `"us-west-1" \| "eu-central-1" \| "apac-southeast-1"`       | —        | `"eu-central-1"` | Région Sauce Labs                                |

```js
// Téléverser vers chaque fournisseur
upload_app({ provider: "browserstack", path: "/path/to/app.apk" })
upload_app({ provider: "saucelabs", path: "/path/to/app.ipa", region: "us-west-1" })
upload_app({ provider: "testmu", path: "/path/to/app.apk" })
upload_app({ provider: "testingbot", path: "/path/to/app.apk" })
```