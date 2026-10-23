---
id: devtools
title: DevTools
description: "Visualisez, contrôlez et inspectez les exécutions de tests dans une interface de débogage basée sur le navigateur qui fonctionne avec WebdriverIO, Nightwatch.js et Selenium WebDriver."
---

DevTools est une puissante interface de débogage basée sur le navigateur permettant de visualiser, contrôler et inspecter vos exécutions de tests en temps réel. Elle fonctionne avec **WebdriverIO**, **Nightwatch.js**, **Selenium WebDriver** (n'importe quel runner) et **Python Selenium** — même backend, même interface, même infrastructure de capture.

## Ce qu'il offre

- **Réexécuter les tests de manière sélective** - Cliquez sur n'importe quel cas de test ou suite pour le réexécuter instantanément ([détails](/docs/devtools/wdio/interactive-test-rerunning))
- **Préserver et réexécuter (Comparer)** - Prenez un instantané d'un test en échec, réexécutez-le et comparez les deux exécutions côte à côte, alignées par commande ([détails](/docs/devtools/wdio/preserve-and-rerun))
- **Déboguer visuellement** - Visualisez des aperçus du navigateur en direct avec des captures d'écran automatiques après chaque commande
- **Suivre l'exécution** - Consultez des journaux de commandes détaillés avec horodatages et résultats
- **Surveiller le réseau et la console** - Inspectez les appels API et les journaux JavaScript ([réseau](/docs/devtools/wdio/network-logs) · [console](/docs/devtools/wdio/console-logs))
- **Naviguer vers le code** - Accédez directement aux fichiers source des tests avec TestLens ([détails](/docs/devtools/wdio/testlens))
- **Enregistrer les sessions** - Vidéo `.webm` continue du navigateur, par session ([détails](/docs/devtools/wdio/screencast))
- **Mobile** - Sessions Appium (navigateur mobile, applications natives et hybrides) en mode direct et en mode trace ([détails](/docs/devtools/mobile))
- **Mode trace** - Chemin de capture headless produisant un artefact `trace.zip` portable pour une relecture hors ligne ou une consommation par des agents ([détails](/docs/devtools/wdio/trace-mode))

## Comment ça fonctionne

1. Lancez vos tests normalement
2. DevTools ouvre automatiquement une fenêtre de navigateur à l'adresse `http://localhost:3000`
3. L'interface affiche la hiérarchie des tests, l'aperçu du navigateur, la chronologie des commandes et les journaux en temps réel
4. Une fois les tests terminés, cliquez sur n'importe quel test pour le réexécuter ; la réexécution s'effectue dans un nouveau processus de test et est diffusée dans la même fenêtre du tableau de bord

## Choisissez votre framework

- **[WebDriverIO](/docs/devtools/wdio)** - Utilisez `@wdio/devtools-service` avec Mocha, Jasmine ou Cucumber
- **[Nightwatch](/docs/devtools/nightwatch)** - Utilisez `@wdio/nightwatch-devtools` sans aucune modification du code de test
- **[Selenium](/docs/devtools/selenium)** - Utilisez `@wdio/selenium-devtools` avec Mocha, Jest, Cucumber ou de simples scripts Node
- **[Python Selenium](/docs/devtools/selenium)** - Utilisez `selenium-devtools-py` avec pytest ou un simple script (voir les onglets Python)