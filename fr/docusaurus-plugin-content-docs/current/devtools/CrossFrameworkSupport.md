---
id: cross-framework
title: Prise en charge multi-frameworks
description: "Comparez le degré d'exhaustivité avec lequel le mode trace de DevTools capture les exécutions WebdriverIO, Selenium et Nightwatch, ainsi que les lacunes de chaque adaptateur."
---

Le format de trace et le lecteur `show-trace` sont identiques pour WebdriverIO / Selenium / Nightwatch ; cette page indique où l'exhaustivité de la capture diffère. Pour la référence complète du mode trace, consultez [Mode Trace](/docs/devtools/wdio/trace-mode).

Les transformations qui construisent une trace se trouvent dans [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace), une couche en dessous des adaptateurs, de sorte que **le format de trace et le lecteur `show-trace` sont identiques pour chaque adaptateur** : le même `.zip` (ou répertoire) s'ouvre dans le même lecteur, quel que soit l'adaptateur qui l'a produit. Les trois adaptateurs ci-dessous partagent en outre les options de base (`mode`, `traceGranularity`, `tracePolicy`, `traceFormat`, `filmstrip`, `emitArtifactsManifest`, `captureAssertions`).

**L'exhaustivité de la capture varie toutefois selon l'adaptateur** : WebdriverIO est le plus complet ; Selenium et Nightwatch couvrent le flux principal avec les lacunes indiquées ci-dessous. La syntaxe d'activation propre à chaque framework se trouve sur la page de chaque adaptateur ; consultez [Selenium](/docs/devtools/selenium#trace-mode) et [Nightwatch](/docs/devtools/nightwatch#trace-mode).

L'adaptateur Python (voir les onglets **Python** de la page [Selenium](/docs/devtools/selenium)) écrit la même archive et s'ouvre dans le même lecteur, mais ne figure pas dans ce tableau : il n'exécute aucun JavaScript dans le processus de test, de sorte que c'est le backend qui construit sa trace à partir du flux capturé, au lieu que l'adaptateur la construise dans le processus. La granularité et la rétention ont bien des équivalents Python : `--devtools-trace-granularity session|test` et `--devtools-trace-policy`, ce dernier voyant ses valeurs sensibles aux nouvelles tentatives se rabattre sur `retain-on-failure`, car rien dans ce flux ne transporte de numéro de tentative. Les lignes sans équivalent Python sont celles qui concernent les artefacts par test : `screenshot`, `video` et l'attachement Allure intégré. Ce qu'il capture — le voyage dans le temps du DOM, la pellicule dense, l'arbre A11y et la superposition d'éléments, les commandes, la console, le réseau, les assertions, les contrôles d'exécution et Preserve & Rerun — est décrit sur sa propre page.

| Fonctionnalité | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| Mode trace + lecteur `show-trace` | ✅ | ✅ | ✅ |
| Voyage dans le temps du DOM (capture des mutations) | ✅ | ✅ ¹ | ✅ |
| Onglet A11y + superposition de sélection de localisateur (lecteur de trace) | ✅ | ✅ | ✅ |
| Transcription + Copy-for-LLM | ✅ | ✅ | ✅ |
| `screenshot` / `video` par test | ✅ Allure intégré | ✅ Allure intégré | ⚠️ production uniquement ² |
| Détection automatique de `emitArtifactsManifest` | ✅ | ✅ | ⚠️ activation manuelle uniquement |
| `tracePolicy` sensible aux nouvelles tentatives | ✅ | ✅ | ⚠️ `retain-on-failure` uniquement ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / objet exports ; le BDD `describe/it` est réduit à une tranche de session |
| Imbrication Cucumber Feature→Scenario→Step | Scenario→Step ⁴ | ✅ complète | Feature→Scenario ⁵ |
| Capture BiDi (console / réseau / exceptions) | ✅ auto | ✅ auto | ⚠️ activation manuelle (`bidi: true` + `webSocketUrl`) |
| Screencast (pellicule / vidéo) | Push CDP | Push CDP | interrogation périodique uniquement |
| Onglet A11y + superposition du tableau de bord en direct | ✅ | lecteur de trace uniquement | lecteur de trace uniquement |

¹ Selenium reconstruit le DOM à chaque navigation ; la synchronisation des ancres est approximative (l'instantané d'une navigation peut être en retard sur la commande qui l'a déclenchée).
² Nightwatch ne dispose d'aucune API d'attachement Allure en direct ; les artefacts par test sont donc écrits dans le répertoire de sortie de la trace et répertoriés dans le manifeste, mais ne sont pas attachés à un test Allure.
³ L'option `--retries` de Nightwatch relance un test en interne sans redéclencher les hooks par test du plugin, de sorte que les politiques sensibles aux nouvelles tentatives (`on-first-retry`, `retain-on-first-failure`, …) se rabattent sur `retain-on-failure`.
⁴ WebdriverIO ne transmet pas encore l'ascendance au niveau de la feature, son imbrication Cucumber est donc Scenario→Step.
⁵ Nightwatch n'applique pas encore l'imbrication par étape (Feature→Scenario uniquement).