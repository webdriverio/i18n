---
id: lambdatest
title: LambdaTest Barrierefreiheits-Tests
---

# LambdaTest Barrierefreiheits-Tests

Sie können Barrierefreiheits-Tests einfach in Ihre WebdriverIO-Testsuiten integrieren, indem Sie [LambdaTest Accessibility Testing](https://www.lambdatest.com/support/docs/accessibility-automation-settings/) verwenden.

## Vorteile von LambdaTest Barrierefreiheits-Tests

LambdaTest Barrierefreiheits-Tests helfen Ihnen, Probleme der Barrierefreiheit in Ihren Webanwendungen zu identifizieren und zu beheben. Die folgenden sind die wichtigsten Vorteile:

* Nahtlose Integration in Ihre bestehende WebdriverIO-Testautomatisierung.
* Automatisiertes Scannen auf Barrierefreiheit während der Testausführung.
* Umfassende WCAG-Compliance-Berichterstattung.
* Detailliertes Issue-Tracking mit Sanierungshinweisen.
* Unterstützung für mehrere WCAG-Standards (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Echtzeit-Einblicke zur Barrierefreiheit im LambdaTest-Dashboard.

## Erste Schritte mit LambdaTest Barrierefreiheits-Tests

Folgen Sie diesen Schritten, um Ihre WebdriverIO-Testsuiten mit dem Barrierefreiheits-Test von LambdaTest zu integrieren:

1. Installieren Sie das LambdaTest WebdriverIO-Service-Paket.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Aktualisieren Sie Ihre `wdio.conf.js`-Konfigurationsdatei.

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

3. Führen Sie Ihre Tests wie gewohnt aus. LambdaTest scannt während der Testausführung automatisch auf Probleme mit der Barrierefreiheit.

```bash
npx wdio run wdio.conf.js
```

## Konfigurationsoptionen

Das Objekt `accessibilityOptions` unterstützt die folgenden Parameter:

* **wcagVersion**: Geben Sie die zu testende WCAG-Standardversion an
  - `wcag20` - WCAG 2.0 Level A
  - `wcag21a` - WCAG 2.1 Level A
  - `wcag21aa` - WCAG 2.1 Level AA (Standard)
  - `wcag22aa` - WCAG 2.2 Level AA

* **bestPractice**: Best-Practice-Empfehlungen einbeziehen (Standard: `false`)

* **needsReview**: Probleme einbeziehen, die eine manuelle Überprüfung benötigen (Standard: `true`)

## Anzeigen von Barrierefreiheitsberichten

Nach Abschluss Ihrer Tests können Sie detaillierte Barrierefreiheitsberichte im [LambdaTest Dashboard](https://automation.lambdatest.com/) anzeigen:

1. Navigieren Sie zu Ihrer Testausführung
2. Klicken Sie auf den Tab "Accessibility"
3. Überprüfen Sie die identifizierten Probleme mit Schweregraden
4. Erhalten Sie Sanierungshinweise für jedes Problem

Für detailliertere Informationen besuchen Sie die [LambdaTest Accessibility Automation Dokumentation](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).