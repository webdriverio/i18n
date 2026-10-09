---
id: preserve-and-rerun
title: Préserver et relancer (Comparer)
description: "Capturez un instantané d'une exécution en échec et relancez le test en un clic avec Préserver et relancer, puis comparez les deux exécutions pour identifier ce qui a changé."
---

Lorsqu'un test échoue, la boucle de débogage habituelle consiste à le relancer, puis à comparer deux murs de logs pour déterminer ce qui a changé. Préserver et relancer réduit tout cela à un seul clic. Cette fonctionnalité **capture un instantané de l'exécution en échec et ré-exécute le test en une seule action**, puis affiche les deux exécutions côte à côte dans une vue **Comparer** alignée commande par commande - pour que vous puissiez voir exactement où elles ont divergé sans rien avoir à relire.

C'est le moyen le plus rapide de diagnostiquer un test instable (flaky) : la commande qui s'est comportée différemment entre la réussite et l'échec est mise en évidence pour vous, ainsi que l'assertion qui a échoué.

Disponible pour les trois adaptateurs - **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** et **[Nightwatch.js](/docs/devtools/nightwatch)**.

## Démo

![Preserve & Rerun Demo](/img/devtools/preserve-rerun.gif)

## Fonctionnement

1. Exécutez vos tests normalement. Lorsqu'un test se termine en état **échoué**, survolez sa ligne dans la barre latérale.
2. Une icône bug-lecture (🐞▶) apparaît à côté du bouton de relance ▶ habituel. Elle ne s'affiche que sur les lignes de tests/suites en échec, partout où une relance simple est déjà prise en charge (par ex. les scénarios Cucumber au niveau de la ligne du scénario, les tests Mocha/Jasmine au niveau de la ligne du test ou de la suite).
3. Cliquez dessus. DevTools capture un instantané de l'exécution en échec, puis relance uniquement ce test.
4. L'onglet **Comparer** s'ouvre avec les deux exécutions alignées par commande. Le point de divergence et l'erreur d'assertion (**Expected vs Received**) sont mis en évidence.

## Fonctionnalités clés

- **Instantané + relance en un clic** - Préservez l'exécution en échec et ré-exécutez-la en une seule action, sans modification de code ni redémarrage de toute la suite.
- **Alignement commande par commande** - Les deux exécutions sont disposées côte à côte et alignées par commande, de sorte que les différences ressortent instantanément.
- **Point d'échec mis en évidence** - Vous amène directement à la commande où les deux exécutions ont divergé.
- **Diff d'assertion** - Affiche l'assertion qui a échoué avec Expected vs Received côte à côte.
- **Fenêtre détachable** - Ouvrez la comparaison dans une fenêtre séparée et thématisée pour une vue plus spacieuse.
- **Triage des tests instables** - Voyez quelle commande a différé entre une réussite et un échec sans relire les logs.

## Limitations

- **Cucumber** : la relance par étape est désactivée, car le filtre `--name` de Cucumber cible les scénarios, et non les étapes Gherkin individuelles. Préserver et relancer au niveau du scénario fonctionne toujours.