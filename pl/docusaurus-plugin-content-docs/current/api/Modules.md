---
id: modules
title: Moduły
---

WebdriverIO publikuje różne moduły w NPM i innych rejestrach, których możesz użyć do zbudowania własnego frameworka automatyzacji. Więcej dokumentacji na temat typów konfiguracji WebdriverIO znajdziesz [tutaj](/docs/setuptypes).

## `webdriver` i `devtools`

Pakiety protokołów ([`webdriver`](https://www.npmjs.com/package/webdriver) i [`devtools`](https://www.npmjs.com/package/devtools)) udostępniają klasę z następującymi funkcjami statycznymi, które pozwalają na inicjowanie sesji:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Rozpoczyna nową sesję z określonymi możliwościami (capabilities). Na podstawie odpowiedzi sesji zostaną udostępnione komendy z różnych protokołów.

##### Parametry

- `options`: [Opcje WebDriver](/docs/configuration#webdriver-options)
- `modifier`: funkcja, która pozwala zmodyfikować instancję klienta przed jej zwróceniem
- `userPrototype`: obiekt właściwości, który pozwala rozszerzyć prototyp instancji
- `customCommandWrapper`: funkcja, która pozwala opakować wywołania funkcji dodatkową funkcjonalnością

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

- `attachInstance`: instancja, do której ma zostać dołączona sesja, lub przynajmniej obiekt z właściwością `sessionId` (np. `{ sessionId: 'xxx' }`)
- `modifier`: funkcja, która pozwala zmodyfikować instancję klienta przed jej zwróceniem
- `userPrototype`: obiekt właściwości, który pozwala rozszerzyć prototyp instancji
- `customCommandWrapper`: funkcja, która pozwala opakować wywołania funkcji dodatkową funkcjonalnością

##### Zwraca

- Obiekt [Browser](/docs/api/browser)

##### Przykład

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Przeładowuje sesję dla podanej instancji.

##### Parametry

- `instance`: instancja pakietu do przeładowania

##### Przykład

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Podobnie jak w przypadku pakietów protokołów (`webdriver` i `devtools`), do zarządzania sesjami możesz również używać API pakietu WebdriverIO. API można zaimportować za pomocą `import { remote, attach, multiRemote } from 'webdriverio` i zawierają one następującą funkcjonalność:

#### `remote(options, modifier)`

Rozpoczyna sesję WebdriverIO. Instancja zawiera wszystkie komendy pakietu protokołu, ale z dodatkowymi funkcjami wyższego rzędu, zobacz [dokumentację API](/docs/api).

##### Parametry

- `options`: [Opcje WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: funkcja, która pozwala zmodyfikować instancję klienta przed jej zwróceniem

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

- `attachOptions`: instancja, do której ma zostać dołączona sesja, lub przynajmniej obiekt z właściwością `sessionId` (np. `{ sessionId: 'xxx' }`)

##### Zwraca

- Obiekt [Browser](/docs/api/browser)

##### Przykład

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiRemote(multiRemoteOptions)`

Inicjuje instancję multi-remote, która pozwala kontrolować wiele sesji w ramach jednej instancji. Sprawdź nasze [przykłady multi-remote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote), aby zobaczyć konkretne przypadki użycia.

##### Parametry

- `multiRemoteOptions`: obiekt z kluczami reprezentującymi nazwy przeglądarek i ich [Opcje WebdriverIO](/docs/configuration#webdriverio).

##### Zwraca

- Obiekt [Browser](/docs/api/browser)

##### Przykład

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
// zwraca ['Google', 'JSON']
```

#### `Key`

Obiekt zawierający stałe znaków specjalnych do użycia z komendą [`browser.keys`](/docs/api/browser/keys). Stałe te reprezentują klawisze specjalne, które można wysłać do przeglądarki, takie jak `Enter`, `Tab`, `Escape`, klawisze strzałek, klawisze funkcyjne i inne.

##### Przykład

```js
import { Key } from 'webdriverio'

// Naciśnij klawisz Enter
await browser.keys(Key.Enter)

// Użyj Ctrl+A, aby zaznaczyć wszystko (działa na różnych platformach)
await browser.keys([Key.Ctrl, 'a'])

// Nawiguj za pomocą klawiszy strzałek
await browser.keys([Key.ArrowDown, Key.ArrowDown, Key.Enter])
```

##### Dostępne klawisze

Następujące klawisze specjalne są dostępne za pośrednictwem obiektu `Key`:

**Klawisze modyfikujące:**

| Stała | Opis |
|----------|-------------|
| `Key.Ctrl` | Wieloplatformowy klawisz control (Command na Macu, Control na Windows/Linux) |
| `Key.Control` | Klawisz Control |
| `Key.Shift` | Klawisz Shift |
| `Key.Alt` | Klawisz Alt |
| `Key.Command` | Klawisz Command (Mac) |
| `Key.NULL` | Klawisz Null/zwolnienia — zwalnia wszystkie aktualnie wciśnięte klawisze modyfikujące |

**Klawisze nawigacyjne:**

| Stała | Opis |
|----------|-------------|
| `Key.Cancel` | Klawisz Cancel |
| `Key.Help` | Klawisz Help |
| `Key.Backspace` | Klawisz Backspace |
| `Key.Tab` | Klawisz Tab |
| `Key.Clear` | Klawisz Clear |
| `Key.Return` | Klawisz Return |
| `Key.Enter` | Klawisz Enter |
| `Key.Pause` | Klawisz Pause |
| `Key.Escape` | Klawisz Escape |
| `Key.Space` | Klawisz spacji |
| `Key.PageUp` | Klawisz Page Up |
| `Key.PageDown` | Klawisz Page Down |
| `Key.End` | Klawisz End |
| `Key.Home` | Klawisz Home |
| `Key.ArrowLeft` | Klawisz strzałki w lewo |
| `Key.ArrowUp` | Klawisz strzałki w górę |
| `Key.ArrowRight` | Klawisz strzałki w prawo |
| `Key.ArrowDown` | Klawisz strzałki w dół |
| `Key.Insert` | Klawisz Insert |
| `Key.Delete` | Klawisz Delete |

**Klawisze znakowe:**

| Stała | Opis |
|----------|-------------|
| `Key.Semicolon` | Klawisz średnika |
| `Key.Equals` | Klawisz znaku równości |

**Klawisze klawiatury numerycznej:**

| Stała | Opis |
|----------|-------------|
| `Key.Numpad0` - `Key.Numpad9` | Klawiatura numeryczna 0-9 |
| `Key.Multiply` | Mnożenie na klawiaturze numerycznej |
| `Key.Add` | Dodawanie na klawiaturze numerycznej |
| `Key.Separator` | Separator na klawiaturze numerycznej |
| `Key.Subtract` | Odejmowanie na klawiaturze numerycznej |
| `Key.Decimal` | Przecinek dziesiętny na klawiaturze numerycznej |
| `Key.Divide` | Dzielenie na klawiaturze numerycznej |

**Klawisze funkcyjne:**

| Stała | Opis |
|----------|-------------|
| `Key.F1` - `Key.F12` | Klawisze funkcyjne od F1 do F12 |

**Inne klawisze:**

| Stała | Opis |
|----------|-------------|
| `Key.ZenkakuHankaku` | Klawisz Zenkaku/Hankaku (japoński) |

:::info Wieloplatformowe klawisze modyfikujące

Stała `Key.Ctrl` zapewnia wygodny sposób używania modyfikatora "control" w różnych systemach operacyjnych. Na macOS jest mapowana na klawisz `Command`, natomiast na Windows i Linux na klawisz `Control`. Jest to przydatne podczas pisania testów, które muszą działać na wielu platformach, np. dla operacji zaznaczania wszystkiego (`Ctrl+A`), kopiowania (`Ctrl+C`) lub wklejania (`Ctrl+V`).

:::

## `@wdio/cli`

Zamiast wywoływać komendę `wdio`, możesz również dołączyć test runner jako moduł i uruchomić go w dowolnym środowisku. W tym celu musisz zaimportować pakiet `@wdio/cli` jako moduł, w następujący sposób:

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

Konstruktor klasy `Launcher` oczekuje adresu URL do pliku konfiguracyjnego oraz obiektu `opts` z ustawieniami, które nadpiszą te z konfiguracji.

##### Parametry

- `configPath`: ścieżka do pliku `wdio.conf.js` do uruchomienia
- `opts`: argumenty ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) nadpisujące wartości z pliku konfiguracyjnego

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

Komenda `run` zwraca [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Jest on rozwiązywany (resolved), jeśli testy zostały wykonane pomyślnie lub zakończyły się niepowodzeniem, i odrzucany (rejected), jeśli launcher nie był w stanie uruchomić testów.

## `@wdio/browser-runner`

Podczas uruchamiania testów jednostkowych lub komponentowych przy użyciu [browser runnera](/docs/runner#browser-runner) WebdriverIO możesz zaimportować narzędzia do mockowania dla swoich testów, np.:

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

- `moduleName`: ścieżka względna do pliku, który ma zostać zamockowany, lub nazwa modułu.
- `factory`: funkcja zwracająca zamockowaną wartość (opcjonalnie)

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

Usuwa mock zależności zdefiniowany w katalogu ręcznych mocków (`__mocks__`).

##### Parametry

- `moduleName`: nazwa modułu, dla którego ma zostać usunięty mock.

##### Przykład

```js
unmock('lodash')
```