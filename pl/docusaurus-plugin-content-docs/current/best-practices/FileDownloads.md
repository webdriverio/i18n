---
id: file-download
title: Pobieranie plików
description: "Skonfiguruj katalogi pobierania dla Chrome, Firefox i Edge, poczekaj na zakończenie pobierania i zweryfikuj pobrane pliki w różnych przeglądarkach."
---

Podczas automatyzacji pobierania plików w testach webowych kluczowe jest spójne obsługiwanie ich w różnych przeglądarkach, aby zapewnić niezawodne wykonywanie testów.

Poniżej przedstawiamy najlepsze praktyki dotyczące pobierania plików oraz pokazujemy, jak skonfigurować katalogi pobierania dla przeglądarek **Google Chrome**, **Mozilla Firefox** i **Microsoft Edge**.

## Ścieżki pobierania

**Zakodowanie na stałe** ścieżek pobierania w skryptach testowych może prowadzić do problemów z utrzymaniem i przenośnością. Używaj **ścieżek względnych** dla katalogów pobierania, aby zapewnić przenośność i kompatybilność w różnych środowiskach.

```javascript
// 👎
// Ścieżka pobierania zakodowana na stałe
const downloadPath = '/path/to/downloads';

// 👍
// Względna ścieżka pobierania
const downloadPath = path.join(__dirname, 'downloads');
```

## Strategie oczekiwania

Brak odpowiednich strategii oczekiwania może prowadzić do wyścigów (race conditions) lub niestabilnych testów, szczególnie w przypadku oczekiwania na zakończenie pobierania. Stosuj **jawne** strategie oczekiwania na zakończenie pobierania plików, zapewniając synchronizację między krokami testu.

```javascript
// 👎
// Brak jawnego oczekiwania na zakończenie pobierania
await browser.pause(5000);

// 👍
// Oczekiwanie na zakończenie pobierania pliku
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Konfigurowanie katalogów pobierania

Aby nadpisać zachowanie pobierania plików w przeglądarkach **Google Chrome**, **Mozilla Firefox** i **Microsoft Edge**, podaj katalog pobierania w capabilities WebDriverIO:

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

Przykładową implementację znajdziesz w [WebdriverIO Test Download Behavior Recipe](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Konfigurowanie pobierania w przeglądarkach Chromium

Aby zmienić ścieżkę pobierania w przeglądarkach __opartych na Chromium__ (takich jak Chrome, Edge, Brave itp.), użyj metody `getPuppeteer` z WebDriverIO, która zapewnia dostęp do Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Zainicjuj sesję CDP:
const cdpSession = await page.target().createCDPSession();
// Ustaw ścieżkę pobierania:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Obsługa pobierania wielu plików

W scenariuszach obejmujących pobieranie wielu plików kluczowe jest wdrożenie strategii pozwalających skutecznie zarządzać każdym pobraniem i je weryfikować. Rozważ następujące podejścia:

__Sekwencyjna obsługa pobierania:__ Pobieraj pliki jeden po drugim i weryfikuj każde pobranie przed rozpoczęciem kolejnego, aby zapewnić uporządkowane wykonanie i dokładną weryfikację.

__Równoległa obsługa pobierania:__ Wykorzystaj techniki programowania asynchronicznego, aby jednocześnie rozpocząć pobieranie wielu plików, optymalizując czas wykonywania testów. Wdróż solidne mechanizmy weryfikacji, aby sprawdzić wszystkie pobrane pliki po zakończeniu.

## Kwestie kompatybilności między przeglądarkami

Chociaż WebDriverIO zapewnia ujednolicony interfejs do automatyzacji przeglądarek, ważne jest uwzględnienie różnic w zachowaniu i możliwościach przeglądarek. Rozważ przetestowanie funkcjonalności pobierania plików w różnych przeglądarkach, aby zapewnić kompatybilność i spójność.

__Konfiguracje specyficzne dla przeglądarek:__ Dostosuj ustawienia ścieżki pobierania i strategie oczekiwania do różnic w zachowaniu i preferencjach przeglądarek Chrome, Firefox, Edge oraz innych obsługiwanych przeglądarek.

__Kompatybilność wersji przeglądarek:__ Regularnie aktualizuj WebDriverIO i przeglądarki, aby korzystać z najnowszych funkcji i ulepszeń, jednocześnie zapewniając kompatybilność z istniejącym zestawem testów.