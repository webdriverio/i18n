---
id: testmuai
title: Testowanie dostępności TestMu AI (dawniej LambdaTest)
description: Testowanie dostępności TestMu AI
---

# TestMu AI Accessibility Testing

Możesz łatwo zintegrować testy dostępności w swoich zestawach testów WebdriverIO używając [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Zalety TestMu AI Accessibility Testing

TestMu AI Accessibility Testing pomaga identyfikować i naprawiać problemy z dostępnością w aplikacjach internetowych. Oto główne zalety:

* Bezproblemowa integracja z istniejącą automatyzacją testów WebdriverIO.
* Automatyczne skanowanie dostępności podczas wykonywania testów.
* Kompleksowe raporty zgodności z WCAG.
* Szczegółowe śledzenie problemów wraz z wskazówkami dotyczącymi naprawy.
* Wsparcie dla wielu standardów WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Wgląd w dostępność w czasie rzeczywistym w panelu TestMu AI.

## Rozpocznij pracę z TestMu AI Accessibility Testing

Wykonaj następujące kroki, aby zintegrować swoje zestawy testów WebdriverIO z Testowaniem Dostępności TestMu AI:

1. Zainstaluj pakiet usługi WebdriverIO TestMu AI.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Zaktualizuj swój plik konfiguracyjny `wdio.conf.js`.

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

3. Uruchom swoje testy jak zwykle. TestMu AI automatycznie przeskanuje problemy z dostępnością podczas wykonywania testów.

```bash
npx wdio run wdio.conf.js
```

## Opcje konfiguracji

Obiekt `accessibilityOptions` obsługuje następujące parametry:

* **wcagVersion**: Określa wersję standardu WCAG, względem której testować
  - `wcag20` - WCAG 2.0 Poziom A
  - `wcag21a` - WCAG 2.1 Poziom A
  - `wcag21aa` - WCAG 2.1 Poziom AA (domyślnie)
  - `wcag22aa` - WCAG 2.2 Poziom AA

* **bestPractice**: Uwzględnia rekomendacje najlepszych praktyk (domyślnie: `false`)

* **needsReview**: Uwzględnia problemy wymagające ręcznego przeglądu (domyślnie: `true`)

## Przeglądanie raportów dostępności

Po zakończeniu testów możesz przeglądać szczegółowe raporty dostępności w [Panelu TestMu AI](https://automation.lambdatest.com/):

1. Przejdź do wykonania testu
2. Kliknij na zakładkę "Accessibility"
3. Przejrzyj zidentyfikowane problemy z poziomami ważności
4. Uzyskaj wskazówki dotyczące naprawy każdego problemu

Aby uzyskać bardziej szczegółowe informacje, odwiedź [dokumentację automatyzacji dostępności TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/).