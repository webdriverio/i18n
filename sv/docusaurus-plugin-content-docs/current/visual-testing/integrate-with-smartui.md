---
id: integrate-with-smartui
title: SmartUI
---

LambdaTest [SmartUI](https://www.lambdatest.com/smart-visual-testing) erbjuder AI-driven visuell regressionstestning för dina WebdriverIO-tester. Det tar skärmdumpar, jämför dem mot baslinjer och markerar visuella skillnader med intelligenta jämförelsealgorithmer.

## Setup

**Skapa ett SmartUI-projekt**

[Logga in](https://accounts.lambdatest.com/register) på LambdaTest och navigera till [SmartUI Projects](https://smartui.lambdatest.com/) för att skapa ett nytt projekt. Välj **Web** som plattform och konfigurera ditt projektnamn, godkännare och taggar.

**Konfigurera inloggningsuppgifter**

Hämta dina `LT_USERNAME` och `LT_ACCESS_KEY` från LambdaTest-instrumentpanelen och ställ in dem som miljövariabler:

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

## Usage

Använd `browser.execute('smartui.takeScreenshot')` för att ta skärmdumpar:

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

Se resultaten i [SmartUI Dashboard](https://smartui.lambdatest.com/).

## Advanced Options

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

## Resources

| Resource                                                                                          | Description                              |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [Official Documentation](https://www.lambdatest.com/support/docs/smart-ui-cypress/)              | SmartUI Documentation                    |
| [SmartUI Dashboard](https://smartui.lambdatest.com/)                                              | Access your SmartUI projects and builds  |
| [Advanced Settings](https://www.lambdatest.com/support/docs/test-settings-options/)              | Configure comparison sensitivity         |
| [Build Options](https://www.lambdatest.com/support/docs/smart-ui-build-options/)                 | Advanced build configuration             |