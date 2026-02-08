---
id: integrate-with-smartui
title: SmartUI
---

TestMu AI (dawniej LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) dostarcza wspomagane sztuczną inteligencją testy regresji wizualnej dla twoich testów WebdriverIO. Przechwytuje zrzuty ekranu, porównuje je z bazowymi wzorcami i podświetla różnice wizualne za pomocą inteligentnych algorytmów porównawczych.

## Setup

**Utwórz projekt SmartUI**

[Zaloguj się](https://accounts.lambdatest.com/register) do TestMu AI (dawniej LambdaTest) i przejdź do [Projektów SmartUI](https://smartui.lambdatest.com/) aby utworzyć nowy projekt. Wybierz **Web** jako platformę i skonfiguruj nazwę projektu, osoby zatwierdzające i tagi.

**Ustaw dane uwierzytelniające**

Pobierz swoje `LT_USERNAME` i `LT_ACCESS_KEY` z panelu TestMu AI (dawniej LambdaTest) i ustaw je jako zmienne środowiskowe:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Zainstaluj SDK SmartUI**

```sh
npm install @lambdatest/wdio-driver
```

**Skonfiguruj WebdriverIO**

Zaktualizuj swój plik `wdio.conf.js`:

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

Użyj `browser.execute('smartui.takeScreenshot')` do przechwytywania zrzutów ekranu:

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

**Uruchom testy**

```sh
npx wdio wdio.conf.js
```

Przeglądaj wyniki w [Panelu SmartUI](https://smartui.lambdatest.com/).

## Advanced Options

**Ignorowanie elementów**

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

**Wybór konkretnych obszarów**

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
| [Official Documentation](https://www.testmuai.com/support/docs/smart-ui-cypress/)              | Dokumentacja SmartUI                    |
| [SmartUI Dashboard](https://smartui.lambdatest.com/)                                              | Dostęp do twoich projektów i buildów SmartUI  |
| [Advanced Settings](https://www.testmuai.com/support/docs/test-settings-options/)              | Konfiguracja czułości porównywania         |
| [Build Options](https://www.testmuai.com/support/docs/smart-ui-build-options/)                 | Zaawansowana konfiguracja buildów             |