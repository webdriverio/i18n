---
id: faq
title: FAQ
description: "Trouvez des réponses aux questions courantes sur l'installation, l'utilisation et le dépannage du serveur WebdriverIO MCP pour l'automatisation des navigateurs et des applications mobiles."
---

Questions fréquemment posées sur WebdriverIO MCP.

## Général

### Qu'est-ce que MCP ?

MCP (Model Context Protocol) est un protocole ouvert qui permet aux assistants IA comme Claude d'interagir avec des outils et services externes. WebdriverIO MCP implémente ce protocole pour fournir des capacités d'automatisation de navigateurs et d'applications mobiles à Claude Desktop et Claude Code.

### Que puis-je automatiser avec WebdriverIO MCP ?

Vous pouvez automatiser :
-   **Les navigateurs de bureau** (Chrome, Firefox, Edge, Safari) - navigation, clics, saisie, captures d'écran
-   **Les applications iOS** - sur simulateurs ou appareils réels
-   **Les applications Android** - sur émulateurs ou appareils réels
-   **Les applications hybrides** - basculement entre les contextes natif et web
-   **Les appareils cloud** - via les clouds d'appareils BrowserStack, Sauce Labs, TestMu et TestingBot

### Dois-je écrire du code ?

Non ! C'est le principal avantage de MCP. Vous pouvez décrire ce que vous voulez faire en langage naturel, et Claude utilisera les outils appropriés pour accomplir la tâche.

**Exemples de prompts :**
-   "Ouvre Chrome et navigue vers webdriver.io"
-   "Clique sur le bouton Get Started"
-   "Prends une capture d'écran de la page actuelle"
-   "Démarre mon application iOS et connecte-toi en tant qu'utilisateur de test"

## Installation et configuration

### Comment installer WebdriverIO MCP ?

Vous n'avez pas besoin de l'installer séparément. Le serveur MCP s'exécute automatiquement via npx lorsque vous le configurez dans votre environnement. Ajoutez ceci à votre configuration :

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

### Où se trouve le fichier de configuration de Claude Desktop ?

-   **macOS :** `~/Library/Application Support/Claude/claude_desktop_config.json`
-   **Windows :** `%APPDATA%\Claude\claude_desktop_config.json`

### Ai-je besoin d'Appium pour l'automatisation des navigateurs ?

Non. L'automatisation des navigateurs nécessite uniquement que le navigateur cible soit installé. WebdriverIO gère automatiquement les pilotes.

### Ai-je besoin d'Appium pour l'automatisation mobile ?

Oui. L'automatisation mobile nécessite :
1. Un serveur Appium en cours d'exécution (`npm install -g appium && appium`)
2. Les pilotes de plateforme installés (`appium driver install xcuitest` pour iOS, `appium driver install uiautomator2` pour Android)
3. Les outils de développement appropriés (Xcode pour iOS, Android SDK pour Android)

## Automatisation des navigateurs

### Quels navigateurs sont pris en charge ?

Chrome, Firefox, Edge et Safari sont tous pris en charge. Utilisez le paramètre `browser` dans `start_session` :

```text
"Start a Firefox session"
"Start Chrome in headless mode"
```

### Puis-je exécuter le navigateur en mode headless ?

Oui. Le mode headless est activé par défaut (`headless: true`). Demandez à Claude d'utiliser le mode avec interface si vous voulez voir le navigateur :

"Démarre Chrome en mode avec interface (pas headless)"

### Puis-je définir la taille de la fenêtre du navigateur ?

Oui. Vous pouvez spécifier les dimensions au démarrage du navigateur :

"Démarre Chrome avec une taille de fenêtre de 1920x1080"

Dimensions prises en charge : 400 à 3840 pixels de large, 400 à 2160 pixels de haut. La valeur par défaut est 1920×1080.

### Puis-je démarrer le navigateur et naviguer en une seule étape ?

Oui ! Utilisez le paramètre `navigationUrl` :

"Démarre Chrome et navigue vers https://webdriver.io"

C'est plus efficace que de démarrer le navigateur puis de naviguer séparément.

### Comment prendre des captures d'écran ?

Demandez simplement :

"Prends une capture d'écran de la page actuelle"

Les captures d'écran sont automatiquement optimisées :
- Redimensionnées à 2000px maximum
- Compressées à 1 Mo maximum
- Format : PNG ou JPEG (sélectionné automatiquement pour une qualité optimale)

### Puis-je interagir avec des iframes ?

Oui. Utilisez l'outil `switch_frame` pour basculer dans une iframe via un sélecteur CSS ou XPath. Tous les appels suivants à `click_element`, `set_value` et `get_elements` s'effectuent dans le frame sélectionné. Omettez le sélecteur pour revenir au frame de niveau supérieur. Les iframes doivent provenir de la même origine que la page principale.

### Puis-je exécuter du JavaScript personnalisé ?

Oui ! Utilisez l'outil `execute_script` :

"Exécute un script pour obtenir le titre de la page"
"Exécute le script : return document.querySelectorAll('button').length"

### Puis-je me connecter à une session Chrome existante ?

Oui. Utilisez d'abord `launch_chrome` (ouvre Chrome avec le débogage à distance), puis `start_session` avec `attach: true`.

"Lance Chrome avec le débogage à distance, puis connecte-toi à celui-ci"

### Puis-je travailler avec plusieurs onglets ?

Oui. Utilisez `get_tabs` pour lister les onglets ouverts et `switch_tab` pour en sélectionner un en particulier :

"Récupère tous les onglets ouverts"
"Bascule vers l'onglet à l'index 1"

## Automatisation mobile

### Comment démarrer une session iOS ou Android ?

Utilisez `start_session` avec la plateforme appropriée :

"Démarre mon application iOS située à /path/to/MyApp.app sur le simulateur iPhone 15"

"Démarre mon application Android à /path/to/app.apk sur l'émulateur Pixel 7"

Ou pour une application déjà installée :

"Démarre l'application avec noReset activé sur le simulateur iPhone 15"

### Puis-je tester sur des appareils réels ?

Oui ! Pour les appareils réels, vous aurez besoin de l'UDID de l'appareil :

-   **iOS :** Connectez l'appareil, ouvrez le Finder, cliquez sur l'appareil, puis cliquez sur le numéro de série pour afficher l'UDID
-   **Android :** Exécutez `adb devices` dans le terminal

Puis demandez :

"Démarre mon application iOS sur l'appareil réel avec l'UDID abc123..."

### Comment gérer les boîtes de dialogue d'autorisation ?

Par défaut, les autorisations sont accordées automatiquement (`autoGrantPermissions: true`). Si vous devez tester les flux d'autorisation, vous pouvez désactiver cette option :

"Démarre mon application sans accorder automatiquement les autorisations"

### Quels gestes sont pris en charge ?

-   **Tap :** Toucher des éléments ou des coordonnées (`tap_element`)
-   **Swipe :** Balayer vers le haut, le bas, la gauche ou la droite (`swipe`)
-   **Glisser-déposer :** Faire glisser d'un élément vers un autre ou vers des coordonnées (`drag_and_drop`)

Remarque : `long_press` est disponible via `execute_script` avec les commandes mobiles Appium.

### Comment faire défiler dans les applications mobiles ?

Utilisez les gestes de balayage :

"Balaie vers le haut pour faire défiler vers le bas"
"Balaie vers le bas pour faire défiler vers le haut"

### Puis-je faire pivoter l'appareil ?

Oui :

"Fais pivoter l'appareil en mode paysage"
"Fais pivoter l'appareil en mode portrait"

### Comment gérer les applications hybrides ?

Pour les applications avec des webviews, vous pouvez changer de contexte :

"Récupère les contextes disponibles"
"Bascule vers le contexte webview"
"Reviens au contexte natif"

### Puis-je exécuter des commandes mobiles Appium ?

Oui ! Utilisez l'outil `execute_script` :

```text
Execute script "mobile: pressKey" with args [{ keycode: 4 }]  // Appuie sur RETOUR sur Android
Execute script "mobile: activateApp" with args [{ bundleId: "com.example.app" }]
Execute script "mobile: terminateApp" with args [{ bundleId: "com.example.app" }]
```

## Sélection des éléments

### Comment l'assistant IA sait-il avec quel élément interagir ?

Il utilise la ressource `wdio://session/current/elements` ou l'outil `get_elements` pour identifier les éléments interactifs de la page ou de l'écran. Chaque élément est fourni avec des sélecteurs prêts à l'emploi.

### Que faire s'il y a trop d'éléments sur la page ?

Utilisez la pagination pour gérer de grandes listes d'éléments :

"Récupère les 20 premiers éléments"
"Récupère les éléments avec un offset de 20 et une limite de 20"

La réponse inclut `total`, `showing` et `hasMore` pour faciliter la navigation parmi les éléments.

### Que faire si Claude clique sur le mauvais élément ?

Vous pouvez être plus précis :

-   Fournir le texte exact : "Clique sur le bouton qui affiche 'Submit Order'"
-   Fournir un sélecteur : "Clique sur l'élément avec le sélecteur #submit-btn"
-   Fournir un identifiant d'accessibilité : "Clique sur l'élément avec l'identifiant d'accessibilité loginButton"

### Quelle est la meilleure stratégie de sélecteurs pour le mobile ?

1. **Accessibility ID** (le meilleur) - `~loginButton`
2. **Resource ID** (Android) - `id=login_button`
3. **Predicate String** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (en dernier recours) - plus lent mais fonctionne partout

### Qu'est-ce que l'arbre d'accessibilité et quand dois-je l'utiliser ?

L'arbre d'accessibilité fournit des informations sémantiques sur les éléments de la page (rôles, noms, états). Utilisez `get_accessibility_tree` lorsque :
- `get_elements` ne renvoie pas les éléments attendus
- Vous devez trouver des éléments par rôle d'accessibilité (button, link, textbox, etc.)
- Vous avez besoin d'informations sémantiques détaillées sur les éléments

"Récupère l'arbre d'accessibilité filtré sur les rôles button et link"

## Gestion des sessions

### Puis-je avoir plusieurs sessions simultanément ?

Non. Le serveur MCP utilise un modèle à session unique. Une seule session de navigateur ou d'application peut être active à la fois.

### Que se passe-t-il lorsque je ferme une session ?

Cela dépend du type de session et des paramètres :

-   **Navigateur :** Le navigateur se ferme complètement
-   **Mobile avec `noReset: false` :** L'application est arrêtée
-   **Mobile avec `noReset: true` ou sans `appPath` :** L'application reste ouverte (la session se détache automatiquement)

### Puis-je conserver l'état de l'application entre les sessions ?

Oui ! Utilisez l'option `noReset` :

"Démarre mon application avec noReset activé"

Cela conserve l'état de connexion, les préférences et les autres données de l'application.

### Quelle est la différence entre fermer et détacher ?

-   **Fermer :** Arrête complètement le navigateur ou l'application
-   **Détacher :** Déconnecte l'automatisation mais laisse le navigateur ou l'application en cours d'exécution

Le détachement est utile lorsque vous souhaitez inspecter manuellement l'état après l'automatisation.

### Ma session expire sans cesse pendant le débogage

Augmentez le délai d'expiration des commandes :

"Démarre mon application avec un newCommandTimeout de 300 secondes"

La valeur par défaut est de 300 secondes. Pour de très longues sessions de débogage, essayez 600 secondes.

## Dépannage

### Erreur "Session not found"

Cela signifie qu'aucune session active n'existe. Démarrez d'abord une session de navigateur ou d'application :

"Démarre Chrome et navigue vers google.com"

### Erreur "Element not found"

L'élément n'est peut-être pas visible ou possède un sélecteur différent. Essayez de :

1. Demander d'abord à Claude de récupérer tous les éléments visibles
2. Fournir un sélecteur plus précis
3. Attendre que la page ou l'application soit entièrement chargée
4. Utiliser `inViewportOnly: false` pour trouver les éléments hors écran

### Le navigateur ne démarre pas

1. Assurez-vous que le navigateur cible est installé
2. Vérifiez si un autre processus utilise le port de débogage (9222)
3. Essayez le mode headless

### Échec de la connexion à Appium

C'est le problème le plus courant lors du démarrage de l'automatisation mobile.

1. **Vérifiez qu'Appium est en cours d'exécution** : `curl http://localhost:4723/status`
2. Démarrez Appium si nécessaire : `appium`
3. Vérifiez que votre connexion Appium correspond au serveur (utilisez `appiumConfig` dans `start_session`)
4. Assurez-vous que les pilotes sont installés : `appium driver list --installed`

:::tip
Le serveur MCP nécessite qu'Appium soit en cours d'exécution avant de démarrer des sessions mobiles. Assurez-vous de démarrer Appium en premier :
```sh
appium
```
Les futures versions pourraient inclure une gestion automatique du service Appium.
:::

### Le simulateur iOS ne démarre pas

1. Assurez-vous que Xcode est installé : `xcode-select --install`
2. Listez les simulateurs disponibles : `xcrun simctl list devices`
3. Recherchez les erreurs spécifiques au simulateur dans Console.app

### L'émulateur Android ne démarre pas

1. Définissez `ANDROID_HOME` : `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. Vérifiez les émulateurs : `emulator -list-avds`
3. Démarrez l'émulateur manuellement : `emulator -avd <avd-name>`
4. Vérifiez que l'appareil est connecté : `adb devices`

### Les captures d'écran ne fonctionnent pas

1. Pour le mobile, assurez-vous que la session est active
2. Pour le navigateur, essayez une autre page (certaines pages bloquent les captures d'écran)
3. Consultez les journaux de Claude Desktop pour détecter des erreurs

Les captures d'écran sont automatiquement compressées à 1 Mo maximum ; les grandes captures fonctionneront donc, mais leur qualité pourra être réduite.

## Performances

### Pourquoi l'automatisation mobile est-elle lente ?

L'automatisation mobile implique :
1. Une communication réseau avec le serveur Appium
2. La communication d'Appium avec l'appareil ou le simulateur
3. Le rendu et la réponse de l'appareil

Conseils pour une automatisation plus rapide :
-   Utilisez des émulateurs/simulateurs plutôt que des appareils réels pour le développement
-   Utilisez des identifiants d'accessibilité plutôt que XPath
-   Activez `inViewportOnly: true` pour la détection des éléments
-   Utilisez la pagination (`limit`) pour réduire la consommation de tokens

### Comment accélérer la détection des éléments ?

Le serveur MCP optimise déjà la détection des éléments en analysant le code source XML de la page (2 appels HTTP contre plus de 600 pour les requêtes d'éléments traditionnelles). Conseils supplémentaires :

-   Définissez `inViewportOnly: true` pour filtrer les éléments hors écran
-   Définissez `includeContainers: false` (par défaut)
-   Utilisez `limit` et `offset` pour la pagination sur les grands écrans
-   Utilisez des sélecteurs spécifiques au lieu de rechercher tous les éléments

### Les captures d'écran sont lentes ou échouent

Les captures d'écran sont automatiquement optimisées :
- Redimensionnées si elles dépassent 2000px
- Compressées pour rester sous 1 Mo
- Converties en JPEG si le PNG est trop volumineux

Cette optimisation réduit le temps de traitement et garantit que Claude peut gérer l'image.

## Limitations

### Quelles sont les limitations actuelles ?

-   **Session unique :** Un seul navigateur ou une seule application à la fois
-   **Prise en charge des iframes :** Les iframes de même origine sont prises en charge via `switch_frame` ; les iframes cross-origin ne sont pas accessibles en raison des restrictions de sécurité des navigateurs
-   **Téléversement de fichiers :** Non pris en charge directement via les outils
-   **Audio/Vidéo :** Impossible d'interagir avec la lecture multimédia
-   **Extensions de navigateur :** Non prises en charge

### Puis-je l'utiliser pour des tests en production ?

WebdriverIO MCP est conçu pour l'automatisation interactive assistée par IA. Pour les tests CI/CD en production, envisagez d'utiliser le test runner traditionnel de WebdriverIO avec un contrôle programmatique complet.

## Sécurité

### Mes données sont-elles sécurisées ?

Le serveur MCP s'exécute localement sur votre machine. Toute l'automatisation s'effectue via des connexions locales au navigateur ou à Appium. Aucune donnée n'est envoyée à des serveurs externes au-delà des sites vers lesquels vous naviguez explicitement.

Lors de l'utilisation du mode de transport HTTP (`--http`), le serveur n'accepte par défaut que les connexions provenant de `localhost` ; utilisez `--allowedHosts` et `--allowedOrigins` pour contrôler l'accès. Consultez [Transport](./transport) pour plus de détails.

### Claude peut-il accéder à mes mots de passe ?

Claude peut voir le contenu de la page et interagir avec les éléments, mais :
-   Les mots de passe dans les champs `<input type="password">` sont masqués
-   Vous devriez éviter d'automatiser des identifiants sensibles
-   Utilisez des comptes de test pour l'automatisation

## Contribuer

### Comment puis-je contribuer ?

Visitez le [dépôt GitHub](https://github.com/webdriverio/mcp) pour :
-   Signaler des bugs
-   Demander des fonctionnalités
-   Soumettre des pull requests

### Où puis-je obtenir de l'aide ?

-   [Discord WebdriverIO](https://discord.webdriver.io/)
-   [GitHub Issues](https://github.com/webdriverio/mcp/issues)
-   [Documentation WebdriverIO](https://webdriver.io/)