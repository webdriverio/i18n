---
id: customcommands
title: Comandos Personalizados
---

Se você deseja estender a instância do `browser` com seu próprio conjunto de comandos, o método do navegador `addCommand` está aqui para você. Você pode escrever seu comando de forma assíncrona, assim como em suas especificações.

## Parâmetros

### Nome do Comando

Um nome que define o comando e será anexado ao escopo do navegador ou elemento.

Tipo: `String`

### Função Personalizada

Uma função que é executada quando o comando é chamado. O escopo `this` é ou [`WebdriverIO.Browser`](/docs/api/browser) ou [`WebdriverIO.Element`](/docs/api/element) dependendo se o comando é anexado ao escopo do navegador ou do elemento.

Tipo: `Function`

### Opções

Objeto com opções de configuração que modificam o comportamento do comando personalizado

#### Escopo Alvo

Sinalizador para decidir se deve anexar o comando ao escopo do navegador ou do elemento. Se definido como `true`, o comando será um comando de elemento.

Nome da Opção: `attachToElement`
Tipo: `Boolean`<br />
Padrão: `false`

#### Desabilitar implicitWait

Sinalizador para decidir se deve aguardar implicitamente pela existência do elemento antes de chamar o comando personalizado.

Nome da Opção: `disableElementImplicitWait`
Tipo: `Boolean`<br />
Padrão: `false`

## Exemplos

Este exemplo mostra como adicionar um novo comando que retorna a URL e o título atuais como um único resultado. O escopo (`this`) é um objeto [`WebdriverIO.Browser`](/docs/api/browser).

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

Adicionalmente, você pode estender a instância do elemento com seu próprio conjunto de comandos, passando `true` como o argumento final. O escopo (`this`) neste caso é um objeto [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` é o valor retornado de $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Por padrão, comandos personalizados de elemento esperam que o elemento exista antes de chamar o comando personalizado. Mesmo que na maioria das vezes isso seja desejado, se não for, pode ser desativado com `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` é o valor retornado de $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


Comandos personalizados oferecem a oportunidade de agrupar uma sequência específica de comandos que você usa frequentemente em uma única chamada. Você pode definir comandos personalizados em qualquer ponto da sua suite de testes; apenas certifique-se de que o comando seja definido *antes* do seu primeiro uso. (O hook `before` no seu `wdio.conf.js` é um bom lugar para criá-los.)

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

__Nota:__ Se você registrar um comando personalizado no escopo do `browser`, o comando não será acessível para elementos. Da mesma forma, se você registrar um comando no escopo do elemento, ele não será acessível no escopo do `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // imprime "function"
console.log(typeof elem.myCustomBrowserCommand()) // imprime "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // imprime "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // imprime "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // imprime "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // imprime "2"
```

__Nota:__ Se você precisar encadear um comando personalizado, o comando deve terminar com `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Tenha cuidado para não sobrecarregar o escopo do `browser` com muitos comandos personalizados.

Recomendamos definir lógica personalizada em [objetos de página](pageobjects), para que estejam vinculados a uma página específica.

### Multiremoto

`addCommand` funciona de maneira similar para multiremoto, exceto que o novo comando se propagará para as instâncias filhas. Você precisa estar atento ao usar o objeto `this`, já que o `browser` multiremoto e suas instâncias filhas têm diferentes `this`.

Este exemplo mostra como adicionar um novo comando para multiremoto.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` se refere a:
    //      - Escopo MultiRemoteBrowser para browser
    //      - Escopo Browser para instâncias
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

Com TypeScript, é fácil estender as interfaces WebdriverIO. Adicione tipos aos seus comandos personalizados assim:

1. Crie um arquivo de definição de tipo (ex., `./src/types/wdio.d.ts`)
2. a. Se estiver usando um arquivo de definição de tipo estilo módulo (usando import/export e `declare global WebdriverIO` no arquivo de definição de tipo), certifique-se de incluir o caminho do arquivo na propriedade `include` do `tsconfig.json`.

   b. Se estiver usando arquivos de definição de tipo no estilo ambiente (sem import/export nos arquivos de definição de tipo e `declare namespace WebdriverIO` para comandos personalizados), certifique-se de que o `tsconfig.json` *não* contenha nenhuma seção `include`, pois isso fará com que todos os arquivos de definição de tipo não listados na seção `include` não sejam reconhecidos pelo TypeScript.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Módulos (usando import/export)', value: 'modules'},
    {label: 'Definições de Tipo Ambiente (sem tsconfig include)', value: 'ambient'},
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

3. Adicione definições para seus comandos de acordo com seu modo de execução.

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
}
```

</TabItem>
</Tabs>

## Integrar Bibliotecas de Terceiros

Se você usar bibliotecas externas (por exemplo, para fazer chamadas de banco de dados) que suportam promessas, uma boa abordagem para integrá-las é embrulhar certos métodos de API com um comando personalizado.

Ao retornar a promessa, o WebdriverIO garante que não continue com o próximo comando até que a promessa seja resolvida. Se a promessa for rejeitada, o comando lançará um erro.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Então, basta usá-lo em suas especificações de teste WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // retorna o corpo da resposta
})
```

**Nota:** O resultado do seu comando personalizado é o resultado da promessa que você retorna.

## Sobrescrevendo Comandos

Você também pode sobrescrever comandos nativos com `overwriteCommand`.

Não é recomendado fazer isso, pois pode levar a um comportamento imprevisível do framework!

A abordagem geral é semelhante a `addCommand`, a única diferença é que o primeiro argumento na função de comando é a função original que você está prestes a sobrescrever. Veja alguns exemplos abaixo.

### Sobrescrevendo Comandos do Navegador

```js
/**
 * Imprime milissegundos antes da pausa e retorna seu valor.
 *
 * @param pause - nome do comando a ser sobrescrito
 * @param this of func - a instância original do navegador na qual a função foi chamada
 * @param originalPauseFunction of func - a função de pausa original
 * @param ms of func - os parâmetros reais passados
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// então use como antes
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Sobrescrevendo Comandos de Elemento

Sobrescrever comandos no nível do elemento é quase o mesmo. Simplesmente passe `true` como o terceiro argumento para `overwriteCommand`:

```js
/**
 * Tenta rolar até o elemento se ele não for clicável.
 * Passe { force: true } para clicar com JS mesmo se o elemento não estiver visível ou clicável.
 * Mostre que o tipo de argumento da função original pode ser mantido com `options?: ClickOptions`
 *
 * @param this of func - o elemento no qual a função original foi chamada
 * @param originalClickFunction of func - a função de pausa original
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
    { attachToElement: true }, // Não esqueça de anexá-lo ao elemento
)

// então use como antes
const elem = await $('body')
await elem.click()

// ou passe parâmetros
await elem.click({ force: true })
```

## Adicionar Mais Comandos WebDriver

Se você estiver usando o protocolo WebDriver e executando testes em uma plataforma que suporta comandos adicionais não definidos por nenhuma das definições de protocolo em [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), você pode adicioná-los manualmente através da interface `addCommand`. O pacote `webdriver` oferece um wrapper de comando que permite registrar esses novos endpoints da mesma forma que outros comandos, fornecendo as mesmas verificações de parâmetros e tratamento de erros. Para registrar esse novo endpoint, importe o wrapper de comando e registre um novo comando com ele da seguinte forma:

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

Chamar esse comando com parâmetros inválidos resulta no mesmo tratamento de erro que os comandos de protocolo predefinidos, por exemplo:

```js
// chama o comando sem o parâmetro de url necessário e payload
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

Chamar o comando corretamente, por exemplo, `browser.myNewCommand('foo', 'bar')`, faz corretamente uma solicitação WebDriver para, por exemplo, `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` com um payload como `{ foo: 'bar' }`.

:::note
O parâmetro de url `:sessionId` será automaticamente substituído pelo ID de sessão da sessão WebDriver. Outros parâmetros de url podem ser aplicados, mas precisam ser definidos dentro de `variables`.
:::

Veja exemplos de como comandos de protocolo podem ser definidos no pacote [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).