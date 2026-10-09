---
id: multiremote
title: Multi-remote
description: "Controle várias sessões de navegador ou dispositivo a partir de um único teste com multi-remote, no modo standalone ou com o WDIO testrunner."
---

O WebdriverIO permite que você execute várias sessões automatizadas em um único teste. Isso é útil quando você está testando funcionalidades que exigem vários usuários (por exemplo, aplicações de chat ou WebRTC).

Em vez de criar algumas instâncias remotas nas quais você precisa executar comandos comuns como [`newSession`](/docs/api/webdriver#newsession) ou [`url`](/docs/api/browser/url) em cada instância, você pode simplesmente criar uma instância **multi-remote** e controlar todos os navegadores ao mesmo tempo.

Para fazer isso, basta usar a função `multiRemote()` e passar um objeto com nomes como chaves e `capabilities` como valores. Ao dar um nome a cada capability, você pode facilmente selecionar e acessar essa instância individual ao executar comandos em uma única instância.

:::info

O MultiRemote _não_ foi feito para executar todos os seus testes em paralelo.
Ele tem como objetivo ajudar a coordenar vários navegadores e/ou dispositivos móveis para testes de integração especiais (por exemplo, aplicações de chat).

:::

A maioria dos comandos multi-remote retorna um array de resultados. O primeiro resultado representa a capability definida primeiro no objeto de capabilities, o segundo resultado a segunda capability, e assim por diante. `mock()` retorna um `MultiRemoteMock` em vez de um array. Veja [O que mock() retorna](#what-mock-returns).

## Usando o Modo Standalone

Aqui está um exemplo de como criar uma instância multi-remote no __modo standalone__:

```js
import { multiRemote } from 'webdriverio'

(async () => {
    const browser = await multiRemote({
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    })

    // abre a url com ambos os navegadores ao mesmo tempo
    await browser.url('http://json.org')

    // chama comandos ao mesmo tempo
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // clica em um elemento ao mesmo tempo
    const elem = await browser.$('#someElem')
    await elem.click()

    // clica apenas com um navegador (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## Usando o WDIO Testrunner

Para usar o multi-remote no WDIO testrunner, basta definir o objeto `capabilities` no seu `wdio.conf.js` como um objeto com os nomes dos navegadores como chaves (em vez de uma lista de capabilities):

```js
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
    // ...
}
```

Isso criará duas sessões WebDriver com Chrome e Firefox. Em vez de apenas Chrome e Firefox, você também pode iniciar dois dispositivos móveis usando o [Appium](http://appium.io) ou um dispositivo móvel e um navegador.

Você também pode executar o multi-remote em paralelo colocando o objeto de capabilities dos navegadores em um array. Certifique-se de incluir o campo `capabilities` em cada navegador, pois é assim que diferenciamos cada modo.

```js
export const config = {
    // ...
    capabilities: [{
        myChromeBrowser0: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser0: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }, {
        myChromeBrowser1: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser1: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }]
    // ...
}
```

Você pode até iniciar um dos [backends de serviços em nuvem](https://webdriver.io/docs/cloudservices.html) junto com instâncias locais do Webdriver/Appium ou do Selenium Standalone. O WebdriverIO detecta automaticamente as capabilities de backends em nuvem se você especificou `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) ou `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) nas capabilities do navegador.

```js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myBrowserStackFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox',
                'bstack:options': {
                    // ...
                }
            }
        }
    },
    services: [
        ['browserstack', 'selenium-standalone']
    ],
    // ...
}
```

Qualquer combinação de SO/navegador é possível aqui (incluindo navegadores móveis e desktop). Todos os comandos que seus testes chamam através da variável `browser` são executados em paralelo em cada instância. Isso ajuda a simplificar seus testes de integração e acelerar sua execução.

Por exemplo, se você abrir uma URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

O resultado de cada comando será um objeto com os nomes dos navegadores como chave e o resultado do comando como valor, assim:

```js
// exemplo com o wdio testrunner
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // retorna: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // retorna: 'Firefox 35 on Mac OS X (Yosemite)'
```

Observe que cada comando é executado um por um. Isso significa que o comando termina quando todos os navegadores o executaram. Isso é útil porque mantém as ações dos navegadores sincronizadas, o que facilita entender o que está acontecendo no momento.

Às vezes é necessário fazer coisas diferentes em cada navegador para testar algo. Por exemplo, se quisermos testar uma aplicação de chat, deve haver um navegador que envia uma mensagem de texto enquanto outro navegador espera para recebê-la e, em seguida, executa uma asserção sobre ela.

Ao usar o WDIO testrunner, ele registra os nomes dos navegadores com suas instâncias no escopo global:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// espera até que as mensagens cheguem
await $('.messages').waitForExist()
// verifica se uma das mensagens contém a mensagem do Chrome
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

Neste exemplo, a instância `myFirefoxBrowser` começará a esperar por uma mensagem assim que a instância `myChromeBrowser` tiver clicado no botão `#send`.

O MultiRemote torna fácil e conveniente controlar vários navegadores, seja para que façam a mesma coisa em paralelo ou coisas diferentes em conjunto.

### O que `$` retorna

Em um navegador multi-remote, `$`, `custom$` e `react$` retornam um `MultiRemoteElement`. Em um elemento multi-remote, `shadow$`, `nextElement`, `previousElement` e `parentElement` também retornam um. Seus comandos são executados em todas as instâncias, e `getInstance` fornece o elemento de um navegador.

```js
const host = await $('my-component')
const button = await host.shadow$('button')

await button.click()                                  // clica em todos os navegadores
await button.getInstance('myChromeBrowser').click()  // clica apenas no Chrome
```

### O que `$$` retorna

Em um navegador multi-remote, `$$` retorna um `MultiRemoteElementArray`. Cada entrada é um `MultiRemoteElement` que se refere a todas as instâncias de uma vez, e o próprio array carrega as mesmas informações que um `ElementArray` comum. `custom$$`, `react$$` e, em um elemento multi-remote, `shadow$$` retornam o mesmo tipo de lista.

```js
const messages = await $$('.messages')

messages.length      // o maior número de elementos que uma instância encontrou
messages[0]          // um MultiRemoteElement, referindo-se a todas as instâncias
messages.selector    // '.messages'
messages.foundWith   // '$$'
messages.parent      // o navegador ou elemento multi-remote a partir do qual foi obtido
messages.isMultiRemote // true, para que possa ser diferenciado de um ElementArray simples

// os helpers assíncronos de array estão disponíveis, como em um único navegador
await messages.map((m) => m.getText())
await messages.filter(async (m) => await m.isDisplayed())
```

Quando as instâncias encontram um número diferente de elementos, uma entrada não tem elemento para uma instância que encontrou menos. Para essa instância, `getInstance()` lança um erro, e um comando na entrada falha. Use `select()` com as instâncias que possuem o elemento. Um matcher `expect` na lista inteira verifica cada instância com seus próprios elementos:

```js
// myChromeBrowser encontra 3 mensagens, myFirefoxBrowser encontra 2
const messages = await $$('.messages')

messages.length                                       // 3
await messages[2].select('myChromeBrowser').click()  // apenas o Chrome tem uma terceira mensagem
await expect(messages).toBeElementsArrayOfSize(expect.multiRemote({
    myChromeBrowser: 3,
    myFirefoxBrowser: 2
}))
```

:::info

Antes da v10, isso retornava um array simples, a menos que `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY=true` estivesse definido. O array agora é o padrão e a variável de ambiente foi removida. O acesso por índice não mudou, então código que apenas lia `elements[0]` continua funcionando.

:::

### O que mock() retorna {#what-mock-returns}

Em um navegador multi-remote, `mock()` retorna um `MultiRemoteMock`. Ele não é um array. `respond()`, `restore()` e os outros métodos de mock são executados em todas as instâncias. As requisições capturadas ficam no mock de cada navegador, então leia-as com `getInstance`:

```ts
const mock = await browser.mock('*/users/list')

mock.instances // ['myChromeBrowser', 'myFirefoxBrowser']
mock.respond([{ id: 1 }])

const chromeCalls = mock.getInstance('myChromeBrowser').calls
const firefoxCalls = mock.getInstance('myFirefoxBrowser').calls
```

`examples/bidi/multiremote-mock.js` executa isso em duas sessões headless do Chrome.

`instances` segue a ordem em que os mocks foram criados. Após `select()`, essa ordem pode diferir de `browser.instances`:

```ts
const selected = await browser.select('myFirefoxBrowser', 'myChromeBrowser').mock('*/users/list')

selected.instances // ['myFirefoxBrowser', 'myChromeBrowser']
selected.getInstance('myChromeBrowser') // o mock do Chrome, independentemente da ordem
```

`getInstance` lança `Multi-remote object has no instance named "<name>"` quando `name` não está em `instances`.

Para fazer mock de apenas um navegador, chame `mock()` nessa instância:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/users/list')
```

## Acessando instâncias de navegador usando strings através do objeto browser
Além de acessar a instância do navegador através de suas variáveis globais (por exemplo, `myChromeBrowser`, `myFirefoxBrowser`), você também pode acessá-las através do objeto `browser`, por exemplo, `browser["myChromeBrowser"]` ou `browser["myFirefoxBrowser"]`. Você pode obter uma lista de todas as suas instâncias através de `browser.instances`. Isso é especialmente útil ao escrever etapas de teste reutilizáveis que podem ser executadas em qualquer um dos navegadores, por exemplo:

wdio.conf.js:
```js
    capabilities: {
        userA: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        userB: {
            capabilities: {
                browserName: 'chrome'
            }
        }
    }
```

Arquivo Cucumber:
    ```feature
    When User A types a message into the chat
    ```

Arquivo de definição de etapas:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Asserções

Os matchers `expect` suportam navegadores, elementos e mocks multi-remote. Por padrão, todas as instâncias devem corresponder ao valor esperado:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle('My App')
await expect(multiRemoteBrowser.$('h1')).toHaveText('Welcome')
```

Para esperar um valor diferente por instância, use `expect.multiRemote()` com um valor por nome de instância:

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle(expect.multiRemote({
    myChromeBrowser: 'My App',
    myFirefoxBrowser: expect.stringContaining('App')
}))
```

Para todos os matchers suportados e a configuração necessária, consulte o [guia multi-remote do expect-webdriverio](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/MultiRemote.md).

## Acessando uma instância

Os nomes das instâncias não são propriedades do navegador multi-remote nem de um elemento multi-remote. `browser.myChromeBrowser` e `elem.myChromeDriver` não são definidos. Solicite a sessão com `getInstance` ou restrinja o objeto multi-remote com `select`:

```ts
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser?.$$('button')

const myChromeElement = (await browser.$('button')).getInstance('myChromeBrowser')
await myChromeElement.click()

await browser.select('myChromeBrowser').url('https://webdriver.io')
```

O testrunner ainda atribui o nome de cada instância como uma variável global própria quando `injectGlobals` permanece ativado, de modo que um teste pode chamar `myChromeBrowser.$('button')` sem passar por `browser`. Essa variável global é a sessão única retornada por `getInstance`, e não um campo no objeto multi-remote.