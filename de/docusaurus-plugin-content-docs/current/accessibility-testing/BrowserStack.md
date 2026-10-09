---
id: browserstack
title: BrowserStack Barrierefreiheitstests
description: "Fügen Sie automatisierte Barrierefreiheitsscans zu WebdriverIO-Tests hinzu, die auf BrowserStack Automate laufen, und überprüfen Sie die gefundenen Probleme in BrowserStack-Berichten."
---

# BrowserStack Barrierefreiheitstests

Sie können Barrierefreiheitstests ganz einfach in Ihre WebdriverIO-Testsuites integrieren, indem Sie die [Funktion für automatisierte Tests von BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) verwenden.

## Vorteile automatisierter Tests in BrowserStack Accessibility Testing

Um automatisierte Tests in BrowserStack Accessibility Testing zu verwenden, sollten Ihre Tests auf BrowserStack Automate ausgeführt werden.

Die folgenden Vorteile bieten automatisierte Tests:

* Nahtlose Integration in Ihre bestehende Automatisierungstestsuite.
* Keine Codeänderungen in den Testfällen erforderlich.
* Kein zusätzlicher Wartungsaufwand für Barrierefreiheitstests.
* Historische Trends verstehen und Einblicke in Testfälle gewinnen.

## Erste Schritte mit BrowserStack Accessibility Testing

Befolgen Sie diese Schritte, um Ihre WebdriverIO-Testsuites mit BrowserStack Accessibility Testing zu integrieren:

1. Installieren Sie das npm-Paket `@wdio/browserstack-service`.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. Aktualisieren Sie die Konfigurationsdatei `wdio.conf.js`.

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
        // Optionale Konfigurationsoptionen
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

Detaillierte Anweisungen finden Sie [hier](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).