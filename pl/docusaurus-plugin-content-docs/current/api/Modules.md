---
id: modules
title: Moduły
---

WebdriverIO publikuje różne moduły w rejestrach NPM i innych, których możesz używać do budowania własnego frameworka automatyzacji. Zobacz więcej dokumentacji na temat typów konfiguracji WebdriverIO [tutaj](/docs/setuptypes).

## `webdriver` i `devtools`

Pakiety protokołów ([`webdriver`](https://www.npmjs.com/package/webdriver) i [`devtools`](https://www.npmjs.com/package/devtools)) udostępniają klasę z następującymi dołączonymi funkcjami statycznymi, które umożliwiają inicjowanie sesji:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Rozpoczyna nową sesję z określonymi możliwościami. Na podstawie odpowiedzi sesji udostępniane będą komendy z różnych protokołów.

##### Parametry

- `options`: [Opcje WebDriver](/docs/configuration#webdriver-options)
- `modifier`: funkcja, która pozwala modyfikować instancję klienta przed jej zwróceniem
- `userPrototype`: obiekt właściwości, który pozwala rozszerzyć prototyp instancji
- `customCommandWrapper`: funkcja, która pozwala owinąć funkcjonalność wokół wywołań funkcji

##### Zwraca

- Obiekt [Browser](/docs/api/browser)

##### Przykład

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Dołącza do działającej sesji WebDriver lub DevTools.

##### Parametry

- `attachInstance`: instancja, do której ma zostać dołączona sesja, lub co najmniej obiekt z właściwością `sessionId` (np. `{ sessionId: 'xxx' }`)
- `modifier`: funkcja, która pozwala modyfikować instancję klienta przed jej zwróceniem
- `userPrototype`: obiekt właściwości, który pozwala rozszerzyć prototyp instancji
- `customCommandWrapper`: funkcja, która pozwala owinąć funkcjonalność wokół wywołań funkcji

##### Zwraca

- Obiekt [Browser](/docs/api/browser)

##### Przykład

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Przeładowuje sesję dla dostarczonej instancji.

##### Parametry

- `instance`: instancja pakietu do przeładowania

##### Przykład

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Podobnie jak w przypadku pakietów protokołów (`webdriver` i `devtools`), możesz również używać API pakietu WebdriverIO do zarządzania sesjami. API można importować za pomocą `import { remote, attach, multiremote } from 'webdriverio'` i zawierają następujące funkcje:

#### `remote(options, modifier)`

Rozpoczyna sesję WebdriverIO. Instancja zawiera wszystkie komendy z pakietu protokołu, ale z dodatkowymi funkcjami wyższego rzędu, zobacz [dokumentację API](/docs/api).

##### Parametry

- `options`: [Opcje WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: funkcja, która pozwala modyfikować instancję klienta przed jej zwróceniem

##### Zwraca

- Obiekt [Browser](/docs/api/browser)

##### Przykład

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

Dołącza do działającej sesji WebdriverIO.

##### Parametry

- `attachOptions`: instancja, do której ma zostać dołączona sesja, lub co najmniej obiekt z właściwością `sessionId` (np. `{ sessionId: 'xxx' }`)

##### Zwraca

- Obiekt [Browser](/docs/api/browser)

##### Przykład

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

Inicjuje instancję multiremote, która pozwala kontrolować wiele sesji w ramach jednej instancji. Sprawdź nasze [przykłady multiremote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) dla konkretnych przypadków użycia.

##### Parametry

- `multiremoteOptions`: obiekt z kluczami reprezentującymi nazwę przeglądarki i ich [Opcjami WebdriverIO](/docs/configuration#webdriverio).

##### Zwraca

- Obiekt [Browser](/docs/api/browser)

##### Przykład

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

Zamiast wywoływać polecenie `wdio`, możesz również dołączyć test runner jako moduł i uruchomić go w dowolnym środowisku. W tym celu musisz zaimportować pakiet `@wdio/cli` jako moduł, w następujący sposób:

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

Konstruktor klasy `Launcher` oczekuje URL do pliku konfiguracyjnego oraz obiektu `opts` z ustawieniami, które nadpiszą te w konfiguracji.

##### Parametry

- `configPath`: ścieżka do pliku `wdio.conf.js` do uruchomienia
- `opts`: argumenty ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) do nadpisania wartości z pliku konfiguracyjnego

##### Przykład

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

Polecenie `run` zwraca [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Jest ono rozwiązywane, jeśli testy zakończyły się pomyślnie lub nie powiodły się, a jest odrzucane, jeśli launcher nie mógł uruchomić testów.

## `@wdio/browser-runner`

Podczas uruchamiania testów jednostkowych lub komponentowych za pomocą [przeglądarki testowej](/docs/runner#browser-runner) WebdriverIO, możesz zaimportować narzędzia do mockowania dla swoich testów, np.:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Dostępne są następujące nazwane eksporty:

#### `fn`

Funkcja mockująca, więcej informacji w oficjalnej [dokumentacji Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Funkcja szpiegująca, więcej informacji w oficjalnej [dokumentacji Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Metoda do mockowania pliku lub modułu zależności.

##### Parametry

- `moduleName`: relatywna ścieżka do pliku, który ma być mockowany, lub nazwa modułu.
- `factory`: funkcja zwracająca zamockowaną wartość (opcjonalna)

##### Przykład

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

Usuwa mockowanie zależności, która jest zdefiniowana w ręcznym katalogu mock (`__mocks__`).

##### Parametry

- `moduleName`: nazwa modułu, który ma być odmockowany.

##### Przykład

```js
unmock('lodash')
```