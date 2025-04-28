---
id: emulation
title: Emulacja
---

Z WebdriverIO możesz emulować interfejsy API za pomocą polecenia [`emulate`](/docs/api/browser/emulate), aby zwracać niestandardowe wartości, które pomogą ci emulować określone zachowania przeglądarki. Pamiętaj, że wymaga to, aby twoja aplikacja jawnie korzystała z tych interfejsów API.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Ta funkcja wymaga wsparcia WebDriver Bidi dla przeglądarki. Podczas gdy najnowsze wersje Chrome, Edge i Firefox mają takie wsparcie, Safari __nie posiada__ tej funkcjonalności. Aby śledzić aktualizacje, odwiedź [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned). Ponadto, jeśli korzystasz z dostawcy chmurowego do uruchamiania przeglądarek, upewnij się, że twój dostawca również wspiera WebDriver Bidi.

Aby włączyć WebDriver Bidi dla swoich testów, upewnij się, że masz ustawione `webSocketUrl: true` w swoich możliwościach (capabilities).

:::

## Geolokalizacja

Zmień geolokalizację przeglądarki na określony obszar, np.:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // wyświetla: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

To zastąpi działanie [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) i zwróci lokalizację podaną przez ciebie.

## Schemat kolorów

Zmień domyślny schemat kolorów przeglądarki za pomocą:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // wyświetla: "#efefef"

await browser.emulate('colorScheme', 'dark')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // wyświetla: "#000000"
```

To zastąpi działanie [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia), gdy sprawdzasz schemat kolorów za pomocą `(prefers-color-scheme: dark)`.

## User Agent

Zmień user agent przeglądarki na inny ciąg znaków za pomocą:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

To zmieni wartość [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent). Zauważ, że producenci przeglądarek stopniowo deprecjonują User Agent.

## Właściwość onLine

Zmień status online przeglądarki za pomocą:

```ts
await browser.emulate('onLine', false)
```

To __nie__ wyłączy ruchu sieciowego między przeglądarką a internetem, a jedynie zmieni zwracaną wartość [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine). Jeśli interesuje cię modyfikowanie możliwości sieciowych przeglądarki, zapoznaj się z poleceniem [`throttleNetwork`](/docs/api/browser/throttleNetwork).

## Zegar

Możesz modyfikować zegar systemowy przeglądarki za pomocą polecenia [`emulate`](/docs/emulation). Nadpisuje ono natywne globalne funkcje związane z czasem, pozwalając na synchroniczne kontrolowanie ich za pomocą `clock.tick()` lub zwróconego obiektu zegara. Obejmuje to kontrolowanie:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Zegar zaczyna od początku ery uniksowej (timestamp 0). Oznacza to, że gdy utworzysz nowy obiekt Date w swojej aplikacji, będzie on miał czas 1 stycznia 1970 roku, jeśli nie przekażesz żadnych innych opcji do polecenia `emulate`.

##### Przykład

Gdy wywołasz `browser.emulate('clock', { ... })`, natychmiast nadpisze ono globalne funkcje dla bieżącej strony, a także wszystkich następnych stron, np.:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// zwraca "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// zwraca "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// zwraca "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// zwraca "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

Możesz modyfikować czas systemowy, wywołując [`setSystemTime`](/docs/api/clock/setSystemTime) lub [`tick`](/docs/api/clock/tick).

Obiekt `FakeTimerInstallOpts` może mieć następujące właściwości:

 ```ts
interface FakeTimerInstallOpts {
    // Instaluje fałszywe timery z określoną erą uniksową
    // @default: 0
    now?: number | Date | undefined;

    // Tablica z nazwami globalnych metod i API do podrabiania. Domyślnie WebdriverIO
    // nie zastępuje `nextTick()` i `queueMicrotask()`. Na przykład,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` będzie podrabiać tylko
    // `setTimeout()` i `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // Maksymalna liczba timerów, które zostaną uruchomione przy wywołaniu runAll() (domyślnie: 1000)
    loopLimit?: number | undefined;

    // Informuje WebdriverIO, aby automatycznie zwiększać symulowany czas na podstawie rzeczywistej
    // zmiany czasu systemowego (np. symulowany czas zostanie zwiększony o 20ms dla każdej zmiany 20ms
    // w rzeczywistym czasie systemowym)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Istotne tylko przy użyciu z shouldAdvanceTime: true. Zwiększa symulowany czas o
    // advanceTimeDelta ms przy każdej zmianie advanceTimeDelta ms w rzeczywistym czasie systemowym
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Informuje FakeTimers, aby czyścić 'natywne' (tj. nie fałszywe) timery, delegując do ich
    // odpowiednich obsługiwaczy. Nie są one czyszczone domyślnie, co może prowadzić do
    // nieoczekiwanego zachowania, jeśli timery istniały przed zainstalowaniem FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Urządzenie

Polecenie `emulate` obsługuje również emulowanie określonego urządzenia mobilnego lub desktopowego poprzez zmianę obszaru widocznego, współczynnika skalowania urządzenia i user agenta. To nie powinno być w żadnym wypadku używane do testowania mobilnego, ponieważ silniki przeglądarek desktopowych różnią się od mobilnych. Powinno być używane tylko wtedy, gdy twoja aplikacja oferuje specyficzne zachowanie dla mniejszych rozmiarów obszaru widocznego.

Na przykład, aby przełączyć user agent i viewport na iPhone 15, wystarczy uruchomić:

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// testuj swoją aplikację ...

// przywróć oryginalny viewport i user agent
await restore()
```

WebdriverIO utrzymuje stałą listę [wszystkich zdefiniowanych urządzeń](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).