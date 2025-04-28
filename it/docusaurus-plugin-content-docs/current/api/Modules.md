---
id: modules
title: Moduli
---

WebdriverIO pubblica vari moduli su NPM e altri registri che puoi utilizzare per costruire il tuo framework di automazione. Vedi ulteriore documentazione sui tipi di configurazione WebdriverIO [qui](/docs/setuptypes).

## `webdriver` e `devtools`

I pacchetti di protocollo ([`webdriver`](https://www.npmjs.com/package/webdriver) e [`devtools`](https://www.npmjs.com/package/devtools)) espongono una classe con le seguenti funzioni statiche che ti permettono di iniziare le sessioni:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Avvia una nuova sessione con capacità specifiche. In base alla risposta della sessione, verranno forniti comandi da diversi protocolli.

##### Parametri

- `options`: [Opzioni WebDriver](/docs/configuration#webdriver-options)
- `modifier`: funzione che permette di modificare l'istanza del client prima che venga restituita
- `userPrototype`: oggetto di proprietà che permette di estendere il prototipo dell'istanza
- `customCommandWrapper`: funzione che permette di avvolgere funzionalità intorno alle chiamate di funzione

##### Restituisce

- Oggetto [Browser](/docs/api/browser)

##### Esempio

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Si collega a una sessione WebDriver o DevTools in esecuzione.

##### Parametri

- `attachInstance`: istanza a cui collegare una sessione o almeno un oggetto con una proprietà `sessionId` (es. `{ sessionId: 'xxx' }`)
- `modifier`: funzione che permette di modificare l'istanza del client prima che venga restituita
- `userPrototype`: oggetto di proprietà che permette di estendere il prototipo dell'istanza
- `customCommandWrapper`: funzione che permette di avvolgere funzionalità intorno alle chiamate di funzione

##### Restituisce

- Oggetto [Browser](/docs/api/browser)

##### Esempio

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Ricarica una sessione data l'istanza fornita.

##### Parametri

- `instance`: istanza del pacchetto da ricaricare

##### Esempio

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Similmente ai pacchetti di protocollo (`webdriver` e `devtools`), puoi anche utilizzare le API del pacchetto WebdriverIO per gestire le sessioni. Le API possono essere importate usando `import { remote, attach, multiremote } from 'webdriverio'` e contengono le seguenti funzionalità:

#### `remote(options, modifier)`

Avvia una sessione WebdriverIO. L'istanza contiene tutti i comandi come il pacchetto di protocollo ma con funzioni di ordine superiore aggiuntive, vedi [documentazione API](/docs/api).

##### Parametri

- `options`: [Opzioni WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: funzione che permette di modificare l'istanza del client prima che venga restituita

##### Restituisce

- Oggetto [Browser](/docs/api/browser)

##### Esempio

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

Si collega a una sessione WebdriverIO in esecuzione.

##### Parametri

- `attachOptions`: istanza a cui collegare una sessione o almeno un oggetto con una proprietà `sessionId` (es. `{ sessionId: 'xxx' }`)

##### Restituisce

- Oggetto [Browser](/docs/api/browser)

##### Esempio

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

Inizia un'istanza multiremote che ti permette di controllare più sessioni all'interno di un'unica istanza. Dai un'occhiata ai nostri [esempi multiremote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) per casi d'uso concreti.

##### Parametri

- `multiremoteOptions`: un oggetto con chiavi che rappresentano il nome del browser e le loro [Opzioni WebdriverIO](/docs/configuration#webdriverio).

##### Restituisce

- Oggetto [Browser](/docs/api/browser)

##### Esempio

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

Dopo di che, crea un'istanza del launcher ed esegui il test.

#### `Launcher(configPath, opts)`

Il costruttore della classe `Launcher` si aspetta l'URL del file di configurazione e un oggetto `opts` con impostazioni che sovrascriveranno quelle nella configurazione.

##### Parametri

- `configPath`: percorso al file `wdio.conf.js` da eseguire
- `opts`: argomenti ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) per sovrascrivere i valori dal file di configurazione

##### Esempio

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

Il comando `run` restituisce una [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Viene risolta se i test sono stati eseguiti con successo o falliti, e viene rifiutata se il launcher non è stato in grado di iniziare l'esecuzione dei test.

## `@wdio/browser-runner`

Quando esegui test unitari o di componenti utilizzando il [browser runner](/docs/runner#browser-runner) di WebdriverIO, puoi importare utilità di mock per i tuoi test, ad esempio:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Sono disponibili le seguenti esportazioni denominate:

#### `fn`

Funzione mock, vedi di più nella documentazione ufficiale di [Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Funzione spia, vedi di più nella documentazione ufficiale di [Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Metodo per simulare un file o un modulo di dipendenza.

##### Parametri

- `moduleName`: un percorso relativo al file da simulare o un nome di modulo.
- `factory`: funzione per restituire il valore simulato (opzionale)

##### Esempio

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

Rimuove il mock di una dipendenza definita all'interno della directory di mock manuale (`__mocks__`).

##### Parametri

- `moduleName`: nome del modulo da cui rimuovere il mock.

##### Esempio

```js
unmock('lodash')
```