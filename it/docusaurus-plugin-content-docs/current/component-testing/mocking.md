---
id: mocking
title: Mock
---

Quando scrivi test, è solo questione di tempo prima che tu abbia bisogno di creare una versione "falsa" di un servizio interno o esterno. Questo è comunemente indicato come mocking. WebdriverIO fornisce funzioni di utilità per aiutarti. Puoi utilizzare `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` per accedervi. Vedi ulteriori informazioni sulle utilità di mocking disponibili nella [documentazione API](/docs/api/modules#wdiobrowser-runner).

## Funzioni

Per validare se determinati gestori di funzioni vengono chiamati come parte dei test dei componenti, il modulo `@wdio/browser-runner` esporta primitive di mocking che puoi utilizzare per verificare se queste funzioni sono state chiamate. Puoi importare questi metodi tramite:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Importando `fn` puoi creare una funzione spia (mock) per tracciarne l'esecuzione e con `spyOn` tracciare un metodo su un oggetto già creato.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

L'esempio completo può essere trovato nel repository [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

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

L'esempio completo può essere trovato nella directory [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

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

WebdriverIO ri-esporta qui [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy), che è un'implementazione leggera di spy compatibile con Jest che può essere utilizzata con i matcher [`expect`](/docs/api/expect-webdriverio) di WebdriverIO. Puoi trovare ulteriore documentazione su queste funzioni mock nella [pagina del progetto Vitest](https://vitest.dev/api/mock.html).

Naturalmente, puoi anche installare e importare qualsiasi altro framework di spy, ad esempio [SinonJS](https://sinonjs.org/), purché supporti l'ambiente del browser.

## Moduli

Crea mock di moduli locali o osserva librerie di terze parti, che vengono invocate in qualche altro codice, consentendoti di testare argomenti, output o persino ridefinire la loro implementazione.

Ci sono due modi per creare mock di funzioni: creando una funzione mock da utilizzare nel codice di test, o scrivendo un mock manuale per sovrascrivere una dipendenza del modulo.

### Mock di Import di File

Immaginiamo che il nostro componente stia importando un metodo di utilità da un file per gestire un click.

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

Nel nostro componente il gestore dei click viene utilizzato come segue:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

Per creare un mock di `handleClick` da `utils.js` possiamo utilizzare il metodo `mock` nel nostro test come segue:

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

### Mock di Dipendenze

Supponiamo di avere una classe che recupera gli utenti dalla nostra API. La classe utilizza [`axios`](https://github.com/axios/axios) per chiamare l'API e poi restituisce l'attributo data che contiene tutti gli utenti:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Ora, per testare questo metodo senza effettivamente colpire l'API (e quindi creare test lenti e fragili), possiamo utilizzare la funzione `mock(...)` per creare automaticamente un mock del modulo axios.

Una volta creato il mock del modulo, possiamo fornire un [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) per `.get` che restituisce i dati contro cui vogliamo che il nostro test faccia l'asserzione. In effetti, stiamo dicendo che vogliamo che `axios.get('/users.json')` restituisca una risposta falsa.

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

## Parziali

Sottoinsiemi di un modulo possono essere simulati mentre il resto del modulo mantiene la loro implementazione effettiva:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Il modulo originale verrà passato nella factory del mock che puoi utilizzare per creare un mock parziale di una dipendenza:

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

## Mock Manuali

I mock manuali vengono definiti scrivendo un modulo in una sottodirectory `__mocks__/` (vedi anche l'opzione `automockDir`). Se il modulo che stai simulando è un modulo Node (ad esempio: `lodash`), il mock dovrebbe essere posizionato nella directory `__mocks__` e verrà automaticamente simulato. Non è necessario chiamare esplicitamente `mock('module_name')`.

I moduli con scope (noti anche come pacchetti con scope) possono essere simulati creando un file in una struttura di directory che corrisponde al nome del modulo con scope. Ad esempio, per simulare un modulo con scope chiamato `@scope/project-name`, crea un file in `__mocks__/@scope/project-name.js`, creando la directory `@scope/` di conseguenza.

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

Quando esiste un mock manuale per un determinato modulo, WebdriverIO utilizzerà quel modulo quando si chiama esplicitamente `mock('moduleName')`. Tuttavia, quando automock è impostato su true, l'implementazione del mock manuale verrà utilizzata al posto del mock creato automaticamente, anche se non viene chiamato `mock('moduleName')`. Per disattivare questo comportamento dovrai chiamare esplicitamente `unmock('moduleName')` nei test che dovrebbero utilizzare l'implementazione effettiva del modulo, ad esempio:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

Per far funzionare il mocking nel browser, WebdriverIO riscrive i file di test e solleva le chiamate mock sopra tutto il resto (vedi anche [questo post del blog](https://www.coolcomputerclub.com/posts/jest-hoist-await/) sul problema di hoisting in Jest). Questo limita il modo in cui puoi passare variabili nel resolver del mock, ad esempio:

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

Per risolvere questo problema, devi definire tutte le variabili utilizzate all'interno del resolver, ad esempio:

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

## Richieste

Se stai cercando di simulare richieste del browser, ad esempio chiamate API, vai alla sezione [Mock e Spy di Richieste](/docs/mocksandspies).