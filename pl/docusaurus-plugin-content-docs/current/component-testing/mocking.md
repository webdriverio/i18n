---
id: mocking
title: Mockowanie
description: "Mockuj funkcje, moduły i żądania sieciowe w testach komponentów z browser runnerem za pomocą fn, spyOn i mock z @wdio/browser-runner."
---

Podczas pisania testów to tylko kwestia czasu, zanim będziesz musiał utworzyć „fałszywą” wersję wewnętrznej — lub zewnętrznej — usługi. Jest to powszechnie nazywane mockowaniem. WebdriverIO udostępnia funkcje narzędziowe, które ci w tym pomogą. Możesz użyć `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'`, aby uzyskać do nich dostęp. Więcej informacji o dostępnych narzędziach do mockowania znajdziesz w [dokumentacji API](/docs/api/modules#wdiobrowser-runner).

## Funkcje

Aby sprawdzić, czy określone funkcje obsługi (handlery) są wywoływane w ramach testów komponentów, moduł `@wdio/browser-runner` eksportuje prymitywy do mockowania, których możesz użyć do testowania, czy te funkcje zostały wywołane. Możesz zaimportować te metody poprzez:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Importując `fn`, możesz utworzyć funkcję szpiegującą (mock), aby śledzić jej wykonanie, a za pomocą `spyOn` śledzić metodę na już utworzonym obiekcie.

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
         * sprawdź, czy handler został wywołany
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

WebdriverIO po prostu reeksportuje tutaj [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy), czyli lekką, kompatybilną z Jest implementację szpiegów, której można używać z matcherami [`expect`](/docs/api/expect-webdriverio) WebdriverIO. Więcej dokumentacji na temat tych funkcji mockujących znajdziesz na [stronie projektu Vitest](https://vitest.dev/api/mock.html).

Oczywiście możesz również zainstalować i zaimportować dowolny inny framework do szpiegowania, np. [SinonJS](https://sinonjs.org/), o ile obsługuje on środowisko przeglądarki.

## Moduły

Mockuj lokalne moduły lub obserwuj biblioteki zewnętrzne, które są wywoływane w innym kodzie, co pozwala testować argumenty, wynik, a nawet ponownie zadeklarować ich implementację.

Istnieją dwa sposoby mockowania funkcji: albo poprzez utworzenie funkcji mockującej do użycia w kodzie testu, albo poprzez napisanie ręcznego mocka, aby nadpisać zależność modułu.

### Mockowanie importów plików

Wyobraźmy sobie, że nasz komponent importuje metodę narzędziową z pliku, aby obsłużyć kliknięcie.

```js title=utils.js
export function handleClick () {
    // implementacja handlera
}
```

W naszym komponencie handler kliknięcia jest używany w następujący sposób:

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
 * zamockuj nazwany eksport "handleClick" z pliku `utils.ts`
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

Teraz, aby przetestować tę metodę bez faktycznego odpytywania API (a tym samym bez tworzenia wolnych i niestabilnych testów), możemy użyć funkcji `mock(...)`, aby automatycznie zamockować moduł axios.

Po zamockowaniu modułu możemy dostarczyć [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) dla `.get`, która zwraca dane, względem których nasz test ma wykonać asercje. W efekcie mówimy, że chcemy, aby `axios.get('/users.json')` zwracało fałszywą odpowiedź.

```js title=users.test.js
import axios from 'axios'; // importuje zdefiniowany mock
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * zamockuj domyślny eksport zależności `axios`
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

        // lub możesz użyć poniższego, w zależności od przypadku użycia:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## Częściowe mocki

Można zamockować podzbiory modułu, a reszta modułu może zachować swoją rzeczywistą implementację:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Oryginalny moduł zostanie przekazany do fabryki mocka, której możesz użyć np. do częściowego zamockowania zależności:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // Zamockuj domyślny eksport i nazwany eksport 'foo'
    // oraz przekaż nazwane eksporty z oryginalnego modułu
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

Ręczne mocki definiuje się, pisząc moduł w podkatalogu `__mocks__/` (zobacz także opcję `automockDir`). Jeśli mockowany moduł jest modułem Node (np. `lodash`), mock powinien zostać umieszczony w katalogu `__mocks__` i zostanie automatycznie zamockowany. Nie ma potrzeby jawnego wywoływania `mock('module_name')`.

Moduły z zakresem (scoped modules, znane również jako scoped packages) można mockować, tworząc plik w strukturze katalogów odpowiadającej nazwie modułu z zakresem. Na przykład, aby zamockować moduł z zakresem o nazwie `@scope/project-name`, utwórz plik `__mocks__/@scope/project-name.js`, odpowiednio tworząc katalog `@scope/`.

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

Gdy dla danego modułu istnieje ręczny mock, WebdriverIO użyje tego modułu przy jawnym wywołaniu `mock('moduleName')`. Jednak gdy automock jest ustawiony na true, implementacja ręcznego mocka zostanie użyta zamiast automatycznie utworzonego mocka, nawet jeśli `mock('moduleName')` nie zostanie wywołane. Aby zrezygnować z tego zachowania, musisz jawnie wywołać `unmock('moduleName')` w testach, które powinny używać rzeczywistej implementacji modułu, np.:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

Aby mockowanie działało w przeglądarce, WebdriverIO przepisuje pliki testowe i przenosi (hoistuje) wywołania mocków ponad wszystko inne (zobacz także [ten wpis na blogu](https://www.coolcomputerclub.com/posts/jest-hoist-await/) o problemie hoistingu w Jest). Ogranicza to sposób, w jaki możesz przekazywać zmienne do resolvera mocka, np.:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ to nie działa, ponieważ `dep` i `variable` nie są zdefiniowane wewnątrz resolvera mocka
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

Aby to naprawić, musisz zdefiniować wszystkie używane zmienne wewnątrz resolvera, np.:

```js title=component.test.js
/**
 * ✔️ to działa, ponieważ wszystkie zmienne są zdefiniowane wewnątrz resolvera
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

Jeśli szukasz sposobu na mockowanie żądań przeglądarki, np. wywołań API, przejdź do sekcji [Request Mock and Spies](/docs/mocksandspies).

W testach komponentów używaj dla `browser.mock()` wzorca bezwzględnego URL ze stałym protokołem i nazwą hosta, takiego jak `https://api.webdriver.io/api/*`. Wzorzec bez hosta, taki jak `*/api/*`, przechwytuje każde żądanie strony, w tym ruch samego browser runnera związany z Vite i sterownikiem.

Używaj pojedynczego `*`, który dopasowuje również ukośniki. Kolejne symbole wieloznaczne przed stałym tekstem, takie jak `**/api/**` lub `**/data.json`, mogą powodować nadmierny backtracking wyrażeń regularnych na niepowiązanych adresach URL i zawiesić test. Zobacz [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548), [issue #15739](https://github.com/webdriverio/webdriverio/issues/15739) oraz [ostrzeżenie dotyczące symboli wieloznacznych w URL](/docs/mocksandspies#creating-a-mock).