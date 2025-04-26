---
id: browserstack
title: BrowserStack Barrierefreiheitstests
---

# BrowserStack Accessibility Testing

Sie können Barrierefreiheitstests ganz einfach in Ihre WebdriverIO-Testsuiten integrieren, indem Sie die [Automatisierte Tests-Funktion von BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) verwenden.

## Vorteile von automatisierten Tests in BrowserStack Accessibility Testing

Um automatisierte Tests in BrowserStack Accessibility Testing zu verwenden, sollten Ihre Tests auf BrowserStack Automate laufen.

Die folgenden Vorteile bieten automatisierte Tests:

* Nahtlose Integration in Ihre bestehende Automatisierungs-Testsuite.
* Keine Codeänderungen in Testfällen erforderlich.
* Kein zusätzlicher Wartungsaufwand für Barrierefreiheitstests.
* Verstehen Sie historische Trends und gewinnen Sie Einblicke in Testfälle.

## Erste Schritte mit BrowserStack Accessibility Testing

Befolgen Sie diese Schritte, um Ihre WebdriverIO-Testsuiten mit BrowserStack's Accessibility Testing zu integrieren:

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

Detaillierte Anweisungen finden Sie [hier](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).