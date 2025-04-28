---
id: modules
title: Moduły
---

WebdriverIO publikuje różne moduły na NPM i innych rejestrach, których możesz użyć do zbudowania własnego frameworka automatyzacji. Zobacz więcej dokumentacji na temat typów konfiguracji WebdriverIO [tutaj](/docs/setuptypes).

## `webdriver` i `devtools`

Pakiety protokołów ([`webdriver`](https://www.npmjs.com/package/webdriver) i [`devtools`](https://www.npmjs.com/package/devtools)) udostępniają klasę z następującymi funkcjami statycznymi, które pozwalają inicjować sesje:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Rozpoczyna nową sesję z określonymi możliwościami. Na podstawie odpowiedzi sesji, zostaną udostępnione komendy z różnych protokołów.

##### Paramaters

- `options`: [WebDriver Options](/docs/configuration#webdriver-options)
- `modifier`: funkcja, która pozwala modyfikować instancję klienta przed jej zwróceniem
- `userPrototype`: obiekt właściwości, który pozwala rozszerzyć prototyp instancji
- `customCommandWrapper`: funkcja, która pozwala opakować funkcjonalność wokół wywołań funkcji

##### Returns

- Obiekt [Browser](/docs/api/browser)

##### Example

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Dołącza do działającej sesji WebDriver lub DevTools.

##### Paramaters

- `attachInstance`: instancja do dołączenia do sesji lub co najmniej obiekt z właściwością `sessionId` (np. `{ sessionId: 'xxx' }`)
- `modifier`: funkcja, która pozwala modyfikować instancję klienta przed jej zwróceniem
- `userPrototype`: obiekt właściwości, który pozwala rozszerzyć prototyp instancji
- `customCommandWrapper`: funkcja, która pozwala opakować funkcjonalność wokół wywołań funkcji

##### Returns

- Obiekt [Browser](/docs/api/browser)

##### Example

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Przeładowuje sesję na podstawie dostarczonej instancji.

##### Paramaters

- `instance`: instancja pakietu do przeładowania

##### Example

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Podobnie jak w przypadku pakietów protokołów (`webdriver` i `devtools`), możesz również używać API pakietu WebdriverIO do zarządzania sesjami. API można importować za pomocą `import { remote, attach, multiremote } from 'webdriverio'` i zawierają następujące funkcje:

#### `remote(options, modifier)`

Rozpoczyna sesję WebdriverIO. Instancja zawiera wszystkie komendy z pakietu protokołu, ale z dodatkowymi funkcjami wyższego rzędu, zobacz [API docs](/docs/api).

##### Paramaters

- `options`: [WebdriverIO Options](/docs/configuration#webdriverio)
- `modifier`: funkcja, która pozwala modyfikować instancję klienta przed jej zwróceniem

##### Returns

- Obiekt [Browser](/docs/api/browser)

##### Example

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

Dołącza do działającej sesji WebdriverIO.

##### Paramaters

- `attachOptions`: instancja do dołączenia do sesji lub co najmniej obiekt z właściwością `sessionId` (np. `{ sessionId: 'xxx' }`)

##### Returns

- Obiekt [Browser](/docs/api/browser)

##### Example

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

Inicjuje instancję multiremote, która pozwala kontrolować wiele sesji w jednej instancji. Sprawdź nasze [przykłady multiremote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) dla konkretnych przypadków użycia.

##### Paramaters

- `multiremoteOptions`: obiekt z kluczami reprezentującymi nazwę przeglądarki i ich [WebdriverIO Options](/docs/configuration#webdriverio).

##### Returns

- Obiekt [Browser](/docs/api/browser)

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

Zamiast wywoływać polecenie `wdio`, możesz również dołączyć test runner jako moduł i uruchomić go w dowolnym środowisku. W tym celu będziesz musiał zaimportować pakiet `@wdio/cli` jako moduł, w taki sposób:

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

Następnie utwórz instancję launchera i uruchom test.

#### `Launcher(configPath, opts)`

Konstruktor klasy `Launcher` oczekuje URL do pliku konfiguracyjnego oraz obiektu `opts` z ustawieniami, które zastąpią te w konfiguracji.

##### Paramaters

- `configPath`: ścieżka do pliku `wdio.conf.js` do uruchomienia
- `opts`: argumenty ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) do nadpisania wartości z pliku konfiguracyjnego

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

Polecenie `run` zwraca [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Jest on rozwiązywany, jeśli testy zostały uruchomione pomyślnie lub zakończyły się niepowodzeniem, a jest odrzucany, jeśli launcher nie był w stanie uruchomić testów.

## `@wdio/browser-runner`

Podczas uruchamiania testów jednostkowych lub komponentowych za pomocą [browser runnera](/docs/runner#browser-runner) WebdriverIO, możesz importować narzędzia do mockowania dla swoich testów, np.:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Dostępne są następujące eksporty nazwane:

#### `fn`

Funkcja mock, zobacz więcej w oficjalnej [dokumentacji Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Funkcja szpiegująca, zobacz więcej w oficjalnej [dokumentacji Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Metoda do mockowania pliku lub modułu zależności.

##### Paramaters

- `moduleName`: względna ścieżka do pliku, który ma zostać zmockowany, lub nazwa modułu.
- `factory`: funkcja zwracająca zmockowaną wartość (opcjonalnie)

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

Usuń mockowanie zależności, która jest zdefiniowana w katalogu ręcznych mocków (`__mocks__`).

##### Paramaters

- `moduleName`: nazwa modułu, który ma zostać odmockowany.

##### Example

```js
unmock('lodash')
```