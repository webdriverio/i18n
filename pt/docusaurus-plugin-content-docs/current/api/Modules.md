---
id: modules
title: Módulos
---

O WebdriverIO publica vários módulos no NPM e outros registros que você pode usar para construir seu próprio framework de automação. Veja mais documentação sobre os tipos de configuração do WebdriverIO [aqui](/docs/setuptypes).

## `webdriver` e `devtools`

Os pacotes de protocolo ([`webdriver`](https://www.npmjs.com/package/webdriver) e [`devtools`](https://www.npmjs.com/package/devtools)) expõem uma classe com as seguintes funções estáticas anexadas que permitem iniciar sessões:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Inicia uma nova sessão com capacidades específicas. Com base na resposta da sessão, comandos de diferentes protocolos serão fornecidos.

##### Parâmetros

- `options`: [Opções do WebDriver](/docs/configuration#webdriver-options)
- `modifier`: função que permite modificar a instância do cliente antes de ser retornada
- `userPrototype`: objeto de propriedades que permite estender o protótipo da instância
- `customCommandWrapper`: função que permite encapsular funcionalidades em torno das chamadas de função

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

- `attachInstance`: instância para conectar a uma sessão ou pelo menos um objeto com uma propriedade `sessionId` (ex.: `{ sessionId: 'xxx' }`)
- `modifier`: função que permite modificar a instância do cliente antes de ser retornada
- `userPrototype`: objeto de propriedades que permite estender o protótipo da instância
- `customCommandWrapper`: função que permite encapsular funcionalidades em torno das chamadas de função

##### Retorna

- Objeto [Browser](/docs/api/browser)

##### Exemplo

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Recarrega uma sessão dada a instância fornecida.

##### Parâmetros

- `instance`: instância do pacote para recarregar

##### Exemplo

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Semelhante aos pacotes de protocolo (`webdriver` e `devtools`), você também pode usar as APIs do pacote WebdriverIO para gerenciar sessões. As APIs podem ser importadas usando `import { remote, attach, multiremote } from 'webdriverio'` e contêm as seguintes funcionalidades:

#### `remote(options, modifier)`

Inicia uma sessão WebdriverIO. A instância contém todos os comandos do pacote de protocolo, mas com funções de ordem superior adicionais, veja [documentação da API](/docs/api).

##### Parâmetros

- `options`: [Opções do WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: função que permite modificar a instância do cliente antes de ser retornada

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

- `attachOptions`: instância para conectar a uma sessão ou pelo menos um objeto com uma propriedade `sessionId` (ex.: `{ sessionId: 'xxx' }`)

##### Retorna

- Objeto [Browser](/docs/api/browser)

##### Exemplo

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

Inicia uma instância multiremote que permite controlar várias sessões em uma única instância. Confira nossos [exemplos de multiremote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) para casos de uso concretos.

##### Parâmetros

- `multiremoteOptions`: um objeto com chaves representando o nome do navegador e suas [Opções do WebdriverIO](/docs/configuration#webdriverio).

##### Retorna

- Objeto [Browser](/docs/api/browser)

##### Exemplo

```js
import { multiremote } from 'webdriverio'

const matrix = await multiremote({
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
// returns ['Google', 'JSON']
```

## `@wdio/cli`

Em vez de chamar o comando `wdio`, você também pode incluir o executor de teste como módulo e executá-lo em um ambiente arbitrário. Para isso, você precisará requerer o pacote `@wdio/cli` como módulo, assim:

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

O construtor da classe `Launcher` espera a URL para o arquivo de configuração e um objeto `opts` com configurações que sobrescreverão as da configuração.

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

Ao executar testes de unidade ou componente usando o [browser runner](/docs/runner#browser-runner) do WebdriverIO, você pode importar utilitários de simulação para seus testes, por exemplo:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

As seguintes exportações nomeadas estão disponíveis:

#### `fn`

Função de simulação, veja mais na [documentação oficial do Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Função de espionagem, veja mais na [documentação oficial do Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Método para simular arquivo ou módulo de dependência.

##### Parâmetros

- `moduleName`: caminho relativo para o arquivo a ser simulado ou um nome de módulo.
- `factory`: função para retornar o valor simulado (opcional)

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

Desfaz a simulação de dependência que é definida dentro do diretório de simulação manual (`__mocks__`).

##### Parâmetros

- `moduleName`: nome do módulo a ser dessimulado.

##### Exemplo

```js
unmock('lodash')
```