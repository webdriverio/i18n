---
id: customcommands
title: Comandos Personalizados
description: "Adicione seus próprios comandos de navegador e de elemento com addCommand, sobrescreva comandos existentes e estenda as definições de tipo do TypeScript."
---

Se você quiser estender a instância `browser` com seu próprio conjunto de comandos, o método de navegador `addCommand` está aqui para você. Você pode escrever seu comando de forma assíncrona, assim como em suas especificações.

## Parâmetros

### Nome do Comando

<Option type="String">

Um nome que define o comando e que será anexado ao escopo do navegador ou do elemento.

</Option>

### Função Personalizada

<Option type="Function">

Uma função que é executada quando o comando é chamado. O escopo `this` é [`WebdriverIO.Browser`](/docs/api/browser), [`WebdriverIO.Element`](/docs/api/element) ou `WebdriverIO.BrowsingContext`, dependendo se o comando é anexado ao navegador, aos elementos ou aos contextos de navegação.

</Option>

### Opções

Objeto com opções de configuração que modificam o comportamento do comando personalizado

#### Escopo Alvo

<Option type="Boolean" default="false" name="attachToElement">

Flag para decidir se o comando deve ser anexado ao escopo do navegador ou do elemento. Se definido como `true`, o comando será um comando de elemento.

</Option>

<Option type="Boolean" default="false" name="attachToBrowsingContext">

Flag para anexar o comando a todos os contextos de navegação: as abas, janelas e frames que `browser.url()`, `browser.newWindow()`, `browser.browsingContexts()` e `context.frame()` retornam em uma sessão WebDriver BiDi. Não pode ser combinada com `attachToElement`. Veja [Contextos de navegação](#browsing-contexts).

</Option>

#### Desativar implicitWait

<Option type="Boolean" default="false" name="disableElementImplicitWait">

Flag para decidir se deve aguardar implicitamente que o elemento exista antes de chamar o comando personalizado.

</Option>

## Exemplos

Este exemplo mostra como adicionar um novo comando que retorna a URL atual e o título como um único resultado. O escopo (`this`) é um objeto [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` se refere ao escopo do `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Além disso, você pode estender a instância do elemento com seu próprio conjunto de comandos definindo `attachToElement` como `true`. O escopo (`this`) neste caso é um objeto [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` é o valor de retorno de $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Por padrão, comandos personalizados de elemento aguardam que o elemento exista antes de chamar o comando personalizado. Embora na maioria das vezes isso seja desejado, caso não seja, pode ser desativado com `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` é o valor de retorno de $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```

Comandos personalizados oferecem a oportunidade de agrupar uma sequência específica de comandos que você usa com frequência em uma única chamada. Você pode definir comandos personalizados em qualquer ponto da sua suíte de testes; apenas certifique-se de que o comando seja definido *antes* do seu primeiro uso. (O hook `before` no seu `wdio.conf.js` é um bom lugar para criá-los.)

Uma vez definidos, você pode usá-los da seguinte forma:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Nota:__ Se você registrar um comando personalizado no escopo do `browser`, o comando não estará acessível para elementos. Da mesma forma, se você registrar um comando no escopo do elemento, ele não estará acessível no escopo do `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // exibe "function"
console.log(typeof elem.myCustomBrowserCommand()) // exibe "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // exibe "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // exibe "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // exibe "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // exibe "2"
```

__Nota:__ Se você precisar encadear um comando personalizado, o comando deve terminar com `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Tenha cuidado para não sobrecarregar o escopo do `browser` com muitos comandos personalizados.

Recomendamos definir a lógica personalizada em [page objects](pageobjects), para que fiquem vinculados a uma página específica.

### Contextos de navegação

Em uma sessão WebDriver BiDi, uma aba, uma janela e um frame são, cada um, um `WebdriverIO.BrowsingContext`. Defina `attachToBrowsingContext` como `true` para adicionar um comando a todos eles. O escopo (`this`) é o contexto no qual o comando foi chamado, e `this.browser` é o navegador ao qual ele pertence:

```js
browser.addCommand('heading', async function () {
    // `this` é a aba, janela ou frame
    return this.$('h1').getText()
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
console.log(await page.heading())

const frame = await page.frame('iframe')
console.log(await frame.heading())
```

O comando está disponível nos contextos que já existem e em todos os contextos criados posteriormente, incluindo frames de outra origem. Um comando que só faz sentido para uma aba ou janela pode verificar `this.isFrame`.

`addCommand` e `overwriteCommand` chamados no próprio contexto de navegação lançam um erro. Registre o comando no navegador.

### Multi-remote

`addCommand` funciona de forma semelhante para multi-remote, exceto que o novo comando será propagado para as instâncias filhas. Você precisa ter cuidado ao usar o objeto `this`, pois o `browser` multi-remote e suas instâncias filhas têm `this` diferentes.

Este exemplo mostra como adicionar um novo comando para multi-remote.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` se refere a:
    //      - escopo MultiRemoteBrowser para o browser
    //      - escopo Browser para as instâncias
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiRemoteBrowser.getUrlAndTitle()
/*
{
    url: [ 'https://webdriver.io/', 'https://webdriver.io/' ],
    title: [
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO'
    ],
    customVar: undefined
}
*/

multiRemoteBrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## Estender Definições de Tipo

Com TypeScript, é fácil estender as interfaces do WebdriverIO. Adicione tipos aos seus comandos personalizados assim:

1. Crie um arquivo de definição de tipos (por exemplo, `./src/types/wdio.d.ts`)
2. a. Se estiver usando um arquivo de definição de tipos no estilo de módulo (usando import/export e `declare global WebdriverIO` no arquivo de definição de tipos), certifique-se de incluir o caminho do arquivo na propriedade `include` do `tsconfig.json`.

   b. Se estiver usando arquivos de definição de tipos no estilo ambiente (sem import/export nos arquivos de definição de tipos e `declare namespace WebdriverIO` para comandos personalizados), certifique-se de que o `tsconfig.json` *não* contenha nenhuma seção `include`, pois isso fará com que todos os arquivos de definição de tipos não listados na seção `include` não sejam reconhecidos pelo TypeScript.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Módulos (usando import/export)', value: 'modules'},
    {label: 'Definições de Tipo Ambiente (sem include no tsconfig)', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```json title="tsconfig.json"
{
    "compilerOptions": { ... },
    "include": [
        "./test/**/*.ts",
        "./src/types/**/*.ts"
    ]
}
```

</TabItem>
<TabItem value="ambient">

```json title="tsconfig.json"
{
    "compilerOptions": { ... }
}
```

</TabItem>
</Tabs>

3. Adicione definições para seus comandos de acordo com o seu modo de execução.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Módulos (usando import/export)', value: 'modules'},
    {label: 'Definições de Tipo Ambiente', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```typescript
declare global {
    namespace WebdriverIO {
        interface Browser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface MultiRemoteBrowser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface Element {
            elementCustomCommand: (arg: any) => Promise<number>
        }

        interface BrowsingContext {
            contextCustomCommand: (arg: any) => Promise<string>
        }
    }
}
```

</TabItem>
<TabItem value="ambient">

```typescript
declare namespace WebdriverIO {
    interface Browser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface MultiRemoteBrowser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface Element {
        elementCustomCommand: (arg: any) => Promise<number>
    }

    interface BrowsingContext {
        contextCustomCommand: (arg: any) => Promise<string>
    }
}
```

</TabItem>
</Tabs>

## Integrar Bibliotecas de Terceiros

Se você usa bibliotecas externas (por exemplo, para fazer chamadas a banco de dados) que suportam promises, uma boa abordagem para integrá-las é envolver determinados métodos da API com um comando personalizado.

Ao retornar a promise, o WebdriverIO garante que não continuará com o próximo comando até que a promise seja resolvida. Se a promise for rejeitada, o comando lançará um erro.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Então, basta usá-lo em suas especificações de teste do WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // retorna o corpo da resposta
})
```

**Nota:** O resultado do seu comando personalizado é o resultado da promise que você retorna.

## Sobrescrevendo Comandos

Você também pode sobrescrever comandos nativos com `overwriteCommand`.

Não é recomendado fazer isso, pois pode levar a um comportamento imprevisível do framework!

A abordagem geral é semelhante à do `addCommand`; a única diferença é que o primeiro argumento na função do comando é a função original que você está prestes a sobrescrever. Veja alguns exemplos abaixo.

### Sobrescrevendo Comandos do Navegador

```js
/**
 * Imprime os milissegundos antes da pausa e retorna seu valor.
 *
 * @param pause - nome do comando a ser sobrescrito
 * @param this of func - a instância original do navegador na qual a função foi chamada
 * @param originalPauseFunction of func - a função pause original
 * @param ms of func - os parâmetros reais passados
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// então use-o como antes
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Sobrescrevendo Comandos de Elemento

Sobrescrever comandos no nível do elemento é quase a mesma coisa. Defina `attachToElement` como `true`:

```js
/**
 * Tenta rolar até o elemento se ele não for clicável.
 * Passe { force: true } para clicar com JS mesmo que o elemento não esteja visível ou clicável.
 * Mostra que o tipo do argumento da função original pode ser mantido com `options?: ClickOptions`
 *
 * @param this of func - o elemento no qual a função original foi chamada
 * @param originalClickFunction of func - a função pause original
 * @param options of func - os parâmetros reais passados
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // tenta clicar
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // rola até o elemento e clica novamente
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // clicando com js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Não se esqueça de anexá-lo ao elemento
)

// então use-o como antes
const elem = await $('body')
await elem.click()

// ou passe parâmetros
await elem.click({ force: true })
```

### Sobrescrevendo Comandos de Contexto de Navegação

Defina `attachToBrowsingContext` como `true` para sobrescrever um comando nativo ou personalizado de todas as abas, janelas e frames. O comando original é vinculado ao contexto no qual foi chamado:

```js
browser.overwriteCommand('getTitle', async function (this, originalGetTitle) {
    const title = await originalGetTitle()
    return this.isFrame ? `frame: ${title}` : title
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
const frame = await page.frame('iframe')
console.log(await frame.getTitle()) // "frame: ..."
```

## Adicionar Mais Comandos WebDriver

Se você estiver usando o protocolo WebDriver e executar testes em uma plataforma que suporta comandos adicionais não definidos por nenhuma das definições de protocolo em [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), você pode adicioná-los manualmente através da interface `addCommand`. O pacote `webdriver` oferece um wrapper de comando que permite registrar esses novos endpoints da mesma forma que outros comandos, fornecendo as mesmas verificações de parâmetros e tratamento de erros. Para registrar esse novo endpoint, importe o wrapper de comando e registre um novo comando com ele da seguinte forma:

```js
import { command } from 'webdriver'

browser.addCommand('myNewCommand', command('POST', '/session/:sessionId/foobar/:someId', {
    command: 'myNewCommand',
    description: 'a new WebDriver command',
    ref: 'https://vendor.com/commands/#myNewCommand',
    variables: [{
        name: 'someId',
        description: 'some id to something'
    }],
    parameters: [{
        name: 'foo',
        type: 'string',
        description: 'a valid parameter',
        required: true
    }]
}))
```

Chamar este comando com parâmetros inválidos resulta no mesmo tratamento de erros que os comandos de protocolo predefinidos, por exemplo:

```js
// chama o comando sem o parâmetro de url obrigatório e sem payload
await browser.myNewCommand()

/**
 * resulta no seguinte erro:
 * Error: Wrong parameters applied for myNewCommand
 * Usage: myNewCommand(someId, foo)
 *
 * Property Description:
 *   "someId" (string): some id to something
 *   "foo" (string): a valid parameter
 *
 * For more info see https://my-api.com
 *    at Browser.protocolCommand (...)
 *    ...
 */
```

Chamar o comando corretamente, por exemplo `browser.myNewCommand('foo', 'bar')`, faz corretamente uma requisição WebDriver para, por exemplo, `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` com um payload como `{ foo: 'bar' }`.

:::note
O parâmetro de url `:sessionId` será automaticamente substituído pelo id da sessão WebDriver. Outros parâmetros de url podem ser aplicados, mas precisam ser definidos dentro de `variables`.
:::

Veja exemplos de como comandos de protocolo podem ser definidos no pacote [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).