---
id: allure
title: Intégration Allure
description: "Joignez automatiquement à votre rapport Allure les artefacts du mode trace de DevTools, tels que les archives zip de trace, les captures d'écran et les vidéos."
---

Les artefacts du mode trace — l'archive zip de trace ainsi que la capture d'écran et la vidéo propres à chaque test — sont joints automatiquement à un rapport Allure, ce qui vous permet de les ouvrir directement depuis le rapport. Consultez [Mode trace](/docs/devtools/wdio/trace-mode) pour savoir comment activer le mode trace et produire ces artefacts.

Lorsqu'un reporter Allure est présent, les artefacts du mode trace sont joints automatiquement au rapport Allure — sans aucune configuration supplémentaire :

- **`traceGranularity: 'test'`** — le `trace.zip` de chaque test (`application/zip`, un téléchargement qui s'ouvre dans `show-trace`), la `screenshot` (`image/png`, en ligne) et la `video` (`video/webm`, en ligne) sont jointes à la fiche de ce test. C'est la granularité à utiliser pour un rapport Allure par test.
- **`traceGranularity: 'session'` / `'spec'`** — une trace couvrant toute la session ou toute la spec est écrite sur le disque et répertoriée dans le [manifeste des artefacts](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest), mais elle n'est **pas** jointe aux fiches de test individuelles : une trace de session/spec n'est finalisée qu'une fois tous ses tests exécutés, moment auquel leurs fiches Allure sont fermées et il n'existe plus de test ouvert auquel la joindre. Pour la faire apparaître malgré tout, post-traitez le manifeste dans votre propre hook `onComplete`.

Prise en charge par adaptateur :

| Adaptateur | Mécanisme de jointure |
|---|---|
| **WebdriverIO** | Prise en charge native via `addAttachment` de `@wdio/allure-reporter`. |
| **Selenium** | Via `attachment()` de `allure-js-commons` — indépendant du runtime, joint les fichiers sous n'importe quel adaptateur de runner Allure, à condition qu'un runtime `allure-js-commons` soit actif. |
| **Nightwatch** | **Production uniquement** — les fichiers et le manifeste sont écrits mais ne sont pas joints en ligne (pas d'API de jointure Allure en direct). |

**Visionneuse de traces intégrée.** Comme l'archive utilise un format sur disque de visionneuse de traces standard et portable, la **visionneuse de traces intégrée** d'un rapport Allure (Allure ≥ 2.35) peut ouvrir le `trace.zip` joint directement dans le rapport.

**Bruit dans le rapport.** En mode trace, la capture effectue un `takeScreenshot` à chaque action pour construire la chronologie ; Allure enregistre chaque commande WebDriver comme une étape et une capture d'écran pour chaque `takeScreenshot`. Réduisez ce flot à l'aide des options propres au reporter — les pièces jointes de trace, de capture d'écran et de vidéo ne sont pas affectées :

```ts
reporters: [
  ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true
  }]
]
```