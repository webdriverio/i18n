---
id: mocking
title: Mockowanie
---

Podczas pisania testów to tylko kwestia czasu, zanim będziesz potrzebować stworzyć "fałszywą" wersję wewnętrznej — lub zewnętrznej — usługi. Jest to powszechnie nazywane mockowaniem. WebdriverIO dostarcza funkcje narzędziowe, które mogą Ci pomóc. Możesz użyć `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'`, aby uzyskać do nich dostęp. Zobacz więcej informacji o dostępnych narzędziach do mockowania w [dokumentacji API](/docs/api/modules#wdiobrowser-runner).

## Funkcje

Aby sprawdzić, czy określone funkcje obsługujące są wywoływane jako część testów komponentów, moduł `@wdio/browser-runner` eksportuje prymitywy mockujące, których możesz użyć do sprawdzenia, czy te funkcje zostały wywołane. Możesz zaimportować te metody za pomocą:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Importując `fn` możesz utworzyć funkcję szpiegującą (mock), aby śledzić jej wykonanie, a za pomocą `spyOn` możesz śledzić metodę na już utworzonym obiekcie.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

Pełny przykład można znaleźć w repozytorium [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

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

Pełny przykład można znaleźć w katalogu [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

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

WebdriverIO po prostu reeksportuje tutaj [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy), który jest lekką implementacją szpiegów kompatybilną z Jest, którą można używać z matcherami [`expect`](/docs/api/expect-webdriverio) WebdriverIO. Więcej dokumentacji na temat tych funkcji mockujących można znaleźć na [stronie projektu Vitest](https://vitest.dev/api/mock.html).

Oczywiście możesz też zainstalować i zaimportować dowolny inny framework do szpiegowania, np. [SinonJS](https://sinonjs.org/), o ile wspiera on środowisko przeglądarki.

## Moduły

Mockuj lokalne moduły lub obserwuj biblioteki innych firm, które są wywoływane w innym kodzie, umożliwiając testowanie argumentów, wyników lub nawet redefiniowanie ich implementacji.

Istnieją dwa sposoby mockowania funkcji: albo poprzez utworzenie funkcji mockującej do użycia w kodzie testowym, albo napisanie ręcznego mocka, aby zastąpić zależność modułu.

### Mockowanie importów plików

Wyobraźmy sobie, że nasz komponent importuje metodę narzędziową z pliku, aby obsłużyć kliknięcie.

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

W naszym komponencie obsługa kliknięcia jest używana w następujący sposób:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

Aby zamockować `handleClick` z `utils.js`, możemy użyć metody `mock` w naszym teście w następujący sposób:

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

### Mockowanie zależności

Załóżmy, że mamy klasę, która pobiera użytkowników z naszego API. Klasa używa [`axios`](https://github.com/axios/axios) do wywołania API, a następnie zwraca atrybut data, który zawiera wszystkich użytkowników:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Teraz, aby przetestować tę metodę bez faktycznego uderzania w API (i w ten sposób tworzenia wolnych i kruchych testów), możemy użyć funkcji `mock(...)` do automatycznego mockowania modułu axios.

Po zamockowaniu modułu możemy dostarczyć [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) dla `.get`, który zwraca dane, względem których chcemy testować. W efekcie mówimy, że chcemy, aby `axios.get('/users.json')` zwrócił fałszywą odpowiedź.

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

## Częściowe mockowanie

Podzbiory modułu mogą być mockowane, a reszta modułu może zachować swoją rzeczywistą implementację:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Oryginalny moduł zostanie przekazany do fabryki mockującej, której możesz użyć np. do częściowego mockowania zależności:

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

## Ręczne mocki

Ręczne mocki są definiowane poprzez napisanie modułu w podkatalogu `__mocks__/` (zobacz również opcję `automockDir`). Jeśli moduł, który mockujesz, jest modułem Node (np.: `lodash`), mock powinien być umieszczony w katalogu `__mocks__` i zostanie automatycznie zamockowany. Nie ma potrzeby jawnego wywoływania `mock('module_name')`.

Moduły z zakresem (znane również jako pakiety z zakresem) mogą być mockowane poprzez utworzenie pliku w strukturze katalogów, która odpowiada nazwie modułu z zakresem. Na przykład, aby zamockować moduł z zakresem o nazwie `@scope/project-name`, utwórz plik w `__mocks__/@scope/project-name.js`, tworząc odpowiednio katalog `@scope/`.

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

Gdy istnieje ręczny mock dla danego modułu, WebdriverIO użyje tego modułu, gdy jawnie wywołamy `mock('moduleName')`. Jednak gdy automock jest ustawiony na true, ręczna implementacja mocka będzie używana zamiast automatycznie utworzonego mocka, nawet jeśli `mock('moduleName')` nie jest wywoływane. Aby zrezygnować z tego zachowania, będziesz musiał jawnie wywołać `unmock('moduleName')` w testach, które powinny używać rzeczywistej implementacji modułu, np.:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

Aby mockowanie działało w przeglądarce, WebdriverIO przepisuje pliki testowe i podnosi wywołania mocków powyżej wszystkiego innego (zobacz także [ten wpis na blogu](https://www.coolcomputerclub.com/posts/jest-hoist-await/) o problemie hoistingu w Jest). Ogranicza to sposób, w jaki możesz przekazywać zmienne do resolvera mocka, np.:

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

Aby to naprawić, musisz zdefiniować wszystkie używane zmienne wewnątrz resolvera, np.:

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

## Żądania

Jeśli szukasz sposobów na mockowanie żądań przeglądarki, np. wywołań API, przejdź do sekcji [Mocki i Szpiedzy Żądań](/docs/mocksandspies).