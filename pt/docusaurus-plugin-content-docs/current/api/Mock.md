---
id: mock
title: O Objeto Mock
---

O objeto mock é um objeto que representa um mock de rede e contém informações sobre as requisições que correspondem aos `url` e `filterOptions` fornecidos. Ele pode ser obtido usando o comando [`mock`](/docs/api/browser/mock).

:::info

Observe que o uso do comando `mock` requer suporte ao protocolo Chrome DevTools.
Esse suporte existe se você executar os testes localmente em um navegador baseado em Chromium ou se
usar um Selenium Grid v4 ou superior. Este comando __não__ pode ser usado ao executar
testes automatizados na nuvem. Saiba mais na seção [Protocolos de Automação](/docs/automationProtocols).

:::

Você pode ler mais sobre como fazer mock de requisições e respostas no WebdriverIO em nosso guia [Mocks e Spies](/docs/mocksandspies).

## Multi-remote

Em um navegador [multi-remote](/docs/multiremote), [`browser.mock()`](/docs/api/browser/mock) retorna um `MultiRemoteMock` em vez deste objeto. `instances` lista os nomes dos navegadores, e `getInstance(name)` retorna o `Mock` desse navegador. `respond()`, `restore()` e os outros métodos abaixo são executados em todas as instâncias. `calls` permanece no mock de cada instância: `mock.getInstance('myChromeBrowser').calls`.

`getInstance` lança `Multi-remote object has no instance named "<name>"` quando `name` não é um dos valores de `instances`.

## Propriedades

Um objeto mock contém as seguintes propriedades:

| Nome | Tipo | Detalhes |
| ---- | ---- | ------- |
| `url` | `String` | A url passada para o comando mock |
| `filterOptions` | `Object` | As opções de filtro de recursos passadas para o comando mock |
| `browser` | `Object` | O [Objeto Browser](/docs/api/browser) usado para obter o objeto mock. |
| `calls` | `Object[]` | Informações sobre as requisições do navegador correspondentes, contendo propriedades como `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` e `body` |

## Métodos

Os objetos mock fornecem vários comandos, listados na seção `mock`, que permitem aos usuários modificar o comportamento da requisição ou da resposta.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)
- [`waitForResponse`](/docs/api/mock/waitForResponse)

## Eventos

O objeto mock é um EventEmitter e alguns eventos são emitidos para os seus casos de uso.

Aqui está uma lista de eventos.

### `request`

Este evento é emitido ao iniciar uma requisição de rede que corresponde aos padrões do mock. A requisição é passada no callback do evento.

Interface da requisição:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

Este evento é emitido quando a resposta de rede é sobrescrita com [`respond`](/docs/api/mock/respond) ou [`respondOnce`](/docs/api/mock/respondOnce). A resposta é passada no callback do evento.

Interface da resposta:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

Este evento é emitido quando a requisição de rede é abortada com [`abort`](/docs/api/mock/abort) ou [`abortOnce`](/docs/api/mock/abortOnce). A falha é passada no callback do evento.

Interface da falha:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Este evento é emitido quando uma nova correspondência é adicionada, antes de `continue` ou `overwrite`. A correspondência é passada no callback do evento.

Interface da correspondência:
```ts
interface MatchEvent {
    url: string // URL da requisição (sem fragmento).
    urlFragment?: string // Fragmento da URL requisitada começando com hash, se presente.
    method: string // Método da requisição HTTP.
    headers: Record<string, string> // Cabeçalhos da requisição HTTP.
    postData?: string // Dados da requisição HTTP POST.
    hasPostData?: boolean // Verdadeiro quando a requisição possui dados POST.
    mixedContentType?: MixedContentType // O tipo de exportação de conteúdo misto da requisição.
    initialPriority: ResourcePriority // Prioridade da requisição do recurso no momento em que a requisição é enviada.
    referrerPolicy: ReferrerPolicy // A política de referrer da requisição, conforme definida em https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Se é carregado via link preload.
    body: string | Buffer | JsonCompatible // Corpo da resposta do recurso real.
    responseHeaders: Record<string, string> // Cabeçalhos da resposta HTTP.
    statusCode: number // Código de status da resposta HTTP.
    mockedResponse?: string | Buffer // Se o mock que emitiu o evento também modificou sua resposta.
}
```

### `continue`

Este evento é emitido quando a resposta de rede não foi sobrescrita nem interrompida, ou se a resposta já foi enviada por outro mock. O `requestId` é passado no callback do evento.

## Exemplos

Obtendo o número de requisições pendentes:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // é importante corresponder a todas as requisições, caso contrário o valor resultante pode ser muito confuso.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

Lançando um erro em caso de falha de rede 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // aguardando aqui, porque algumas requisições ainda podem estar pendentes
    if (selector) {
        await this.$(selector).waitForExist().catch(reject)
    }

    if (predicate) {
        await this.waitUntil(predicate).catch(reject)
    }

    resolve()
}))

await browser.loadPageWithout404(browser, 'some/url', { selector: 'main' })
```

Determinando se o valor de resposta do mock foi usado:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // dispara para a primeira requisição para '**/foo/**'
}).on('continue', () => {
    // dispara para as demais requisições para '**/foo/**'
})

secondMock.on('continue', () => {
    // dispara para a primeira requisição para '**/foo/bar/**'
}).on('overwrite', () => {
    // dispara para as demais requisições para '**/foo/bar/**'
})
```

Neste exemplo, `firstMock` foi definido primeiro e possui uma chamada `respondOnce`, então o valor de resposta de `secondMock` não será usado para a primeira requisição, mas será usado para as demais.