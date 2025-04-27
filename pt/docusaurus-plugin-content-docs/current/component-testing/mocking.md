---
id: mocking
title: Simulação
---

Ao escrever testes, é apenas uma questão de tempo até que você precise criar uma versão "falsa" de um serviço interno — ou externo. Isso é comumente chamado de simulação (mocking). O WebdriverIO fornece funções utilitárias para ajudá-lo. Você pode `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` para acessá-las. Veja mais informações sobre os utilitários de simulação disponíveis na [documentação da API](/docs/api/modules#wdiobrowser-runner).

## Funções

Para validar se certos manipuladores de função são chamados como parte dos seus testes de componentes, o módulo `@wdio/browser-runner` exporta primitivas de simulação que você pode usar para testar se essas funções foram chamadas. Você pode importar esses métodos via:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Ao importar `fn`, você pode criar uma função espiã (mock) para rastrear sua execução e com `spyOn` rastrear um método em um objeto já criado.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

O exemplo completo pode ser encontrado no repositório [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

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

O exemplo completo pode ser encontrado no diretório [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

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

O WebdriverIO apenas reexporta [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) aqui, que é uma implementação leve de espião compatível com Jest que pode ser usada com os verificadores [`expect`](/docs/api/expect-webdriverio) do WebdriverIO. Você pode encontrar mais documentação sobre essas funções de simulação na [página do projeto Vitest](https://vitest.dev/api/mock.html).

Claro, você também pode instalar e importar qualquer outro framework de espionagem, por exemplo, [SinonJS](https://sinonjs.org/), desde que ele suporte o ambiente do navegador.

## Módulos

Simule módulos locais ou observe bibliotecas de terceiros, que são invocadas em algum outro código, permitindo que você teste argumentos, saída ou até mesmo redefina sua implementação.

Existem duas maneiras de simular funções: criando uma função de simulação para usar no código de teste ou escrevendo uma simulação manual para substituir uma dependência de módulo.

### Simulando Importações de Arquivos

Vamos imaginar que nosso componente está importando um método utilitário de um arquivo para lidar com um clique.

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

Em nosso componente, o manipulador de clique é usado da seguinte forma:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

Para simular o `handleClick` de `utils.js`, podemos usar o método `mock` em nosso teste da seguinte maneira:

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

### Simulando Dependências

Suponha que tenhamos uma classe que busca usuários da nossa API. A classe usa [`axios`](https://github.com/axios/axios) para chamar a API e depois retorna o atributo de dados que contém todos os usuários:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Agora, para testar este método sem realmente acessar a API (e assim criar testes lentos e frágeis), podemos usar a função `mock(...)` para simular automaticamente o módulo axios.

Uma vez que simulamos o módulo, podemos fornecer um [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) para `.get` que retorna os dados contra os quais queremos que nosso teste verifique. Na prática, estamos dizendo que queremos que `axios.get('/users.json')` retorne uma resposta falsa.

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

## Parciais

Subconjuntos de um módulo podem ser simulados e o resto do módulo pode manter sua implementação real:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

O módulo original será passado para a fábrica de simulação que você pode usar para, por exemplo, simular parcialmente uma dependência:

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

## Simulações Manuais

Simulações manuais são definidas escrevendo um módulo em um subdiretório `__mocks__/` (veja também a opção `automockDir`). Se o módulo que você está simulando é um módulo Node (por exemplo: `lodash`), a simulação deve ser colocada no diretório `__mocks__` e será automaticamente simulada. Não há necessidade de chamar explicitamente `mock('module_name')`.

Módulos com escopo (também conhecidos como pacotes com escopo) podem ser simulados criando um arquivo em uma estrutura de diretório que corresponde ao nome do módulo com escopo. Por exemplo, para simular um módulo com escopo chamado `@scope/project-name`, crie um arquivo em `__mocks__/@scope/project-name.js`, criando o diretório `@scope/` adequadamente.

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

Quando existe uma simulação manual para um determinado módulo, o WebdriverIO usará esse módulo ao chamar explicitamente `mock('moduleName')`. No entanto, quando o automock está definido como verdadeiro, a implementação de simulação manual será usada em vez da simulação criada automaticamente, mesmo que `mock('moduleName')` não seja chamado. Para optar por não usar esse comportamento, você precisará chamar explicitamente `unmock('moduleName')` em testes que devem usar a implementação real do módulo, por exemplo:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

Para fazer com que a simulação funcione no navegador, o WebdriverIO reescreve os arquivos de teste e eleva as chamadas de simulação acima de tudo (veja também [este post do blog](https://www.coolcomputerclub.com/posts/jest-hoist-await/) sobre o problema de elevação no Jest). Isso limita a maneira como você pode passar variáveis para o resolvedor de simulação, por exemplo:

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

Para corrigir isso, você deve definir todas as variáveis usadas dentro do resolvedor, por exemplo:

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

## Requisições

Se você está procurando simular requisições do navegador, por exemplo, chamadas de API, vá para a seção [Simulação e Espionagem de Requisições](/docs/mocksandspies).