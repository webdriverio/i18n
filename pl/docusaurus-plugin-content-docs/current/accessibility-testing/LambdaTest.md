---
id: testmuai
title: Testowanie dostępności w TestMu AI (dawniej LambdaTest)
description: "Włącz testowanie dostępności TestMu AI (dawniej LambdaTest) w swoim zestawie testów WebdriverIO, skonfiguruj opcje skanowania i przeglądaj raporty dostępności."
---

# Testowanie dostępności w TestMu AI

Możesz łatwo zintegrować testy dostępności ze swoimi zestawami testów WebdriverIO, korzystając z [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Zalety testowania dostępności w TestMu AI

TestMu AI Accessibility Testing pomaga identyfikować i naprawiać problemy z dostępnością w aplikacjach internetowych. Oto kluczowe zalety:

* Bezproblemowa integracja z istniejącą automatyzacją testów WebdriverIO.
* Automatyczne skanowanie dostępności podczas wykonywania testów.
* Kompleksowe raportowanie zgodności z WCAG.
* Szczegółowe śledzenie problemów wraz ze wskazówkami dotyczącymi ich naprawy.
* Obsługa wielu standardów WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Informacje o dostępności w czasie rzeczywistym w panelu TestMu AI.

## Pierwsze kroki z testowaniem dostępności w TestMu AI

Wykonaj poniższe kroki, aby zintegrować swoje zestawy testów WebdriverIO z TestMu AI Accessibility Testing:

1. Zainstaluj pakiet usługi TestMu AI dla WebdriverIO.

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
            accessibility: true, // Włącz testowanie dostępności
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // Wersja WCAG (wcag20, wcag21a, wcag21aa, wcag22aa)
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

3. Uruchom testy jak zwykle. TestMu AI automatycznie przeskanuje aplikację pod kątem problemów z dostępnością podczas wykonywania testów.

```bash
npx wdio run wdio.conf.js
```

## Opcje konfiguracji

Obiekt `accessibilityOptions` obsługuje następujące parametry:

* **wcagVersion**: Określa wersję standardu WCAG, względem której przeprowadzane są testy
  - `wcag20` - WCAG 2.0 poziom A
  - `wcag21a` - WCAG 2.1 poziom A
  - `wcag21aa` - WCAG 2.1 poziom AA (domyślnie)
  - `wcag22aa` - WCAG 2.2 poziom AA

* **bestPractice**: Uwzględnia rekomendacje dobrych praktyk (domyślnie: `false`)

* **needsReview**: Uwzględnia problemy wymagające ręcznej weryfikacji (domyślnie: `true`)

## Przeglądanie raportów dostępności

Po zakończeniu testów możesz przeglądać szczegółowe raporty dostępności w [panelu TestMu AI](https://automation.lambdatest.com/):

1. Przejdź do wykonania swojego testu
2. Kliknij zakładkę „Accessibility”
3. Przejrzyj zidentyfikowane problemy wraz z poziomami ich ważności
4. Uzyskaj wskazówki dotyczące naprawy każdego problemu

Więcej szczegółowych informacji znajdziesz w [dokumentacji TestMu AI Accessibility Automation](https://www.testmuai.com/support/docs/accessibility-automation-settings/).