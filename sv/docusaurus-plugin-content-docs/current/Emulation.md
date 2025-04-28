---
id: emulation
title: Emulering
---

Med WebdriverIO kan du emulera Web-API:er med hjälp av [`emulate`](/docs/api/browser/emulate)-kommandot för att returnera anpassade värden som hjälper dig att emulera vissa webbläsarbeteenden. Observera att detta kräver att din applikation uttryckligen använder dessa API:er.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Denna funktion kräver WebDriver Bidi-stöd för webbläsaren. Medan nyare versioner av Chrome, Edge och Firefox har sådant stöd, stöder Safari __inte__ detta. För uppdateringar, följ [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned). Dessutom, om du använder en molnleverantör för att starta webbläsare, se till att din leverantör också stöder WebDriver Bidi.

För att aktivera WebDriver Bidi för ditt test, se till att ha `webSocketUrl: true` inställt i dina capabilities.

:::

## Geolocation

Ändra webbläsarens geolocation till ett specifikt område, t.ex.:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // outputs: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

Detta kommer att monkey-patcha hur [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) fungerar och returnerar platsen som du angett.

## Color Scheme

Ändra webbläsarens standardinställning för färgschema via:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#000000"
```

Detta kommer att monkey-patcha hur [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) beter sig när du frågar efter färgschemat via `(prefers-color-scheme: dark)`.

## User Agent

Ändra webbläsarens user agent till en annan sträng via:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Detta kommer att ändra värdet på [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent). Observera att webbläsarleverantörer successivt avvecklar User Agent.

## onLine Property

Ändra webbläsarens online-status via:

```ts
await browser.emulate('onLine', false)
```

Detta kommer __inte__ att stänga av nätverkstrafiken mellan webbläsaren och internet utan ändrar endast returvärdet för [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine). Om du är intresserad av att modifiera webbläsarens nätverksfunktioner, titta på [`throttleNetwork`](/docs/api/browser/throttleNetwork)-kommandot.

## Clock

Du kan modifiera webbläsarens systemklocka med [`emulate`](/docs/emulation)-kommandot. Det åsidosätter inbyggda globala funktioner relaterade till tid och låter dem kontrolleras synkront via `clock.tick()` eller det returnerade klockobjektet. Detta inkluderar kontroll över:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Klockan startar vid unix-epoken (tidsstämpel 0). Detta innebär att när du instansierar new Date i din applikation kommer den att ha en tid som motsvarar 1 januari 1970 om du inte skickar några andra alternativ till `emulate`-kommandot.

##### Exempel

När du anropar `browser.emulate('clock', { ... })` kommer det omedelbart att skriva över de globala funktionerna för den aktuella sidan samt alla följande sidor, t.ex.:

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

Du kan modifiera systemtiden genom att anropa [`setSystemTime`](/docs/api/clock/setSystemTime) eller [`tick`](/docs/api/clock/tick).

`FakeTimerInstallOpts`-objektet kan ha följande egenskaper:

 ```ts
interface FakeTimerInstallOpts {
    // Installs fake timers with the specified unix epoch
    // @default: 0
    now?: number | Date | undefined;

    // An array with names of global methods and APIs to fake. By default, WebdriverIO
    // does not replace `nextTick()` and `queueMicrotask()`. For instance,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` will fake only
    // `setTimeout()` and `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // The maximum number of timers that will be run when calling runAll() (default: 1000)
    loopLimit?: number | undefined;

    // Tells WebdriverIO to increment mocked time automatically based on the real system
    // time shift (e.g. the mocked time will be incremented by 20ms for every 20ms change
    // in the real system time)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Relevant only when using with shouldAdvanceTime: true. increment mocked time by
    // advanceTimeDelta ms every advanceTimeDelta ms change in the real system time
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Tells FakeTimers to clear 'native' (i.e. not fake) timers by delegating to their
    // respective handlers. These are not cleared by default, leading to potentially
    // unexpected behavior if timers existed prior to installing FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Device

Kommandot `emulate` stöder också emulering av en viss mobil eller stationär enhet genom att ändra viewport, device scale factor och user agent. Detta bör på inga villkor användas för mobiltestning eftersom webbläsarmotorer för datorer skiljer sig från mobila. Detta bör endast användas om din applikation erbjuder ett specifikt beteende för mindre viewport-storlekar.

Till exempel, för att byta user agent och viewport till en iPhone 15, kör bara:

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// test your application ...

// reset to original viewport and user agent
await restore()
```

WebdriverIO underhåller en fast lista över [alla definierade enheter](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).