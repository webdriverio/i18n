---
id: multiremote
title: Multiremote
---

O WebdriverIO permite que você execute várias sessões automatizadas em um único teste. Isso se torna útil quando você está testando recursos que exigem vários usuários (por exemplo, aplicativos de chat ou WebRTC).

Em vez de criar várias instâncias remotas onde você precisa executar comandos comuns como [`newSession`](/docs/api/webdriver#newsession) ou [`url`](/docs/api/browser/url) em cada instância, você pode simplesmente criar uma instância **multiremote** e controlar todos os navegadores ao mesmo tempo.

Para fazer isso, basta usar a função `multiremote()` e passar um objeto com nomes associados a `capabilities` como valores. Ao dar um nome a cada capacidade, você pode facilmente selecionar e acessar essa única instância ao executar comandos em uma única instância.

:::info

Multiremote _não_ foi projetado para executar todos os seus testes em paralelo.
Ele se destina a ajudar a coordenar vários navegadores e/ou dispositivos móveis para testes de integração especiais (por exemplo, aplicativos de chat).

:::

Todas as instâncias multiremote retornam uma matriz de resultados. O primeiro resultado representa a capacidade definida primeiro no objeto de capacidade, o segundo resultado a segunda capacidade e assim por diante.

## Usando o Modo Standalone

Aqui está um exemplo de como criar uma instância multiremote no __modo standalone__:

```js
import { multiremote } from 'webdriverio'

(async () => {
    const browser = await multiremote({
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

    // open url with both browser at the same time
    await browser.url('http://json.org')

    // call commands at the same time
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // click on an element at the same time
    const elem = await browser.$('#someElem')
    await elem.click()

    // only click with one browser (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## Usando WDIO Testrunner

Para usar multiremote no testrunner do WDIO, basta definir o objeto `capabilities` em seu `wdio.conf.js` como um objeto com os nomes dos navegadores como chaves (em vez de uma lista de capacidades):

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

Isso criará duas sessões WebDriver com Chrome e Firefox. Em vez de apenas Chrome e Firefox, você também pode inicializar dois dispositivos móveis usando [Appium](http://appium.io) ou um dispositivo móvel e um navegador.

Você também pode executar multiremote em paralelo colocando o objeto de capacidades do navegador em um array. Certifique-se de incluir o campo `capabilities` em cada navegador, pois é assim que distinguimos cada modo.

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

Você pode até mesmo inicializar um dos [backends de serviços em nuvem](https://webdriver.io/docs/cloudservices.html) juntamente com instâncias locais do Webdriver/Appium, ou Selenium Standalone. O WebdriverIO detecta automaticamente as capacidades de backend em nuvem se você especificou qualquer um dos `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)) ou `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) nas capacidades do navegador.

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

Qualquer tipo de combinação OS/navegador é possível aqui (incluindo navegadores móveis e desktop). Todos os comandos que seus testes chamam através da variável `browser` são executados em paralelo com cada instância. Isso ajuda a otimizar seus testes de integração e acelerar sua execução.

Por exemplo, se você abrir uma URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

O resultado de cada comando será um objeto com os nomes dos navegadores como chave e o resultado do comando como valor, assim:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

Observe que cada comando é executado um por um. Isso significa que o comando termina quando todos os navegadores o executarem. Isso é útil porque mantém as ações do navegador sincronizadas, o que torna mais fácil entender o que está acontecendo atualmente.

Às vezes, é necessário fazer coisas diferentes em cada navegador para testar algo. Por exemplo, se queremos testar um aplicativo de chat, deve haver um navegador que envie uma mensagem de texto enquanto outro navegador espera para recebê-la e, em seguida, executar uma asserção sobre ela.

Ao usar o testrunner WDIO, ele registra os nomes dos navegadores com suas instâncias no escopo global:

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// wait until messages arrive
await $('.messages').waitForExist()
// check if one of the messages contain the Chrome message
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

Neste exemplo, a instância `myFirefoxBrowser` começará a aguardar uma mensagem assim que a instância `myChromeBrowser` tiver clicado no botão `#send`.

Multiremote torna fácil e conveniente controlar vários navegadores, seja você querendo que eles façam a mesma coisa em paralelo ou coisas diferentes em conjunto.

## Acessando instâncias de navegador usando strings via objeto browser
Além de acessar a instância do navegador por meio de suas variáveis globais (por exemplo, `myChromeBrowser`, `myFirefoxBrowser`), você também pode acessá-las por meio do objeto `browser`, por exemplo, `browser["myChromeBrowser"]` ou `browser["myFirefoxBrowser"]`. Você pode obter uma lista de todas as suas instâncias via `browser.instances`. Isso é especialmente útil ao escrever etapas de teste reutilizáveis que podem ser executadas em qualquer navegador, por exemplo:

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

Arquivo de definição de etapa:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Estendendo Tipos TypeScript

Se você está usando TypeScript e deseja acessar a instância do driver diretamente do objeto multiremote, você também pode estender os tipos multiremote para fazer isso. Por exemplo, dadas as seguintes capacidades:

```ts title=wdio.conf.ts
export const config: WebdriverIO.MultiremoteConfig = {
    // ...
    capabilities: {
        myAppiumDriver: {
            // ...
        },
        myChromeDriver: {
            // ...
        }
    }
    // ...
}
```

Você pode estender a instância multiremote adicionando seus nomes de driver personalizados, por exemplo:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

Agora você pode acessar os drivers diretamente, por exemplo:

```ts
multiRemoteBrowser.myAppiumDriver.$$(...)
multiRemoteBrowser.myChromeDriver.$(...)
```