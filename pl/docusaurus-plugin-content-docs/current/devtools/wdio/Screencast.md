---
id: screencast
title: Nagrywanie sesji (Screencast)
description: "Nagrywaj sesje przeglądarki jako filmy .webm za pomocą funkcji screencast w DevTools, konfiguruj opcje przechwytywania i znajduj pliki wyjściowe."
---

Nagrywa sesje przeglądarki jako filmy `.webm`. Filmy są wyświetlane w interfejsie DevTools obok widoków migawek i mutacji DOM.

Dostępne we wszystkich trzech adapterach - **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** oraz **[Nightwatch.js](/docs/devtools/nightwatch#screencast)**. Tryb przechwytywania różni się w zależności od frameworka (CDP push tam, gdzie to możliwe, w przeciwnym razie polling - zobacz [Obsługa przeglądarek](#browser-support) poniżej).

## Demo

![Screencast Demo](/img/devtools/screencast.gif)

## Konfiguracja wstępna

Kodowanie nagrań wymaga **ffmpeg** dostępnego w `PATH` oraz pakietu `fluent-ffmpeg`:

```sh
# Zainstaluj ffmpeg - https://ffmpeg.org/download.html
brew install ffmpeg        # macOS
sudo apt install ffmpeg    # Ubuntu/Debian

# Zainstaluj fluent-ffmpeg
npm install fluent-ffmpeg
```

## Konfiguracja

```ts
services: [
  [
    'devtools',
    {
      screencast: {
        enabled: true,
        captureFormat: 'jpeg',
        quality: 70,
        maxWidth: 1280,
        maxHeight: 720,
      }
    }
  ]
]
```

## Opcje

| Opcja | Typ | Domyślnie | Opis |
|---|---|---|---|
| `enabled` | `boolean` | `false` | Włącza nagrywanie sesji |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Format obrazu klatek. **Tylko Chrome/Chromium** - określa format, w jakim Chrome wysyła klatki przez CDP. Ignorowane w trybie polling (Firefox, Safari), w którym zrzuty ekranu są zawsze w formacie PNG. Nie wpływa na kontener wyjściowego filmu, który zawsze ma format `.webm` |
| `quality` | `number` | `70` | Jakość kompresji JPEG w zakresie 0-100. Ma zastosowanie tylko w trybie CDP Chrome/Chromium z `captureFormat: 'jpeg'` |
| `maxWidth` | `number` | `1280` | Maksymalna szerokość klatki w pikselach. **Tylko Chrome/Chromium** - Chrome skaluje klatki przed wysłaniem przez CDP. Ignorowane w trybie polling |
| `maxHeight` | `number` | `720` | Maksymalna wysokość klatki w pikselach. **Tylko Chrome/Chromium** - jak wyżej |
| `pollIntervalMs` | `number` | `200` | Odstęp między zrzutami ekranu w milisekundach dla przeglądarek innych niż Chrome (tryb polling). Niższa wartość = płynniejszy film, ale więcej zapytań WebDriver podczas wykonywania testów |

## Obsługa przeglądarek

Nagrywanie działa we wszystkich głównych przeglądarkach dzięki automatycznemu wyborowi trybu:

| Przeglądarka | Tryb | Uwagi |
|---|---|---|
| Chrome / Chromium / Edge | **CDP push** | Chrome wysyła klatki przez DevTools Protocol. Wydajne - brak wpływu na czas wykonywania poleceń testowych |
| Firefox / Safari / inne | **BiDi polling** | Przełącza się na wywoływanie `browser.takeScreenshot()` w odstępach `pollIntervalMs`. Działa wszędzie tam, gdzie obsługiwane są zrzuty ekranu WebDriver; dodaje niewielki narzut proporcjonalny do odstępu |

Do przełączania trybów nie jest potrzebna żadna zmiana konfiguracji - usługa automatycznie wykrywa możliwości przeglądarki i zapisuje w logach, który tryb jest aktywny.

## Działanie

- Nagrywanie rozpoczyna się w momencie otwarcia sesji przeglądarki i kończy w momencie jej zamknięcia.
- Początkowe puste klatki (przechwycone przed pierwszą nawigacją do adresu URL) są automatycznie przycinane, dzięki czemu filmy zaczynają się od pierwszej istotnej akcji na stronie.
- Jeśli w trakcie działania zostanie wywołane `browser.reloadSession()`, usługa finalizuje bieżące nagranie i rozpoczyna nowe dla nowej sesji. Każda sesja tworzy własny plik `.webm`.
- Gdy istnieje wiele nagrań, interfejs DevTools wyświetla listę rozwijaną **Recording N**, umożliwiającą przełączanie się między nimi.

### Gdzie trafiają pliki wyjściowe

Katalog wybierany przez każdy adapter jest nieco inny - wszystkie korzystają z tego samego mechanizmu rozwiązywania ścieżek w `@wdio/devtools-core`, ale przekazują mu różne dane wejściowe:

| Adapter | Lokalizacja wyjściowa |
|---|---|
| **WebdriverIO** | `outputDir`, jeśli został jawnie ustawiony w `wdio.conf.ts`, w przeciwnym razie `rootDir` (katalog zawierający plik konfiguracyjny). Unikaj ustawiania `outputDir` wyłącznie w celu kontrolowania ścieżek filmów - WDIO przekierowuje tam również logi workerów. |
| **Selenium** | Katalog właśnie uruchomionego pliku testowego, a w razie jego braku `process.cwd()`. |
| **Nightwatch** | Katalog pliku testowego, a w razie jego braku katalog zawierający `nightwatch.conf.*`, a następnie `process.cwd()`. |

Katalogi w `node_modules/` są pomijane w przypadku Selenium/Nightwatch, aby workspace'y podlinkowane symbolicznie nie zapisywały filmów w folderze zależności.

## Pliki wyjściowe

Tryb na żywo przesyła przechwycone dane do panelu przez WebSocket i **nie zapisuje na dysku żadnego pliku śladu** — aby uzyskać przenośny artefakt, użyj [trybu śledzenia](/docs/devtools/wdio/trace-mode) (`trace.zip`). Jedynym plikiem zapisywanym przez tryb na żywo jest film z nagrania, i to tylko przy `screencast.enabled: true`. Nazwy plików zależą od adaptera (nazwa frameworka pojawia się w prefiksie):

| Adapter | Film z nagrania |
|---|---|
| WebdriverIO | `wdio-video-{sessionId}.webm` |
| Selenium | `selenium-video-{sessionId}.webm` |
| Nightwatch | `nightwatch-video-{sessionId}.webm` |