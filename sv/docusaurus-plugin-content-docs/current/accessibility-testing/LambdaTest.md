---
id: lambdatest
title: LambdaTest tillgänglighetstestning
description: 
---

# LambdaTest tillgänglighetstestning

Du kan enkelt integrera tillgänglighetstester i dina WebdriverIO-testsviter med hjälp av [LambdaTest Accessibility Testing](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).

## Fördelar med LambdaTest tillgänglighetstestning

LambdaTest tillgänglighetstestning hjälper dig att identifiera och åtgärda tillgänglighetsproblem i dina webbapplikationer. Följande är de viktigaste fördelarna:

* Integreras sömlöst med din befintliga WebdriverIO-testautomatisering.
* Automatiserad tillgänglighetsscanning under testkörning.
* Omfattande WCAG-efterlevnadsrapportering.
* Detaljerad problemspårning med åtgärdsförslag.
* Stöd för flera WCAG-standarder (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Tillgänglighetsinsikter i realtid i LambdaTest-instrumentpanelen.

## Kom igång med LambdaTest tillgänglighetstestning

Följ dessa steg för att integrera dina WebdriverIO-testsviter med LambdaTest tillgänglighetstestning:

1. Installera LambdaTest WebdriverIO-servicepaket.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Uppdatera din `wdio.conf.js`-konfigurationsfil.

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

3. Kör dina tester som vanligt. LambdaTest kommer automatiskt att skanna efter tillgänglighetsproblem under testkörningen.

```bash
npx wdio run wdio.conf.js
```

## Konfigurationsalternativ

Objektet `accessibilityOptions` stöder följande parametrar:

* **wcagVersion**: Ange vilken version av WCAG-standarden som ska testas mot
  - `wcag20` - WCAG 2.0 Nivå A
  - `wcag21a` - WCAG 2.1 Nivå A
  - `wcag21aa` - WCAG 2.1 Nivå AA (standard)
  - `wcag22aa` - WCAG 2.2 Nivå AA

* **bestPractice**: Inkludera rekommendationer för bästa praxis (standard: `false`)

* **needsReview**: Inkludera problem som behöver manuell granskning (standard: `true`)

## Visa tillgänglighetsrapporter

Efter att dina tester har slutförts kan du se detaljerade tillgänglighetsrapporter i [LambdaTest Dashboard](https://automation.lambdatest.com/):

1. Navigera till din testkörning
2. Klicka på fliken "Accessibility"
3. Granska identifierade problem med allvarlighetsgrader
4. Få åtgärdsförslag för varje problem

För mer detaljerad information, besök [LambdaTest Accessibility Automation dokumentation](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).