---
id: integrate-with-smartui
title: SmartUI
---

TestMu AI (Tidigare LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) erbjuder AI-driven visuell regressionstestning för dina WebdriverIO-tester. Det tar skärmbilder, jämför dem mot baslinjer och markerar visuella skillnader med intelligenta jämförelsealgorimer.

## Installation

**Skapa ett SmartUI-projekt**

[Logga in](https://accounts.lambdatest.com/register) på TestMu AI (Tidigare LambdaTest) och navigera till [SmartUI Projects](https://smartui.lambdatest.com/) för att skapa ett nytt projekt. Välj **Web** som plattform och konfigurera projektnamn, godkännare och taggar.

**Ställ in autentiseringsuppgifter**

Hämta dina `LT_USERNAME` och `LT_ACCESS_KEY` från TestMu AI (Tidigare LambdaTest)-instrumentpanelen och ställ in dem som miljövariabler:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Installera SmartUI SDK**

```sh
npm install @lambdatest/wdio-driver
```

**Konfigurera WebdriverIO**

Uppdatera din `wdio.conf.js`:

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

## Användning

Använd `browser.execute('smartui.takeScreenshot')` för att ta skärmbilder:

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

**Kör tester**

```sh
npx wdio wdio.conf.js
```

Se resultat i [SmartUI Dashboard](https://smartui.lambdatest.com/).

## Avancerade alternativ

**Ignorera element**

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

**Välj specifika områden**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## Resurser

| Resurs                                                                                           | Beskrivning                                 |
|--------------------------------------------------------------------------------------------------|--------------------------------------------|
| [Official Documentation](https://www.testmuai.com/support/docs/smart-ui-cypress/)              | SmartUI-dokumentation                      |
| [SmartUI Dashboard](https://smartui.lambdatest.com/)                                              | Åtkomst till dina SmartUI-projekt och byggen |
| [Advanced Settings](https://www.testmuai.com/support/docs/test-settings-options/)              | Konfigurera jämförelsekänslighet           |
| [Build Options](https://www.testmuai.com/support/docs/smart-ui-build-options/)                 | Avancerad byggkonfiguration               |