---
id: preserve-and-rerun
title: Preserve & Rerun (Comparer)
description: "Capturez un instantané d'une exécution en échec et relancez le test en un clic avec Preserve & Rerun, puis comparez les deux exécutions pour identifier ce qui a changé."
---

Lorsqu'un test échoue, la boucle de débogage habituelle consiste à le relancer, puis à comparer deux murs de logs pour comprendre ce qui a changé. Preserve & Rerun réduit tout cela à un seul clic. Il **capture un instantané de l'exécution en échec et ré-exécute le test en une seule action**, puis affiche les deux exécutions côte à côte dans une vue **Compare** alignée commande par commande - vous voyez ainsi exactement où les deux ont divergé sans avoir à tout relire.

C'est le moyen le plus rapide de diagnostiquer un test instable (flaky) : la commande qui s'est comportée différemment entre la réussite et l'échec est mise en évidence pour vous, ainsi que l'assertion qui a échoué.

Disponible sur tous les adaptateurs - **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** (Node.js et Python) et **[Nightwatch.js](/docs/devtools/nightwatch)**. Le filtre de relance diffère selon le framework (WebdriverIO `--spec` plus un grep, Selenium `--grep` / `--testNamePattern`, Nightwatch `DEVTOOLS_RERUN_LABEL`, identifiants de nœuds pytest) ; le tableau de bord est identique.

## Démo

![Preserve & Rerun Demo](/img/devtools/preserve-rerun.gif)

## Fonctionnement

1. Exécutez vos tests normalement. Lorsqu'un test se termine à l'état **failed**, survolez sa ligne dans la barre latérale.
2. Une icône bug-play (🐞▶) apparaît à côté du bouton de relance ▶ habituel. Elle ne s'affiche que sur les lignes de tests/suites en échec, là où une relance simple est déjà prise en charge (par ex. les scénarios Cucumber au niveau de la ligne du scénario, les tests Mocha/Jasmine au niveau de la ligne du test ou de la suite).
3. Cliquez dessus. DevTools capture un instantané de l'exécution en échec, puis relance uniquement ce test.
4. L'onglet **Compare** s'ouvre avec les deux exécutions alignées par commande. Le point de divergence et l'erreur d'assertion (**Expected vs Received**) sont mis en évidence.

## Fonctionnalités clés

- **Instantané + relance en un clic** - Conservez l'exécution en échec et ré-exécutez-la en une seule action, sans modification de code ni redémarrage de toute la suite.
- **Alignement commande par commande** - Les deux exécutions sont disposées côte à côte et alignées par commande, de sorte que les différences ressortent instantanément.
- **Point d'échec mis en évidence** - Vous amène directement à la commande où les deux exécutions ont divergé.
- **Diff d'assertion** - Affiche l'assertion qui a échoué avec Expected vs Received côte à côte.
- **Fenêtre détachable** - Ouvrez la comparaison dans une fenêtre séparée et thématisée pour un affichage plus spacieux.
- **Tri des tests instables** - Voyez quelle commande a différé entre une réussite et un échec sans relire les logs.

## Limitations

- **Cucumber** : la relance par étape est désactivée car le filtre `--name` de Cucumber cible les scénarios, et non les étapes Gherkin individuelles. Preserve & Rerun au niveau du scénario fonctionne toujours.