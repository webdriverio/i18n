---
id: limitations
title: Limitations du mode trace
description: "Découvrez ce que le mode trace de DevTools ne capture délibérément pas, ainsi que les limitations connues des adaptateurs WebdriverIO, Selenium et Nightwatch."
---

Ce que le [mode trace](/docs/devtools/wdio/trace-mode) ignore délibérément, ainsi que les lacunes connues selon les adaptateurs.

## Ce que le mode trace ignore

- **Fenêtre de l'interface DevTools** — aucune instance de Chrome ne s'ouvre pour le tableau de bord.
- **Liaison de port du backend** — aucun port localhost n'est réservé (comportement identique sur les trois adaptateurs depuis la v1.2+).
- **`screencast.enabled`** — l'enregistrement `.webm` continu du mode live est ignoré en mode trace (un avertissement est journalisé). Le mode trace enregistre à la place une [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) dense dans l'archive **par défaut** (définissez `filmstrip: false` pour obtenir une image par action), ainsi que des segments [`video`](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) par test lorsqu'ils sont activés. Les champs de **réglage** du screencast (`quality`, `maxWidth`, `pollIntervalMs`, …) s'appliquent toujours à l'enregistreur utilisé, quel qu'il soit.
- **Export `wdio-trace-<sessionId>.json`** — entièrement supprimé. L'ancien fichier JSON monolithique qu'écrivait le mode live de WDIO n'existe plus ; le mode live diffuse désormais ses données vers le tableau de bord et n'écrit rien sur le disque, et le fichier `trace.zip` est l'unique artefact de trace.

## Limitations connues

- **`describe/it` BDD de Nightwatch** — `traceGranularity: 'test'` se réduit à un **segment unique à l'échelle de la session** : Nightwatch exécute les `it` individuels en interne sans hook par test visible par le plugin, si bien que le segment est associé au premier test. La capture des métadonnées (état par testcase dans le manifeste) n'est pas affectée, mais l'association des traces/captures d'écran/vidéos par `it` et la rétention tenant compte des relances se dégradent à l'échelle de la session pour cette interface. Les interfaces **exports-object** et **Cucumber** de Nightwatch exposent des hooks par scénario/par test et bénéficient d'un véritable découpage par test. (WebdriverIO mocha/cucumber et Selenium mocha ne sont pas affectés.)
- **Rétention tenant compte des relances dans Nightwatch** — seule `retain-on-failure` fonctionne ; les autres politiques tenant compte des relances se dégradent, car Nightwatch réexécute un testcase en interne avec `--retries` sans redéclencher les hooks par test. Voir [Rétention](/docs/devtools/wdio/trace-mode#retention--tracepolicy).
- **Pièces jointes Allure dans Nightwatch** — les `screenshot`/`video` par test sont uniquement produits (fichiers + manifeste), sans être joints en ligne ; voir [Intégration Allure](/docs/devtools/allure).
- **Vidéo/filmstrip hors Chrome** — sur les navigateurs ne disposant pas d'un mécanisme de push CDP, l'enregistreur interroge `takeScreenshot` à intervalles réguliers, ce qui ajoute des allers-retours WebDriver et (avec Allure) inonde le journal des étapes ; combinez-le avec les options de masquage des étapes du reporter.