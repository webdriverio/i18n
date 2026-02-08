---
id: testmuai
title: Test d'Accessibilité TestMu AI (Anciennement LambdaTest)
description: ""
---

# TestMu AI Accessibility Testing

Vous pouvez facilement intégrer des tests d'accessibilité dans vos suites de tests WebdriverIO en utilisant [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Avantages de TestMu AI Accessibility Testing

TestMu AI Accessibility Testing vous aide à identifier et corriger les problèmes d'accessibilité dans vos applications web. Voici les principaux avantages :

* S'intègre parfaitement à votre automatisation de test WebdriverIO existante.
* Analyse automatique de l'accessibilité pendant l'exécution des tests.
* Rapports complets de conformité aux WCAG.
* Suivi détaillé des problèmes avec des conseils pour y remédier.
* Prise en charge de plusieurs normes WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Informations sur l'accessibilité en temps réel dans le tableau de bord TestMu AI.

## Démarrer avec TestMu AI Accessibility Testing

Suivez ces étapes pour intégrer vos suites de tests WebdriverIO avec l'Accessibility Testing de TestMu AI :

1. Installez le package de service WebdriverIO de TestMu AI.

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

3. Exécutez vos tests comme d'habitude. TestMu AI analysera automatiquement les problèmes d'accessibilité pendant l'exécution des tests.

```bash
npx wdio run wdio.conf.js
```

## Options de configuration

L'objet `accessibilityOptions` prend en charge les paramètres suivants :

* **wcagVersion** : Spécifiez la version standard WCAG à tester
  - `wcag20` - WCAG 2.0 Niveau A
  - `wcag21a` - WCAG 2.1 Niveau A
  - `wcag21aa` - WCAG 2.1 Niveau AA (par défaut)
  - `wcag22aa` - WCAG 2.2 Niveau AA

* **bestPractice** : Inclure les recommandations de bonnes pratiques (par défaut : `false`)

* **needsReview** : Inclure les problèmes nécessitant une révision manuelle (par défaut : `true`)

## Consultation des rapports d'accessibilité

Après l'exécution de vos tests, vous pouvez consulter des rapports d'accessibilité détaillés dans le [Tableau de bord TestMu AI](https://automation.lambdatest.com/) :

1. Accédez à votre exécution de test
2. Cliquez sur l'onglet "Accessibility"
3. Examinez les problèmes identifiés avec leurs niveaux de gravité
4. Obtenez des conseils pour remédier à chaque problème

Pour des informations plus détaillées, consultez la [documentation d'automatisation de l'accessibilité de TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/).