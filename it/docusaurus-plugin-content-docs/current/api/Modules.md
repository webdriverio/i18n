---
id: modules
title: Moduli
---

WebdriverIO pubblica vari moduli su NPM e altri registri che puoi utilizzare per costruire il tuo framework di automazione. Vedi ulteriore documentazione sui tipi di configurazione WebdriverIO [qui](/docs/setuptypes).

## `webdriver` e `devtools`

I pacchetti di protocollo ([`webdriver`](https://www.npmjs.com/package/webdriver) e [`devtools`](https://www.npmjs.com/package/devtools)) espongono una classe con le seguenti funzioni statiche allegate che ti consentono di avviare sessioni:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Avvia una nuova sessione con capacità specifiche. In base alla risposta della sessione, verranno forniti comandi da diversi protocolli.

##### Paramaters

- `options`: [Opzioni WebDriver](/docs/configuration#webdriver-options)
- `modifier`: funzione che consente di modificare l'istanza del client prima che venga restituita
- `userPrototype`: oggetto di proprietà che consente di estendere il prototipo dell'istanza
- `customCommandWrapper`: funzione che consente di avvolgere funzionalità attorno alle chiamate di funzione

##### Returns

- Oggetto [Browser](/docs/api/browser)

##### Example

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Si collega a una sessione WebDriver o DevTools in esecuzione.

##### Paramaters

- `attachInstance`: istanza a cui collegare una sessione o almeno un oggetto con una proprietà `sessionId` (ad esempio `{ sessionId: 'xxx' }`)
- `modifier`: funzione che consente di modificare l'istanza del client prima che venga restituita
- `userPrototype`: oggetto di proprietà che consente di estendere il prototipo dell'istanza
- `customCommandWrapper`: funzione che consente di avvolgere funzionalità attorno alle chiamate di funzione

##### Returns

- Oggetto [Browser](/docs/api/browser)

##### Example

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Ricarica una sessione data l'istanza fornita.

##### Paramaters

- `instance`: istanza del pacchetto da ricaricare

##### Example

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Analogamente ai pacchetti di protocollo (`webdriver` e `devtools`), puoi anche utilizzare le API del pacchetto WebdriverIO per gestire le sessioni. Le API possono essere importate utilizzando `import { remote, attach, multiremote } from 'webdriverio'` e contengono le seguenti funzionalità:

#### `remote(options, modifier)`

Avvia una sessione WebdriverIO. L'istanza contiene tutti i comandi come il pacchetto di protocollo ma con funzioni di ordine superiore aggiuntive, vedi [API docs](/docs/api).

##### Paramaters

- `options`: [Opzioni WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: funzione che consente di modificare l'istanza del client prima che venga restituita

##### Returns

- Oggetto [Browser](/docs/api/browser)

##### Example

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

Si collega a una sessione WebdriverIO in esecuzione.

##### Paramaters

- `attachOptions`: istanza a cui collegare una sessione o almeno un oggetto con una proprietà `sessionId` (ad esempio `{ sessionId: 'xxx' }`)

##### Returns

- Oggetto [Browser](/docs/api/browser)

##### Example

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

Avvia un'istanza multiremote che ti consente di controllare più sessioni all'interno di una singola istanza. Consulta i nostri [esempi multiremote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) per casi d'uso concreti.

##### Paramaters

- `multiremoteOptions`: un oggetto con chiavi che rappresentano il nome del browser e le loro [Opzioni WebdriverIO](/docs/configuration#webdriverio).

##### Returns

- Oggetto [Browser](/docs/api/browser)

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

Invece di chiamare il comando `wdio`, puoi anche includere il test runner come modulo ed eseguirlo in un ambiente arbitrario. Per questo, dovrai richiedere il pacchetto `@wdio/cli` come modulo, così:

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

Dopodiché, crea un'istanza del launcher ed esegui il test.

#### `Launcher(configPath, opts)`

Il costruttore della classe `Launcher` si aspetta l'URL al file di configurazione e un oggetto `opts` con impostazioni che sovrascriveranno quelle nella configurazione.

##### Paramaters

- `configPath`: percorso del `wdio.conf.js` da eseguire
- `opts`: argomenti ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) per sovrascrivere i valori dal file di configurazione

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

Il comando `run` restituisce una [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Viene risolta se i test sono stati eseguiti con successo o sono falliti, e viene rifiutata se il launcher non è stato in grado di avviare i test.

## `@wdio/browser-runner`

Quando esegui test unitari o di componenti utilizzando il [browser runner](/docs/runner#browser-runner) di WebdriverIO, puoi importare utilità di mock per i tuoi test, ad esempio:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Sono disponibili le seguenti esportazioni nominate:

#### `fn`

Funzione mock, vedi maggiori informazioni nella documentazione ufficiale di [Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Funzione spia, vedi maggiori informazioni nella documentazione ufficiale di [Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Metodo per simulare un file o un modulo di dipendenza.

##### Paramaters

- `moduleName`: un percorso relativo al file da simulare o un nome di modulo.
- `factory`: funzione per restituire il valore simulato (opzionale)

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

Rimuove il mock della dipendenza definito nella directory di mock manuale (`__mocks__`).

##### Paramaters

- `moduleName`: nome del modulo da demockare.

##### Example

```js
unmock('lodash')
```