---
id: testmuai
title: Tillgänglighetstestning med TestMu AI (tidigare LambdaTest)
description: "Aktivera tillgänglighetstestning med TestMu AI (tidigare LambdaTest) i din WebdriverIO-svit, konfigurera skanningsalternativ och visa tillgänglighetsrapporterna."
---

# Tillgänglighetstestning med TestMu AI

Du kan enkelt integrera tillgänglighetstester i dina WebdriverIO-testsviter med hjälp av [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Fördelar med tillgänglighetstestning i TestMu AI

Tillgänglighetstestning i TestMu AI hjälper dig att identifiera och åtgärda tillgänglighetsproblem i dina webbapplikationer. Följande är de viktigaste fördelarna:

* Integreras sömlöst med din befintliga testautomatisering i WebdriverIO.
* Automatiserad tillgänglighetsskanning under testkörningen.
* Omfattande rapportering av WCAG-efterlevnad.
* Detaljerad spårning av problem med vägledning för åtgärder.
* Stöd för flera WCAG-standarder (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Tillgänglighetsinsikter i realtid i TestMu AI-instrumentpanelen.

## Kom igång med tillgänglighetstestning i TestMu AI

Följ dessa steg för att integrera dina WebdriverIO-testsviter med tillgänglighetstestningen i TestMu AI:

1. Installera TestMu AI:s WebdriverIO-tjänstpaket.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Uppdatera din konfigurationsfil `wdio.conf.js`.

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
            accessibility: true, // Aktivera tillgänglighetstestning
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAG-version (wcag20, wcag21a, wcag21aa, wcag22aa)
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

3. Kör dina tester som vanligt. TestMu AI skannar automatiskt efter tillgänglighetsproblem under testkörningen.

```bash
npx wdio run wdio.conf.js
```

## Konfigurationsalternativ

Objektet `accessibilityOptions` stöder följande parametrar:

* **wcagVersion**: Ange vilken version av WCAG-standarden som ska testas mot
  - `wcag20` - WCAG 2.0 nivå A
  - `wcag21a` - WCAG 2.1 nivå A
  - `wcag21aa` - WCAG 2.1 nivå AA (standard)
  - `wcag22aa` - WCAG 2.2 nivå AA

* **bestPractice**: Inkludera rekommendationer för bästa praxis (standard: `false`)

* **needsReview**: Inkludera problem som kräver manuell granskning (standard: `true`)

## Visa tillgänglighetsrapporter

När dina tester är klara kan du visa detaljerade tillgänglighetsrapporter i [TestMu AI-instrumentpanelen](https://automation.lambdatest.com/):

1. Navigera till din testkörning
2. Klicka på fliken "Accessibility"
3. Granska identifierade problem med allvarlighetsgrader
4. Få vägledning för åtgärd av varje problem

För mer detaljerad information, besök [dokumentationen för TestMu AI Accessibility Automation](https://www.testmuai.com/support/docs/accessibility-automation-settings/).