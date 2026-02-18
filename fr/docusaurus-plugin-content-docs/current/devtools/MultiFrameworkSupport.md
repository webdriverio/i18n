---
id: multi-framework-support
title: Support Multi-Framework
---

DevTools fonctionne automatiquement avec Mocha, Jasmine et Cucumber sans nécessiter de configuration spécifique au framework. Ajoutez simplement le service à votre configuration WebDriverIO et toutes les fonctionnalités fonctionnent parfaitement quel que soit le framework de test que vous utilisez.

**Frameworks supportés :**
- **Mocha** - Exécution au niveau des tests et des suites avec filtrage grep
- **Jasmine** - Intégration complète avec filtrage basé sur grep
- **Cucumber** - Exécution au niveau des scénarios et des exemples avec ciblage feature:line

La même interface de débogage, la réexécution des tests et les fonctionnalités de visualisation fonctionnent de manière cohérente pour tous les frameworks.

## Configuration

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // ou 'jasmine' ou 'cucumber'
    services: ['devtools'],
    // ...
};
```