---
id: mocking
title: Mocking
---

Beim Schreiben von Tests ist es nur eine Frage der Zeit, bis Sie eine "gefälschte" Version eines internen - oder externen - Dienstes erstellen müssen. Dies wird üblicherweise als Mocking bezeichnet. WebdriverIO bietet Hilfsfunktionen, die Ihnen dabei helfen. Sie können `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` verwenden, um darauf zuzugreifen. Weitere Informationen zu den verfügbaren Mocking-Hilfsmitteln finden Sie in der [API-Dokumentation](/docs/api/modules#wdiobrowser-runner).

## Funktionen

Um zu überprüfen, ob bestimmte Funktionshandler als Teil Ihrer Komponententests aufgerufen werden, exportiert das Modul `@wdio/browser-runner` Mocking-Primitive, mit denen Sie testen können, ob diese Funktionen aufgerufen wurden. Sie können diese Methoden wie folgt importieren:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Durch den Import von `fn` können Sie eine Spy-Funktion (Mock) erstellen, um deren Ausführung zu verfolgen, und mit `spyOn` können Sie eine Methode auf einem bereits erstellten Objekt verfolgen.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

Das vollständige Beispiel finden Sie im Repository [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

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
         * verify the handler was called
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

Das vollständige Beispiel finden Sie im Verzeichnis [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

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

WebdriverIO exportiert hier lediglich [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy), eine leichtgewichtige Jest-kompatible Spy-Implementierung, die mit WebdriverIOs [`expect`](/docs/api/expect-webdriverio)-Matchern verwendet werden kann. Weitere Dokumentation zu diesen Mock-Funktionen finden Sie auf der [Vitest-Projektseite](https://vitest.dev/api/mock.html).

Natürlich können Sie auch jedes andere Spy-Framework installieren und importieren, z.B. [SinonJS](https://sinonjs.org/), solange es die Browser-Umgebung unterstützt.

## Module

Mocken Sie lokale Module oder beobachten Sie Bibliotheken von Drittanbietern, die in einem anderen Code aufgerufen werden, um Argumente und Ausgaben zu testen oder sogar ihre Implementierung neu zu definieren.

Es gibt zwei Möglichkeiten, Funktionen zu mocken: Entweder durch Erstellen einer Mock-Funktion für den Testcode oder durch Schreiben eines manuellen Mocks, um eine Modulabhängigkeit zu überschreiben.

### Mocken von Datei-Importen

Stellen wir uns vor, unsere Komponente importiert eine Hilfsmethode aus einer Datei, um einen Klick zu behandeln.

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

In unserer Komponente wird der Klick-Handler wie folgt verwendet:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

Um den `handleClick` aus `utils.js` zu mocken, können wir die `mock`-Methode in unserem Test wie folgt verwenden:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * mock named export "handleClick" of `utils.ts` file
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

### Mocken von Abhängigkeiten

Angenommen, wir haben eine Klasse, die Benutzer von unserer API abruft. Die Klasse verwendet [`axios`](https://github.com/axios/axios), um die API aufzurufen, und gibt dann das Datenattribut zurück, das alle Benutzer enthält:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Um diese Methode zu testen, ohne tatsächlich die API aufzurufen (und damit langsame und fragile Tests zu erstellen), können wir die Funktion `mock(...)` verwenden, um das axios-Modul automatisch zu mocken.

Sobald wir das Modul gemockt haben, können wir einen [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) für `.get` bereitstellen, der die Daten zurückgibt, gegen die unser Test prüfen soll. Wir sagen im Grunde, dass wir möchten, dass `axios.get('/users.json')` eine gefälschte Antwort zurückgibt.

```js title=users.test.js
import axios from 'axios'; // imports defined mock
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * mock default export of `axios` dependency
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

        // or you could use the following depending on your use case:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## Teilweise Mocks

Teilmengen eines Moduls können gemockt werden, während der Rest des Moduls seine tatsächliche Implementierung beibehält:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Das ursprüngliche Modul wird an die Mock-Factory übergeben, die Sie verwenden können, um z.B. eine Abhängigkeit teilweise zu mocken:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // Mock the default export and named export 'foo'
    // and propagate named export from the original module
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

Manuelle Mocks werden definiert, indem ein Modul in einem Unterverzeichnis `__mocks__/` (siehe auch Option `automockDir`) geschrieben wird. Wenn das Modul, das Sie mocken, ein Node-Modul ist (z.B.: `lodash`), sollte der Mock im Verzeichnis `__mocks__` platziert werden und wird automatisch gemockt. Es ist nicht notwendig, explizit `mock('module_name')` aufzurufen.

Scoped Module (auch bekannt als Scoped Packages) können gemockt werden, indem eine Datei in einer Verzeichnisstruktur erstellt wird, die dem Namen des Scoped Moduls entspricht. Um beispielsweise ein Scoped Modul namens `@scope/project-name` zu mocken, erstellen Sie eine Datei unter `__mocks__/@scope/project-name.js` und erstellen Sie das Verzeichnis `@scope/` entsprechend.

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

Wenn ein manueller Mock für ein bestimmtes Modul existiert, verwendet WebdriverIO dieses Modul, wenn explizit `mock('moduleName')` aufgerufen wird. Wenn jedoch automock auf true gesetzt ist, wird die manuelle Mock-Implementierung anstelle des automatisch erstellten Mocks verwendet, auch wenn `mock('moduleName')` nicht aufgerufen wird. Um dieses Verhalten zu deaktivieren, müssen Sie in Tests, die die tatsächliche Modulimplementierung verwenden sollen, explizit `unmock('moduleName')` aufrufen, z.B.:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

Damit Mocking im Browser funktioniert, schreibt WebdriverIO die Testdateien um und hebt die Mock-Aufrufe über alles andere hinaus (siehe auch [dieser Blogbeitrag](https://www.coolcomputerclub.com/posts/jest-hoist-await/) zum Hoisting-Problem in Jest). Dies schränkt die Art und Weise ein, wie Sie Variablen in den Mock-Resolver übergeben können, z.B.:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ this fails as `dep` and `variable` are not defined inside the mock resolver
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

Um dies zu beheben, müssen Sie alle verwendeten Variablen innerhalb des Resolvers definieren, z.B.:

```js title=component.test.js
/**
 * ✔️ this works as all variables are defined within the resolver
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

Wenn Sie nach dem Mocken von Browser-Anfragen suchen, z.B. API-Aufrufen, gehen Sie zum Abschnitt [Request Mock and Spies](/docs/mocksandspies).