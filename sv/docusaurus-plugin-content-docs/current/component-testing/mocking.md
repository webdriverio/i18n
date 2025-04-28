---
id: mocking
title: Mockning
---

När du skriver tester är det bara en tidsfråga innan du behöver skapa en "falsk" version av en intern — eller extern — tjänst. Detta kallas vanligtvis för mockning. WebdriverIO tillhandahåller verktygsfunktioner för att hjälpa dig. Du kan `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` för att få tillgång till dem. Se mer information om tillgängliga mockningsfunktioner i [API-dokumentationen](/docs/api/modules#wdiobrowser-runner).

## Funktioner

För att validera om vissa funktionshanterare anropas som en del av dina komponenttester exporterar modulen `@wdio/browser-runner` mockningsprimitiver som du kan använda för att testa om dessa funktioner har anropats. Du kan importera dessa metoder via:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Genom att importera `fn` kan du skapa en spion-funktion (mock) för att spåra dess exekvering och med `spyOn` spåra en metod på ett redan skapat objekt.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

Det fullständiga exemplet finns i [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx) repository.

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

Det fullständiga exemplet finns i [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js) katalogen.

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

WebdriverIO återexporterar bara [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) här, vilket är en lättviktig Jest-kompatibel spionimplementation som kan användas med WebdriverIOs [`expect`](/docs/api/expect-webdriverio) matchers. Du kan hitta mer dokumentation om dessa mockfunktioner på [Vitest projektsidan](https://vitest.dev/api/mock.html).

Naturligtvis kan du också installera och importera andra spionramverk, t.ex. [SinonJS](https://sinonjs.org/), så länge de stöder webbläsarmiljön.

## Moduler

Mocka lokala moduler eller observera tredjepartsbibliotek som åberopas i någon annan kod, vilket gör det möjligt att testa argument, utdata eller till och med omdeklarera dess implementering.

Det finns två sätt att mocka funktioner: Antingen genom att skapa en mockfunktion för användning i testkod, eller genom att skriva en manuell mock för att åsidosätta en modulberoende.

### Mockning av filimporter

Låt oss föreställa oss att vår komponent importerar en hjälpmetod från en fil för att hantera ett klick.

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

I vår komponent används klickhanteraren enligt följande:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

För att mocka `handleClick` från `utils.js` kan vi använda `mock`-metoden i vårt test enligt följande:

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

### Mockning av beroenden

Anta att vi har en klass som hämtar användare från vår API. Klassen använder [`axios`](https://github.com/axios/axios) för att anropa API:et och returnerar sedan dataattributet som innehåller alla användare:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

För att testa denna metod utan att faktiskt träffa API:et (och därmed skapa långsamma och ömtåliga tester), kan vi använda funktionen `mock(...)` för att automatiskt mocka axios-modulen.

När vi mockar modulen kan vi tillhandahålla en [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) för `.get` som returnerar data som vi vill att vårt test ska kontrollera. I praktiken säger vi att vi vill att `axios.get('/users.json')` ska returnera ett falskt svar.

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

## Partiella mockar

Delmängder av en modul kan mockas och resten av modulen kan behålla sin faktiska implementering:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Den ursprungliga modulen kommer att skickas till mockfabriken som du kan använda för att t.ex. delvis mocka ett beroende:

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

## Manuella mockar

Manuella mockar definieras genom att skriva en modul i en underkatalog `__mocks__/` (se även alternativet `automockDir`). Om modulen du mockar är en Node-modul (t.ex.: `lodash`), bör mocken placeras i katalogen `__mocks__` och kommer att automatiskt mockas. Det finns inget behov av att uttryckligen anropa `mock('module_name')`.

Scoped modules (även kända som scoped packages) kan mockas genom att skapa en fil i en katalogstruktur som matchar namnet på den scoped modulen. För att exempelvis mocka en scoped modul som kallas `@scope/project-name`, skapa en fil på `__mocks__/@scope/project-name.js`, och skapa katalogen `@scope/` i enlighet med detta.

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

När en manuell mock finns för en given modul kommer WebdriverIO att använda den modulen när man uttryckligen anropar `mock('moduleName')`. Men när automock är inställt på true, kommer den manuella mockimplementationen att användas istället för den automatiskt skapade mocken, även om `mock('moduleName')` inte anropas. För att välja bort detta beteende måste du uttryckligen anropa `unmock('moduleName')` i tester som ska använda den faktiska modulimplementationen, t.ex.:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

För att få mockning att fungera i webbläsaren skriver WebdriverIO om testfilerna och lyfter (hoist) mock-anropen över allt annat (se även [detta blogginlägg](https://www.coolcomputerclub.com/posts/jest-hoist-await/) om hoisting-problemet i Jest). Detta begränsar hur du kan skicka in variabler i mocklösaren, t.ex.:

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

För att fixa detta måste du definiera alla använda variabler inuti lösaren, t.ex.:

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

## Requests

Om du letar efter mockning av webbläsarförfrågningar, t.ex. API-anrop, gå till avsnittet [Request Mock and Spies](/docs/mocksandspies).