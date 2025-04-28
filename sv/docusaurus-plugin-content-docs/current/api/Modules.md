---
id: modules
title: Moduler
---

WebdriverIO publicerar olika moduler till NPM och andra register som du kan använda för att bygga ditt eget automatiseringsramverk. Se mer dokumentation om WebdriverIO inställningstyper [här](/docs/setuptypes).

## `webdriver` och `devtools`

Protokollpaketen ([`webdriver`](https://www.npmjs.com/package/webdriver) och [`devtools`](https://www.npmjs.com/package/devtools)) exponerar en klass med följande statiska funktioner som låter dig starta sessioner:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Startar en ny session med specifika funktioner. Baserat på sessionssvaret kommer kommandon från olika protokoll att tillhandahållas.

##### Paramaters

- `options`: [WebDriver Options](/docs/configuration#webdriver-options)
- `modifier`: funktion som tillåter att modifiera klientinstansen innan den returneras
- `userPrototype`: egenskapsobjekt som tillåter att utöka instansprototypen
- `customCommandWrapper`: funktion som tillåter att packa funktionalitet runt funktionsanrop

##### Returns

- [Browser](/docs/api/browser) objekt

##### Example

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Ansluter till en pågående WebDriver eller DevTools-session.

##### Paramaters

- `attachInstance`: instans att ansluta en session till eller åtminstone ett objekt med en egenskap `sessionId` (t.ex. `{ sessionId: 'xxx' }`)
- `modifier`: funktion som tillåter att modifiera klientinstansen innan den returneras
- `userPrototype`: egenskapsobjekt som tillåter att utöka instansprototypen
- `customCommandWrapper`: funktion som tillåter att packa funktionalitet runt funktionsanrop

##### Returns

- [Browser](/docs/api/browser) objekt

##### Example

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Laddar om en session för given instans.

##### Paramaters

- `instance`: paketinstans att ladda om

##### Example

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Liknande som protokollpaketen (`webdriver` och `devtools`) kan du också använda WebdriverIO-paketets API:er för att hantera sessioner. API:erna kan importeras med `import { remote, attach, multiremote } from 'webdriverio` och innehåller följande funktionalitet:

#### `remote(options, modifier)`

Startar en WebdriverIO-session. Instansen innehåller alla kommandon som protokollpaketet men med ytterligare högre ordningsfunktioner, se [API-dokumentation](/docs/api).

##### Paramaters

- `options`: [WebdriverIO Options](/docs/configuration#webdriverio)
- `modifier`: funktion som tillåter att modifiera klientinstansen innan den returneras

##### Returns

- [Browser](/docs/api/browser) objekt

##### Example

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

Ansluter till en pågående WebdriverIO-session.

##### Paramaters

- `attachOptions`: instans att ansluta en session till eller åtminstone ett objekt med en egenskap `sessionId` (t.ex. `{ sessionId: 'xxx' }`)

##### Returns

- [Browser](/docs/api/browser) objekt

##### Example

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

Initierar en multiremote-instans som låter dig kontrollera flera sessioner inom en enda instans. Kolla in våra [multiremote-exempel](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) för konkreta användningsfall.

##### Paramaters

- `multiremoteOptions`: ett objekt med nycklar som representerar webbläsarnamnet och deras [WebdriverIO Options](/docs/configuration#webdriverio).

##### Returns

- [Browser](/docs/api/browser) objekt

##### Example

```js
import { multiremote } from 'webdriverio'

const matrix = await multiremote({
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
// returns ['Google', 'JSON']
```

## `@wdio/cli`

Istället för att anropa `wdio`-kommandot kan du också inkludera testkörnaren som modul och köra den i en godtycklig miljö. För det behöver du kräva `@wdio/cli`-paketet som modul, så här:

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

Efter det, skapa en instans av startaren och kör testet.

#### `Launcher(configPath, opts)`

Konstruktorn för `Launcher`-klassen förväntar sig URL:en till konfigurationsfilen och ett `opts`-objekt med inställningar som kommer att skriva över dem i konfigurationen.

##### Paramaters

- `configPath`: sökväg till `wdio.conf.js` att köra
- `opts`: argument ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) för att skriva över värden från konfigurationsfilen

##### Example

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

Kommandot `run` returnerar ett [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Det löses om testerna kördes framgångsrikt eller misslyckades, och det avvisas om startaren inte kunde starta testerna.

## `@wdio/browser-runner`

När du kör enhets- eller komponenttester med WebdriverIOs [webbläsarkörning](/docs/runner#browser-runner) kan du importera mockverktyg för dina tester, t.ex.:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Följande namngivna exporter är tillgängliga:

#### `fn`

Mockfunktion, se mer i den officiella [Vitest-dokumentationen](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Spionefunktion, se mer i den officiella [Vitest-dokumentationen](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Metod för att mocka fil eller beroendemodell.

##### Paramaters

- `moduleName`: antingen en relativ sökväg till filen som ska mockats eller ett modulnamn.
- `factory`: funktion för att returnera det mockade värdet (valfritt)

##### Example

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

Avmocka beroende som definierats inom den manuella mock-katalogen (`__mocks__`).

##### Paramaters

- `moduleName`: namnet på modulen som ska avmockas.

##### Example

```js
unmock('lodash')
```