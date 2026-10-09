---
id: browserstack
title: BrowserStack tillgänglighetstestning
description: "Lägg till automatiserade tillgänglighetsskanningar i WebdriverIO-tester som körs på BrowserStack Automate och granska de problem som hittats i BrowserStack-rapporter."
---

# BrowserStack tillgänglighetstestning

Du kan enkelt integrera tillgänglighetstester i dina WebdriverIO-testsviter med hjälp av [funktionen för automatiserade tester i BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## Fördelar med automatiserade tester i BrowserStack Accessibility Testing

För att använda automatiserade tester i BrowserStack Accessibility Testing måste dina tester köras på BrowserStack Automate.

Följande är fördelarna med automatiserade tester:

* Integreras sömlöst i din befintliga automatiserade testsvit.
* Inga kodändringar krävs i testfallen.
* Kräver inget ytterligare underhåll för tillgänglighetstestning.
* Förstå historiska trender och få insikter om testfall.

## Kom igång med BrowserStack Accessibility Testing

Följ dessa steg för att integrera dina WebdriverIO-testsviter med BrowserStacks tillgänglighetstestning:

1. Installera npm-paketet `@wdio/browserstack-service`.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. Uppdatera konfigurationsfilen `wdio.conf.js`.

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
        // Valfria konfigurationsalternativ
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

Du kan se detaljerade instruktioner [här](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).