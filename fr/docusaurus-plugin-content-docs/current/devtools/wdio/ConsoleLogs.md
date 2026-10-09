---
id: console-logs
title: Journaux de la console
description: "Capturez et inspectez les messages de la console du navigateur et les journaux du framework WebdriverIO enregistrés par DevTools pendant l'exécution des tests."
---

Capturez et inspectez toutes les sorties de la console du navigateur pendant l'exécution des tests. DevTools enregistre les messages de console de votre application (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) ainsi que les journaux du framework WebDriverIO en fonction du `logLevel` configuré dans votre `wdio.conf.ts`.

**Fonctionnalités :**
- Capture en temps réel des messages de console pendant l'exécution des tests
- Journaux de la console du navigateur (log, warn, error, info, debug)
- Journaux du framework WebDriverIO filtrés selon le `logLevel` configuré (trace, debug, info, warn, error, silent)
- Horodatages indiquant précisément quand chaque message a été enregistré
- Journaux de console affichés à côté des étapes de test et des captures d'écran du navigateur pour plus de contexte

**Configuration :**
```js
// wdio.conf.ts
export const config = {
    // Niveau de verbosité des journaux : trace | debug | info | warn | error | silent
    logLevel: 'info', // Contrôle quels journaux du framework sont capturés
    // ...
};
```

Cela facilite le débogage des erreurs JavaScript, le suivi du comportement de l'application et l'observation des opérations internes de WebDriverIO pendant l'exécution des tests.

## Démo

### >_ Journaux de la console
![Console Logs](/img/devtools/console-logs.gif)