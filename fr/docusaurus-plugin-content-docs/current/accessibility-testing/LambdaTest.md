---
id: testmuai
title: Tests d'accessibilité TestMu AI (anciennement LambdaTest)
description: "Activez les tests d'accessibilité TestMu AI (anciennement LambdaTest) dans votre suite WebdriverIO, configurez les options d'analyse et consultez les rapports d'accessibilité."
---

# Tests d'accessibilité TestMu AI

Vous pouvez facilement intégrer des tests d'accessibilité dans vos suites de tests WebdriverIO en utilisant [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Avantages des tests d'accessibilité TestMu AI

Les tests d'accessibilité TestMu AI vous aident à identifier et à corriger les problèmes d'accessibilité dans vos applications web. Voici les principaux avantages :

* S'intègre parfaitement à votre automatisation de tests WebdriverIO existante.
* Analyse automatisée de l'accessibilité pendant l'exécution des tests.
* Rapports complets de conformité WCAG.
* Suivi détaillé des problèmes avec des conseils de correction.
* Prise en charge de plusieurs normes WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Informations d'accessibilité en temps réel dans le tableau de bord TestMu AI.

## Démarrer avec les tests d'accessibilité TestMu AI

Suivez ces étapes pour intégrer vos suites de tests WebdriverIO aux tests d'accessibilité de TestMu AI :

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
            accessibility: true, // Activer les tests d'accessibilité
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // Version WCAG (wcag20, wcag21a, wcag21aa, wcag22aa)
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

* **wcagVersion** : Spécifie la version de la norme WCAG à utiliser pour les tests
  - `wcag20` - WCAG 2.0 Niveau A
  - `wcag21a` - WCAG 2.1 Niveau A
  - `wcag21aa` - WCAG 2.1 Niveau AA (par défaut)
  - `wcag22aa` - WCAG 2.2 Niveau AA

* **bestPractice** : Inclut les recommandations de bonnes pratiques (par défaut : `false`)

* **needsReview** : Inclut les problèmes nécessitant une vérification manuelle (par défaut : `true`)

## Consulter les rapports d'accessibilité

Une fois vos tests terminés, vous pouvez consulter des rapports d'accessibilité détaillés dans le [tableau de bord TestMu AI](https://automation.lambdatest.com/) :

1. Accédez à l'exécution de votre test
2. Cliquez sur l'onglet « Accessibility »
3. Examinez les problèmes identifiés avec leurs niveaux de gravité
4. Obtenez des conseils de correction pour chaque problème

Pour des informations plus détaillées, consultez la [documentation TestMu AI Accessibility Automation](https://www.testmuai.com/support/docs/accessibility-automation-settings/).