---
id: browserstack
title: BrowserStack Tillgänglighetstestning
---

# BrowserStack Accessibility Testing

Du kan enkelt integrera tillgänglighetstester i dina WebdriverIO-testsviter med hjälp av [Automated tests feature of BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## Fördelar med automatiserade tester i BrowserStack Accessibility Testing

För att använda automatiserade tester i BrowserStack Accessibility Testing bör dina tester köras på BrowserStack Automate.

Följande är fördelarna med automatiserade tester:

* Integreras sömlöst i din befintliga automatiseringstestsvit.
* Inga kodändringar krävs i testfallen.
* Kräver ingen ytterligare underhåll för tillgänglighetstestning.
* Förstå historiska trender och få insikter om testfall.

## Kom igång med BrowserStack Accessibility Testing

Följ dessa steg för att integrera dina WebdriverIO-testsviter med BrowserStacks Accessibility Testing:

1. Installera `@wdio/browserstack-service` npm-paketet.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. Uppdatera `wdio.conf.js` konfigurationsfil.

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

Du kan se detaljerade instruktioner [här](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).