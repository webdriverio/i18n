---
id: modules
title: Moduli
---

WebdriverIO pubblica vari moduli su NPM e altri registri che puoi utilizzare per costruire il tuo framework di automazione. Consulta ulteriore documentazione sui tipi di configurazione di WebdriverIO [qui](/docs/setuptypes).

## `webdriver` e `devtools`

I pacchetti di protocollo ([`webdriver`](https://www.npmjs.com/package/webdriver) e [`devtools`](https://www.npmjs.com/package/devtools)) espongono una classe con le seguenti funzioni statiche che consentono di avviare sessioni:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Avvia una nuova sessione con capabilities specifiche. In base alla risposta della sessione, verranno forniti i comandi dei diversi protocolli.

##### Parametri

- `options`: [Opzioni WebDriver](/docs/configuration#webdriver-options)
- `modifier`: funzione che consente di modificare l'istanza del client prima che venga restituita
- `userPrototype`: oggetto di proprietà che consente di estendere il prototipo dell'istanza
- `customCommandWrapper`: funzione che consente di avvolgere funzionalità attorno alle chiamate di funzione

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

- `attachInstance`: istanza a cui collegare una sessione o almeno un oggetto con una proprietà `sessionId` (ad es. `{ sessionId: 'xxx' }`)
- `modifier`: funzione che consente di modificare l'istanza del client prima che venga restituita
- `userPrototype`: oggetto di proprietà che consente di estendere il prototipo dell'istanza
- `customCommandWrapper`: funzione che consente di avvolgere funzionalità attorno alle chiamate di funzione

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

Analogamente ai pacchetti di protocollo (`webdriver` e `devtools`), puoi anche utilizzare le API del pacchetto WebdriverIO per gestire le sessioni. Le API possono essere importate usando `import { remote, attach, multiRemote } from 'webdriverio` e contengono le seguenti funzionalità:

#### `remote(options, modifier)`

Avvia una sessione WebdriverIO. L'istanza contiene tutti i comandi del pacchetto di protocollo, ma con funzioni aggiuntive di ordine superiore, vedi la [documentazione API](/docs/api).

##### Parametri

- `options`: [Opzioni WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: funzione che consente di modificare l'istanza del client prima che venga restituita

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

- `attachOptions`: istanza a cui collegare una sessione o almeno un oggetto con una proprietà `sessionId` (ad es. `{ sessionId: 'xxx' }`)

##### Restituisce

- Oggetto [Browser](/docs/api/browser)

##### Esempio

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiRemote(multiRemoteOptions)`

Avvia un'istanza multi-remote che consente di controllare più sessioni all'interno di una singola istanza. Consulta i nostri [esempi multi-remote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) per casi d'uso concreti.

##### Parametri

- `multiRemoteOptions`: un oggetto con chiavi che rappresentano il nome del browser e le relative [Opzioni WebdriverIO](/docs/configuration#webdriverio).

##### Restituisce

- Oggetto [Browser](/docs/api/browser)

##### Esempio

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
// restituisce ['Google', 'JSON']
```

#### `Key`

Un oggetto contenente costanti di caratteri speciali da utilizzare con il comando [`browser.keys`](/docs/api/browser/keys). Queste costanti rappresentano tasti speciali che possono essere inviati al browser, come `Enter`, `Tab`, `Escape`, tasti freccia, tasti funzione e altro ancora.

##### Esempio

```js
import { Key } from 'webdriverio'

// Premi il tasto Invio
await browser.keys(Key.Enter)

// Usa Ctrl+A per selezionare tutto (funziona su tutte le piattaforme)
await browser.keys([Key.Ctrl, 'a'])

// Naviga con i tasti freccia
await browser.keys([Key.ArrowDown, Key.ArrowDown, Key.Enter])
```

##### Tasti disponibili

I seguenti tasti speciali sono disponibili tramite l'oggetto `Key`:

**Tasti modificatori:**

| Costante | Descrizione |
|----------|-------------|
| `Key.Ctrl` | Tasto control multipiattaforma (Command su Mac, Control su Windows/Linux) |
| `Key.Control` | Tasto Control |
| `Key.Shift` | Tasto Shift |
| `Key.Alt` | Tasto Alt |
| `Key.Command` | Tasto Command (Mac) |
| `Key.NULL` | Tasto Null/rilascio — rilascia tutti i tasti modificatori attualmente premuti |

**Tasti di navigazione:**

| Costante | Descrizione |
|----------|-------------|
| `Key.Cancel` | Tasto Cancel |
| `Key.Help` | Tasto Help |
| `Key.Backspace` | Tasto Backspace |
| `Key.Tab` | Tasto Tab |
| `Key.Clear` | Tasto Clear |
| `Key.Return` | Tasto Return |
| `Key.Enter` | Tasto Invio |
| `Key.Pause` | Tasto Pausa |
| `Key.Escape` | Tasto Esc |
| `Key.Space` | Tasto Spazio |
| `Key.PageUp` | Tasto Pagina su |
| `Key.PageDown` | Tasto Pagina giù |
| `Key.End` | Tasto Fine |
| `Key.Home` | Tasto Home |
| `Key.ArrowLeft` | Tasto freccia sinistra |
| `Key.ArrowUp` | Tasto freccia su |
| `Key.ArrowRight` | Tasto freccia destra |
| `Key.ArrowDown` | Tasto freccia giù |
| `Key.Insert` | Tasto Ins |
| `Key.Delete` | Tasto Canc |

**Tasti carattere:**

| Costante | Descrizione |
|----------|-------------|
| `Key.Semicolon` | Tasto punto e virgola |
| `Key.Equals` | Tasto uguale |

**Tasti del tastierino numerico:**

| Costante | Descrizione |
|----------|-------------|
| `Key.Numpad0` - `Key.Numpad9` | Tastierino numerico 0-9 |
| `Key.Multiply` | Moltiplicazione del tastierino numerico |
| `Key.Add` | Addizione del tastierino numerico |
| `Key.Separator` | Separatore del tastierino numerico |
| `Key.Subtract` | Sottrazione del tastierino numerico |
| `Key.Decimal` | Decimale del tastierino numerico |
| `Key.Divide` | Divisione del tastierino numerico |

**Tasti funzione:**

| Costante | Descrizione |
|----------|-------------|
| `Key.F1` - `Key.F12` | Tasti funzione da F1 a F12 |

**Altri tasti:**

| Costante | Descrizione |
|----------|-------------|
| `Key.ZenkakuHankaku` | Tasto Zenkaku/Hankaku (giapponese) |

:::info Tasti modificatori multipiattaforma

La costante `Key.Ctrl` offre un modo pratico per utilizzare il modificatore "control" su diversi sistemi operativi. Su macOS corrisponde al tasto `Command`, mentre su Windows e Linux corrisponde al tasto `Control`. Questo è utile quando si scrivono test che devono funzionare su più piattaforme, ad esempio per le operazioni di seleziona tutto (`Ctrl+A`), copia (`Ctrl+C`) o incolla (`Ctrl+V`).

:::

## `@wdio/cli`

Invece di chiamare il comando `wdio`, puoi anche includere il test runner come modulo ed eseguirlo in un ambiente arbitrario. Per farlo, dovrai richiedere il pacchetto `@wdio/cli` come modulo, in questo modo:

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

Il costruttore della classe `Launcher` si aspetta l'URL del file di configurazione e un oggetto `opts` con impostazioni che sovrascriveranno quelle presenti nella configurazione.

##### Parametri

- `configPath`: percorso del file `wdio.conf.js` da eseguire
- `opts`: argomenti ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) per sovrascrivere i valori del file di configurazione

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

Il comando `run` restituisce una [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Viene risolta se i test sono stati eseguiti con successo o sono falliti, e viene rifiutata se il launcher non è stato in grado di avviare l'esecuzione dei test.

## `@wdio/browser-runner`

Quando esegui test unitari o di componenti utilizzando il [browser runner](/docs/runner#browser-runner) di WebdriverIO, puoi importare utility di mocking per i tuoi test, ad es.:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Sono disponibili i seguenti export con nome:

#### `fn`

Funzione mock, vedi di più nella [documentazione ufficiale di Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Funzione spy, vedi di più nella [documentazione ufficiale di Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Metodo per effettuare il mock di un file o di un modulo di dipendenza.

##### Parametri

- `moduleName`: un percorso relativo al file di cui effettuare il mock oppure il nome di un modulo.
- `factory`: funzione che restituisce il valore mockato (opzionale)

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

Rimuove il mock di una dipendenza definita all'interno della directory dei mock manuali (`__mocks__`).

##### Parametri

- `moduleName`: nome del modulo di cui rimuovere il mock.

##### Esempio

```js
unmock('lodash')
```