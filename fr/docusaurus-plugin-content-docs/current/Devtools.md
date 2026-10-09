---
id: devtools
title: DevTools
description: "Visualisez, contrôlez et inspectez les exécutions de tests dans une interface de débogage basée sur le navigateur qui fonctionne avec WebdriverIO, Nightwatch.js et Selenium WebDriver."
---

DevTools est une puissante interface de débogage basée sur le navigateur permettant de visualiser, contrôler et inspecter vos exécutions de tests en temps réel. Elle fonctionne avec **WebdriverIO**, **Nightwatch.js** et **Selenium WebDriver** (n'importe quel runner) — même backend, même interface, même infrastructure de capture.

## Ce qu'il offre

- **Réexécuter les tests de manière sélective** - Cliquez sur n'importe quel cas de test ou suite pour le réexécuter instantanément ([détails](/docs/devtools/wdio/interactive-test-rerunning))
- **Préserver et réexécuter (Comparer)** - Prenez un instantané d'un test en échec, réexécutez-le et comparez les deux exécutions côte à côte, alignées par commande ([détails](/docs/devtools/wdio/preserve-and-rerun))
- **Déboguer visuellement** - Visualisez des aperçus du navigateur en direct avec des captures d'écran automatiques après chaque commande
- **Suivre l'exécution** - Consultez des journaux de commandes détaillés avec horodatages et résultats
- **Surveiller le réseau et la console** - Inspectez les appels API et les journaux JavaScript ([réseau](/docs/devtools/wdio/network-logs) · [console](/docs/devtools/wdio/console-logs))
- **Naviguer vers le code** - Accédez directement aux fichiers sources des tests avec TestLens ([détails](/docs/devtools/wdio/testlens))
- **Enregistrer les sessions** - Vidéo `.webm` continue du navigateur, par session ([détails](/docs/devtools/wdio/screencast))
- **Mode trace** - Chemin de capture headless produisant un artefact `trace.zip` portable pour une relecture hors ligne ou une utilisation par des agents ([détails](/docs/devtools/wdio/trace-mode))

## Comment ça fonctionne

1. Lancez vos tests normalement
2. DevTools ouvre automatiquement une fenêtre de navigateur à l'adresse `http://localhost:3000`
3. L'interface affiche la hiérarchie des tests, l'aperçu du navigateur, la chronologie des commandes et les journaux en temps réel
4. Une fois les tests terminés, cliquez sur n'importe quel test pour le réexécuter individuellement dans la même session de navigateur

## Choisissez votre framework

- **[WebDriverIO](/docs/devtools/wdio)** - Utilisez `@wdio/devtools-service` avec Mocha, Jasmine ou Cucumber
- **[Nightwatch](/docs/devtools/nightwatch)** - Utilisez `@wdio/nightwatch-devtools` sans aucune modification du code de test
- **[Selenium](/docs/devtools/selenium)** - Utilisez `@wdio/selenium-devtools` avec Mocha, Jest, Cucumber ou de simples scripts Node