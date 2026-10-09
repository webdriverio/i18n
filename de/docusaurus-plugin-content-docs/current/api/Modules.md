---
id: modules
title: Module
---

WebdriverIO veröffentlicht verschiedene Module auf NPM und anderen Registries, die Sie verwenden können, um Ihr eigenes Automatisierungs-Framework zu erstellen. Weitere Dokumentation zu den WebdriverIO-Setup-Typen finden Sie [hier](/docs/setuptypes).

## `webdriver` und `devtools`

Die Protokoll-Pakete ([`webdriver`](https://www.npmjs.com/package/webdriver) und [`devtools`](https://www.npmjs.com/package/devtools)) stellen eine Klasse mit den folgenden statischen Funktionen bereit, mit denen Sie Sessions initiieren können:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Startet eine neue Session mit bestimmten Capabilities. Basierend auf der Session-Antwort werden Befehle aus verschiedenen Protokollen bereitgestellt.

##### Parameter

- `options`: [WebDriver-Optionen](/docs/configuration#webdriver-options)
- `modifier`: Funktion, mit der die Client-Instanz modifiziert werden kann, bevor sie zurückgegeben wird
- `userPrototype`: Eigenschaftsobjekt, mit dem der Instanz-Prototyp erweitert werden kann
- `customCommandWrapper`: Funktion, mit der Funktionalität um Funktionsaufrufe herum gelegt werden kann

##### Rückgabewert

- [Browser](/docs/api/browser)-Objekt

##### Beispiel

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Verbindet sich mit einer laufenden WebDriver- oder DevTools-Session.

##### Parameter

- `attachInstance`: Instanz, mit der eine Session verbunden werden soll, oder zumindest ein Objekt mit einer Eigenschaft `sessionId` (z. B. `{ sessionId: 'xxx' }`)
- `modifier`: Funktion, mit der die Client-Instanz modifiziert werden kann, bevor sie zurückgegeben wird
- `userPrototype`: Eigenschaftsobjekt, mit dem der Instanz-Prototyp erweitert werden kann
- `customCommandWrapper`: Funktion, mit der Funktionalität um Funktionsaufrufe herum gelegt werden kann

##### Rückgabewert

- [Browser](/docs/api/browser)-Objekt

##### Beispiel

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Lädt eine Session anhand der angegebenen Instanz neu.

##### Parameter

- `instance`: Paket-Instanz, die neu geladen werden soll

##### Beispiel

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Ähnlich wie bei den Protokoll-Paketen (`webdriver` und `devtools`) können Sie auch die APIs des WebdriverIO-Pakets verwenden, um Sessions zu verwalten. Die APIs können mit `import { remote, attach, multiRemote } from 'webdriverio` importiert werden und bieten folgende Funktionalität:

#### `remote(options, modifier)`

Startet eine WebdriverIO-Session. Die Instanz enthält alle Befehle des Protokoll-Pakets, jedoch mit zusätzlichen Funktionen höherer Ordnung, siehe [API-Dokumentation](/docs/api).

##### Parameter

- `options`: [WebdriverIO-Optionen](/docs/configuration#webdriverio)
- `modifier`: Funktion, mit der die Client-Instanz modifiziert werden kann, bevor sie zurückgegeben wird

##### Rückgabewert

- [Browser](/docs/api/browser)-Objekt

##### Beispiel

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

Verbindet sich mit einer laufenden WebdriverIO-Session.

##### Parameter

- `attachOptions`: Instanz, mit der eine Session verbunden werden soll, oder zumindest ein Objekt mit einer Eigenschaft `sessionId` (z. B. `{ sessionId: 'xxx' }`)

##### Rückgabewert

- [Browser](/docs/api/browser)-Objekt

##### Beispiel

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiRemote(multiRemoteOptions)`

Initiiert eine Multi-Remote-Instanz, mit der Sie mehrere Sessions innerhalb einer einzigen Instanz steuern können. Schauen Sie sich unsere [Multi-Remote-Beispiele](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) für konkrete Anwendungsfälle an.

##### Parameter

- `multiRemoteOptions`: ein Objekt, dessen Schlüssel die Browsernamen und deren [WebdriverIO-Optionen](/docs/configuration#webdriverio) darstellen.

##### Rückgabewert

- [Browser](/docs/api/browser)-Objekt

##### Beispiel

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
// gibt ['Google', 'JSON'] zurück
```

#### `Key`

Ein Objekt mit Konstanten für Sonderzeichen zur Verwendung mit dem Befehl [`browser.keys`](/docs/api/browser/keys). Diese Konstanten repräsentieren Sondertasten, die an den Browser gesendet werden können, wie z. B. `Enter`, `Tab`, `Escape`, Pfeiltasten, Funktionstasten und mehr.

##### Beispiel

```js
import { Key } from 'webdriverio'

// Enter-Taste drücken
await browser.keys(Key.Enter)

// Strg+A verwenden, um alles auszuwählen (funktioniert plattformübergreifend)
await browser.keys([Key.Ctrl, 'a'])

// Mit Pfeiltasten navigieren
await browser.keys([Key.ArrowDown, Key.ArrowDown, Key.Enter])
```

##### Verfügbare Tasten

Die folgenden Sondertasten sind über das `Key`-Objekt verfügbar:

**Modifikatortasten:**

| Konstante | Beschreibung |
|----------|-------------|
| `Key.Ctrl` | Plattformübergreifende Steuerungstaste (Command auf Mac, Control auf Windows/Linux) |
| `Key.Control` | Control-Taste |
| `Key.Shift` | Shift-Taste |
| `Key.Alt` | Alt-Taste |
| `Key.Command` | Command-Taste (Mac) |
| `Key.NULL` | Null-/Freigabetaste — gibt alle aktuell gedrückten Modifikatortasten frei |

**Navigationstasten:**

| Konstante | Beschreibung |
|----------|-------------|
| `Key.Cancel` | Cancel-Taste |
| `Key.Help` | Help-Taste |
| `Key.Backspace` | Backspace-Taste |
| `Key.Tab` | Tab-Taste |
| `Key.Clear` | Clear-Taste |
| `Key.Return` | Return-Taste |
| `Key.Enter` | Enter-Taste |
| `Key.Pause` | Pause-Taste |
| `Key.Escape` | Escape-Taste |
| `Key.Space` | Leertaste |
| `Key.PageUp` | Bild-auf-Taste |
| `Key.PageDown` | Bild-ab-Taste |
| `Key.End` | Ende-Taste |
| `Key.Home` | Pos1-Taste |
| `Key.ArrowLeft` | Pfeiltaste links |
| `Key.ArrowUp` | Pfeiltaste oben |
| `Key.ArrowRight` | Pfeiltaste rechts |
| `Key.ArrowDown` | Pfeiltaste unten |
| `Key.Insert` | Einfügen-Taste |
| `Key.Delete` | Entfernen-Taste |

**Zeichentasten:**

| Konstante | Beschreibung |
|----------|-------------|
| `Key.Semicolon` | Semikolon-Taste |
| `Key.Equals` | Gleichheitszeichen-Taste |

**Ziffernblocktasten:**

| Konstante | Beschreibung |
|----------|-------------|
| `Key.Numpad0` - `Key.Numpad9` | Ziffernblock 0-9 |
| `Key.Multiply` | Ziffernblock Multiplizieren |
| `Key.Add` | Ziffernblock Addieren |
| `Key.Separator` | Ziffernblock Trennzeichen |
| `Key.Subtract` | Ziffernblock Subtrahieren |
| `Key.Decimal` | Ziffernblock Dezimalzeichen |
| `Key.Divide` | Ziffernblock Dividieren |

**Funktionstasten:**

| Konstante | Beschreibung |
|----------|-------------|
| `Key.F1` - `Key.F12` | Funktionstasten F1 bis F12 |

**Sonstige Tasten:**

| Konstante | Beschreibung |
|----------|-------------|
| `Key.ZenkakuHankaku` | Zenkaku/Hankaku-Taste (Japanisch) |

:::info Plattformübergreifende Modifikatortasten

Die Konstante `Key.Ctrl` bietet eine bequeme Möglichkeit, den „Control“-Modifikator über verschiedene Betriebssysteme hinweg zu verwenden. Unter macOS wird sie der `Command`-Taste zugeordnet, unter Windows und Linux der `Control`-Taste. Dies ist nützlich beim Schreiben von Tests, die auf mehreren Plattformen funktionieren müssen, z. B. für Operationen wie Alles auswählen (`Ctrl+A`), Kopieren (`Ctrl+C`) oder Einfügen (`Ctrl+V`).

:::

## `@wdio/cli`

Anstatt den Befehl `wdio` aufzurufen, können Sie den Testrunner auch als Modul einbinden und in einer beliebigen Umgebung ausführen. Dazu müssen Sie das Paket `@wdio/cli` als Modul einbinden, etwa so:

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

Erstellen Sie anschließend eine Instanz des Launchers und führen Sie den Test aus.

#### `Launcher(configPath, opts)`

Der Konstruktor der Klasse `Launcher` erwartet die URL zur Konfigurationsdatei sowie ein `opts`-Objekt mit Einstellungen, die die Werte in der Konfiguration überschreiben.

##### Parameter

- `configPath`: Pfad zur auszuführenden `wdio.conf.js`
- `opts`: Argumente ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)), um Werte aus der Konfigurationsdatei zu überschreiben

##### Beispiel

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

Der Befehl `run` gibt ein [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) zurück. Es wird aufgelöst, wenn die Tests erfolgreich ausgeführt wurden oder fehlgeschlagen sind, und es wird abgelehnt, wenn der Launcher die Tests nicht starten konnte.

## `@wdio/browser-runner`

Wenn Sie Unit- oder Komponententests mit WebdriverIOs [Browser-Runner](/docs/runner#browser-runner) ausführen, können Sie Mocking-Hilfsmittel für Ihre Tests importieren, z. B.:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Die folgenden benannten Exporte sind verfügbar:

#### `fn`

Mock-Funktion, mehr dazu in der offiziellen [Vitest-Dokumentation](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Spy-Funktion, mehr dazu in der offiziellen [Vitest-Dokumentation](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Methode zum Mocken einer Datei oder eines Abhängigkeitsmoduls.

##### Parameter

- `moduleName`: entweder ein relativer Pfad zur zu mockenden Datei oder ein Modulname.
- `factory`: Funktion, die den gemockten Wert zurückgibt (optional)

##### Beispiel

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

Hebt das Mocking einer Abhängigkeit auf, die im Verzeichnis für manuelle Mocks (`__mocks__`) definiert ist.

##### Parameter

- `moduleName`: Name des Moduls, dessen Mocking aufgehoben werden soll.

##### Beispiel

```js
unmock('lodash')
```