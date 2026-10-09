---
id: resources
title: Ressources
description: "Consultez l'état de la session en direct, l'historique des sessions et les détails de configuration des fournisseurs cloud grâce aux ressources wdio:// en lecture seule du serveur MCP de WebdriverIO."
---

Les ressources MCP offrent un accès en lecture seule à l'état de la session en direct. Contrairement aux outils, les ressources sont récupérées par le modèle d'IA à sa guise ; elles n'exécutent aucune action. Toutes les ressources utilisent le schéma d'URI `wdio://`.

## Quand utiliser les ressources plutôt que les outils

- **Ressources** — état ambiant qui évolue au fil de vos interactions : éléments actuels, capture d'écran, cookies, arbre d'accessibilité. Consultez-les avant d'agir pour comprendre ce qui est affiché à l'écran.
- **Outils** — actions qui modifient l'état : cliquer, naviguer, définir une valeur.

Privilégiez `wdio://session/current/elements` plutôt que `get_screenshot` pour la découverte d'éléments ; cette ressource renvoie des sélecteurs prêts à l'emploi et consomme beaucoup moins de tokens.

## Historique des sessions

### `wdio://sessions`

Index de toutes les sessions de navigateur et d'application, avec leurs métadonnées et leur nombre d'étapes.

```json
{
  "sessions": [
    {
      "sessionId": "abc-123",
      "type": "browser",
      "startedAt": "2024-01-15T10:00:00.000Z",
      "endedAt": "2024-01-15T10:05:00.000Z",
      "stepCount": 12,
      "isCurrent": false
    }
  ]
}
```

---

### `wdio://session/current/steps`

Journal des étapes au format JSON pour la session actuellement active. Contient toutes les étapes d'automatisation enregistrées, avec les noms des outils, les paramètres et les horodatages.

---

### `wdio://session/current/code`

Code JavaScript WebdriverIO généré pour la session actuellement active. Généré automatiquement à partir des étapes enregistrées. Collez-le dans un fichier de test WebdriverIO pour rejouer la session.

---

### `wdio://session/{sessionId}/steps`

Journal des étapes d'une session spécifique, par ID. Modèle d'URI — remplacez `{sessionId}` par l'ID obtenu depuis `wdio://sessions`.

---

### `wdio://session/{sessionId}/code`

Code JavaScript WebdriverIO généré pour une session spécifique, par ID. Modèle d'URI — remplacez `{sessionId}` par l'ID obtenu depuis `wdio://sessions`.

## État de la page en direct (session actuelle)

### `wdio://session/current/elements`

Éléments interactifs de la page actuelle. Renvoie des sélecteurs prêts à l'emploi, le texte des éléments et des informations de visibilité.

**Il s'agit de la ressource principale pour comprendre ce qui est affiché à l'écran.** Consultez-la avant de cliquer ou de saisir du texte. Bien plus rapide et moins coûteuse qu'une capture d'écran.

Pour un filtrage avancé (viewport uniquement, conteneurs, boîtes englobantes, pagination), utilisez plutôt l'outil `get_elements`.

---

### `wdio://session/current/accessibility`

Arbre d'accessibilité de la page actuelle. Renvoie par défaut tous les nœuds avec leurs attributs de rôle, de nom, de sélecteur et d'état. Navigateur uniquement. Sur mobile, utilisez `wdio://session/current/elements`.

```json
{
  "total": 84,
  "showing": 84,
  "hasMore": false,
  "nodes": [
    {
      "role": "button",
      "name": "Submit",
      "selector": "button.submit-btn",
      "disabled": false
    }
  ]
}
```

Pour des résultats filtrés (par rôle, paginés), utilisez l'outil `get_accessibility_tree`.

---

### `wdio://session/current/screenshot`

Capture d'écran de la page ou de l'écran actuel sous forme d'image encodée en base64. Automatiquement redimensionnée (2000 px max) et compressée (1 Mo max).

À utiliser pour une vérification visuelle ou le débogage de la mise en page. Pour la découverte d'éléments, privilégiez `wdio://session/current/elements`.

---

### `wdio://session/current/cookies`

Tous les cookies de la session de navigateur actuelle.

```json
[
  {
    "name": "session_token",
    "value": "abc123",
    "domain": "example.com",
    "path": "/",
    "httpOnly": true,
    "secure": true
  }
]
```

---

### `wdio://session/current/tabs`

Tous les onglets de navigateur ouverts dans la session actuelle. Navigateur uniquement.

```json
[
  {
    "handle": "CDwindow-ABC",
    "title": "My App",
    "url": "https://example.com/dashboard",
    "isActive": true
  }
]
```

À utiliser avant `switch_tab` pour trouver le handle ou l'index cible.

---

### `wdio://session/current/contexts`

Contextes d'automatisation disponibles (NATIVE_APP, WEBVIEW). Mobile uniquement.

```json
["NATIVE_APP", "WEBVIEW_com.example.app"]
```

---

### `wdio://session/current/context`

Contexte d'automatisation actuellement actif. Mobile uniquement.

```json
"NATIVE_APP"
```

---

### `wdio://session/current/app-state/{bundleId}`

État du cycle de vie de l'application pour un bundle ID donné. Mobile uniquement. Modèle d'URI — remplacez `{bundleId}` par un bundle ID iOS ou un nom de package Android.

Renvoie l'une des valeurs suivantes :
- `0` — non installée
- `1` — non lancée
- `2` — en cours d'exécution en arrière-plan (suspendue)
- `3` — en cours d'exécution en arrière-plan
- `4` — en cours d'exécution au premier plan

Pour une sortie nommée, utilisez plutôt l'outil `get_app_state`.

---

### `wdio://session/current/geolocation`

Géolocalisation actuelle de l'appareil, remplacée via `set_geolocation`.

```json
{
  "latitude": 51.5074,
  "longitude": -0.1278,
  "altitude": 0
}
```

---

### `wdio://session/current/logs`

Journaux de la session actuelle. Renvoie les messages de la console du navigateur et les exceptions JavaScript (sessions Chromium), la sortie logcat (Android) ou les journaux de plantage/syslog (iOS).

```json
{
  "type": "browser",
  "logs": [
    { "level": "SEVERE", "message": "Uncaught TypeError: ...", "source": "javascript" },
    { "level": "INFO", "message": "Page loaded", "source": "console" }
  ]
}
```

---

### `wdio://session/current/capabilities`

Capabilities brutes renvoyées par le serveur WebDriver ou Appium pour la session actuelle. À utiliser pour le débogage ; affiche les valeurs réellement acceptées par le driver, y compris les valeurs par défaut appliquées par le fournisseur cloud ou Appium.

## Fournisseurs cloud

### `wdio://browserstack/local-binary`

URL de téléchargement spécifique à la plateforme et instructions de configuration du daemon pour le binaire BrowserStack Local. Consultez cette ressource avant d'utiliser `tunnel: true` ou `tunnel: "external"` avec `provider: "browserstack"` ; elle contient les commandes exactes pour votre système d'exploitation et votre architecture.

```json
{
  "platform": "macOS",
  "arch": "arm64",
  "downloadUrl": "https://...",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./BrowserStackLocal --key YOUR_KEY",
    "stop": "...",
    "status": "..."
  }
}
```

---

### `wdio://saucelabs/local-binary`

URL de téléchargement spécifique à la plateforme et instructions de configuration du daemon pour Sauce Connect Proxy. Consultez cette ressource avant d'utiliser `tunnel: "external"` avec `provider: "saucelabs"` ; avec `tunnel: true`, le SDK gère automatiquement Sauce Connect.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://saucelabs.com/downloads/sc-4.9.2-linux.tar.gz",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./sc -u YOUR_USERNAME -k YOUR_ACCESS_KEY --region eu-central-1",
    "stop": "./sc --stop",
    "status": "./sc --status"
  }
}
```

---

### `wdio://testmu/local-binary`

URL de téléchargement spécifique à la plateforme et instructions de configuration du daemon pour TestMu Tunnel. Nécessaire uniquement pour `tunnel: "external"` avec `provider: "testmu"` — avec `tunnel: true`, le SDK gère automatiquement le tunnel via `@lambdatest/node-tunnel`.

```json
{
  "platform": "Linux",
  "arch": "x64",
  "downloadUrl": "https://downloads.lambdatest.com/tunnel/v4/linux/64bit/LT_Linux.zip",
  "setup": ["step 1", "step 2", "step 3", "step 4"],
  "commands": {
    "start": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY",
    "stop": "./LT --user YOUR_USERNAME --key YOUR_ACCESS_KEY --stop",
    "status": "./LT --status"
  }
}
```

---

### `wdio://testingbot/local-binary`

URL de téléchargement et instructions de configuration du daemon pour TestingBot Tunnel. Le tunnel est un JAR Java multiplateforme (nécessite Java 11+). Nécessaire uniquement pour `tunnel: "external"` avec `provider: "testingbot"` — avec `tunnel: true`, le SDK gère automatiquement le tunnel via `testingbot-tunnel-launcher`.

```json
{
  "requirement": "MUST start the TestingBot Tunnel BEFORE calling start_session with tunnel: \"external\".",
  "runtime": "Java 11+ (17 LTS recommended)",
  "downloadUrl": "https://testingbot.com/downloads/testingbot-tunnel.zip",
  "setup": [
    "1. Download: curl -O https://testingbot.com/downloads/testingbot-tunnel.zip",
    "2. Unzip: unzip testingbot-tunnel.zip",
    "3. Start: java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET"
  ],
  "commands": {
    "start": "java -jar testingbot-tunnel.jar YOUR_KEY YOUR_SECRET",
    "stop": "Press Ctrl+C in the tunnel terminal, or kill the java process."
  }
}
```