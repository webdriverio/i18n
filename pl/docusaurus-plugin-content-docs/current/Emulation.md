---
id: emulation
title: Emulacja
description: "Emuluj geolokalizację, funkcje mediów, user agent, sieć, ustawienia regionalne, strefę czasową, ekran i urządzenia za pomocą polecenia emulate."
---

Dzięki WebdriverIO możesz emulować zachowanie przeglądarki za pomocą polecenia [`emulate`](/docs/api/browser/emulate). Polecenie to steruje [modułem emulacji WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-emulation) dla bieżącego kontekstu przeglądania najwyższego poziomu. Nadpisanie zaczyna obowiązywać natychmiast. Nie musisz przeładowywać strony. Wyjątkiem jest `clock`: BiDi nie ma polecenia zegara, więc ten zakres nadal instaluje sztuczne timery.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Ta funkcja wymaga obsługi WebDriver Bidi przez przeglądarkę. Najnowsze wersje Chrome, Edge i Firefox ją obsługują, ale Safari __nie__. Aby śledzić aktualizacje, odwiedź [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/emulation?label=experimental&label=master&aligned). Ponadto, jeśli korzystasz z dostawcy chmurowego do uruchamiania przeglądarek, upewnij się, że Twój dostawca również obsługuje WebDriver Bidi.

Aby włączyć WebDriver Bidi w swoim teście, upewnij się, że w capabilities ustawiono `webSocketUrl: true`.

Przeglądarka, która nie implementuje danego polecenia, odrzuca wywołanie własnym błędem, `unknown command` lub `unsupported operation`. WebdriverIO zwraca ten błąd. Nie stosuje rozwiązania zastępczego w postaci skryptu preload ani CDP.

:::

`emulate` zwraca funkcję, która czyści dany zakres. [`browser.restore()`](/docs/api/browser/restore) czyści wszystkie aktywne zakresy lub te, które wymienisz.

## Geolokalizacja

Zmień geolokalizację przeglądarki na określony obszar, np.:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.setPermissions({ name: 'geolocation' }, 'granted')
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // wyświetla: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

Wykorzystuje to mechanizm geolokalizacji przeglądarki, w tym `getCurrentPosition` i `watchPosition`. Strona może nadal wymagać przyznania uprawnienia do geolokalizacji, jak w przykładzie. Opcjonalne pola to `accuracy`, `altitude`, `altitudeAccuracy`, `heading` i `speed`.

Aby strona nie mogła odczytać pozycji:

```ts
await browser.emulate('geolocation', { error: 'positionUnavailable' })
```

## Schemat kolorów i inne funkcje mediów

Zmień funkcję mediów `prefers-color-scheme`:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // wyświetla: "#efefef"

await browser.emulate('colorScheme', 'dark')
const backgroundColorDark = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColorDark.parsed.hex) // wyświetla: "#000000"
```

Aktualizuje to CSS `@media (prefers-color-scheme)` oraz [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia). Przeładowanie nie jest wymagane.

`media` ustawia pozostałą część mapy funkcji mediów, na przykład ograniczony ruch:

```ts
await browser.emulate('media', { prefersReducedMotion: 'reduce', hover: 'none' })
```

`colorScheme` i `media` współdzielą jedną mapę. Polecenie BiDi zastępuje całą mapę, więc wygrywa późniejsze wywołanie. Przywrócenie dowolnego z tych zakresów czyści mapę.

`forcedColors` to inne polecenie. Ustawia motyw wymuszonych kolorów (`'light'` lub `'dark'`), a nie funkcję mediów `forced-colors`. Ta funkcja mediów pozostaje w `media` jako `forcedColors: 'none' | 'active'`.

## User Agent

Zmień user agent przeglądarki za pomocą:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Jest to nadpisanie user agenta przez przeglądarkę. Nie jest to zmodyfikowana właściwość `navigator.userAgent`. Producenci przeglądarek stopniowo wycofują User Agent.

## Stan online

Przełącz kontekst przeglądania w tryb offline:

```ts
await browser.emulate('onLine', false)
```

`false` wysyła `emulation.setNetworkConditions` z `{ type: 'offline' }`. Fetch, WebSocket i WebTransport kończą się niepowodzeniem, a [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) odpowiednio się zmienia. `true`, a także przywrócenie zakresu, czyści ten warunek. Przepustowość i opóźnienie pozostają w [`throttleNetwork`](/docs/api/browser/throttleNetwork). Warunki sieciowe BiDi obsługują wyłącznie tryb offline.

## Ustawienia regionalne, strefa czasowa i dotyk

```ts
await browser.emulate('locale', 'fr-FR')
await browser.emulate('timezone', 'Pacific/Honolulu')
await browser.emulate('touch', 1)
```

`locale` to tag BCP 47. `timezone` to nazwa IANA lub przesunięcie, takie jak `+02:00`. `touch` to `maxTouchPoints` i musi być liczbą całkowitą `>= 1`. Przywrócenie `touch` czyści nadpisanie. Nie można ustawić `0`.

## Ekran, orientacja i układ

```ts
await browser.emulate('screen', { width: 390, height: 844 })
await browser.emulate('orientation', { natural: 'portrait', type: 'portrait-primary' })
await browser.emulate('viewportMeta', true)
await browser.emulate('textLayout', 'mobile')
await browser.emulate('scrollbar', 'overlay')
await browser.emulate('scripting', false)
```

`screen` to obszar ekranu udostępniany stronom internetowym, a nie viewport. `orientation.natural` to `'portrait'` lub `'landscape'`. `orientation.type` to `'portrait-primary'`, `'portrait-secondary'`, `'landscape-primary'` lub `'landscape-secondary'`.

`viewportMeta` akceptuje tylko `true`. Wartość w specyfikacji to `true | null`, więc nie ma `false`. Przywrócenie ją czyści. `textLayout` akceptuje tylko `'mobile'`. `scripting` można jedynie wyłączyć. Specyfikacja nie pozwala wymusić włączenia skryptów. `scrollbar` to `'classic'` lub `'overlay'`.

## Zegar

Możesz modyfikować zegar systemowy przeglądarki za pomocą polecenia [`emulate`](/docs/emulation). Nadpisuje ono natywne funkcje globalne związane z czasem, pozwalając na ich synchroniczną kontrolę za pomocą `clock.tick()` lub zwróconego obiektu zegara. Obejmuje to kontrolę nad:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Zegar startuje od epoki uniksowej (znacznik czasu 0). Oznacza to, że gdy utworzysz nowy obiekt Date w swojej aplikacji, będzie on miał czas 1 stycznia 1970, jeśli nie przekażesz żadnych innych opcji do polecenia `emulate`.

##### Przykład

Wywołanie `browser.emulate('clock', { ... })` natychmiast nadpisze funkcje globalne dla bieżącej strony oraz wszystkich kolejnych stron, np.:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

Możesz zmodyfikować czas systemowy, wywołując [`setSystemTime`](/docs/api/clock/setSystemTime) lub [`tick`](/docs/api/clock/tick).

Obiekt `FakeTimerInstallOpts` może mieć następujące właściwości:

 ```ts
interface FakeTimerInstallOpts {
    // Instaluje sztuczne timery z określoną epoką uniksową
    // @default: 0
    now?: number | Date | undefined;

    // Tablica z nazwami globalnych metod i API do zasymulowania. Domyślnie WebdriverIO
    // nie zastępuje `nextTick()` i `queueMicrotask()`. Na przykład
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` zasymuluje tylko
    // `setTimeout()` i `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // Maksymalna liczba timerów, które zostaną uruchomione przy wywołaniu runAll() (domyślnie: 1000)
    loopLimit?: number | undefined;

    // Nakazuje WebdriverIO automatycznie zwiększać symulowany czas na podstawie rzeczywistego
    // przesunięcia czasu systemowego (np. symulowany czas zostanie zwiększony o 20 ms za każde 20 ms zmiany
    // rzeczywistego czasu systemowego)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Istotne tylko przy użyciu z shouldAdvanceTime: true. Zwiększa symulowany czas o
    // advanceTimeDelta ms za każde advanceTimeDelta ms zmiany rzeczywistego czasu systemowego
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Nakazuje FakeTimers czyścić 'natywne' (tj. nie sztuczne) timery poprzez delegowanie do ich
    // odpowiednich handlerów. Domyślnie nie są one czyszczone, co może prowadzić do
    // nieoczekiwanego zachowania, jeśli timery istniały przed zainstalowaniem FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Urządzenie

Polecenie `emulate` obsługuje również emulację określonego urządzenia mobilnego lub stacjonarnego. W żadnym wypadku nie powinno to być używane do testowania mobilnego, ponieważ silniki przeglądarek desktopowych różnią się od mobilnych. Należy z tego korzystać tylko wtedy, gdy Twoja aplikacja oferuje specyficzne zachowanie dla mniejszych rozmiarów viewportu.

Dla urządzenia WebdriverIO:

- ustawia user agent na podstawie deskryptora
- ustawia viewport i współczynnik skalowania urządzenia
- ustawia `maxTouchPoints` na `1`, gdy deskryptor obsługuje dotyk, a w przeciwnym razie czyści ustawienie dotyku
- ustawia mobilny układ tekstu i tag meta viewport, gdy deskryptor jest mobilny, a w przeciwnym razie je czyści

Nie wymyśla rozmiaru ekranu ani orientacji na podstawie nazwy urządzenia. Viewport to nie `screen.width`. Do tego służą zakresy `screen` i `orientation`.

Zmiana viewportu jest wysyłana do kontekstu najwyższego poziomu, który był bieżący w momencie wywołania `emulate`. Przywrócenie urządzenia zmienia rozmiar tego kontekstu, również po przełączeniu się na inne okno.

Jeśli przeglądarka odrzuci którekolwiek z tych poleceń, poprzedni user agent, viewport, dotyk, układ tekstu i meta viewport zostają przywrócone, a błąd jest zwracany. Niestandardowy user agent lub rozmiar z `setViewport` nie jest zastępowany wartością domyślną.

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// przetestuj swoją aplikację ...

// zresetuj user agent, viewport, dotyk, układ tekstu i meta viewport
await restore()
```

WebdriverIO utrzymuje stałą listę [wszystkich zdefiniowanych urządzeń](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).