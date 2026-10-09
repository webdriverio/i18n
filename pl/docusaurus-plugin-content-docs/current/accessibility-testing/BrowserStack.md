---
id: browserstack
title: Testowanie dostępności w BrowserStack
description: "Dodaj automatyczne skanowanie dostępności do testów WebdriverIO uruchamianych w BrowserStack Automate i przeglądaj wykryte problemy w raportach BrowserStack."
---

# Testowanie dostępności w BrowserStack

Możesz łatwo zintegrować testy dostępności ze swoimi zestawami testów WebdriverIO, korzystając z [funkcji testów automatycznych w BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## Zalety testów automatycznych w BrowserStack Accessibility Testing

Aby korzystać z testów automatycznych w BrowserStack Accessibility Testing, Twoje testy powinny być uruchamiane w BrowserStack Automate.

Oto zalety testów automatycznych:

* Bezproblemowa integracja z istniejącym zestawem testów automatycznych.
* Brak konieczności wprowadzania zmian w kodzie przypadków testowych.
* Brak dodatkowego nakładu pracy na utrzymanie testów dostępności.
* Możliwość analizy trendów historycznych i uzyskania wglądu w przypadki testowe.

## Pierwsze kroki z BrowserStack Accessibility Testing

Wykonaj poniższe kroki, aby zintegrować swoje zestawy testów WebdriverIO z BrowserStack Accessibility Testing:

1. Zainstaluj pakiet npm `@wdio/browserstack-service`.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. Zaktualizuj plik konfiguracyjny `wdio.conf.js`.

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
        // Opcjonalne opcje konfiguracji
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

Szczegółowe instrukcje znajdziesz [tutaj](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).