---
id: emulation
title: Emulazione
---

Con WebdriverIO puoi emulare le API Web utilizzando il comando [`emulate`](/docs/api/browser/emulate) per restituire valori personalizzati che ti aiutano a emulare determinati comportamenti del browser. Nota che questo richiede che la tua applicazione utilizzi esplicitamente queste API.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Questa funzionalità richiede il supporto di WebDriver Bidi per il browser. Mentre le versioni recenti di Chrome, Edge e Firefox hanno tale supporto, Safari __non lo ha__. Per gli aggiornamenti, segui [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned). Inoltre, se usi un fornitore cloud per la generazione di browser, assicurati che il tuo fornitore supporti anche WebDriver Bidi.

Per abilitare WebDriver Bidi per il tuo test, assicurati di avere `webSocketUrl: true` impostato nelle tue capabilities.

:::

## Geolocalizzazione

Cambia la geolocalizzazione del browser in un'area specifica, ad esempio:

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

Questo modificherà il funzionamento di [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) restituendo la posizione fornita da te.

## Schema Colori

Cambia la configurazione dello schema colori predefinito del browser tramite:

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

Questo modificherà il comportamento di [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) quando si interroga lo schema colori tramite `(prefers-color-scheme: dark)`.

## User Agent

Cambia lo user agent del browser in una stringa diversa tramite:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Questo cambierà il valore di [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent). Nota che i produttori di browser stanno progressivamente deprecando lo User Agent.

## Proprietà onLine

Cambia lo stato online del browser tramite:

```ts
await browser.emulate('onLine', false)
```

Questo __non__ disattiva il traffico di rete tra il browser e internet, ma cambia solo il valore di ritorno di [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine). Se sei interessato a modificare le capacità di rete del browser, consulta il comando [`throttleNetwork`](/docs/api/browser/throttleNetwork).

## Orologio

Puoi modificare l'orologio di sistema del browser utilizzando il comando [`emulate`](/docs/emulation). Sovrascrive le funzioni globali native relative al tempo permettendo di controllarle in modo sincrono tramite `clock.tick()` o l'oggetto clock ottenuto. Questo include il controllo di:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

L'orologio inizia dall'epoca unix (timestamp 0). Questo significa che quando istanzi un nuovo oggetto Date nella tua applicazione, avrà come orario il 1° gennaio 1970 se non passi altre opzioni al comando `emulate`.

##### Esempio

Quando chiami `browser.emulate('clock', { ... })` sovrascriverà immediatamente le funzioni globali per la pagina corrente e tutte le pagine successive, ad esempio:

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

Puoi modificare l'ora di sistema chiamando [`setSystemTime`](/docs/api/clock/setSystemTime) o [`tick`](/docs/api/clock/tick).

L'oggetto `FakeTimerInstallOpts` può avere le seguenti proprietà:

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

## Dispositivo

Il comando `emulate` supporta anche l'emulazione di un determinato dispositivo mobile o desktop modificando il viewport, il fattore di scala del dispositivo e lo user agent. Questo non dovrebbe, in nessun modo, essere utilizzato per i test mobili poiché i motori dei browser desktop differiscono da quelli mobili. Questo dovrebbe essere utilizzato solo se la tua applicazione offre un comportamento specifico per viewport di dimensioni più piccole.

Ad esempio, per passare allo user agent e al viewport di un iPhone 15, esegui semplicemente:

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// test your application ...

// reset to original viewport and user agent
await restore()
```

WebdriverIO mantiene un elenco fisso di [tutti i dispositivi definiti](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).