---
id: mocking
title: Mocking
description: "Mocke Funktionen, Module und Netzwerkanfragen in Komponententests mit dem Browser-Runner mithilfe von fn, spyOn und mock aus @wdio/browser-runner."
---

Beim Schreiben von Tests ist es nur eine Frage der Zeit, bis du eine „gefälschte“ Version eines internen – oder externen – Dienstes erstellen musst. Dies wird allgemein als Mocking bezeichnet. WebdriverIO stellt Hilfsfunktionen bereit, die dich dabei unterstützen. Du kannst `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` verwenden, um darauf zuzugreifen. Weitere Informationen zu den verfügbaren Mocking-Hilfsmitteln findest du in der [API-Dokumentation](/docs/api/modules#wdiobrowser-runner).

## Funktionen

Um zu überprüfen, ob bestimmte Funktions-Handler im Rahmen deiner Komponententests aufgerufen werden, exportiert das Modul `@wdio/browser-runner` Mocking-Primitive, mit denen du testen kannst, ob diese Funktionen aufgerufen wurden. Du kannst diese Methoden folgendermaßen importieren:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Durch den Import von `fn` kannst du eine Spy-Funktion (Mock) erstellen, um deren Ausführung zu verfolgen, und mit `spyOn` eine Methode an einem bereits erstellten Objekt überwachen.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

Das vollständige Beispiel findest du im Repository [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

```ts
import React from 'react'
import { $, expect } from '@wdio/globals'
import { fn } from '@wdio/browser-runner'
import { Key } from 'webdriverio'
import { render } from '@testing-library/react'

import LoginForm from '../components/LoginForm'

describe('LoginForm', () => {
    it('should call onLogin handler if username and password was provided', async () => {
        const onLogin = fn()
        render(<LoginForm onLogin={onLogin} />)
        await $('input[name="username"]').setValue('testuser123')
        await $('input[name="password"]').setValue('s3cret')
        await browser.keys(Key.Enter)

        /**
         * überprüfen, dass der Handler aufgerufen wurde
         */
        expect(onLogin).toBeCalledTimes(1)
        expect(onLogin).toBeCalledWith(expect.equal({
            username: 'testuser123',
            password: 's3cret'
        }))
    })
})
```

</TabItem>
<TabItem value="spies">

Das vollständige Beispiel findest du im Verzeichnis [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

```js
import { expect, $ } from '@wdio/globals'
import { spyOn } from '@wdio/browser-runner'
import { html, render } from 'lit'
import { SimpleGreeting } from './components/LitComponent.ts'

const getQuestionFn = spyOn(SimpleGreeting.prototype, 'getQuestion')

describe('Lit Component testing', () => {
    it('should render component', async () => {
        render(
            html`<simple-greeting name="WebdriverIO" />`,
            document.body
        )

        const innerElem = await $('simple-greeting').$('p')
        expect(await innerElem.getText()).toBe('Hello, WebdriverIO! How are you today?')
    })

    it('should render with mocked component function', async () => {
        getQuestionFn.mockReturnValue('Does this work?')
        render(
            html`<simple-greeting name="WebdriverIO" />`,
            document.body
        )

        const innerElem = await $('simple-greeting').$('p')
        expect(await innerElem.getText()).toBe('Hello, WebdriverIO! Does this work?')
    })
})
```

</TabItem>
</Tabs>

WebdriverIO exportiert hier lediglich [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) erneut, eine leichtgewichtige, Jest-kompatible Spy-Implementierung, die mit den [`expect`](/docs/api/expect-webdriverio)-Matchern von WebdriverIO verwendet werden kann. Weitere Dokumentation zu diesen Mock-Funktionen findest du auf der [Vitest-Projektseite](https://vitest.dev/api/mock.html).

Natürlich kannst du auch jedes andere Spy-Framework installieren und importieren, z. B. [SinonJS](https://sinonjs.org/), solange es die Browser-Umgebung unterstützt.

## Module

Mocke lokale Module oder beobachte Bibliotheken von Drittanbietern, die in anderem Code aufgerufen werden. So kannst du Argumente und Ausgaben testen oder sogar deren Implementierung neu deklarieren.

Es gibt zwei Möglichkeiten, Funktionen zu mocken: Entweder durch das Erstellen einer Mock-Funktion zur Verwendung im Testcode oder durch das Schreiben eines manuellen Mocks, um eine Modulabhängigkeit zu überschreiben.

### Mocking von Datei-Importen

Stellen wir uns vor, unsere Komponente importiert eine Hilfsmethode aus einer Datei, um einen Klick zu verarbeiten.

```js title=utils.js
export function handleClick () {
    // Handler-Implementierung
}
```

In unserer Komponente wird der Klick-Handler folgendermaßen verwendet:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

Um `handleClick` aus `utils.js` zu mocken, können wir die Methode `mock` in unserem Test folgendermaßen verwenden:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * benannten Export "handleClick" der Datei `utils.ts` mocken
 */
mock('./utils.ts', () => ({
    handleClick: fn()
}))

describe('Simple Button Component Test', () => {
    it('call click handler', async () => {
        render(html`<simple-button />`, document.body)
        await $('simple-button').$('button').click()
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})
```

### Mocking von Abhängigkeiten

Angenommen, wir haben eine Klasse, die Benutzer von unserer API abruft. Die Klasse verwendet [`axios`](https://github.com/axios/axios), um die API aufzurufen, und gibt dann das Attribut `data` zurück, das alle Benutzer enthält:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Um diese Methode nun zu testen, ohne tatsächlich die API aufzurufen (und damit langsame und fragile Tests zu erzeugen), können wir die Funktion `mock(...)` verwenden, um das axios-Modul automatisch zu mocken.

Sobald wir das Modul gemockt haben, können wir einen [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) für `.get` bereitstellen, der die Daten zurückgibt, gegen die unser Test prüfen soll. Im Grunde sagen wir damit, dass `axios.get('/users.json')` eine gefälschte Antwort zurückgeben soll.

```js title=users.test.js
import axios from 'axios'; // importiert den definierten Mock
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * Default-Export der `axios`-Abhängigkeit mocken
 */
mock('axios', () => ({
    default: {
        get: fn()
    }
}))

describe('User API', () => {
    it('should fetch users', async () => {
        const users = [{name: 'Bob'}]
        const resp = {data: users}
        axios.get.mockResolvedValue(resp)

        // oder je nach Anwendungsfall Folgendes verwenden:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## Teilweises Mocking

Teilmengen eines Moduls können gemockt werden, während der Rest des Moduls seine tatsächliche Implementierung behält:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Das ursprüngliche Modul wird an die Mock-Factory übergeben, die du z. B. verwenden kannst, um eine Abhängigkeit teilweise zu mocken:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // Default-Export und benannten Export 'foo' mocken
    // und benannten Export aus dem ursprünglichen Modul weitergeben
    return {
        __esModule: true,
        ...originalModule,
        default: fn(() => 'mocked baz'),
        foo: 'mocked foo',
    }
})

describe('partial mock', () => {
    it('should do a partial mock', () => {
        const defaultExportResult = defaultExport();
        expect(defaultExportResult).toBe('mocked baz');
        expect(defaultExport).toHaveBeenCalled();

        expect(foo).toBe('mocked foo');
        expect(bar()).toBe('bar');
    })
})
```

## Manuelle Mocks

Manuelle Mocks werden definiert, indem ein Modul in einem Unterverzeichnis `__mocks__/` geschrieben wird (siehe auch die Option `automockDir`). Wenn das Modul, das du mockst, ein Node-Modul ist (z. B.: `lodash`), sollte der Mock im Verzeichnis `__mocks__` abgelegt werden und wird dann automatisch gemockt. Es ist nicht nötig, explizit `mock('module_name')` aufzurufen.

Scoped-Module (auch bekannt als Scoped Packages) können gemockt werden, indem eine Datei in einer Verzeichnisstruktur erstellt wird, die dem Namen des Scoped-Moduls entspricht. Um beispielsweise ein Scoped-Modul namens `@scope/project-name` zu mocken, erstelle eine Datei unter `__mocks__/@scope/project-name.js` und lege das Verzeichnis `@scope/` entsprechend an.

```
.
├── config
├── __mocks__
│   ├── axios.js
│   ├── lodash.js
│   └── @scope
│       └── project-name.js
├── node_modules
└── views
```

Wenn für ein bestimmtes Modul ein manueller Mock existiert, verwendet WebdriverIO dieses Modul beim expliziten Aufruf von `mock('moduleName')`. Wenn automock jedoch auf true gesetzt ist, wird die manuelle Mock-Implementierung anstelle des automatisch erstellten Mocks verwendet, selbst wenn `mock('moduleName')` nicht aufgerufen wird. Um dieses Verhalten zu deaktivieren, musst du in Tests, die die tatsächliche Modulimplementierung verwenden sollen, explizit `unmock('moduleName')` aufrufen, z. B.:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

Damit Mocking im Browser funktioniert, schreibt WebdriverIO die Testdateien um und verschiebt die Mock-Aufrufe über alles andere (siehe auch [diesen Blogbeitrag](https://www.coolcomputerclub.com/posts/jest-hoist-await/) zum Hoisting-Problem in Jest). Dies schränkt die Möglichkeiten ein, Variablen an den Mock-Resolver zu übergeben, z. B.:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ dies schlägt fehl, da `dep` und `variable` innerhalb des Mock-Resolvers nicht definiert sind
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

Um dies zu beheben, musst du alle verwendeten Variablen innerhalb des Resolvers definieren, z. B.:

```js title=component.test.js
/**
 * ✔️ dies funktioniert, da alle Variablen innerhalb des Resolvers definiert sind
 */
mock('./some/module.ts', async () => {
    const dep = await import('dependency')
    const variable = 'foobar'

    return {
        exportA: dep,
        exportB: variable
    }
})
```

## Anfragen

Wenn du Browser-Anfragen mocken möchtest, z. B. API-Aufrufe, wirf einen Blick in den Abschnitt [Request Mock and Spies](/docs/mocksandspies).

Verwende in Komponententests für `browser.mock()` ein absolutes URL-Muster mit festem Protokoll und Hostnamen, z. B. `https://api.webdriver.io/api/*`. Ein Muster ohne Host wie `*/api/*` fängt jede Anfrage der Seite ab, einschließlich des eigenen Vite- und Treiber-Traffics des Browser-Runners.

Verwende ein einzelnes `*`, das auch Schrägstriche abdeckt. Aufeinanderfolgende Wildcards vor festem Text, wie `**/api/**` oder `**/data.json`, können bei nicht zusammenhängenden URLs zu übermäßigem Regex-Backtracking führen und einen Test einfrieren lassen. Siehe [Issue #13548](https://github.com/webdriverio/webdriverio/issues/13548), [Issue #15739](https://github.com/webdriverio/webdriverio/issues/15739) und die [Warnung zu URL-Wildcards](/docs/mocksandspies#creating-a-mock).