---
id: mocking
title: Mocking
description: "Faça mock de funções, módulos e requisições de rede em testes de componentes do browser runner com fn, spyOn e mock do @wdio/browser-runner."
---

Ao escrever testes, é apenas uma questão de tempo até que você precise criar uma versão "falsa" de um serviço interno — ou externo. Isso é comumente chamado de mocking. O WebdriverIO fornece funções utilitárias para ajudar você. Você pode usar `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` para acessá-las. Veja mais informações sobre os utilitários de mocking disponíveis na [documentação da API](/docs/api/modules#wdiobrowser-runner).

## Funções

Para validar se determinados handlers de função são chamados como parte dos seus testes de componentes, o módulo `@wdio/browser-runner` exporta primitivas de mocking que você pode usar para testar se essas funções foram chamadas. Você pode importar esses métodos via:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Ao importar `fn` você pode criar uma função spy (mock) para rastrear sua execução e, com `spyOn`, rastrear um método em um objeto já criado.

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
         * verifica se o handler foi chamado
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

O WebdriverIO apenas reexporta aqui o [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy), que é uma implementação de spy leve e compatível com Jest que pode ser usada com os matchers [`expect`](/docs/api/expect-webdriverio) do WebdriverIO. Você pode encontrar mais documentação sobre essas funções de mock na [página do projeto Vitest](https://vitest.dev/api/mock.html).

Claro, você também pode instalar e importar qualquer outro framework de spy, por exemplo [SinonJS](https://sinonjs.org/), desde que ele suporte o ambiente do navegador.

## Módulos

Faça mock de módulos locais ou observe bibliotecas de terceiros que são invocadas em algum outro código, permitindo testar argumentos, saída ou até mesmo redeclarar sua implementação.

Há duas maneiras de fazer mock de funções: criando uma função de mock para usar no código de teste ou escrevendo um mock manual para substituir uma dependência de módulo.

### Mocking de Importações de Arquivos

Vamos imaginar que nosso componente está importando um método utilitário de um arquivo para lidar com um clique.

```js title=utils.js
export function handleClick () {
    // implementação do handler
}
```

Em nosso componente, o handler de clique é usado da seguinte forma:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

Para fazer mock do `handleClick` de `utils.js`, podemos usar o método `mock` em nosso teste da seguinte forma:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * faz mock do export nomeado "handleClick" do arquivo `utils.ts`
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

### Mocking de Dependências

Suponha que temos uma classe que busca usuários da nossa API. A classe usa [`axios`](https://github.com/axios/axios) para chamar a API e então retorna o atributo data, que contém todos os usuários:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Agora, para testar este método sem realmente acessar a API (e, assim, criar testes lentos e frágeis), podemos usar a função `mock(...)` para fazer mock automaticamente do módulo axios.

Depois de fazer mock do módulo, podemos fornecer um [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) para `.get` que retorna os dados sobre os quais queremos que nosso teste faça asserções. Na prática, estamos dizendo que queremos que `axios.get('/users.json')` retorne uma resposta falsa.

```js title=users.test.js
import axios from 'axios'; // importa o mock definido
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * faz mock do export padrão da dependência `axios`
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

        // ou você pode usar o seguinte, dependendo do seu caso de uso:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## Parciais

Subconjuntos de um módulo podem ser mockados e o restante do módulo pode manter sua implementação real:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

O módulo original será passado para a factory de mock, que você pode usar para, por exemplo, fazer mock parcial de uma dependência:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // Faz mock do export padrão e do export nomeado 'foo'
    // e propaga o export nomeado do módulo original
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

## Mocks Manuais

Mocks manuais são definidos escrevendo um módulo em um subdiretório `__mocks__/` (veja também a opção `automockDir`). Se o módulo que você está mockando for um módulo Node (por exemplo: `lodash`), o mock deve ser colocado no diretório `__mocks__` e será mockado automaticamente. Não há necessidade de chamar explicitamente `mock('module_name')`.

Módulos com escopo (também conhecidos como pacotes com escopo) podem ser mockados criando um arquivo em uma estrutura de diretórios que corresponda ao nome do módulo com escopo. Por exemplo, para fazer mock de um módulo com escopo chamado `@scope/project-name`, crie um arquivo em `__mocks__/@scope/project-name.js`, criando o diretório `@scope/` de acordo.

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

Quando existe um mock manual para um determinado módulo, o WebdriverIO usará esse módulo ao chamar explicitamente `mock('moduleName')`. No entanto, quando automock está definido como true, a implementação do mock manual será usada em vez do mock criado automaticamente, mesmo que `mock('moduleName')` não seja chamado. Para desativar esse comportamento, você precisará chamar explicitamente `unmock('moduleName')` nos testes que devem usar a implementação real do módulo, por exemplo:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

Para que o mocking funcione no navegador, o WebdriverIO reescreve os arquivos de teste e eleva (hoist) as chamadas de mock acima de todo o resto (veja também [este post de blog](https://www.coolcomputerclub.com/posts/jest-hoist-await/) sobre o problema de hoisting no Jest). Isso limita a maneira como você pode passar variáveis para o resolver do mock, por exemplo:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ isso falha, pois `dep` e `variable` não estão definidos dentro do resolver do mock
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

Para corrigir isso, você precisa definir todas as variáveis usadas dentro do resolver, por exemplo:

```js title=component.test.js
/**
 * ✔️ isso funciona, pois todas as variáveis estão definidas dentro do resolver
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

Se você está procurando fazer mock de requisições do navegador, por exemplo chamadas de API, acesse a seção [Request Mock and Spies](/docs/mocksandspies).

Em testes de componentes, use um padrão de URL absoluto com protocolo e hostname fixos para `browser.mock()`, como `https://api.webdriver.io/api/*`. Um padrão sem host, como `*/api/*`, intercepta todas as requisições da página, incluindo o tráfego do próprio Vite e do driver do browser runner.

Use um único `*`, que também corresponde a barras. Curingas consecutivos antes de texto fixo, como `**/api/**` ou `**/data.json`, podem causar backtracking excessivo de regex em URLs não relacionadas e congelar um teste. Veja a [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548), a [issue #15739](https://github.com/webdriverio/webdriverio/issues/15739) e o [aviso sobre curingas em URLs](/docs/mocksandspies#creating-a-mock).