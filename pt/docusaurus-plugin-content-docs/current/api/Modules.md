---
id: modules
title: Módulos
---

O WebdriverIO publica vários módulos no NPM e em outros registros que você pode usar para construir seu próprio framework de automação. Veja mais documentação sobre os tipos de configuração do WebdriverIO [aqui](/docs/setuptypes).

## `webdriver` e `devtools`

Os pacotes de protocolo ([`webdriver`](https://www.npmjs.com/package/webdriver) e [`devtools`](https://www.npmjs.com/package/devtools)) expõem uma classe com as seguintes funções estáticas anexadas que permitem iniciar sessões:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Inicia uma nova sessão com capabilities específicas. Com base na resposta da sessão, serão fornecidos comandos de diferentes protocolos.

##### Parâmetros

- `options`: [Opções do WebDriver](/docs/configuration#webdriver-options)
- `modifier`: função que permite modificar a instância do cliente antes de ela ser retornada
- `userPrototype`: objeto de propriedades que permite estender o protótipo da instância
- `customCommandWrapper`: função que permite envolver funcionalidades em torno de chamadas de função

##### Retorna

- Objeto [Browser](/docs/api/browser)

##### Exemplo

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Conecta-se a uma sessão WebDriver ou DevTools em execução.

##### Parâmetros

- `attachInstance`: instância à qual conectar uma sessão ou, pelo menos, um objeto com uma propriedade `sessionId` (por exemplo, `{ sessionId: 'xxx' }`)
- `modifier`: função que permite modificar a instância do cliente antes de ela ser retornada
- `userPrototype`: objeto de propriedades que permite estender o protótipo da instância
- `customCommandWrapper`: função que permite envolver funcionalidades em torno de chamadas de função

##### Retorna

- Objeto [Browser](/docs/api/browser)

##### Exemplo

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Recarrega uma sessão com base na instância fornecida.

##### Parâmetros

- `instance`: instância do pacote a ser recarregada

##### Exemplo

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Assim como nos pacotes de protocolo (`webdriver` e `devtools`), você também pode usar as APIs do pacote WebdriverIO para gerenciar sessões. As APIs podem ser importadas usando `import { remote, attach, multiRemote } from 'webdriverio` e contêm as seguintes funcionalidades:

#### `remote(options, modifier)`

Inicia uma sessão WebdriverIO. A instância contém todos os comandos do pacote de protocolo, mas com funções adicionais de ordem superior, veja a [documentação da API](/docs/api).

##### Parâmetros

- `options`: [Opções do WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: função que permite modificar a instância do cliente antes de ela ser retornada

##### Retorna

- Objeto [Browser](/docs/api/browser)

##### Exemplo

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

Conecta-se a uma sessão WebdriverIO em execução.

##### Parâmetros

- `attachOptions`: instância à qual conectar uma sessão ou, pelo menos, um objeto com uma propriedade `sessionId` (por exemplo, `{ sessionId: 'xxx' }`)

##### Retorna

- Objeto [Browser](/docs/api/browser)

##### Exemplo

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiRemote(multiRemoteOptions)`

Inicia uma instância multi-remote que permite controlar várias sessões dentro de uma única instância. Confira nossos [exemplos de multi-remote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) para casos de uso concretos.

##### Parâmetros

- `multiRemoteOptions`: um objeto com chaves representando o nome do navegador e suas [Opções do WebdriverIO](/docs/configuration#webdriverio).

##### Retorna

- Objeto [Browser](/docs/api/browser)

##### Exemplo

```js
import { multiRemote } from 'webdriverio'

const matrix = await multiRemote({
    myChromeBrowser: {
        capabilities: { browserName: 'chrome' }
    },
    myFirefoxBrowser: {
        capabilities: { browserName: 'firefox' }
    }
})
await matrix.url('http://json.org')
await matrix.getInstance('browserA').url('https://google.com')

console.log(await matrix.getTitle())
// retorna ['Google', 'JSON']
```

#### `Key`

Um objeto contendo constantes de caracteres especiais para uso com o comando [`browser.keys`](/docs/api/browser/keys). Essas constantes representam teclas especiais que podem ser enviadas ao navegador, como `Enter`, `Tab`, `Escape`, teclas de seta, teclas de função e outras.

##### Exemplo

```js
import { Key } from 'webdriverio'

// Pressiona a tecla Enter
await browser.keys(Key.Enter)

// Usa Ctrl+A para selecionar tudo (funciona em várias plataformas)
await browser.keys([Key.Ctrl, 'a'])

// Navega com as teclas de seta
await browser.keys([Key.ArrowDown, Key.ArrowDown, Key.Enter])
```

##### Teclas disponíveis

As seguintes teclas especiais estão disponíveis através do objeto `Key`:

**Teclas modificadoras:**

| Constante | Descrição |
|----------|-------------|
| `Key.Ctrl` | Tecla control multiplataforma (Command no Mac, Control no Windows/Linux) |
| `Key.Control` | Tecla Control |
| `Key.Shift` | Tecla Shift |
| `Key.Alt` | Tecla Alt |
| `Key.Command` | Tecla Command (Mac) |
| `Key.NULL` | Tecla Null/liberação — libera todas as teclas modificadoras atualmente pressionadas |

**Teclas de navegação:**

| Constante | Descrição |
|----------|-------------|
| `Key.Cancel` | Tecla Cancel |
| `Key.Help` | Tecla Help |
| `Key.Backspace` | Tecla Backspace |
| `Key.Tab` | Tecla Tab |
| `Key.Clear` | Tecla Clear |
| `Key.Return` | Tecla Return |
| `Key.Enter` | Tecla Enter |
| `Key.Pause` | Tecla Pause |
| `Key.Escape` | Tecla Escape |
| `Key.Space` | Tecla de espaço |
| `Key.PageUp` | Tecla Page Up |
| `Key.PageDown` | Tecla Page Down |
| `Key.End` | Tecla End |
| `Key.Home` | Tecla Home |
| `Key.ArrowLeft` | Tecla de seta para a esquerda |
| `Key.ArrowUp` | Tecla de seta para cima |
| `Key.ArrowRight` | Tecla de seta para a direita |
| `Key.ArrowDown` | Tecla de seta para baixo |
| `Key.Insert` | Tecla Insert |
| `Key.Delete` | Tecla Delete |

**Teclas de caracteres:**

| Constante | Descrição |
|----------|-------------|
| `Key.Semicolon` | Tecla de ponto e vírgula |
| `Key.Equals` | Tecla de igual |

**Teclas do teclado numérico:**

| Constante | Descrição |
|----------|-------------|
| `Key.Numpad0` - `Key.Numpad9` | Teclado numérico 0-9 |
| `Key.Multiply` | Multiplicação do teclado numérico |
| `Key.Add` | Adição do teclado numérico |
| `Key.Separator` | Separador do teclado numérico |
| `Key.Subtract` | Subtração do teclado numérico |
| `Key.Decimal` | Decimal do teclado numérico |
| `Key.Divide` | Divisão do teclado numérico |

**Teclas de função:**

| Constante | Descrição |
|----------|-------------|
| `Key.F1` - `Key.F12` | Teclas de função F1 a F12 |

**Outras teclas:**

| Constante | Descrição |
|----------|-------------|
| `Key.ZenkakuHankaku` | Tecla Zenkaku/Hankaku (japonês) |

:::info Teclas modificadoras multiplataforma

A constante `Key.Ctrl` oferece uma maneira conveniente de usar o modificador "control" em diferentes sistemas operacionais. No macOS, ela corresponde à tecla `Command`, enquanto no Windows e no Linux corresponde à tecla `Control`. Isso é útil ao escrever testes que precisam funcionar em várias plataformas, por exemplo, para operações de selecionar tudo (`Ctrl+A`), copiar (`Ctrl+C`) ou colar (`Ctrl+V`).

:::

## `@wdio/cli`

Em vez de chamar o comando `wdio`, você também pode incluir o test runner como módulo e executá-lo em um ambiente arbitrário. Para isso, você precisará importar o pacote `@wdio/cli` como módulo, assim:

<Tabs
  defaultValue="esm"
  values={[
    {label: 'EcmaScript Modules', value: 'esm'},
    {label: 'CommonJS', value: 'cjs'}
  ]
}>
<TabItem value="esm">

```js
import Launcher from '@wdio/cli'
```

</TabItem>
<TabItem value="cjs">

```js
const Launcher = require('@wdio/cli').default
```

</TabItem>
</Tabs>

Depois disso, crie uma instância do launcher e execute o teste.

#### `Launcher(configPath, opts)`

O construtor da classe `Launcher` espera a URL do arquivo de configuração e um objeto `opts` com configurações que irão sobrescrever as do arquivo de configuração.

##### Parâmetros

- `configPath`: caminho para o `wdio.conf.js` a ser executado
- `opts`: argumentos ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) para sobrescrever valores do arquivo de configuração

##### Exemplo

```js
const wdio = new Launcher(
    '/path/to/my/wdio.conf.js',
    { spec: '/path/to/a/single/spec.e2e.js' }
)

wdio.run().then((exitCode) => {
    process.exit(exitCode)
}, (error) => {
    console.error('Launcher failed to start the test', error.stacktrace)
    process.exit(1)
})
```

O comando `run` retorna uma [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Ela é resolvida se os testes foram executados com sucesso ou falharam, e é rejeitada se o launcher não conseguiu iniciar a execução dos testes.

## `@wdio/browser-runner`

Ao executar testes unitários ou de componentes usando o [browser runner](/docs/runner#browser-runner) do WebdriverIO, você pode importar utilitários de mocking para seus testes, por exemplo:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Os seguintes exports nomeados estão disponíveis:

#### `fn`

Função mock, veja mais na [documentação oficial do Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Função spy, veja mais na [documentação oficial do Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Método para fazer mock de um arquivo ou módulo de dependência.

##### Parâmetros

- `moduleName`: um caminho relativo para o arquivo a ser mockado ou o nome de um módulo.
- `factory`: função que retorna o valor mockado (opcional)

##### Exemplo

```js
mock('../src/constants.ts', () => ({
    SOME_DEFAULT: 'mocked out'
}))

mock('lodash', (origModuleFactory) => {
    const origModule = await origModuleFactory()
    return {
        ...origModule,
        pick: fn()
    }
})
```

#### `unmock`

Remove o mock de uma dependência que está definida no diretório de mocks manuais (`__mocks__`).

##### Parâmetros

- `moduleName`: nome do módulo do qual o mock será removido.

##### Exemplo

```js
unmock('lodash')
```