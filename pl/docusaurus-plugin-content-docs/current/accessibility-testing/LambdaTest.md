---
id: lambdatest
title: Testy dostępności LambdaTest
---

# Testy dostępności LambdaTest

Możesz łatwo zintegrować testy dostępności w swoich zestawach testowych WebdriverIO korzystając z [LambdaTest Accessibility Testing](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).

## Zalety testów dostępności LambdaTest

Testy dostępności LambdaTest pomagają identyfikować i naprawiać problemy z dostępnością w aplikacjach internetowych. Oto główne zalety:

* Bezproblemowa integracja z istniejącą automatyzacją testów WebdriverIO.
* Automatyczne skanowanie dostępności podczas wykonywania testów.
* Kompleksowe raportowanie zgodności z WCAG.
* Szczegółowe śledzenie problemów wraz z wytycznymi dotyczącymi naprawy.
* Obsługa wielu standardów WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Informacje o dostępności w czasie rzeczywistym w panelu LambdaTest.

## Rozpoczęcie pracy z testami dostępności LambdaTest

Wykonaj poniższe kroki, aby zintegrować zestawy testowe WebdriverIO z testami dostępności LambdaTest:

1. Zainstaluj pakiet usługi LambdaTest WebdriverIO.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Zaktualizuj plik konfiguracyjny `wdio.conf.js`.

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

3. Uruchom swoje testy jak zwykle. LambdaTest automatycznie przeskanuje problemy z dostępnością podczas wykonywania testów.

```bash
npx wdio run wdio.conf.js
```

## Opcje konfiguracji

Obiekt `accessibilityOptions` obsługuje następujące parametry:

* **wcagVersion**: Określa wersję standardu WCAG, według której należy testować
  - `wcag20` - WCAG 2.0 Poziom A
  - `wcag21a` - WCAG 2.1 Poziom A
  - `wcag21aa` - WCAG 2.1 Poziom AA (domyślnie)
  - `wcag22aa` - WCAG 2.2 Poziom AA

* **bestPractice**: Uwzględnia rekomendacje najlepszych praktyk (domyślnie: `false`)

* **needsReview**: Uwzględnia problemy wymagające ręcznego przeglądu (domyślnie: `true`)

## Przeglądanie raportów dostępności

Po zakończeniu testów możesz przeglądać szczegółowe raporty dostępności w [Panelu LambdaTest](https://automation.lambdatest.com/):

1. Przejdź do wykonania testu
2. Kliknij zakładkę "Accessibility"
3. Przejrzyj zidentyfikowane problemy z poziomami ich wagi
4. Otrzymaj wskazówki dotyczące naprawy każdego problemu

Aby uzyskać bardziej szczegółowe informacje, odwiedź [dokumentację automatyzacji dostępności LambdaTest](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).