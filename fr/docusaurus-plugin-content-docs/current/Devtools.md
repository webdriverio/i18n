---
id: devtools
title: DevTools
---

Le service DevTools offre une puissante interface de débogage basée sur le navigateur pour les exécutions de tests WebdriverIO. Il vous permet de visualiser, déboguer et contrôler vos tests en temps réel via une application web interactive.

## Aperçu

Ce service vous permet de :

- **Relancer des tests sélectivement** - Cliquez sur n'importe quel cas de test ou suite pour le réexécuter instantanément
- **Déboguer visuellement** - Voir des aperçus de navigateur en direct avec captures d'écran automatiques
- **Suivre l'exécution** - Afficher des journaux de commandes détaillés avec horodatages et résultats
- **Surveiller le réseau et la console** - Inspecter les appels API et les journaux JavaScript
- **Naviguer vers le code** - Accéder directement aux fichiers source de test

## Installation

Installez le service en tant que dépendance de développement :

```sh
npm install --save-dev @wdio/devtools-service
```

## Configuration

Ajoutez le service à votre configuration WebDriverIO :

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['devtools'],
    // ...
};
```

### Options de service

Configurez le service DevTools avec ces options :

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['devtools', {
            port: 3000,      // Port pour l'interface utilisateur devtools (par défaut : 3000)
        }]
    ],
    // ...
};
```

#### Options

- **port** (nombre, par défaut : `3000`) - Numéro de port pour le serveur d'interface utilisateur devtools

## Comment ça fonctionne

Lorsque vous exécutez vos tests WebdriverIO avec le service DevTools activé :

1. Le service ouvre une fenêtre de navigateur à `http://localhost:3000` (configurable)
2. Vos tests s'exécutent normalement tandis que l'interface DevTools affiche des mises à jour en temps réel
3. L'interface affiche la hiérarchie des tests, l'aperçu du navigateur, la chronologie des commandes et les journaux
4. Une fois les tests terminés, vous pouvez cliquer sur n'importe quel test pour le relancer individuellement
5. Les tests sont relancés dans la même session de navigateur pour un débogage plus rapide

## Fonctionnalités

Explorez les fonctionnalités de DevTools en détail :

- **[Relancement et visualisation interactifs des tests](devtools/interactive-test-rerunning)** - Aperçus de navigateur en temps réel avec relancement de tests
- **[Support multi-frameworks](devtools/multi-framework-support)** - Fonctionne avec Mocha, Jasmine et Cucumber
- **[Journaux de console](devtools/console-logs)** - Capturer et inspecter la sortie de console du navigateur
- **[Journaux réseau](devtools/network-logs)** - Surveiller les appels API et l'activité réseau
- **[TestLens](devtools/testlens)** - Naviguer vers le code source avec une navigation intelligente du code