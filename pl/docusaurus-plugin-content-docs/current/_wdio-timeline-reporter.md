---
id: wdio-timeline-reporter
title: Raportowanie osi czasu
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-timeline-reporter to pakiet zewnętrzny, więcej informacji znajdziesz na [GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter)


> Kompleksowy reporter WebdriverIO do zagregowanej wizualizacji wyników testów, ponieważ "Zobaczyć znaczy uwierzyć"

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## Dlaczego

Ponieważ spędzamy dużo czasu na debugowaniu nieudanych testów, przełączając się między wyjściem terminala a przeglądaniem zrzutów ekranu błędów. Ten reporter agreguje wszystkie typowe informacje, których potrzebujesz, w jednym raporcie. Uruchom testy i uzyskaj ładną oś czasu zdarzeń, do której możesz wrócić, aby dodatkowo zweryfikować, czy wszystko wygląda dobrze.

#### Funkcje obejmują:

- Świetnie współpracuje z frameworkami Mocha i Jasmine. Działa również z Cucumber, ale każdy krok będzie raportowany jako test
- Głośne podsumowanie wyników testów.
- Szczegóły każdego uruchomienia testu, w tym wszystkie zrzuty ekranu wykonane podczas wykonywania testu.
- Filtrowanie wyników testów. Świetne do skupienia się na nieudanych testach
- Ślad stosu błędów dołączony do testu.
- Możliwość dodawania dodatkowych informacji do testu w czasie wykonywania.
- Nie wymaga przetwarzania końcowego. Po zakończeniu procesu testowego wdio zostanie wygenerowany statyczny plik raportu html.
- Usługa osi czasu do zarządzania wykonywaniem zrzutów ekranu, w tym zmianą rozmiaru obrazów.

Przykładowy raport html można znaleźć [tutaj](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html)

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj](http://webdriver.io/guide/getstarted/install.html).

## Instalacja

**ABY ZOBACZYĆ WERSJĘ KOMPATYBILNĄ Z WEBDRIVERIO V4, SPRAWDŹ [TUTAJ](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4)**

```shell
npm install --save wdio-timeline-reporter
```

Zależność zostanie dodana do twojego pliku `package.json`

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### Użycie

Dodaj `timeline` do tablicy reporterów w pliku konfiguracyjnym wdio.

Zaimportuj również i dodaj `TimelineService` z wdio-timeline-reporter.

Usługa jest obowiązkowa, aby łączyć raporty i tworzyć html, ponieważ reportery są teraz inicjowane na instancję runnera w webdriverio 5. [Zobacz otwartą dyskusję na webdriverio](https://github.com/webdriverio/webdriverio/issues/3780)

TimelineService może również zarządzać wykonywaniem zrzutów ekranu podczas wykonywania testów. Masz możliwość zmniejszenia rozmiaru i jakości obrazów oraz osadzenia obrazów w raporcie jako base64. Można je skonfigurować za pomocą [opcji reportera.](#reporter-options)

```js
// wdio.conf.js
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
exports.config = {
  // ...
  reporters: [['timeline', { outputDir: './desired_location' }]],
  // ...
  services: [[TimelineService]]
};
```

### Opcje reportera

Jeśli chcesz zastąpić domyślną konfigurację reportera, dodaj obiekt reporterOptions do tablicy timeline w sekcji reporters, jak pokazano poniżej.

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| indeks | opis                                                                                                                                                                                                   |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1.     | Katalog, w którym zostanie utworzony plik html i zrzuty ekranu. Opcja obowiązkowa                                                                                                                      |
| 2.     | Nazwa pliku raportu html. Wartość domyślna to `timeline-report.html`                                                                                                                                   |
| 3.     | Osadzaj obrazy jako base64 w pliku html. Wartość domyślna to `false`                                                                                                                                   |
| 4.     | Opcje obiektu do manipulacji obrazem                                                                                                                                                                   |
| 5.     | Ustaw jakość JPEG. Istotne tylko, jeśli opcja `resize` ma wartość `true`. Im mniejsza wartość, tym mniejszy rozmiar i jakość obrazu. Wartość domyślna to `70`. Maksymalna dozwolona wartość to `100`   |
| 6.     | Zmień rozmiar obrazu. Wartość domyślna to `false`                                                                                                                                                      |
| 7.     | wartość zmniejszająca całkowitą liczbę pikseli. Istotne tylko, jeśli opcja `resize` ma wartość true. Domyślnie `1` Prawidłowe wartości `1 - 5`                                                         |
| 8.     | jak często robić zrzuty ekranu. Obsługiwane wartości to `on:error`, `before:click`, `none`. Domyślnie `none`. `before:click` to świetna opcja do tworzenia osi czasu zrzutów ekranu testowanej aplikacji. |

### Dodawanie dodatkowych informacji do kontekstu testowego

Możliwe jest dodanie dodatkowych informacji do testu za pomocą statycznej metody `addContext`. Może to być przydatne do dodawania ważnych informacji, które mogą pomóc w debugowaniu nieudanych testów, na przykład użytkownika utworzonego podczas uruchomienia testu z dynamiczną nazwą użytkownika

#### Podstawowe użycie

Statyczna metoda `TimelineReporter.addContext` akceptuje albo parametr string, albo obiekt literału z dwiema właściwościami `title` i `value`, np.

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

value może być również linkiem

##### Przykład Mocha

```js
const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Suite', function() {
  it('Test', function() {
    // parametr literału obiektu
    TimelineReporter.addContext({
      title: 'Test User',
      value: 'user id created during the test'
    });

    // wartość jako tag kotwicy
    TimelineReporter.addContext({
      title: 'Dynamic link',
      value: '<a href="">Some important link related to test</a>'
    });

    // parametr string
    TimelineReporter.addContext('This test might be flaky');
  });
});
```

## Podziękowania

Chciałbym wyrazić uznanie dla autorów i opiekunów [wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter). Przejrzenie ich rozwiązania v5 pomogło przyspieszyć moją pracę