---
id: emulation
title: Emulering
description: "Emulera geolokalisering, mediefunktioner, användaragent, nätverk, språkinställning, tidszon, skärm och enheter med kommandot emulate."
---

Med WebdriverIO kan du emulera webbläsarbeteende med kommandot [`emulate`](/docs/api/browser/emulate). Kommandot styr [WebDriver BiDi-emuleringsmodulen](https://w3c.github.io/webdriver-bidi/#module-emulation) för den aktuella webbläsarkontexten på toppnivå. Åsidosättningen gäller omedelbart. Du behöver inte ladda om sidan. `clock` är undantaget: BiDi har inget klockkommando, så det omfånget installerar fortfarande falska timers.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Den här funktionen kräver stöd för WebDriver Bidi i webbläsaren. Medan nyare versioner av Chrome, Edge och Firefox har sådant stöd, har Safari __inte__ det. För uppdateringar, följ [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/emulation?label=experimental&label=master&aligned). Om du dessutom använder en molnleverantör för att starta webbläsare, se till att din leverantör också stöder WebDriver Bidi.

För att aktivera WebDriver Bidi för ditt test, se till att ha `webSocketUrl: true` angivet i dina capabilities.

En webbläsare som inte implementerar ett kommando avvisar anropet med sitt eget fel, `unknown command` eller `unsupported operation`. WebdriverIO returnerar det felet. Den faller inte tillbaka på ett förladdningsskript eller på CDP.

:::

`emulate` returnerar en funktion som rensar det omfånget. [`browser.restore()`](/docs/api/browser/restore) rensar alla aktiva omfång, eller de omfång du anger.

## Geolokalisering

Ändra webbläsarens geolokalisering till ett specifikt område, t.ex.:

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
console.log(await browser.getUrl()) // outputs: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

Detta använder webbläsarens geolokaliseringsstack, inklusive `getCurrentPosition` och `watchPosition`. En sida kan fortfarande behöva att geolokaliseringsbehörigheten beviljas, som i exemplet. Valfria fält är `accuracy`, `altitude`, `altitudeAccuracy`, `heading` och `speed`.

För att få sidan att misslyckas med att läsa en position:

```ts
await browser.emulate('geolocation', { error: 'positionUnavailable' })
```

## Färgschema och andra mediefunktioner

Ändra mediefunktionen `prefers-color-scheme`:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
const backgroundColorDark = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColorDark.parsed.hex) // outputs: "#000000"
```

Detta uppdaterar CSS `@media (prefers-color-scheme)` samt [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia). Ingen omladdning krävs.

`media` anger resten av mediefunktionskartan, till exempel reducerad rörelse:

```ts
await browser.emulate('media', { prefersReducedMotion: 'reduce', hover: 'none' })
```

`colorScheme` och `media` delar en karta. BiDi-kommandot ersätter hela kartan, så det senare anropet vinner. Att återställa något av omfången rensar kartan.

`forcedColors` är ett annat kommando. Det anger temat för tvingade färger (`'light'` eller `'dark'`), inte mediefunktionen `forced-colors`. Den mediefunktionen ligger kvar på `media` som `forcedColors: 'none' | 'active'`.

## Användaragent

Ändra webbläsarens användaragent via:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Detta är webbläsarens åsidosättning av användaragenten. Det är inte en patchad `navigator.userAgent`-egenskap. Webbläsarleverantörer fasar successivt ut användaragenten.

## Onlinestatus

Ta webbläsarkontexten offline:

```ts
await browser.emulate('onLine', false)
```

`false` skickar `emulation.setNetworkConditions` med `{ type: 'offline' }`. Fetch, WebSocket och WebTransport misslyckas, och [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) följer efter. `true`, samt att återställa omfånget, rensar villkoret. Genomströmning och latens hanteras fortfarande av [`throttleNetwork`](/docs/api/browser/throttleNetwork). BiDi-nätverksvillkor stöder endast offline.

## Språkinställning, tidszon och touch

```ts
await browser.emulate('locale', 'fr-FR')
await browser.emulate('timezone', 'Pacific/Honolulu')
await browser.emulate('touch', 1)
```

`locale` är en BCP 47-tagg. `timezone` är ett IANA-namn eller en förskjutning som `+02:00`. `touch` är `maxTouchPoints` och måste vara ett heltal `>= 1`. Att återställa `touch` rensar åsidosättningen. Det kan inte sättas till `0`.

## Skärm, orientering och layout

```ts
await browser.emulate('screen', { width: 390, height: 844 })
await browser.emulate('orientation', { natural: 'portrait', type: 'portrait-primary' })
await browser.emulate('viewportMeta', true)
await browser.emulate('textLayout', 'mobile')
await browser.emulate('scrollbar', 'overlay')
await browser.emulate('scripting', false)
```

`screen` är den skärmyta som exponeras för webben, inte visningsområdet (viewport). `orientation.natural` är `'portrait'` eller `'landscape'`. `orientation.type` är `'portrait-primary'`, `'portrait-secondary'`, `'landscape-primary'` eller `'landscape-secondary'`.

`viewportMeta` accepterar endast `true`. Specifikationens värde är `true | null`, så det finns inget `false`. Återställning rensar det. `textLayout` accepterar endast `'mobile'`. `scripting` kan endast inaktiveras. Specifikationen kan inte tvinga på skriptkörning. `scrollbar` är `'classic'` eller `'overlay'`.

## Klocka

Du kan modifiera webbläsarens systemklocka med kommandot [`emulate`](/docs/emulation). Det åsidosätter inbyggda globala funktioner relaterade till tid, vilket gör att de kan styras synkront via `clock.tick()` eller det returnerade klockobjektet. Detta inkluderar kontroll av:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

Klockan startar vid unix-epoken (tidsstämpel 0). Det betyder att när du instansierar ett nytt Date i din applikation kommer det att ha tiden 1 januari 1970 om du inte skickar några andra alternativ till kommandot `emulate`.

##### Exempel

När du anropar `browser.emulate('clock', { ... })` skriver det omedelbart över de globala funktionerna för den aktuella sidan samt alla efterföljande sidor, t.ex.:

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

Du kan ändra systemtiden genom att anropa [`setSystemTime`](/docs/api/clock/setSystemTime) eller [`tick`](/docs/api/clock/tick).

Objektet `FakeTimerInstallOpts` kan ha följande egenskaper:

 ```ts
interface FakeTimerInstallOpts {
    // Installerar falska timers med den angivna unix-epoken
    // @default: 0
    now?: number | Date | undefined;

    // En array med namn på globala metoder och API:er som ska förfalskas. Som standard ersätter WebdriverIO
    // inte `nextTick()` och `queueMicrotask()`. Till exempel kommer
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` endast att förfalska
    // `setTimeout()` och `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // Det maximala antalet timers som körs när runAll() anropas (standard: 1000)
    loopLimit?: number | undefined;

    // Talar om för WebdriverIO att öka den mockade tiden automatiskt baserat på den verkliga
    // systemtidsförskjutningen (t.ex. ökas den mockade tiden med 20 ms för varje 20 ms förändring
    // i den verkliga systemtiden)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Relevant endast vid användning med shouldAdvanceTime: true. Ökar den mockade tiden med
    // advanceTimeDelta ms för varje advanceTimeDelta ms förändring i den verkliga systemtiden
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Talar om för FakeTimers att rensa 'inbyggda' (dvs. inte falska) timers genom att delegera till deras
    // respektive hanterare. Dessa rensas inte som standard, vilket kan leda till potentiellt
    // oväntat beteende om timers fanns innan FakeTimers installerades.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Enhet

Kommandot `emulate` stöder också emulering av en viss mobil- eller datorenhet. Detta bör inte på något sätt användas för mobiltestning, eftersom webbläsarmotorer för datorer skiljer sig från mobila. Detta bör endast användas om din applikation erbjuder ett specifikt beteende för mindre visningsområden.

För en enhet gör WebdriverIO följande:

- anger användaragenten från deskriptorn
- anger visningsområdet och enhetens skalfaktor
- sätter `maxTouchPoints` till `1` när deskriptorn har touch, och rensar touch annars
- anger mobil textlayout och viewport-metataggen när deskriptorn är mobil, och rensar dem annars

Det hittar inte på en skärmstorlek eller en orientering utifrån enhetsnamnet. Visningsområdet är inte `screen.width`. Använd omfången `screen` och `orientation` för dessa.

Ändringen av visningsområdet skickas till den toppnivåkontext som var aktuell när `emulate` anropades. Att återställa enheten ändrar storleken på den kontexten, även efter ett byte till ett annat fönster.

Om webbläsaren avvisar något av dessa kommandon återställs den tidigare användaragenten, visningsområdet, touch, textlayouten och viewport-metataggen, och felet returneras. En anpassad användaragent eller storlek från `setViewport` ersätts inte med ett standardvärde.

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// testa din applikation ...

// återställ användaragent, visningsområde, touch, textlayout och viewport-meta
await restore()
```

WebdriverIO underhåller en fast lista över [alla definierade enheter](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).