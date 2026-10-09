---
id: mocking
title: Mocking
description: "Mocka funktioner, moduler och nätverksanrop i komponenttester med browser runner med hjälp av fn, spyOn och mock från @wdio/browser-runner."
---

När du skriver tester är det bara en tidsfråga innan du behöver skapa en "falsk" version av en intern — eller extern — tjänst. Detta brukar kallas mocking. WebdriverIO tillhandahåller hjälpfunktioner för att underlätta detta. Du kan använda `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` för att komma åt dem. Se mer information om de tillgängliga mocking-verktygen i [API-dokumentationen](/docs/api/modules#wdiobrowser-runner).

## Funktioner

För att kunna validera huruvida vissa funktionshanterare anropas som en del av dina komponenttester exporterar modulen `@wdio/browser-runner` mocking-primitiver som du kan använda för att testa om dessa funktioner har anropats. Du kan importera dessa metoder via:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Genom att importera `fn` kan du skapa en spionfunktion (mock) för att spåra dess körning, och med `spyOn` kan du spåra en metod på ett redan skapat objekt.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

Det fullständiga exemplet finns i repot [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

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
         * verifiera att hanteraren anropades
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

Det fullständiga exemplet finns i katalogen [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

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

WebdriverIO återexporterar här bara [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy), som är en lättviktig Jest-kompatibel spionimplementation som kan användas med WebdriverIOs [`expect`](/docs/api/expect-webdriverio)-matchers. Du hittar mer dokumentation om dessa mock-funktioner på [Vitest-projektets sida](https://vitest.dev/api/mock.html).

Du kan naturligtvis också installera och importera vilket annat spionramverk som helst, t.ex. [SinonJS](https://sinonjs.org/), så länge det stöder webbläsarmiljön.

## Moduler

Mocka lokala moduler eller observera tredjepartsbibliotek som anropas i annan kod, vilket gör att du kan testa argument, utdata eller till och med omdeklarera deras implementation.

Det finns två sätt att mocka funktioner: antingen genom att skapa en mock-funktion att använda i testkoden, eller genom att skriva en manuell mock för att åsidosätta ett modulberoende.

### Mocka filimporter

Låt oss föreställa oss att vår komponent importerar en hjälpmetod från en fil för att hantera ett klick.

```js title=utils.js
export function handleClick () {
    // implementation av hanteraren
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

För att mocka `handleClick` från `utils.js` kan vi använda metoden `mock` i vårt test enligt följande:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * mocka den namngivna exporten "handleClick" i filen `utils.ts`
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

### Mocka beroenden

Anta att vi har en klass som hämtar användare från vårt API. Klassen använder [`axios`](https://github.com/axios/axios) för att anropa API:et och returnerar sedan data-attributet som innehåller alla användare:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

För att kunna testa denna metod utan att faktiskt anropa API:et (och därmed skapa långsamma och sköra tester) kan vi använda funktionen `mock(...)` för att automatiskt mocka axios-modulen.

När vi har mockat modulen kan vi tillhandahålla ett [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) för `.get` som returnerar den data vi vill att vårt test ska verifiera mot. I praktiken säger vi att vi vill att `axios.get('/users.json')` ska returnera ett falskt svar.

```js title=users.test.js
import axios from 'axios'; // importerar definierad mock
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * mocka standardexporten av beroendet `axios`
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

        // eller så kan du använda följande beroende på ditt användningsfall:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## Partiella mocks

Delar av en modul kan mockas medan resten av modulen behåller sin faktiska implementation:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Originalmodulen skickas in i mock-fabriken, som du kan använda för att t.ex. delvis mocka ett beroende:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // Mocka standardexporten och den namngivna exporten 'foo'
    // och vidarebefordra namngivna exporter från originalmodulen
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

## Manuella mocks

Manuella mocks definieras genom att skriva en modul i en underkatalog `__mocks__/` (se även alternativet `automockDir`). Om modulen du mockar är en Node-modul (t.ex. `lodash`) ska mocken placeras i katalogen `__mocks__` och kommer då att mockas automatiskt. Det finns inget behov av att explicit anropa `mock('module_name')`.

Scopade moduler (även kända som scopade paket) kan mockas genom att skapa en fil i en katalogstruktur som matchar namnet på den scopade modulen. För att till exempel mocka en scopad modul som heter `@scope/project-name` skapar du en fil i `__mocks__/@scope/project-name.js` och skapar katalogen `@scope/` i enlighet med detta.

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

När det finns en manuell mock för en given modul kommer WebdriverIO att använda den modulen när `mock('moduleName')` anropas explicit. När automock är satt till true kommer dock den manuella mock-implementationen att användas istället för den automatiskt skapade mocken, även om `mock('moduleName')` inte anropas. För att välja bort detta beteende behöver du explicit anropa `unmock('moduleName')` i tester som ska använda modulens faktiska implementation, t.ex.:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

För att mocking ska fungera i webbläsaren skriver WebdriverIO om testfilerna och lyfter (hoistar) mock-anropen ovanför allt annat (se även [detta blogginlägg](https://www.coolcomputerclub.com/posts/jest-hoist-await/) om hoisting-problemet i Jest). Detta begränsar hur du kan skicka in variabler till mock-resolvern, t.ex.:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ detta misslyckas eftersom `dep` och `variable` inte är definierade inuti mock-resolvern
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

För att lösa detta måste du definiera alla använda variabler inuti resolvern, t.ex.:

```js title=component.test.js
/**
 * ✔️ detta fungerar eftersom alla variabler är definierade inuti resolvern
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

## Anrop

Om du vill mocka webbläsaranrop, t.ex. API-anrop, gå till avsnittet [Request Mock and Spies](/docs/mocksandspies).

I komponenttester bör du använda ett absolut URL-mönster med fast protokoll och värdnamn för `browser.mock()`, till exempel `https://api.webdriver.io/api/*`. Ett mönster utan värd, som `*/api/*`, fångar upp varje anrop från sidan, inklusive browser runnerns egen Vite- och drivrutinstrafik.

Använd ett enda `*`, som även matchar snedstreck. Flera jokertecken i följd före fast text, som `**/api/**` eller `**/data.json`, kan orsaka överdriven regex-backtracking på orelaterade URL:er och få ett test att frysa. Se [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548), [issue #15739](https://github.com/webdriverio/webdriverio/issues/15739) och [varningen om URL-jokertecken](/docs/mocksandspies#creating-a-mock).