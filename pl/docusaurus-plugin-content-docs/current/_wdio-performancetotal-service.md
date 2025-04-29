---
id: wdio-performancetotal-service
title: Usługa PerformanceTotal
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-performancetotal-service jest pakietem zewnętrznym, więcej informacji można znaleźć na [GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service)
Uwaga:<br/>
Dla WebdriverIO v9 używaj wersji 4.x.x.<br/>
Dla WebdriverIO v8 używaj wersji 3.x.x.<br/>
Dla WebdriverIO v7 używaj wersji 2.x.x.<br/>
Dla WebdriverIO v6 używaj wersji 1.x.x.

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

Dzięki tej wtyczce do [webdriver.io](https://webdriver.io/) możesz łatwo dodać analizę wydajności do dowolnego przepływu w swoich testach, czy to czysty UI, API, czy kombinacja obu. Ta wtyczka zapewnia prosty i wydajny sposób pomiaru czasów odpowiedzi różnych procedur i identyfikacji potencjalnych wąskich gardeł w Twojej aplikacji. Dzięki tym informacjom możesz podejmować świadome decyzje dotyczące optymalizacji i ulepszeń, aby poprawić ogólną wydajność swojej aplikacji.

## Instalacja

Najprostszym sposobem instalacji tego modułu jako dev dependency jest użycie następującego polecenia:

```
npm install wdio-performancetotal-service --save-dev
```

## Użycie

Dodaj wdio-performancetotal-service do swojego pliku `wdio.conf.js`:

```typescript
exports.config = {
  // ...
  services: ['performancetotal']
  // ...
};
```
...lub z opcjami usługi:

```typescript
exports.config = {
  // ...
  services: [
      ['performancetotal',
      // Opcje (z domyślnymi wartościami)
        {
            disableAppendToExistingFile: false,
            performanceResultsFileName: "performance-results",
            dropResultsFromFailedTest: false,
            performanceResultsDirectory: "performance-results",
            analyzeByBrowser: false,
            recentDays: 0
        }]
      ]
  // ...
};
```

### Opcje

#### __disableAppendToExistingFile__

Gdy ustawione na `true`, nowe uruchomienia testów zaczną się od nowa i nadpiszą istniejące dane wydajnościowe.
Gdy ustawione na `false` (domyślnie), dane wydajnościowe będą dodawane do istniejących danych.

> **⚠️ Uwaga:**
>
> Ta akcja spowoduje trwałe usunięcie wszystkich danych wydajnościowych. Upewnij się, że masz kopię zapasową przed kontynuowaniem.

#### __performanceResultsFileName__

Możesz nadpisać domyślną nazwę pliku wyników (`performance-results`).
Nowo utworzony plik wyników zwykle nadpisuje stary plik. Jeśli chcesz zachować stare pliki, zaleca się dodanie znacznika czasowego do nazwy pliku. Na przykład:

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

Domyślnie `false`. Gdy wartość jest ustawiona na `true`, analiza wydajności z nieudanych testów zostanie wykluczona.

#### __recentDays__

Domyślnie `0` (brak limitu). Aby ustawić liczbę dni do uwzględnienia w analizie wydajności, ustaw liczbę dni. Obsługiwane są również niepełne dni (np. `recentDays: 0.5`)

#### __performanceResultsDirectory__

Możesz nadpisać domyślną ścieżkę do katalogu wyników w katalogu głównym projektu.
Na przykład:

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

Domyślnie `false`. Jeśli `true`, dane wydajnościowe będą również analizowane według typu przeglądarki.


### Użycie w testach

Wystarczy zaimportować __performancetotal__ tam, gdzie go potrzebujesz, czy to w pliku testowym, czy w dowolnej innej klasie. Ten obiekt udostępnia metody do mierzenia danych wydajnościowych w testach, w tym sampleStart i sampleEnd do rozpoczynania i kończenia pomiarów wydajności.
Oto przykład, jak można użyć obiektu performancetotal do zmierzenia wydajności startu dwóch stron internetowych:

```typescript
// Ten przypadek testowy mierzy wydajność startową Github i SourceForge za pomocą obiektu performancetotal.

import { performancetotal } from "wdio-performancetotal-service";

it("should test github and sourceforge startup performance", () => {
    // Rozpocznij nowy pomiar wydajności dla Github
    performancetotal.sampleStart("GH-Startup");

    // Przejdź do Github
    browser.url("https://github.com/");

    // Zakończ pomiar Github i zapisz wyniki
    performancetotal.sampleEnd("GH-Startup");

    // ...

    // Rozpocznij nowy pomiar wydajności dla SourceForge
    performancetotal.sampleStart("SF-Startup");

    // Przejdź do SourceForge
    await browser.url("https://sourceforge.net/");

    // Zakończ pomiar SourceForge i zapisz wyniki
    performancetotal.sampleEnd("SF-Startup");
});

```

Możesz uzyskać czas potrzebny dla pojedynczej próbki wydajności, wywołując performancetotal.getSampleTime(sampleName) w swoim teście. Pozwala to sprawdzić wydajność konkretnej sekcji kodu i upewnić się, że spełnia ona Twoje oczekiwania.

```typescript
// Pobierz czas potrzebny dla pojedynczej próbki
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## Uzyskiwanie wyników

Po zakończeniu wszystkich testów w głównym folderze projektu tworzony jest nowy katalog wyników (domyślna nazwa katalogu to performance-results). W tym katalogu tworzone są dwa pliki: performance-results.json i performance-results.csv. Te pliki zawierają przeanalizowane dane dla każdej próbki, w tym średni czas, standardowy błąd średniej (SEM), liczbę próbek, wartość minimalną, wartość maksymalną, najwcześniejszy czas i najpóźniejszy czas. Możesz użyć tych danych do identyfikacji wszelkich regresji lub poprawy wydajności w czasie.

### Analiza danych wydajnościowych zbiorczo

Do analizy istniejących danych wydajnościowych zbiorczo bez generowania nowych testów zaleca się użycie narzędzia [__performancetotal-cli__](https://www.npmjs.com/package/performancetotal-cli).

## Wsparcie dla Typescript

Ta wtyczka obsługuje Typescript.

## Wsparcie

W celu uzyskania wsparcia i sugestii, skontaktuj się ze mną pod adresem [tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com).