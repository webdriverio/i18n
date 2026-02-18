---
id: devtools
title: DevTools
---

Usługa DevTools zapewnia potężny interfejs debugowania oparty na przeglądarce dla testów WebdriverIO. Umożliwia wizualizację, debugowanie i kontrolowanie testów w czasie rzeczywistym poprzez interaktywną aplikację internetową.

## Przegląd

Ta usługa umożliwia:

- **Selektywne powtarzanie testów** - Kliknij dowolny przypadek testowy lub zestaw, aby natychmiast go ponownie wykonać
- **Debugowanie wizualne** - Zobacz podgląd przeglądarki na żywo z automatycznymi zrzutami ekranu
- **Śledzenie wykonania** - Przeglądaj szczegółowe logi poleceń z czasem wykonania i wynikami
- **Monitorowanie sieci i konsoli** - Sprawdzaj wywołania API i logi JavaScript
- **Nawigacja do kodu** - Przejdź bezpośrednio do plików źródłowych testów

## Instalacja

Zainstaluj usługę jako zależność deweloperską:

```sh
npm install --save-dev @wdio/devtools-service
```

## Konfiguracja

Dodaj usługę do konfiguracji WebDriverIO:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['devtools'],
    // ...
};
```

### Opcje usługi

Skonfiguruj usługę DevTools za pomocą tych opcji:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['devtools', {
            port: 3000,      // Port dla interfejsu devtools (domyślnie: 3000)
        }]
    ],
    // ...
};
```

#### Opcje

- **port** (liczba, domyślnie: `3000`) - Numer portu dla serwera interfejsu devtools

## Jak to działa

Gdy uruchamiasz testy WebdriverIO z włączoną usługą DevTools:

1. Usługa otwiera okno przeglądarki pod adresem `http://localhost:3000` (konfigurowalne)
2. Twoje testy wykonują się normalnie, a interfejs DevTools wyświetla aktualizacje w czasie rzeczywistym
3. Interfejs pokazuje hierarchię testów, podgląd przeglądarki, oś czasu poleceń i logi
4. Po zakończeniu testów możesz kliknąć dowolny test, aby uruchomić go ponownie indywidualnie
5. Testy są ponownie uruchamiane w tej samej sesji przeglądarki dla szybszego debugowania

## Funkcje

Poznaj szczegółowo funkcje DevTools:

- **[Interaktywne powtarzanie i wizualizacja testów](devtools/interactive-test-rerunning)** - Podgląd przeglądarki w czasie rzeczywistym z powtarzaniem testów
- **[Obsługa wielu frameworków](devtools/multi-framework-support)** - Działa z Mocha, Jasmine i Cucumber
- **[Logi konsoli](devtools/console-logs)** - Przechwytywanie i inspekcja wyjścia konsoli przeglądarki
- **[Logi sieciowe](devtools/network-logs)** - Monitorowanie wywołań API i aktywności sieciowej
- **[TestLens](devtools/testlens)** - Nawigacja do kodu źródłowego z inteligentną nawigacją po kodzie