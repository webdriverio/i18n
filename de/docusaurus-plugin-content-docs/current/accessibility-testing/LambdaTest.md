---
id: testmuai
title: TestMu AI (ehemals LambdaTest) Barrierefreiheitstests
description: Barrierefreiheitstests für TestMu AI
---

# TestMu AI Accessibility Testing

Sie können Barrierefreiheitstests ganz einfach in Ihre WebdriverIO-Test-Suites integrieren, indem Sie [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/) verwenden.

## Vorteile von TestMu AI Accessibility Testing

TestMu AI Accessibility Testing hilft Ihnen dabei, Probleme mit der Barrierefreiheit in Ihren Webanwendungen zu identifizieren und zu beheben. Die folgenden sind die wichtigsten Vorteile:

* Nahtlose Integration in Ihre bestehende WebdriverIO-Testautomatisierung.
* Automatisierte Überprüfung der Barrierefreiheit während der Testausführung.
* Umfassende WCAG-Konformitätsberichte.
* Detaillierte Problemverfolgung mit Anleitungen zur Behebung.
* Unterstützung für mehrere WCAG-Standards (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Echtzeit-Einblicke in die Barrierefreiheit im TestMu AI-Dashboard.

## Erste Schritte mit TestMu AI Accessibility Testing

Befolgen Sie diese Schritte, um Ihre WebdriverIO-Test-Suites mit dem Accessibility Testing von TestMu AI zu integrieren:

1. Installieren Sie das TestMu AI WebdriverIO-Service-Paket.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Aktualisieren Sie Ihre `wdio.conf.js` Konfigurationsdatei.

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

3. Führen Sie Ihre Tests wie gewohnt aus. TestMu AI wird während der Testausführung automatisch nach Problemen mit der Barrierefreiheit suchen.

```bash
npx wdio run wdio.conf.js
```

## Konfigurationsoptionen

Das `accessibilityOptions`-Objekt unterstützt folgende Parameter:

* **wcagVersion**: Gibt die zu testende WCAG-Standardversion an
  - `wcag20` - WCAG 2.0 Level A
  - `wcag21a` - WCAG 2.1 Level A
  - `wcag21aa` - WCAG 2.1 Level AA (Standard)
  - `wcag22aa` - WCAG 2.2 Level AA

* **bestPractice**: Schließt Best-Practice-Empfehlungen ein (Standard: `false`)

* **needsReview**: Schließt Probleme ein, die eine manuelle Überprüfung erfordern (Standard: `true`)

## Anzeigen von Barrierefreiheitsberichten

Nach Abschluss Ihrer Tests können Sie detaillierte Barrierefreiheitsberichte im [TestMu AI Dashboard](https://automation.lambdatest.com/) einsehen:

1. Navigieren Sie zu Ihrer Testausführung
2. Klicken Sie auf die Registerkarte "Accessibility"
3. Überprüfen Sie identifizierte Probleme mit Schweregraden
4. Erhalten Sie Anleitungen zur Behebung für jedes Problem

Für ausführlichere Informationen besuchen Sie die [TestMu AI Accessibility Automation-Dokumentation](https://www.testmuai.com/support/docs/accessibility-automation-settings/).