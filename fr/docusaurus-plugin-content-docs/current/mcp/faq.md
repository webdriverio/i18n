---
id: faq
title: FAQ
---

Questions fréquemment posées sur WebdriverIO MCP.

## Général

### Qu'est-ce que MCP ?

MCP (Model Context Protocol) est un protocole ouvert qui permet aux assistants IA comme Claude d'interagir avec des outils et services externes. WebdriverIO MCP implémente ce protocole pour fournir des capacités d'automatisation de navigateur et mobile à Claude Desktop et Claude Code.

### Que puis-je automatiser avec WebdriverIO MCP ?

Vous pouvez automatiser :
-   **Navigateurs de bureau** (Chrome) - navigation, clics, saisie, captures d'écran
-   **Applications iOS** - sur simulateurs ou appareils réels
-   **Applications Android** - sur émulateurs ou appareils réels
-   **Applications hybrides** - passage entre contextes natifs et web

### Dois-je écrire du code ?

Non ! C'est l'avantage principal de MCP. Vous pouvez décrire ce que vous voulez faire en langage naturel, et Claude utilisera les outils appropriés pour accomplir la tâche.

**Exemples de prompts :**
-   "Ouvre Chrome et navigue vers webdriver.io"
-   "Clique sur le bouton Get Started"
-   "Prends une capture d'écran de la page actuelle"
-   "Démarre mon application iOS et connecte-toi en tant qu'utilisateur test"

---

## Installation et configuration

### Comment installer WebdriverIO MCP ?

Vous n'avez pas besoin de l'installer séparément. Le serveur MCP s'exécute automatiquement via npx lorsque vous le configurez dans Claude Desktop ou Claude Code.

Ajoutez ceci à votre configuration Claude Desktop :

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

### Où se trouve le fichier de configuration Claude Desktop ?

-   **macOS :** `~/Library/Application Support/Claude/claude_desktop_config.json`
-   **Windows :** `%APPDATA%\Claude\claude_desktop_config.json`

### Ai-je besoin d'Appium pour l'automatisation de navigateur ?

Non. L'automatisation de navigateur nécessite uniquement l'installation de Chrome. WebdriverIO gère ChromeDriver automatiquement.

### Ai-je besoin d'Appium pour l'automatisation mobile ?

Oui. L'automatisation mobile nécessite :
1. Un serveur Appium en cours d'exécution (`npm install -g appium && appium`)
2. Des pilotes de plateforme installés (`appium driver install xcuitest` pour iOS, `appium driver install uiautomator2` pour Android)
3. Des outils de développement appropriés (Xcode pour iOS, Android SDK pour Android)

---

## Automatisation de navigateur

### Quels navigateurs sont pris en charge ?

Actuellement, seul **Chrome** est pris en charge. La prise en charge d'autres navigateurs pourrait être ajoutée dans les versions futures.

### Puis-je exécuter Chrome en mode headless ?

Oui ! Demandez à Claude de démarrer le navigateur en mode headless :

"Démarre Chrome en mode headless"

Ou Claude utilisera cette option lorsque c'est approprié (par exemple, dans les contextes CI/CD).

### Puis-je définir la taille de la fenêtre du navigateur ?

Oui. Vous pouvez spécifier les dimensions au démarrage du navigateur :

"Démarre Chrome avec une taille de fenêtre de 1920x1080"

Dimensions prises en charge : 400-3840 pixels de large, 400-2160 pixels de haut. Par défaut : 1920x1080.

### Puis-je démarrer le navigateur et naviguer en une seule étape ?

Oui ! Utilisez le paramètre `navigationUrl` :

"Démarre Chrome et navigue vers https://webdriver.io"

C'est plus efficace que de démarrer le navigateur puis de naviguer séparément.

### Comment prendre des captures d'écran ?

Demandez simplement à Claude :

"Prends une capture d'écran de la page actuelle"

Les captures d'écran sont automatiquement optimisées :
- Redimensionnées à une dimension max de 2000px
- Compressées à une taille max de 1MB
- Format : PNG ou JPEG (automatiquement sélectionné pour une qualité optimale)

### Puis-je interagir avec les iframes ?

Actuellement, le serveur MCP opère sur le document principal. L'interaction avec les iframes pourrait être ajoutée dans les versions futures.

### Puis-je exécuter du JavaScript personnalisé ?

Oui ! Utilisez l'outil `execute_script` :

"Exécute un script pour obtenir le titre de la page"
"Exécute le script : return document.querySelectorAll('button').length"

---

## Automatisation mobile

### Comment démarrer une application iOS ?

Demandez à Claude avec les détails nécessaires :

"Démarre mon application iOS située à /path/to/MyApp.app sur le simulateur iPhone 15"

Ou pour une application installée :

"Démarre l'application avec noReset activé sur le simulateur iPhone 15"

### Comment démarrer une application Android ?

"Démarre mon application Android à /path/to/app.apk sur l'émulateur Pixel 7"

Ou pour une application installée :

"Démarre l'application avec noReset activé sur l'émulateur Pixel 7"

### Puis-je tester sur des appareils réels ?

Oui ! Pour les appareils réels, vous aurez besoin de l'UDID de l'appareil :

-   **iOS :** Connectez l'appareil, ouvrez Finder, cliquez sur l'appareil, cliquez sur le numéro de série pour révéler l'UDID
-   **Android :** Exécutez `adb devices` dans le terminal

Puis demandez à Claude :

"Démarre mon application iOS sur l'appareil réel avec l'UDID abc123..."

### Comment gérer les boîtes de dialogue d'autorisation ?

Par défaut, les autorisations sont accordées automatiquement (`autoGrantPermissions: true`). Si vous devez tester les flux d'autorisation, vous pouvez désactiver cette option :

"Démarre mon application sans accorder automatiquement les autorisations"

### Quels gestes sont pris en charge ?

-   **Tap :** Appuyer sur des éléments ou des coordonnées
-   **Swipe :** Glisser vers le haut, le bas, la gauche ou la droite
-   **Drag and Drop :** Faire glisser d'un élément à un autre ou vers des coordonnées

Remarque : `long_press` est disponible via `execute_script` avec les commandes mobiles Appium.

### Comment faire défiler dans les applications mobiles ?

Utilisez des gestes de balayage :

"Balaye vers le haut pour défiler vers le bas"
"Balaye vers le bas pour défiler vers le haut"

### Puis-je faire pivoter l'appareil ?

Oui :

"Fais pivoter l'appareil en mode paysage"
"Fais pivoter l'appareil en mode portrait"

### Comment gérer les applications hybrides ?

Pour les applications avec des webviews, vous pouvez changer de contexte :

"Obtiens les contextes disponibles"
"Passe au contexte webview"
"Retourne au contexte natif"

### Puis-je exécuter des commandes mobiles Appium ?

Oui ! Utilisez l'outil `execute_script` :

```
Exécute le script "mobile: pressKey" avec les arguments [{ keycode: 4 }]  // Appuie sur RETOUR sur Android
Exécute le script "mobile: activateApp" avec les arguments [{ appId: "com.example.app" }]
Exécute le script "mobile: terminateApp" avec les arguments [{ bundleId: "com.example.app" }]
```

---

## Sélection d'éléments

### Comment Claude sait-il avec quel élément interagir ?

Claude utilise l'outil `get_visible_elements` pour identifier les éléments interactifs sur la page/écran. Chaque élément est accompagné de plusieurs stratégies de sélecteur.

### Que faire s'il y a trop d'éléments sur la page ?

Utilisez la pagination pour gérer les grandes listes d'éléments :

"Obtiens les 20 premiers éléments visibles"
"Obtiens les éléments visibles avec un décalage de 20 et une limite de 20"

La réponse inclut `total`, `showing` et `hasMore` pour aider à naviguer à travers les éléments.

### Puis-je obtenir uniquement des types spécifiques d'éléments ?

Oui ! Utilisez le paramètre `elementType` :

-   `interactable` (par défaut) : Boutons, liens, champs de saisie
-   `visual` : Images, SVGs
-   `all` : Les deux types

"Obtiens les éléments visuels visibles sur la page"

### Que faire si Claude clique sur le mauvais élément ?

Vous pouvez être plus précis :

-   Fournir le texte exact : "Clique sur le bouton qui dit 'Valider la commande'"
-   Fournir le sélecteur : "Clique sur l'élément avec le sélecteur #submit-btn"
-   Fournir l'ID d'accessibilité : "Clique sur l'élément avec l'ID d'accessibilité loginButton"

### Quelle est la meilleure stratégie de sélecteur pour mobile ?

1. **Accessibility ID** (meilleur) - `~loginButton`
2. **Resource ID** (Android) - `id=login_button`
3. **Predicate String** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (dernier recours) - plus lent mais fonctionne partout

### Qu'est-ce que l'arbre d'accessibilité et quand devrais-je l'utiliser ?

L'arbre d'accessibilité fournit des informations sémantiques sur les éléments de la page (rôles, noms, états). Utilisez `get_accessibility` quand :
- `get_visible_elements` ne renvoie pas les éléments attendus
- Vous devez trouver des éléments par rôle d'accessibilité (bouton, lien, zone de texte, etc.)
- Vous avez besoin d'informations sémantiques détaillées sur les éléments

"Obtiens l'arbre d'accessibilité filtré aux rôles de bouton et de lien"

---

## Gestion de session

### Puis-je avoir plusieurs sessions en même temps ?

Non. Le serveur MCP utilise un modèle à session unique. Une seule session de navigateur ou d'application peut être active à la fois.

### Que se passe-t-il lorsque je ferme une session ?

Cela dépend du type de session et des paramètres :

-   **Navigateur :** Chrome se ferme complètement
-   **Mobile avec `noReset: false` :** L'application se termine
-   **Mobile avec `noReset: true` ou sans `appPath` :** L'application reste ouverte (la session se détache automatiquement)

### Puis-je préserver l'état de l'application entre les sessions ?

Oui ! Utilisez l'option `noReset` :

"Démarre mon application avec noReset activé"

Cela préserve l'état de connexion, les préférences et autres données de l'application.

### Quelle est la différence entre fermer et détacher ?

-   **Fermer :** Termine complètement le navigateur/l'application
-   **Détacher :** Déconnecte l'automatisation mais garde le navigateur/l'application en cours d'exécution

Le détachement est utile lorsque vous souhaitez inspecter manuellement l'état après l'automatisation.

### Ma session expire continuellement pendant le débogage

Augmentez le délai de commande :

"Démarre mon application avec un newCommandTimeout de 300 secondes"

La valeur par défaut est de 60 secondes. Pour les longues sessions de débogage, essayez 300-600 secondes.

---

## Dépannage

### Erreur "Session non trouvée"

Cela signifie qu'aucune session active n'existe. Démarrez d'abord une session de navigateur ou d'application :

"Démarre Chrome et navigue vers google.com"

### Erreur "Élément non trouvé"

L'élément pourrait ne pas être visible ou avoir un sélecteur différent. Essayez :

1. De demander d'abord à Claude d'obtenir tous les éléments visibles
2. De fournir un sélecteur plus spécifique
3. D'attendre que la page/application se charge complètement
4. D'utiliser `inViewportOnly: false` pour trouver des éléments hors écran

### Le navigateur ne démarre pas

1. Assurez-vous que Chrome est installé
2. Vérifiez si un autre processus utilise le port de débogage (9222)
3. Essayez le mode headless

### La connexion Appium a échoué

C'est le problème le plus courant lors du démarrage de l'automatisation mobile.

1. **Vérifiez qu'Appium est en cours d'exécution** : `curl http://localhost:4723/status`
2. Démarrez Appium si nécessaire : `appium`
3. Vérifiez que votre configuration d'URL Appium correspond au serveur
4. Assurez-vous que les pilotes sont installés : `appium driver list --installed`

:::tip
Le serveur MCP nécessite qu'Appium soit en cours d'exécution avant de démarrer les sessions mobiles. Assurez-vous de démarrer Appium d'abord :
```sh
appium
```
Les versions futures pourraient inclure une gestion automatique du service Appium.
:::

### Le simulateur iOS ne démarre pas

1. Assurez-vous que Xcode est installé : `xcode-select --install`
2. Listez les simulateurs disponibles : `xcrun simctl list devices`
3. Vérifiez les erreurs spécifiques au simulateur dans Console.app

### L'émulateur Android ne démarre pas

1. Définissez `ANDROID_HOME` : `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. Vérifiez les émulateurs : `emulator -list-avds`
3. Démarrez l'émulateur manuellement : `emulator -avd <avd-name>`
4. Vérifiez que l'appareil est connecté : `adb devices`

### Les captures d'écran ne fonctionnent pas

1. Pour mobile, assurez-vous que la session est active
2. Pour le navigateur, essayez une page différente (certaines pages bloquent les captures d'écran)
3. Vérifiez les journaux Claude Desktop pour les erreurs

Les captures d'écran sont automatiquement compressées à 1MB maximum, donc les grandes captures fonctionneront mais pourront être de qualité inférieure.

---

## Performance

### Pourquoi l'automatisation mobile est-elle lente ?

L'automatisation mobile implique :
1. Communication réseau avec le serveur Appium
2. Communication d'Appium avec l'appareil/simulateur
3. Rendu et réponse de l'appareil

Conseils pour une automatisation plus rapide :
-   Utilisez des émulateurs/simulateurs au lieu d'appareils réels pour le développement
-   Utilisez des accessibility IDs au lieu de XPath
-   Activez `inViewportOnly: true` pour la détection d'éléments
-   Utilisez la pagination (`limit`) pour réduire l'utilisation de tokens

### Comment accélérer la détection d'éléments ?

Le serveur MCP optimise déjà la détection d'éléments en utilisant l'analyse XML de la source de page (2 appels HTTP contre 600+ pour les requêtes d'éléments traditionnelles). Conseils supplémentaires :

-   Gardez `inViewportOnly: true` (par défaut)
-   Réglez `includeContainers: false` (par défaut)
-   Utilisez `limit` et `offset` pour la pagination sur les grands écrans
-   Utilisez des sélecteurs spécifiques au lieu de chercher tous les éléments

### Les captures d'écran sont lentes ou échouent

Les captures d'écran sont automatiquement optimisées :
- Redimensionnées si elles dépassent 2000px
- Compressées pour rester sous 1MB
- Converties en JPEG si le PNG est trop volumineux

Cette optimisation réduit le temps de traitement et garantit que Claude peut gérer l'image.

---

## Limitations

### Quelles sont les limitations actuelles ?

-   **Session unique :** Un seul navigateur/application à la fois
-   **Support de navigateur :** Chrome uniquement (pour l'instant)
-   **Support d'iframe :** Support limité pour les iframes
-   **Téléchargements de fichiers :** Pas directement pris en charge via les outils
-   **Audio/Vidéo :** Impossible d'interagir avec la lecture multimédia
-   **Extensions de navigateur :** Non prises en charge

### Puis-je l'utiliser pour les tests de production ?

WebdriverIO MCP est conçu pour l'automatisation interactive assistée par IA. Pour les tests de production CI/CD, envisagez d'utiliser le test runner traditionnel de WebdriverIO avec un contrôle programmatique complet.

---

## Sécurité

### Mes données sont-elles sécurisées ?

Le serveur MCP s'exécute localement sur votre machine. Toute l'automatisation se fait via des connexions locales au navigateur/Appium. Aucune donnée n'est envoyée à des serveurs externes au-delà de ce vers quoi vous naviguez explicitement.

### Claude peut-il accéder à mes mots de passe ?

Claude peut voir le contenu de la page et interagir avec les éléments, mais :
-   Les mots de passe dans les champs `<input type="password">` sont masqués
-   Vous devriez éviter d'automatiser des identifiants sensibles
-   Utilisez des comptes de test pour l'automatisation

---

## Contribution

### Comment puis-je contribuer ?

Visitez le [dépôt GitHub](https://github.com/webdriverio/mcp) pour :
-   Signaler des bugs
-   Demander des fonctionnalités
-   Soumettre des pull requests

### Où puis-je obtenir de l'aide ?

-   [Discord WebdriverIO](https://discord.webdriver.io/)
-   [Problèmes GitHub](https://github.com/webdriverio/mcp/issues)
-   [Documentation WebdriverIO](https://webdriver.io/)