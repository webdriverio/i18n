---
id: modules
title: Moduler
---

WebdriverIO publicerar olika moduler till NPM och andra register som du kan använda för att bygga ditt eget automationsramverk. Se mer dokumentation om WebdriverIO-installationstyper [här](/docs/setuptypes).

## `webdriver` och `devtools`

Protokollpaketen ([`webdriver`](https://www.npmjs.com/package/webdriver) och [`devtools`](https://www.npmjs.com/package/devtools)) exponerar en klass med följande statiska funktioner som låter dig initiera sessioner:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Startar en ny session med specifika capabilities. Baserat på sessionssvaret tillhandahålls kommandon från olika protokoll.

##### Parametrar

- `options`: [WebDriver-alternativ](/docs/configuration#webdriver-options)
- `modifier`: funktion som gör det möjligt att modifiera klientinstansen innan den returneras
- `userPrototype`: egenskapsobjekt som gör det möjligt att utöka instansens prototyp
- `customCommandWrapper`: funktion som gör det möjligt att omsluta funktionsanrop med extra funktionalitet

##### Returnerar

- [Browser](/docs/api/browser)-objekt

##### Exempel

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Ansluter till en pågående WebDriver- eller DevTools-session.

##### Parametrar

- `attachInstance`: instans att ansluta en session till, eller åtminstone ett objekt med egenskapen `sessionId` (t.ex. `{ sessionId: 'xxx' }`)
- `modifier`: funktion som gör det möjligt att modifiera klientinstansen innan den returneras
- `userPrototype`: egenskapsobjekt som gör det möjligt att utöka instansens prototyp
- `customCommandWrapper`: funktion som gör det möjligt att omsluta funktionsanrop med extra funktionalitet

##### Returnerar

- [Browser](/docs/api/browser)-objekt

##### Exempel

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Laddar om en session utifrån den angivna instansen.

##### Parametrar

- `instance`: paketinstans som ska laddas om

##### Exempel

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

På liknande sätt som med protokollpaketen (`webdriver` och `devtools`) kan du också använda WebdriverIO-paketets API:er för att hantera sessioner. API:erna kan importeras med `import { remote, attach, multiRemote } from 'webdriverio` och innehåller följande funktionalitet:

#### `remote(options, modifier)`

Startar en WebdriverIO-session. Instansen innehåller alla kommandon som protokollpaketet, men med ytterligare högre ordningens funktioner, se [API-dokumentationen](/docs/api).

##### Parametrar

- `options`: [WebdriverIO-alternativ](/docs/configuration#webdriverio)
- `modifier`: funktion som gör det möjligt att modifiera klientinstansen innan den returneras

##### Returnerar

- [Browser](/docs/api/browser)-objekt

##### Exempel

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

Ansluter till en pågående WebdriverIO-session.

##### Parametrar

- `attachOptions`: instans att ansluta en session till, eller åtminstone ett objekt med egenskapen `sessionId` (t.ex. `{ sessionId: 'xxx' }`)

##### Returnerar

- [Browser](/docs/api/browser)-objekt

##### Exempel

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiRemote(multiRemoteOptions)`

Initierar en multi-remote-instans som låter dig styra flera sessioner inom en enda instans. Kolla in våra [multi-remote-exempel](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) för konkreta användningsfall.

##### Parametrar

- `multiRemoteOptions`: ett objekt med nycklar som representerar webbläsarnamnet och deras [WebdriverIO-alternativ](/docs/configuration#webdriverio).

##### Returnerar

- [Browser](/docs/api/browser)-objekt

##### Exempel

```js
import { multiRemote } from 'webdriverio'

const matrix = await multiRemote({
    myChromeBrowser: {
        capabilities: { browserName: 'chrome' }
    },
    myFirefoxBrowser: {
        capabilities: { browserName: 'firefox' }
    }
})
await matrix.url('http://json.org')
await matrix.getInstance('browserA').url('https://google.com')

console.log(await matrix.getTitle())
// returnerar ['Google', 'JSON']
```

#### `Key`

Ett objekt som innehåller konstanter för specialtecken att använda med kommandot [`browser.keys`](/docs/api/browser/keys). Dessa konstanter representerar specialtangenter som kan skickas till webbläsaren, såsom `Enter`, `Tab`, `Escape`, piltangenter, funktionstangenter med mera.

##### Exempel

```js
import { Key } from 'webdriverio'

// Tryck på Enter-tangenten
await browser.keys(Key.Enter)

// Använd Ctrl+A för att markera allt (fungerar plattformsoberoende)
await browser.keys([Key.Ctrl, 'a'])

// Navigera med piltangenter
await browser.keys([Key.ArrowDown, Key.ArrowDown, Key.Enter])
```

##### Tillgängliga tangenter

Följande specialtangenter är tillgängliga via `Key`-objektet:

**Modifieringstangenter:**

| Konstant | Beskrivning |
|----------|-------------|
| `Key.Ctrl` | Plattformsoberoende kontrolltangent (Command på Mac, Control på Windows/Linux) |
| `Key.Control` | Control-tangent |
| `Key.Shift` | Shift-tangent |
| `Key.Alt` | Alt-tangent |
| `Key.Command` | Command-tangent (Mac) |
| `Key.NULL` | Null-/släpptangent — släpper alla modifieringstangenter som för närvarande hålls nere |

**Navigeringstangenter:**

| Konstant | Beskrivning |
|----------|-------------|
| `Key.Cancel` | Cancel-tangent |
| `Key.Help` | Help-tangent |
| `Key.Backspace` | Backsteg-tangent |
| `Key.Tab` | Tab-tangent |
| `Key.Clear` | Clear-tangent |
| `Key.Return` | Return-tangent |
| `Key.Enter` | Enter-tangent |
| `Key.Pause` | Pause-tangent |
| `Key.Escape` | Escape-tangent |
| `Key.Space` | Mellanslagstangent |
| `Key.PageUp` | Page Up-tangent |
| `Key.PageDown` | Page Down-tangent |
| `Key.End` | End-tangent |
| `Key.Home` | Home-tangent |
| `Key.ArrowLeft` | Vänsterpil |
| `Key.ArrowUp` | Uppåtpil |
| `Key.ArrowRight` | Högerpil |
| `Key.ArrowDown` | Nedåtpil |
| `Key.Insert` | Insert-tangent |
| `Key.Delete` | Delete-tangent |

**Teckentangenter:**

| Konstant | Beskrivning |
|----------|-------------|
| `Key.Semicolon` | Semikolontangent |
| `Key.Equals` | Likhetstecken-tangent |

**Numeriska tangenter:**

| Konstant | Beskrivning |
|----------|-------------|
| `Key.Numpad0` - `Key.Numpad9` | Numeriskt tangentbord 0-9 |
| `Key.Multiply` | Numeriskt tangentbord multiplikation |
| `Key.Add` | Numeriskt tangentbord addition |
| `Key.Separator` | Numeriskt tangentbord avgränsare |
| `Key.Subtract` | Numeriskt tangentbord subtraktion |
| `Key.Decimal` | Numeriskt tangentbord decimal |
| `Key.Divide` | Numeriskt tangentbord division |

**Funktionstangenter:**

| Konstant | Beskrivning |
|----------|-------------|
| `Key.F1` - `Key.F12` | Funktionstangenterna F1 till F12 |

**Övriga tangenter:**

| Konstant | Beskrivning |
|----------|-------------|
| `Key.ZenkakuHankaku` | Zenkaku/Hankaku-tangent (japanska) |

:::info Plattformsoberoende modifieringstangenter

Konstanten `Key.Ctrl` erbjuder ett smidigt sätt att använda "control"-modifieraren på olika operativsystem. På macOS mappas den till `Command`-tangenten, medan den på Windows och Linux mappas till `Control`-tangenten. Detta är användbart när du skriver tester som behöver fungera på flera plattformar, t.ex. för att markera allt (`Ctrl+A`), kopiera (`Ctrl+C`) eller klistra in (`Ctrl+V`).

:::

## `@wdio/cli`

Istället för att anropa kommandot `wdio` kan du också inkludera testkörningen som en modul och köra den i en godtycklig miljö. För att göra det behöver du importera paketet `@wdio/cli` som en modul, så här:

<Tabs
  defaultValue="esm"
  values={[
    {label: 'EcmaScript Modules', value: 'esm'},
    {label: 'CommonJS', value: 'cjs'}
  ]
}>
<TabItem value="esm">

```js
import Launcher from '@wdio/cli'
```

</TabItem>
<TabItem value="cjs">

```js
const Launcher = require('@wdio/cli').default
```

</TabItem>
</Tabs>

Skapa därefter en instans av launchern och kör testet.

#### `Launcher(configPath, opts)`

Konstruktorn för klassen `Launcher` förväntar sig URL:en till konfigurationsfilen och ett `opts`-objekt med inställningar som skriver över de i konfigurationen.

##### Parametrar

- `configPath`: sökväg till `wdio.conf.js` som ska köras
- `opts`: argument ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) för att skriva över värden från konfigurationsfilen

##### Exempel

```js
const wdio = new Launcher(
    '/path/to/my/wdio.conf.js',
    { spec: '/path/to/a/single/spec.e2e.js' }
)

wdio.run().then((exitCode) => {
    process.exit(exitCode)
}, (error) => {
    console.error('Launcher failed to start the test', error.stacktrace)
    process.exit(1)
})
```

Kommandot `run` returnerar ett [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Det uppfylls (resolved) om testerna kördes, oavsett om de lyckades eller misslyckades, och det avvisas (rejected) om launchern inte kunde starta testerna.

## `@wdio/browser-runner`

När du kör enhets- eller komponenttester med WebdriverIO:s [browser runner](/docs/runner#browser-runner) kan du importera mockningsverktyg för dina tester, t.ex.:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Följande namngivna exporter är tillgängliga:

#### `fn`

Mock-funktion, läs mer i den officiella [Vitest-dokumentationen](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Spionfunktion, läs mer i den officiella [Vitest-dokumentationen](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Metod för att mocka en fil eller en beroendemodul.

##### Parametrar

- `moduleName`: antingen en relativ sökväg till filen som ska mockas eller ett modulnamn.
- `factory`: funktion som returnerar det mockade värdet (valfri)

##### Exempel

```js
mock('../src/constants.ts', () => ({
    SOME_DEFAULT: 'mocked out'
}))

mock('lodash', (origModuleFactory) => {
    const origModule = await origModuleFactory()
    return {
        ...origModule,
        pick: fn()
    }
})
```

#### `unmock`

Tar bort mockningen av ett beroende som är definierat i katalogen för manuella mockar (`__mocks__`).

##### Parametrar

- `moduleName`: namnet på modulen vars mockning ska tas bort.

##### Exempel

```js
unmock('lodash')
```