---
id: integrate-with-smartui
title: SmartUI
description: "Dodaj wspomagane przez AI wizualne testy regresji do testów WebdriverIO dzięki SmartUI od TestMu AI (wcześniej LambdaTest), w tym konfigurację i opcje."
---

TestMu AI (wcześniej LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) zapewnia wspomagane przez AI wizualne testy regresji dla Twoich testów WebdriverIO. Przechwytuje zrzuty ekranu, porównuje je z wzorcami (baseline) i wyróżnia różnice wizualne przy użyciu inteligentnych algorytmów porównujących.

## Konfiguracja

**Utwórz projekt SmartUI**

[Zaloguj się](https://accounts.lambdatest.com/register) do TestMu AI (wcześniej LambdaTest) i przejdź do [SmartUI Projects](https://smartui.lambdatest.com/), aby utworzyć nowy projekt. Wybierz **Web** jako platformę i skonfiguruj nazwę projektu, osoby zatwierdzające oraz tagi.

**Skonfiguruj dane uwierzytelniające**

Pobierz swoje `LT_USERNAME` i `LT_ACCESS_KEY` z panelu TestMu AI (wcześniej LambdaTest) i ustaw je jako zmienne środowiskowe:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Zainstaluj SmartUI SDK**

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

## Użycie

Użyj `browser.execute('smartui.takeScreenshot')`, aby przechwytywać zrzuty ekranu:

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

Wyniki możesz przeglądać w [SmartUI Dashboard](https://smartui.lambdatest.com/).

## Opcje zaawansowane

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

**Wybieranie określonych obszarów**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## Zasoby

| Zasób                                                                                             | Opis                                         |
|---------------------------------------------------------------------------------------------------|----------------------------------------------|
| [Oficjalna dokumentacja](https://www.testmuai.com/support/docs/smart-ui-cypress/)              | Dokumentacja SmartUI                         |
| [SmartUI Dashboard](https://smartui.lambdatest.com/)                                              | Dostęp do Twoich projektów i buildów SmartUI |
| [Ustawienia zaawansowane](https://www.testmuai.com/support/docs/test-settings-options/)        | Konfiguracja czułości porównywania           |
| [Opcje buildu](https://www.testmuai.com/support/docs/smart-ui-build-options/)                  | Zaawansowana konfiguracja buildu             |