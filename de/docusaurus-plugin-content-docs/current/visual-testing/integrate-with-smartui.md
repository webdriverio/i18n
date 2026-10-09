---
id: integrate-with-smartui
title: SmartUI
description: "Fügen Sie Ihren WebdriverIO-Tests KI-gestützte visuelle Regressionstests mit TestMu AI (ehemals LambdaTest) SmartUI hinzu, einschließlich Einrichtung und Optionen."
---

TestMu AI (ehemals LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) bietet KI-gestützte visuelle Regressionstests für Ihre WebdriverIO-Tests. Es erstellt Screenshots, vergleicht sie mit Baselines und hebt visuelle Unterschiede mithilfe intelligenter Vergleichsalgorithmen hervor.

## Einrichtung

**Ein SmartUI-Projekt erstellen**

[Melden Sie sich](https://accounts.lambdatest.com/register) bei TestMu AI (ehemals LambdaTest) an und navigieren Sie zu [SmartUI Projects](https://smartui.lambdatest.com/), um ein neues Projekt zu erstellen. Wählen Sie **Web** als Plattform aus und konfigurieren Sie Ihren Projektnamen, die Genehmiger und Tags.

**Zugangsdaten einrichten**

Holen Sie sich Ihren `LT_USERNAME` und `LT_ACCESS_KEY` aus dem TestMu AI (ehemals LambdaTest) Dashboard und setzen Sie sie als Umgebungsvariablen:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**SmartUI SDK installieren**

```sh
npm install @lambdatest/wdio-driver
```

**WebdriverIO konfigurieren**

Aktualisieren Sie Ihre `wdio.conf.js`:

```javascript
exports.config = {
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,

  capabilities: [{
    browserName: 'chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'SmartUI Build',
      name: 'SmartUI Test',
      smartUI.project: '<Your Project Name>',
      smartUI.build: '<Your Build Name>',
      smartUI.baseline: false
    }
  }]
}
```

## Verwendung

Verwenden Sie `browser.execute('smartui.takeScreenshot')`, um Screenshots zu erstellen:

```javascript
describe('WebdriverIO SmartUI Test', () => {
  it('should capture screenshot for visual testing', async () => {
    await browser.url('https://webdriver.io');

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage Screenshot'
    });

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage with Options',
      ignoreDOM: {
        id: ['dynamic-element-id'],
        class: ['ad-banner']
      }
    });
  });
});
```

**Tests ausführen**

```sh
npx wdio wdio.conf.js
```

Sehen Sie sich die Ergebnisse im [SmartUI Dashboard](https://smartui.lambdatest.com/) an.

## Erweiterte Optionen

**Elemente ignorieren**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Ignore Dynamic Elements',
  ignoreDOM: {
    id: ['element-id'],
    class: ['dynamic-class'],
    xpath: ['//div[@class="ad"]']
  }
});
```

**Bestimmte Bereiche auswählen**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## Ressourcen

| Ressource                                                                                         | Beschreibung                                       |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------|
| [Offizielle Dokumentation](https://www.testmuai.com/support/docs/smart-ui-cypress/)            | SmartUI-Dokumentation                              |
| [SmartUI Dashboard](https://smartui.lambdatest.com/)                                              | Zugriff auf Ihre SmartUI-Projekte und Builds       |
| [Erweiterte Einstellungen](https://www.testmuai.com/support/docs/test-settings-options/)       | Vergleichsempfindlichkeit konfigurieren            |
| [Build-Optionen](https://www.testmuai.com/support/docs/smart-ui-build-options/)                | Erweiterte Build-Konfiguration                     |