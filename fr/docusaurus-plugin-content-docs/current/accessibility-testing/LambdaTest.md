---
id: lambdatest
title: Tests d'Accessibilité LambdaTest
---

# Tests d'Accessibilité LambdaTest

Vous pouvez facilement intégrer des tests d'accessibilité dans vos suites de tests WebdriverIO en utilisant [LambdaTest Accessibility Testing](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).

## Avantages des Tests d'Accessibilité LambdaTest

Les Tests d'Accessibilité LambdaTest vous aident à identifier et à corriger les problèmes d'accessibilité dans vos applications web. Voici les principaux avantages :

* S'intègre parfaitement à votre automatisation de tests WebdriverIO existante.
* Analyse automatisée de l'accessibilité pendant l'exécution des tests.
* Rapports complets de conformité WCAG.
* Suivi détaillé des problèmes avec des conseils de correction.
* Prise en charge de plusieurs normes WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Informations d'accessibilité en temps réel dans le tableau de bord LambdaTest.

## Commencer avec les Tests d'Accessibilité LambdaTest

Suivez ces étapes pour intégrer vos suites de tests WebdriverIO avec les Tests d'Accessibilité de LambdaTest :

1. Installez le package de service WebdriverIO de LambdaTest.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Mettez à jour votre fichier de configuration `wdio.conf.js`.

```javascript
exports.config = {
    //...
    user: process.env.LT_USERNAME || '<lambdatest_username>',
    key: process.env.LT_ACCESS_KEY || '<lambdatest_access_key>',
    
    capabilities: [{
        browserName: 'chrome',
        'LT:Options': {
            platform: 'Windows 10',
            version: 'latest',
            accessibility: true, // Enable accessibility testing
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAG version (wcag20, wcag21a, wcag21aa, wcag22aa)
                bestPractice: false,
                needsReview: true
            }
        }
    }],
    
    services: [
        ['lambdatest', {
            tunnel: false
        }]
    ],
    //...
};
```

3. Exécutez vos tests comme d'habitude. LambdaTest analysera automatiquement les problèmes d'accessibilité pendant l'exécution des tests.

```bash
npx wdio run wdio.conf.js
```

## Options de Configuration

L'objet `accessibilityOptions` prend en charge les paramètres suivants :

* **wcagVersion** : Spécifie la version de la norme WCAG à utiliser pour les tests
  - `wcag20` - WCAG 2.0 Niveau A
  - `wcag21a` - WCAG 2.1 Niveau A
  - `wcag21aa` - WCAG 2.1 Niveau AA (par défaut)
  - `wcag22aa` - WCAG 2.2 Niveau AA

* **bestPractice** : Inclure les recommandations de bonnes pratiques (par défaut : `false`)

* **needsReview** : Inclure les problèmes qui nécessitent une révision manuelle (par défaut : `true`)

## Consulter les Rapports d'Accessibilité

Une fois vos tests terminés, vous pouvez consulter des rapports d'accessibilité détaillés dans le [Tableau de bord LambdaTest](https://automation.lambdatest.com/) :

1. Accédez à votre exécution de test
2. Cliquez sur l'onglet "Accessibility"
3. Examinez les problèmes identifiés avec leurs niveaux de gravité
4. Obtenez des conseils de correction pour chaque problème

Pour des informations plus détaillées, visitez la [documentation d'automatisation d'accessibilité LambdaTest](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).