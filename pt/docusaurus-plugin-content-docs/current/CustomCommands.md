---
id: customcommands
title: Comandos Personalizados
---

If you want to extend the `browser` instance with your own set of commands, the browser method `addCommand` is here for you. You can write your command in an asynchronous way, just as in your specs.

## Parameters

### Command Name

A name that defines the command and will be attached to the browser or element scope.

Type: `String`

### Custom Function

A function that is being executed when the command is called. The `this` scope is either [`WebdriverIO.Browser`](/docs/api/browser) or [`WebdriverIO.Element`](/docs/api/element) depending whether the command gets attached to the browser or element scope.

Type: `Function`

### Options

Object with configuration options modifying the custom command behavior

#### Target Scope

Flag to decide whether to attach the command to the browser or element scope. If set to `true` the command will be an element command.

Option Name: `attachToElement`
Type: `Boolean`<br />
Default: `false`

#### Disable implicitWait

Flag to decide whether to implicitly wait for the element to exist before calling the custom command.

Option Name: `disableElementImplicitWait`
Type: `Boolean`<br />
Default: `false`

## Examples

This example shows how to add a new command that returns the current URL and title as one result. The scope (`this`) is a [`WebdriverIO.Browser`](/docs/api/browser) object.

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` refers to the `browser` scope
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Additionally, you can extend the element instance with your own set of commands, by passing `true` as the final argument. The scope (`this`) in this case is a [`WebdriverIO.Element`](/docs/api/element) object.

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

By default, element custom commands wait for the element to exist before calling the custom command. Even though most of the time this is desired, if not, it can be disabled with `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


Os comandos personalizados oferecem a oportunidade de agrupar uma sequência específica de comandos que você usa frequentemente em uma única chamada. Você pode definir comandos personalizados em qualquer ponto em sua suíte de testes; apenas certifique-se de que o comando seja definido *antes* de seu primeiro uso. (O hook `before` em seu `wdio.conf.js` é um bom lugar para criá-los.)

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
console.log(typeof browser.myCustomBrowserCommand) // outputs "function"
console.log(typeof elem.myCustomBrowserCommand()) // outputs "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // outputs "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // outputs "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // outputs "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // outputs "2"
```

__Nota:__ Se você precisar encadear um comando personalizado, o comando deve terminar com `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Tenha cuidado para não sobrecarregar o escopo do `browser` com muitos comandos personalizados.

Recomendamos definir lógica personalizada em [objetos de página](pageobjects), para que estejam vinculados a uma página específica.

### Multiremote

`addCommand` funciona de maneira semelhante para multiremote, exceto que o novo comando se propagará para as instâncias filhas. Você precisa ter cuidado ao usar o objeto `this`, já que o `browser` multiremote e suas instâncias filhas têm `this` diferentes.

Este exemplo mostra como adicionar um novo comando para multiremote.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` refers to:
    //      - MultiRemoteBrowser scope for browser
    //      - Browser scope for instances
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiremotebrowser.getUrlAndTitle()
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

multiremotebrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## Extend Type Definitions

Com TypeScript, é fácil estender as interfaces WebdriverIO. Adicione tipos aos seus comandos personalizados assim:

1. Crie um arquivo de definição de tipos (por exemplo, `./src/types/wdio.d.ts`)
2. a. Se estiver usando um arquivo de definição de tipo estilo módulo (usando import/export e `declare global WebdriverIO` no arquivo de definição de tipo), certifique-se de incluir o caminho do arquivo na propriedade `include` do `tsconfig.json`.

   b. Se estiver usando arquivos de definição de tipo no estilo ambiente (sem import/export nos arquivos de definição de tipo e `declare namespace WebdriverIO` para comandos personalizados), certifique-se de que o `tsconfig.json` *não* contenha nenhuma seção `include`, uma vez que isso fará com que todos os arquivos de definição de tipo não listados na seção `include` não sejam reconhecidos pelo TypeScript.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions (no tsconfig include)', value: 'ambient'},
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
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions', value: 'ambient'},
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

## Integrate 3rd Party Libraries

Se você usar bibliotecas externas (por exemplo, para fazer chamadas de banco de dados) que suportam promessas, uma boa abordagem para integrá-las é encapsular certos métodos de API com um comando personalizado.

Ao retornar a promessa, o WebdriverIO garante que não continuará com o próximo comando até que a promessa seja resolvida. Se a promessa for rejeitada, o comando lançará um erro.

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
    console.log(body) // returns response body
})
```

**Nota:** O resultado do seu comando personalizado é o resultado da promessa que você retorna.

## Overwriting Commands

Você também pode sobrescrever comandos nativos com `overwriteCommand`.

Não é recomendado fazer isso, pois pode levar a comportamentos imprevisíveis do framework!

A abordagem geral é semelhante a `addCommand`, a única diferença é que o primeiro argumento na função de comando é a função original que você está prestes a sobrescrever. Por favor, veja alguns exemplos abaixo.

### Overwriting Browser Commands

```js
/**
 * Print milliseconds before pause and return its value.
 * 
 * @param pause - name of command to be overwritten
 * @param this of func - the original browser instance on which the function was called
 * @param originalPauseFunction of func - the original pause function
 * @param ms of func - the actual parameters passed
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// then use it as before
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Overwriting Element Commands

Sobrescrever comandos no nível do elemento é quase o mesmo. Simplesmente passe `true` como o terceiro argumento para `overwriteCommand`:

```js
/**
 * Attempt to scroll to element if it is not clickable.
 * Pass { force: true } to click with JS even if element is not visible or clickable.
 * Show that the original function argument type can be kept with `options?: ClickOptions`
 *
 * @param this of func - the element on which the original function was called
 * @param originalClickFunction of func - the original pause function
 * @param options of func - the actual parameters passed
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // attempt to click
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // scroll to element and click again
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // clicking with js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Don't forget to attach it to the element
)

// then use it as before
const elem = await $('body')
await elem.click()

// or pass params
await elem.click({ force: true })
```

## Add More WebDriver Commands

Se você estiver usando o protocolo WebDriver e executar testes em uma plataforma que suporta comandos adicionais não definidos por qualquer uma das definições de protocolo em [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), você pode adicioná-los manualmente através da interface `addCommand`. O pacote `webdriver` oferece um wrapper de comando que permite registrar esses novos endpoints da mesma forma que outros comandos, fornecendo as mesmas verificações de parâmetros e tratamento de erros. Para registrar este novo endpoint, importe o wrapper de comando e registre um novo comando com ele da seguinte forma:

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

Chamar este comando com parâmetros inválidos resulta no mesmo tratamento de erro que os comandos de protocolo predefinidos, por exemplo:

```js
// call command without required url parameter and payload
await browser.myNewCommand()

/**
 * results in the following error:
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
O parâmetro de URL `:sessionId` será automaticamente substituído pelo ID de sessão da sessão WebDriver. Outros parâmetros de URL podem ser aplicados, mas precisam ser definidos dentro de `variables`.
:::

Veja exemplos de como os comandos de protocolo podem ser definidos no pacote [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).