---
id: mocking
title: Mocking
description: "Simula funzioni, moduli e richieste di rete nei test dei componenti con il browser runner usando fn, spyOn e mock da @wdio/browser-runner."
---

Quando si scrivono test, è solo questione di tempo prima di dover creare una versione "finta" di un servizio interno — o esterno. Questa pratica viene comunemente chiamata mocking. WebdriverIO fornisce funzioni di utilità per aiutarti. Puoi usare `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` per accedervi. Consulta maggiori informazioni sulle utilità di mocking disponibili nella [documentazione API](/docs/api/modules#wdiobrowser-runner).

## Funzioni

Per verificare se determinati gestori di funzioni vengono chiamati nell'ambito dei test dei componenti, il modulo `@wdio/browser-runner` esporta primitive di mocking che puoi usare per testare se queste funzioni sono state chiamate. Puoi importare questi metodi tramite:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Importando `fn` puoi creare una funzione spia (mock) per tracciarne l'esecuzione, mentre con `spyOn` puoi tracciare un metodo su un oggetto già creato.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

L'esempio completo si trova nel repository [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

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
         * verifica che il gestore sia stato chiamato
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

L'esempio completo si trova nella directory [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

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

Qui WebdriverIO si limita a riesportare [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy), un'implementazione di spie leggera e compatibile con Jest che può essere usata con i matcher [`expect`](/docs/api/expect-webdriverio) di WebdriverIO. Puoi trovare ulteriore documentazione su queste funzioni mock nella [pagina del progetto Vitest](https://vitest.dev/api/mock.html).

Naturalmente, puoi anche installare e importare qualsiasi altro framework di spie, ad esempio [SinonJS](https://sinonjs.org/), purché supporti l'ambiente browser.

## Moduli

Simula moduli locali od osserva librerie di terze parti invocate da altro codice, in modo da poter testare argomenti, output o persino ridefinirne l'implementazione.

Esistono due modi per simulare le funzioni: creando una funzione mock da usare nel codice di test, oppure scrivendo un mock manuale per sostituire una dipendenza di un modulo.

### Mocking delle importazioni di file

Immaginiamo che il nostro componente importi un metodo di utilità da un file per gestire un clic.

```js title=utils.js
export function handleClick () {
    // implementazione del gestore
}
```

Nel nostro componente il gestore del clic viene usato come segue:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

Per simulare `handleClick` da `utils.js` possiamo usare il metodo `mock` nel nostro test come segue:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * simula l'export nominato "handleClick" del file `utils.ts`
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

### Mocking delle dipendenze

Supponiamo di avere una classe che recupera gli utenti dalla nostra API. La classe usa [`axios`](https://github.com/axios/axios) per chiamare l'API e poi restituisce l'attributo data che contiene tutti gli utenti:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Ora, per testare questo metodo senza chiamare effettivamente l'API (e quindi creare test lenti e fragili), possiamo usare la funzione `mock(...)` per simulare automaticamente il modulo axios.

Una volta simulato il modulo, possiamo fornire un [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) per `.get` che restituisca i dati su cui vogliamo che il nostro test effettui le verifiche. In pratica, stiamo dicendo che vogliamo che `axios.get('/users.json')` restituisca una risposta finta.

```js title=users.test.js
import axios from 'axios'; // importa il mock definito
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * simula l'export predefinito della dipendenza `axios`
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

        // oppure, a seconda del caso d'uso, puoi usare:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## Mock parziali

È possibile simulare sottoinsiemi di un modulo, mentre il resto del modulo mantiene la sua implementazione reale:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Il modulo originale viene passato alla factory del mock, che puoi usare ad esempio per simulare parzialmente una dipendenza:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // Simula l'export predefinito e l'export nominato 'foo'
    // e propaga gli export nominati dal modulo originale
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

## Mock manuali

I mock manuali si definiscono scrivendo un modulo in una sottodirectory `__mocks__/` (vedi anche l'opzione `automockDir`). Se il modulo che stai simulando è un modulo Node (ad es.: `lodash`), il mock deve essere posizionato nella directory `__mocks__` e verrà simulato automaticamente. Non è necessario chiamare esplicitamente `mock('module_name')`.

I moduli con scope (noti anche come scoped packages) possono essere simulati creando un file in una struttura di directory che corrisponde al nome del modulo con scope. Ad esempio, per simulare un modulo con scope chiamato `@scope/project-name`, crea un file in `__mocks__/@scope/project-name.js`, creando di conseguenza la directory `@scope/`.

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

Quando esiste un mock manuale per un determinato modulo, WebdriverIO utilizzerà quel modulo quando si chiama esplicitamente `mock('moduleName')`. Tuttavia, quando automock è impostato su true, verrà utilizzata l'implementazione del mock manuale al posto del mock creato automaticamente, anche se `mock('moduleName')` non viene chiamato. Per disattivare questo comportamento dovrai chiamare esplicitamente `unmock('moduleName')` nei test che devono usare l'implementazione reale del modulo, ad esempio:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

Per far funzionare il mocking nel browser, WebdriverIO riscrive i file di test e sposta (hoisting) le chiamate mock al di sopra di tutto il resto (vedi anche [questo articolo](https://www.coolcomputerclub.com/posts/jest-hoist-await/) sul problema dell'hoisting in Jest). Questo limita il modo in cui è possibile passare variabili al resolver del mock, ad esempio:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ questo fallisce perché `dep` e `variable` non sono definite all'interno del resolver del mock
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

Per risolvere il problema devi definire tutte le variabili utilizzate all'interno del resolver, ad esempio:

```js title=component.test.js
/**
 * ✔️ questo funziona perché tutte le variabili sono definite all'interno del resolver
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

Se stai cercando di simulare le richieste del browser, ad esempio le chiamate API, consulta la sezione [Request Mock and Spies](/docs/mocksandspies).

Nei test dei componenti, usa per `browser.mock()` un pattern URL assoluto con protocollo e hostname fissi, come `https://api.webdriver.io/api/*`. Un pattern senza host come `*/api/*` intercetta ogni richiesta della pagina, compreso il traffico di Vite e del driver del browser runner stesso.

Usa un singolo `*`, che corrisponde anche alle barre. Wildcard consecutive prima di testo fisso, come `**/api/**` o `**/data.json`, possono causare un backtracking eccessivo delle regex su URL non correlati e bloccare un test. Vedi [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548), [issue #15739](https://github.com/webdriverio/webdriverio/issues/15739) e l'[avviso sulle wildcard negli URL](/docs/mocksandspies#creating-a-mock).