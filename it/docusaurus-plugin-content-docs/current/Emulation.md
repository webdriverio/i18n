---
id: emulation
title: Emulazione
description: "Emula geolocalizzazione, media feature, user agent, rete, impostazioni locali, fuso orario, schermo e dispositivi con il comando emulate."
---

Con WebdriverIO puoi emulare il comportamento del browser utilizzando il comando [`emulate`](/docs/api/browser/emulate). Il comando pilota il [modulo di emulazione di WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-emulation) per il contesto di navigazione di primo livello corrente. L'override viene applicato immediatamente. Non è necessario ricaricare la pagina. `clock` è l'eccezione: BiDi non dispone di un comando per l'orologio, quindi questo ambito continua a installare timer fittizi.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Questa funzionalità richiede il supporto di WebDriver Bidi da parte del browser. Mentre le versioni recenti di Chrome, Edge e Firefox offrono tale supporto, Safari __non lo offre__. Per aggiornamenti segui [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/emulation?label=experimental&label=master&aligned). Inoltre, se utilizzi un provider cloud per avviare i browser, assicurati che anche il tuo provider supporti WebDriver Bidi.

Per abilitare WebDriver Bidi nel tuo test, assicurati di avere impostato `webSocketUrl: true` nelle tue capabilities.

Un browser che non implementa un comando rifiuta la chiamata con un proprio errore, `unknown command` o `unsupported operation`. WebdriverIO restituisce tale errore. Non ricorre a uno script di preload né a CDP come alternativa.

:::

`emulate` restituisce una funzione che azzera quell'ambito. [`browser.restore()`](/docs/api/browser/restore) azzera tutti gli ambiti attivi, oppure gli ambiti che elenchi.

## Geolocation

Cambia la geolocalizzazione del browser in un'area specifica, ad esempio:

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

Questo utilizza lo stack di geolocalizzazione del browser, inclusi `getCurrentPosition` e `watchPosition`. Una pagina può comunque richiedere che venga concesso il permesso di geolocalizzazione, come nell'esempio. I campi opzionali sono `accuracy`, `altitude`, `altitudeAccuracy`, `heading` e `speed`.

Per far sì che la pagina non riesca a leggere una posizione:

```ts
await browser.emulate('geolocation', { error: 'positionUnavailable' })
```

## Color Scheme e altre media feature

Cambia la media feature `prefers-color-scheme`:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
const backgroundColorDark = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColorDark.parsed.hex) // outputs: "#000000"
```

Questo aggiorna la CSS `@media (prefers-color-scheme)` così come [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia). Non è necessario ricaricare la pagina.

`media` imposta il resto della mappa delle media feature, ad esempio il movimento ridotto:

```ts
await browser.emulate('media', { prefersReducedMotion: 'reduce', hover: 'none' })
```

`colorScheme` e `media` condividono un'unica mappa. Il comando BiDi sostituisce l'intera mappa, quindi prevale la chiamata successiva. Il ripristino di uno qualsiasi dei due ambiti azzera la mappa.

`forcedColors` è un comando diverso. Imposta il tema forced-colors (`'light'` o `'dark'`), non la media feature `forced-colors`. Quella media feature rimane su `media` come `forcedColors: 'none' | 'active'`.

## User Agent

Cambia lo user agent del browser tramite:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Questo è l'override dello user agent del browser. Non è una proprietà `navigator.userAgent` modificata. I produttori di browser stanno progressivamente deprecando lo User Agent.

## Stato online

Porta offline il contesto di navigazione:

```ts
await browser.emulate('onLine', false)
```

`false` invia `emulation.setNetworkConditions` con `{ type: 'offline' }`. Fetch, WebSocket e WebTransport falliscono, e [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) si adegua. `true`, così come il ripristino dell'ambito, azzera la condizione. Throughput e latenza restano su [`throttleNetwork`](/docs/api/browser/throttleNetwork). Le condizioni di rete BiDi supportano solo la modalità offline.

## Impostazioni locali, fuso orario e touch

```ts
await browser.emulate('locale', 'fr-FR')
await browser.emulate('timezone', 'Pacific/Honolulu')
await browser.emulate('touch', 1)
```

`locale` è un tag BCP 47. `timezone` è un nome IANA o un offset come `+02:00`. `touch` corrisponde a `maxTouchPoints` e deve essere un intero `>= 1`. Il ripristino di `touch` azzera l'override. Non è possibile impostare `0`.

## Schermo, orientamento e layout

```ts
await browser.emulate('screen', { width: 390, height: 844 })
await browser.emulate('orientation', { natural: 'portrait', type: 'portrait-primary' })
await browser.emulate('viewportMeta', true)
await browser.emulate('textLayout', 'mobile')
await browser.emulate('scrollbar', 'overlay')
await browser.emulate('scripting', false)
```

`screen` è l'area dello schermo esposta al web, non il viewport. `orientation.natural` è `'portrait'` o `'landscape'`. `orientation.type` è `'portrait-primary'`, `'portrait-secondary'`, `'landscape-primary'` o `'landscape-secondary'`.

`viewportMeta` accetta solo `true`. Il valore previsto dalla specifica è `true | null`, quindi non esiste `false`. Il ripristino lo azzera. `textLayout` accetta solo `'mobile'`. `scripting` può essere solo disabilitato. La specifica non consente di forzare l'abilitazione dello scripting. `scrollbar` è `'classic'` o `'overlay'`.

## Clock

Puoi modificare l'orologio di sistema del browser utilizzando il comando [`emulate`](/docs/emulation). Sovrascrive le funzioni globali native relative al tempo, consentendo di controllarle in modo sincrono tramite `clock.tick()` o l'oggetto clock restituito. Questo include il controllo di:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

L'orologio parte dall'epoca unix (timestamp 0). Ciò significa che quando istanzi un nuovo Date nella tua applicazione, avrà come data il 1° gennaio 1970 se non passi altre opzioni al comando `emulate`.

##### Esempio

Quando si chiama `browser.emulate('clock', { ... })`, le funzioni globali vengono sovrascritte immediatamente per la pagina corrente e per tutte le pagine successive, ad esempio:

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
    // Installa timer fittizi con l'epoca unix specificata
    // @default: 0
    now?: number | Date | undefined;

    // Un array con i nomi dei metodi globali e delle API da simulare. Per impostazione predefinita, WebdriverIO
    // non sostituisce `nextTick()` e `queueMicrotask()`. Ad esempio,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` simulerà solo
    // `setTimeout()` e `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // Il numero massimo di timer che verranno eseguiti chiamando runAll() (predefinito: 1000)
    loopLimit?: number | undefined;

    // Indica a WebdriverIO di incrementare automaticamente il tempo simulato in base allo
    // scorrere reale del tempo di sistema (ad es. il tempo simulato verrà incrementato di 20ms per ogni 20ms
    // di variazione del tempo di sistema reale)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Rilevante solo se usato con shouldAdvanceTime: true. Incrementa il tempo simulato di
    // advanceTimeDelta ms ogni advanceTimeDelta ms di variazione del tempo di sistema reale
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Indica a FakeTimers di azzerare i timer 'nativi' (cioè non fittizi) delegando ai
    // rispettivi handler. Questi non vengono azzerati per impostazione predefinita, il che può causare
    // comportamenti imprevisti se esistevano timer prima dell'installazione di FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Dispositivo

Il comando `emulate` supporta anche l'emulazione di un determinato dispositivo mobile o desktop. Questo non dovrebbe in alcun modo essere usato per il testing mobile, poiché i motori dei browser desktop differiscono da quelli mobile. Dovrebbe essere usato solo se la tua applicazione offre un comportamento specifico per dimensioni di viewport più piccole.

Per un dispositivo, WebdriverIO:

- imposta lo user agent dal descrittore
- imposta il viewport e il fattore di scala del dispositivo
- imposta `maxTouchPoints` a `1` quando il descrittore prevede il touch, altrimenti azzera il touch
- imposta il layout del testo mobile e il meta tag viewport quando il descrittore è mobile, altrimenti li azzera

Non ricava una dimensione dello schermo o un orientamento dal nome del dispositivo. Il viewport non è `screen.width`. Usa gli ambiti `screen` e `orientation` per questi.

La modifica del viewport viene inviata al contesto di primo livello che era quello corrente al momento della chiamata a `emulate`. Il ripristino del dispositivo ridimensiona quel contesto, anche dopo il passaggio a un'altra finestra.

Se il browser rifiuta uno di questi comandi, vengono ripristinati lo user agent, il viewport, il touch, il layout del testo e il meta viewport precedenti e viene restituito l'errore. Uno user agent personalizzato o una dimensione impostata con `setViewport` non vengono sostituiti con un valore predefinito.

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// testa la tua applicazione ...

// ripristina user agent, viewport, touch, layout del testo e meta viewport
await restore()
```

WebdriverIO mantiene un elenco fisso di [tutti i dispositivi definiti](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).