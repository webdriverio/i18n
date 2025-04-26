---
id: mocking
title: Mocking
---

Cuando escribes pruebas, es solo cuestión de tiempo antes de que necesites crear una versión "falsa" de un servicio interno o externo. Esto se conoce comúnmente como mocking. WebdriverIO proporciona funciones de utilidad para ayudarte. Puedes `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` para acceder a ellas. Consulta más información sobre las utilidades de mocking disponibles en los [documentos de la API](/docs/api/modules#wdiobrowser-runner).

## Funciones

Para validar si ciertos manejadores de funciones son llamados como parte de tus pruebas de componentes, el módulo `@wdio/browser-runner` exporta primitivas de mocking que puedes usar para probar si estas funciones han sido llamadas. Puedes importar estos métodos a través de:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Al importar `fn` puedes crear una función espía (mock) para rastrear su ejecución y con `spyOn` rastrear un método en un objeto ya creado.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

El ejemplo completo se puede encontrar en el repositorio de [Ejemplos de Pruebas de Componentes](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

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

El ejemplo completo se puede encontrar en el directorio de [ejemplos](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

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

WebdriverIO simplemente reexporta [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) aquí, que es una implementación ligera de espía compatible con Jest que se puede usar con los comparadores [`expect`](/docs/api/expect-webdriverio) de WebdriverIO. Puedes encontrar más documentación sobre estas funciones de mock en la [página del proyecto Vitest](https://vitest.dev/api/mock.html).

Por supuesto, también puedes instalar e importar cualquier otro framework de espías, por ejemplo [SinonJS](https://sinonjs.org/), siempre que sea compatible con el entorno del navegador.

## Módulos

Simula módulos locales u observa bibliotecas de terceros que se invocan en algún otro código, lo que te permite probar argumentos, salida o incluso redeclarar su implementación.

Hay dos formas de simular funciones: ya sea creando una función de simulación para usar en el código de prueba, o escribiendo una simulación manual para anular una dependencia de módulo.

### Simulando importaciones de archivos

Imaginemos que nuestro componente está importando un método de utilidad desde un archivo para manejar un clic.

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

En nuestro componente, el manejador de clics se usa de la siguiente manera:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

Para simular el `handleClick` de `utils.js` podemos usar el método `mock` en nuestra prueba de la siguiente manera:

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

### Simulando dependencias

Supongamos que tenemos una clase que obtiene usuarios de nuestra API. La clase usa [`axios`](https://github.com/axios/axios) para llamar a la API y luego devuelve el atributo de datos que contiene todos los usuarios:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Ahora, para probar este método sin realmente acceder a la API (y así crear pruebas lentas y frágiles), podemos usar la función `mock(...)` para simular automáticamente el módulo axios.

Una vez que simulamos el módulo, podemos proporcionar un [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) para `.get` que devuelve los datos contra los que queremos que nuestra prueba afirme. En efecto, estamos diciendo que queremos que `axios.get('/users.json')` devuelva una respuesta falsa.

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

## Parciales

Se pueden simular subconjuntos de un módulo y el resto del módulo puede mantener su implementación real:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

El módulo original se pasará a la fábrica de simulación que puedes usar para, por ejemplo, simular parcialmente una dependencia:

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

## Simulaciones manuales

Las simulaciones manuales se definen escribiendo un módulo en un subdirectorio `__mocks__/` (ver también la opción `automockDir`). Si el módulo que estás simulando es un módulo de Node (por ejemplo: `lodash`), la simulación debe colocarse en el directorio `__mocks__` y se simulará automáticamente. No es necesario llamar explícitamente a `mock('module_name')`.

Los módulos con ámbito (también conocidos como paquetes con ámbito) pueden simularse creando un archivo en una estructura de directorios que coincida con el nombre del módulo con ámbito. Por ejemplo, para simular un módulo con ámbito llamado `@scope/project-name`, crea un archivo en `__mocks__/@scope/project-name.js`, creando el directorio `@scope/` en consecuencia.

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

Cuando existe una simulación manual para un módulo dado, WebdriverIO usará ese módulo cuando se llame explícitamente a `mock('moduleName')`. Sin embargo, cuando automock está configurado como true, se utilizará la implementación de simulación manual en lugar de la simulación creada automáticamente, incluso si no se llama a `mock('moduleName')`. Para optar por no usar este comportamiento, deberás llamar explícitamente a `unmock('moduleName')` en las pruebas que deberían usar la implementación real del módulo, por ejemplo:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Elevación (Hoisting)

Para que la simulación funcione en el navegador, WebdriverIO reescribe los archivos de prueba y eleva las llamadas de simulación por encima de todo lo demás (consulta también [esta publicación de blog](https://www.coolcomputerclub.com/posts/jest-hoist-await/) sobre el problema de elevación en Jest). Esto limita la forma en que puedes pasar variables al resolvedor de simulación, por ejemplo:

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

Para solucionar esto, debes definir todas las variables utilizadas dentro del resolvedor, por ejemplo:

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

## Solicitudes

Si estás buscando simular solicitudes del navegador, por ejemplo, llamadas a API, dirígete a la sección [Simulación y espías de solicitudes](/docs/mocksandspies).