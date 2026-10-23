---
id: screencast
title: Screencast de session
description: "Enregistrez les sessions du navigateur sous forme de vidéos .webm avec le screencast de DevTools, configurez les options de capture et trouvez les fichiers de sortie."
---

Enregistre les sessions du navigateur sous forme de vidéos `.webm`. Les vidéos sont affichées dans l'interface DevTools aux côtés des vues des snapshots et des mutations du DOM.

Disponible avec les trois adaptateurs : **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** et **[Nightwatch.js](/docs/devtools/nightwatch#screencast)**. Le mode de capture diffère selon le framework (push CDP lorsque c'est possible, polling sinon - voir [Compatibilité des navigateurs](#browser-support) ci-dessous).

## Démo

![Screencast Demo](/img/devtools/screencast.gif)

## Installation

L'encodage du screencast nécessite le binaire **ffmpeg** dans le `PATH`. Le wrapper `fluent-ffmpeg` est installé avec l'adaptateur, il n'y a donc rien d'autre à ajouter :

```sh
# Installer ffmpeg - https://ffmpeg.org/download.html
brew install ffmpeg        # macOS
sudo apt install ffmpeg    # Ubuntu/Debian
```

Sans ffmpeg, l'enregistreur fonctionne toujours, mais l'étape d'encodage affiche un avertissement et n'écrit aucun fichier.

## Configuration

```ts
services: [
  [
    'devtools',
    {
      screencast: {
        enabled: true,
        captureFormat: 'jpeg',
        quality: 70,
        maxWidth: 1280,
        maxHeight: 720,
      }
    }
  ]
]
```

## Options

| Option | Type | Défaut | Description |
|---|---|---|---|
| `enabled` | `boolean` | `false` | Active l'enregistrement de la session |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Format d'image des frames. **Chrome/Chromium uniquement** - contrôle le format que Chrome envoie via CDP. Ignoré en mode polling (Firefox, Safari) où les captures d'écran sont toujours en PNG. N'affecte pas le conteneur de la vidéo de sortie, qui est toujours `.webm` |
| `quality` | `number` | `70` | Qualité de compression JPEG de 0 à 100. S'applique uniquement en mode CDP Chrome/Chromium avec `captureFormat: 'jpeg'` |
| `maxWidth` | `number` | `1280` | Largeur maximale des frames en pixels. **Chrome/Chromium uniquement** - Chrome redimensionne les frames avant de les envoyer via CDP. Ignoré en mode polling |
| `maxHeight` | `number` | `720` | Hauteur maximale des frames en pixels. **Chrome/Chromium uniquement** - identique à ci-dessus |
| `pollIntervalMs` | `number` | `200` | Intervalle entre les captures d'écran en millisecondes pour les navigateurs autres que Chrome (mode polling). Plus la valeur est faible, plus la vidéo est fluide, mais plus il y a d'allers-retours WebDriver pendant l'exécution des tests |
| `maxBufferFrames` | `number` | `2000` | Nombre maximal de frames conservées en mémoire. Au-delà, le buffer est allégé sur place, en conservant la première et la dernière frame |

## Compatibilité des navigateurs

L'enregistrement fonctionne sur tous les principaux navigateurs grâce à une sélection automatique du mode :

| Navigateur | Mode | Remarques |
|---|---|---|
| Chrome / Chromium / Edge | **Push CDP** | Chrome envoie les frames via le DevTools Protocol. Efficace - aucun impact sur la durée des commandes de test |
| Firefox / Safari / autres | **Polling BiDi** | Se rabat sur des appels à `browser.takeScreenshot()` à intervalles de `pollIntervalMs`. Fonctionne partout où les captures d'écran WebDriver sont prises en charge ; ajoute une légère surcharge proportionnelle à l'intervalle |

Aucune modification de configuration n'est nécessaire pour changer de mode - le service détecte automatiquement les capacités du navigateur et indique dans les logs quel mode est actif.

## Comportement

- L'enregistrement démarre à l'ouverture de la session du navigateur et s'arrête à sa fermeture.
- Les frames vides initiales (capturées avant la première navigation vers une URL) sont automatiquement supprimées afin que les vidéos commencent à la première action significative sur la page.
- Si `browser.reloadSession()` est appelé en cours d'exécution, le service finalise l'enregistrement en cours et en démarre un nouveau pour la nouvelle session. Chaque session produit son propre fichier `.webm`.
- Lorsque plusieurs enregistrements existent, l'interface DevTools affiche une liste déroulante **Recording N** permettant de passer de l'un à l'autre.

### Emplacement des fichiers de sortie

Chaque adaptateur écrit dans un dossier `test-results/` ; le répertoire de base dans lequel il se trouve diffère, car les adaptateurs partagent un même résolveur mais lui fournissent des entrées différentes :

| Adaptateur | Emplacement de sortie |
|---|---|
| **WebdriverIO** | `<outputDir>/test-results/` si `outputDir` est explicitement défini dans `wdio.conf.ts`, sinon `<rootDir>/test-results/` (`rootDir` est le répertoire contenant la configuration). Évitez de définir `outputDir` uniquement pour contrôler l'emplacement des vidéos - WDIO y redirige également les logs des workers. |
| **Selenium** | `test-results/` dans le répertoire du fichier de test qui vient de s'exécuter, avec repli sur `process.cwd()`. |
| **Nightwatch** | `test-results/` dans le répertoire du fichier de test, avec repli sur le répertoire contenant `nightwatch.conf.*`, puis sur `process.cwd()`. |

Les répertoires situés sous `node_modules/` sont ignorés pour Selenium/Nightwatch afin que les workspaces liés par symlink ne déposent pas de vidéos dans un dossier de dépendance, et un répertoire non accessible en écriture passe au candidat suivant.

## Fichiers de sortie

Le mode live diffuse les données capturées vers le tableau de bord via WebSocket et n'écrit **aucun fichier de trace sur le disque** — pour obtenir un artefact portable, utilisez le [mode trace](/docs/devtools/wdio/trace-mode) (`trace.zip`). Le seul fichier écrit par le mode live est la vidéo du screencast, et uniquement lorsque `screencast.enabled: true`. Les noms de fichiers sont spécifiques à chaque adaptateur (le nom du framework apparaît dans le préfixe) :

| Adaptateur | Vidéo du screencast |
|---|---|
| WebdriverIO | `wdio-video-{sessionId}.webm` |
| Selenium | `selenium-video-{sessionId}.webm` |
| Nightwatch | `nightwatch-video-{sessionId}.webm` |