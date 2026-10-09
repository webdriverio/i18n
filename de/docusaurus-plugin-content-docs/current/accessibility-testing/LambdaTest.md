---
id: testmuai
title: TestMu AI (ehemals LambdaTest) Barrierefreiheitstests
description: "Aktivieren Sie TestMu AI (ehemals LambdaTest) Barrierefreiheitstests in Ihrer WebdriverIO-Testsuite, konfigurieren Sie Scan-Optionen und sehen Sie sich die Barrierefreiheitsberichte an."
---

# TestMu AI Barrierefreiheitstests

Sie können Barrierefreiheitstests ganz einfach in Ihre WebdriverIO-Testsuites integrieren, indem Sie [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/) verwenden.

## Vorteile von TestMu AI Barrierefreiheitstests

TestMu AI Barrierefreiheitstests helfen Ihnen, Barrierefreiheitsprobleme in Ihren Webanwendungen zu identifizieren und zu beheben. Die folgenden sind die wichtigsten Vorteile:

* Nahtlose Integration in Ihre bestehende WebdriverIO-Testautomatisierung.
* Automatisierte Barrierefreiheitsscans während der Testausführung.
* Umfassende Berichte zur WCAG-Konformität.
* Detaillierte Problemverfolgung mit Hinweisen zur Behebung.
* Unterstützung für mehrere WCAG-Standards (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Echtzeit-Einblicke in die Barrierefreiheit im TestMu AI-Dashboard.

## Erste Schritte mit TestMu AI Barrierefreiheitstests

Befolgen Sie diese Schritte, um Ihre WebdriverIO-Testsuites mit den Barrierefreiheitstests von TestMu AI zu integrieren:

1. Installieren Sie das TestMu AI WebdriverIO-Service-Paket.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Aktualisieren Sie Ihre Konfigurationsdatei `wdio.conf.js`.

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
            accessibility: true, // Barrierefreiheitstests aktivieren
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAG-Version (wcag20, wcag21a, wcag21aa, wcag22aa)
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

3. Führen Sie Ihre Tests wie gewohnt aus. TestMu AI scannt während der Testausführung automatisch nach Barrierefreiheitsproblemen.

```bash
npx wdio run wdio.conf.js
```

## Konfigurationsoptionen

Das Objekt `accessibilityOptions` unterstützt die folgenden Parameter:

* **wcagVersion**: Geben Sie die WCAG-Standardversion an, gegen die getestet werden soll
  - `wcag20` - WCAG 2.0 Level A
  - `wcag21a` - WCAG 2.1 Level A
  - `wcag21aa` - WCAG 2.1 Level AA (Standard)
  - `wcag22aa` - WCAG 2.2 Level AA

* **bestPractice**: Best-Practice-Empfehlungen einbeziehen (Standard: `false`)

* **needsReview**: Probleme einbeziehen, die eine manuelle Überprüfung erfordern (Standard: `true`)

## Barrierefreiheitsberichte anzeigen

Nachdem Ihre Tests abgeschlossen sind, können Sie detaillierte Barrierefreiheitsberichte im [TestMu AI Dashboard](https://automation.lambdatest.com/) einsehen:

1. Navigieren Sie zu Ihrer Testausführung
2. Klicken Sie auf den Tab "Accessibility"
3. Überprüfen Sie die identifizierten Probleme mit ihren Schweregraden
4. Erhalten Sie Hinweise zur Behebung für jedes Problem

Für ausführlichere Informationen besuchen Sie die [TestMu AI Accessibility Automation-Dokumentation](https://www.testmuai.com/support/docs/accessibility-automation-settings/).