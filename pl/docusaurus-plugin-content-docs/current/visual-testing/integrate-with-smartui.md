---
id: integrate-with-smartui
title: SmartUI
---

LambdaTest [SmartUI](https://www.lambdatest.com/smart-visual-testing) zapewnia wspomagane sztuczną inteligencją testy regresji wizualnej dla Twoich testów WebdriverIO. Przechwytuje zrzuty ekranu, porównuje je z wzorcami odniesienia i podświetla różnice wizualne za pomocą inteligentnych algorytmów porównawczych.

## Konfiguracja

**Utwórz projekt SmartUI**

[Zaloguj się](https://accounts.lambdatest.com/register) do LambdaTest i przejdź do [Projektów SmartUI](https://smartui.lambdatest.com/), aby utworzyć nowy projekt. Wybierz **Web** jako platformę i skonfiguruj nazwę projektu, osoby zatwierdzające i tagi.

**Konfiguracja danych uwierzytelniających**

Uzyskaj swoje `LT_USERNAME` i `LT_ACCESS_KEY` z panelu LambdaTest i ustaw je jako zmienne środowiskowe:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Zainstaluj SDK SmartUI**

```sh
npm install @lambdatest/wdio-driver
```

**Konfiguracja WebdriverIO**

Zaktualizuj swój `wdio.conf.js`:

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

## Użycie

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

Zobacz wyniki w [Panelu SmartUI](https://smartui.lambdatest.com/).

## Zaawansowane opcje

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

**Wybierz określone obszary**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## Zasoby

| Zasób                                                                                             | Opis                                     |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [Oficjalna dokumentacja](https://www.lambdatest.com/support/docs/smart-ui-cypress/)              | Dokumentacja SmartUI                     |
| [Panel SmartUI](https://smartui.lambdatest.com/)                                                  | Dostęp do projektów i buildów SmartUI    |
| [Zaawansowane ustawienia](https://www.lambdatest.com/support/docs/test-settings-options/)        | Konfiguracja czułości porównywania       |
| [Opcje buildu](https://www.lambdatest.com/support/docs/smart-ui-build-options/)                  | Zaawansowana konfiguracja buildu         |