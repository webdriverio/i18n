---
id: file-download
title: Pobieranie plików
---

Podczas automatyzacji pobierania plików w testowaniu stron internetowych, kluczowe jest obsługiwanie ich spójnie w różnych przeglądarkach, aby zapewnić niezawodne wykonanie testów.

Tutaj przedstawiamy najlepsze praktyki dotyczące pobierania plików i pokazujemy, jak skonfigurować katalogi pobierania dla przeglądarek **Google Chrome**, **Mozilla Firefox** i **Microsoft Edge**.

## Ścieżki pobierania

**Hardcodowanie** ścieżek pobierania w skryptach testowych może prowadzić do problemów z utrzymaniem i przenośnością. Wykorzystuj **ścieżki względne** dla katalogów pobierania, aby zapewnić przenośność i kompatybilność w różnych środowiskach.

```javascript
// 👎
// Hardcodowana ścieżka pobierania
const downloadPath = '/path/to/downloads';

// 👍
// Względna ścieżka pobierania
const downloadPath = path.join(__dirname, 'downloads');
```

## Strategie oczekiwania

Brak odpowiednich strategii oczekiwania może prowadzić do warunków wyścigu lub niezawodnych testów, szczególnie w przypadku zakończenia pobierania. Zaimplementuj **jawne** strategie oczekiwania, aby poczekać na zakończenie pobierania plików, zapewniając synchronizację między krokami testowymi.

```javascript
// 👎
// Brak jawnego oczekiwania na zakończenie pobierania
await browser.pause(5000);

// 👍
// Oczekiwanie na zakończenie pobierania pliku
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Konfigurowanie katalogów pobierania

Aby zastąpić domyślne zachowanie pobierania plików dla przeglądarek **Google Chrome**, **Mozilla Firefox** i **Microsoft Edge**, podaj katalog pobierania w możliwościach WebDriverIO:

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

Przykładową implementację można znaleźć w [WebdriverIO Test Download Behavior Recipe](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Konfigurowanie pobierania plików w przeglądarkach Chromium

Aby zmienić ścieżkę pobierania dla przeglądarek __opartych na Chromium__ (takich jak Chrome, Edge, Brave itp.) używając metody `getPuppeteer` WebDriverIO w celu uzyskania dostępu do Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Inicjacja sesji CDP:
const cdpSession = await page.target().createCDPSession();
// Ustawienie ścieżki pobierania:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Obsługa wielu pobieranych plików

W przypadku scenariuszy obejmujących pobieranie wielu plików, ważne jest zastosowanie strategii skutecznego zarządzania i weryfikacji każdego pobrania. Rozważ następujące podejścia:

__Sekwencyjne obsługiwanie pobierania:__ Pobieraj pliki jeden po drugim i weryfikuj każde pobieranie przed rozpoczęciem następnego, aby zapewnić uporządkowane wykonanie i dokładną walidację.

__Równoległe obsługiwanie pobierania:__ Wykorzystaj techniki programowania asynchronicznego, aby jednocześnie inicjować wiele pobierań plików, optymalizując czas wykonania testu. Wdrażaj solidne mechanizmy walidacji, aby weryfikować wszystkie pobrania po ich zakończeniu.

## Kwestie dotyczące kompatybilności między przeglądarkami

Chociaż WebDriverIO zapewnia ujednolicony interfejs do automatyzacji przeglądarek, ważne jest uwzględnienie różnic w zachowaniu i możliwościach przeglądarek. Rozważ przetestowanie funkcji pobierania plików w różnych przeglądarkach, aby zapewnić kompatybilność i spójność.

__Konfiguracje specyficzne dla przeglądarek:__ Dostosuj ustawienia ścieżki pobierania i strategie oczekiwania, aby uwzględnić różnice w zachowaniu i preferencjach przeglądarek w Chrome, Firefox, Edge i innych obsługiwanych przeglądarkach.

__Kompatybilność wersji przeglądarek:__ Regularnie aktualizuj wersje WebDriverIO i przeglądarek, aby korzystać z najnowszych funkcji i ulepszeń, zapewniając jednocześnie kompatybilność z istniejącym zestawem testów.