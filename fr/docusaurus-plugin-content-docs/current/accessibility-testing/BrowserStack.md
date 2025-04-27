---
id: browserstack
title: Tests d'accessibilité BrowserStack
---

# BrowserStack Accessibility Testing

Vous pouvez facilement intégrer des tests d'accessibilité dans vos suites de tests WebdriverIO en utilisant la [fonctionnalité de tests automatisés de BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## Avantages des tests automatisés dans BrowserStack Accessibility Testing

Pour utiliser les tests automatisés dans BrowserStack Accessibility Testing, vos tests doivent s'exécuter sur BrowserStack Automate.

Voici les avantages des tests automatisés :

* S'intègre parfaitement dans votre suite de tests d'automatisation préexistante.
* Aucune modification de code n'est requise dans les cas de test.
* Ne nécessite aucune maintenance supplémentaire pour les tests d'accessibilité.
* Comprendre les tendances historiques et obtenir des informations sur les cas de test.

## Démarrer avec BrowserStack Accessibility Testing

Suivez ces étapes pour intégrer vos suites de tests WebdriverIO avec les tests d'accessibilité de BrowserStack :

1. Installez le package npm `@wdio/browserstack-service`.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. Mettez à jour le fichier de configuration `wdio.conf.js`.

```javascript
exports.config = {
    //...
    user: '<browserstack_username>' || process.env.BROWSERSTACK_USERNAME,
    key: '<browserstack_access_key>' || process.env.BROWSERSTACK_ACCESS_KEY,
    commonCapabilities: {
      'bstack:options': {
        projectName: "Your static project name goes here",
        buildName: "Your static build/job name goes here"
      }
    },
    services: [
      ['browserstack', {
        accessibility: true,
        // Optional configuration options
        accessibilityOptions: {
          'wcagVersion': 'wcag21a',
          'includeIssueType': {
            'bestPractice': false,
            'needsReview': true
          },
          'includeTagsInTestingScope': ['Specify tags of test cases to be included'],
          'excludeTagsInTestingScope': ['Specify tags of test cases to be excluded']
        },
      }]
    ],
    //...
  };
```

Vous pouvez consulter des instructions détaillées [ici](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).