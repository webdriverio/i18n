---
id: mocking
title: Mocking
description: "Simula funciones, módulos y peticiones de red en pruebas de componentes del browser runner con fn, spyOn y mock de @wdio/browser-runner."
---

Al escribir pruebas, es solo cuestión de tiempo antes de que necesites crear una versión "falsa" de un servicio interno o externo. Esto se conoce comúnmente como mocking. WebdriverIO proporciona funciones de utilidad para ayudarte. Puedes usar `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` para acceder a ellas. Consulta más información sobre las utilidades de mocking disponibles en la [documentación de la API](/docs/api/modules#wdiobrowser-runner).

## Funciones

Para validar si ciertos manejadores de funciones se llaman como parte de tus pruebas de componentes, el módulo `@wdio/browser-runner` exporta primitivas de mocking que puedes usar para comprobar si estas funciones han sido llamadas. Puedes importar estos métodos mediante:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Al importar `fn` puedes crear una función espía (mock) para rastrear su ejecución, y con `spyOn` rastrear un método en un objeto ya creado.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

El ejemplo completo se puede encontrar en el repositorio [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

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
         * verifica que el manejador fue llamado
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

Aquí WebdriverIO simplemente reexporta [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy), que es una implementación de espías ligera y compatible con Jest que puede usarse con los matchers de [`expect`](/docs/api/expect-webdriverio) de WebdriverIO. Puedes encontrar más documentación sobre estas funciones mock en la [página del proyecto Vitest](https://vitest.dev/api/mock.html).

Por supuesto, también puedes instalar e importar cualquier otro framework de espías, p. ej. [SinonJS](https://sinonjs.org/), siempre que sea compatible con el entorno del navegador.

## Módulos

Simula módulos locales u observa bibliotecas de terceros que se invocan en algún otro código, lo que te permite probar argumentos, salidas o incluso redeclarar su implementación.

Hay dos formas de simular funciones: creando una función mock para usar en el código de prueba, o escribiendo un mock manual para sobrescribir una dependencia de módulo.

### Simular importaciones de archivos

Imaginemos que nuestro componente importa un método de utilidad desde un archivo para manejar un clic.

```js title=utils.js
export function handleClick () {
    // implementación del manejador
}
```

En nuestro componente, el manejador de clic se usa de la siguiente manera:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

Para simular `handleClick` de `utils.js` podemos usar el método `mock` en nuestra prueba de la siguiente manera:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * simula la exportación nombrada "handleClick" del archivo `utils.ts`
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

### Simular dependencias

Supongamos que tenemos una clase que obtiene usuarios de nuestra API. La clase usa [`axios`](https://github.com/axios/axios) para llamar a la API y luego devuelve el atributo data que contiene todos los usuarios:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Ahora, para probar este método sin llegar a llamar realmente a la API (y así evitar crear pruebas lentas y frágiles), podemos usar la función `mock(...)` para simular automáticamente el módulo axios.

Una vez que simulamos el módulo, podemos proporcionar un [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) para `.get` que devuelva los datos contra los que queremos que nuestra prueba haga las aserciones. En efecto, estamos diciendo que queremos que `axios.get('/users.json')` devuelva una respuesta falsa.

```js title=users.test.js
import axios from 'axios'; // importa el mock definido
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * simula la exportación por defecto de la dependencia `axios`
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

        // o podrías usar lo siguiente dependiendo de tu caso de uso:
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

El módulo original se pasará a la factoría del mock, que puedes usar, p. ej., para simular parcialmente una dependencia:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // Simula la exportación por defecto y la exportación nombrada 'foo'
    // y propaga la exportación nombrada del módulo original
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

## Mocks manuales

Los mocks manuales se definen escribiendo un módulo en un subdirectorio `__mocks__/` (consulta también la opción `automockDir`). Si el módulo que estás simulando es un módulo de Node (p. ej.: `lodash`), el mock debe colocarse en el directorio `__mocks__` y se simulará automáticamente. No es necesario llamar explícitamente a `mock('module_name')`.

Los módulos con ámbito (también conocidos como paquetes con ámbito o scoped packages) se pueden simular creando un archivo en una estructura de directorios que coincida con el nombre del módulo con ámbito. Por ejemplo, para simular un módulo con ámbito llamado `@scope/project-name`, crea un archivo en `__mocks__/@scope/project-name.js`, creando el directorio `@scope/` en consecuencia.

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

Cuando existe un mock manual para un módulo determinado, WebdriverIO usará ese módulo al llamar explícitamente a `mock('moduleName')`. Sin embargo, cuando automock está establecido en true, se usará la implementación del mock manual en lugar del mock creado automáticamente, incluso si no se llama a `mock('moduleName')`. Para desactivar este comportamiento, tendrás que llamar explícitamente a `unmock('moduleName')` en las pruebas que deban usar la implementación real del módulo, p. ej.:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

Para que el mocking funcione en el navegador, WebdriverIO reescribe los archivos de prueba y eleva (hoisting) las llamadas a mock por encima de todo lo demás (consulta también [esta entrada de blog](https://www.coolcomputerclub.com/posts/jest-hoist-await/) sobre el problema del hoisting en Jest). Esto limita la forma en que puedes pasar variables al resolver del mock, p. ej.:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ esto falla porque `dep` y `variable` no están definidas dentro del resolver del mock
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

Para solucionarlo, debes definir todas las variables utilizadas dentro del resolver, p. ej.:

```js title=component.test.js
/**
 * ✔️ esto funciona porque todas las variables están definidas dentro del resolver
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

## Peticiones

Si buscas simular peticiones del navegador, p. ej. llamadas a API, dirígete a la sección [Request Mock and Spies](/docs/mocksandspies).

En las pruebas de componentes, usa un patrón de URL absoluto con un protocolo y un nombre de host fijos para `browser.mock()`, como `https://api.webdriver.io/api/*`. Un patrón sin host como `*/api/*` intercepta todas las peticiones de la página, incluido el tráfico propio de Vite y del driver del browser runner.

Usa un único `*`, que también coincide con barras. Los comodines consecutivos antes de un texto fijo, como `**/api/**` o `**/data.json`, pueden provocar un retroceso (backtracking) excesivo de expresiones regulares en URLs no relacionadas y congelar una prueba. Consulta el [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548), el [issue #15739](https://github.com/webdriverio/webdriverio/issues/15739) y la [advertencia sobre comodines en URLs](/docs/mocksandspies#creating-a-mock).