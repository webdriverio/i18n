---
id: mock
title: O Objeto Mock
---

O objeto mock é um objeto que representa um mock de rede e contém informações sobre solicitações que correspondiam a um determinado `url` e `filterOptions`. Ele pode ser recebido usando o comando [`mock`](/docs/api/browser/mock).

:::info

Observe que o uso do comando `mock` requer suporte para o protocolo Chrome DevTools.
Esse suporte é fornecido se você executar testes localmente em navegadores baseados em Chromium ou se
você usar um Selenium Grid v4 ou superior. Este comando __não__ pode ser usado ao executar
testes automatizados na nuvem. Saiba mais na seção [Protocolos de Automação](/docs/automationProtocols).

:::

Você pode ler mais sobre como simular requisições e respostas no WebdriverIO em nosso guia de [Mocks e Spies](/docs/mocksandspies).

## Propriedades

Um objeto mock contém as seguintes propriedades:

| Nome | Tipo | Detalhes |
| ---- | ---- | ------- |
| `url` | `String` | A URL passada para o comando mock |
| `filterOptions` | `Object` | As opções de filtro de recursos passadas para o comando mock |
| `browser` | `Object` | O [Objeto Browser](/docs/api/browser) usado para obter o objeto mock. |
| `calls` | `Object[]` | Informações sobre solicitações correspondentes do navegador, contendo propriedades como `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` e `body` |

## Métodos

Os objetos mock fornecem vários comandos, listados na seção `mock`, que permitem aos usuários modificar o comportamento da solicitação ou resposta.

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

O objeto mock é um EventEmitter e vários eventos são emitidos para seus casos de uso.

Aqui está uma lista de eventos.

### `request`

Este evento é emitido ao iniciar uma solicitação de rede que corresponde aos padrões mock. A solicitação é passada no callback do evento.

Interface de solicitação:
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

Interface de resposta:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

Este evento é emitido quando a solicitação de rede é abortada com [`abort`](/docs/api/mock/abort) ou [`abortOnce`](/docs/api/mock/abortOnce). A falha é passada no callback do evento.

Interface de falha:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Este evento é emitido quando uma nova correspondência é adicionada, antes de `continue` ou `overwrite`. A correspondência é passada no callback do evento.

Interface de correspondência:
```ts
interface MatchEvent {
    url: string // URL da solicitação (sem fragmento).
    urlFragment?: string // Fragmento da URL solicitada começando com hash, se presente.
    method: string // Método de solicitação HTTP.
    headers: Record<string, string> // Cabeçalhos de solicitação HTTP.
    postData?: string // Dados de solicitação HTTP POST.
    hasPostData?: boolean // Verdadeiro quando a solicitação tem dados POST.
    mixedContentType?: MixedContentType // O tipo de exportação de conteúdo misto da solicitação.
    initialPriority: ResourcePriority // Prioridade da solicitação de recurso no momento em que a solicitação é enviada.
    referrerPolicy: ReferrerPolicy // A política de referenciador da solicitação, conforme definido em https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Se é carregado via pré-carregamento de link.
    body: string | Buffer | JsonCompatible // Resposta do corpo do recurso atual.
    responseHeaders: Record<string, string> // Cabeçalhos de resposta HTTP.
    statusCode: number // Código de status de resposta HTTP.
    mockedResponse?: string | Buffer // Se o mock, emitindo o evento, também modificou sua resposta.
}
```

### `continue`

Este evento é emitido quando a resposta de rede não foi sobrescrita nem interrompida, ou se a resposta já foi enviada por outro mock. `requestId` é passado no callback do evento.

## Exemplos

Obtendo um número de solicitações pendentes:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // é importante corresponder a todas as solicitações, caso contrário, o valor resultante pode ser muito confuso.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`correspondeu solicitação para ${request.url}, pendentes ${pendingRequests} solicitações`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolveu solicitação para ${url}, pendentes ${pendingRequests} solicitações`)
})
```

Lançando um erro em falha de rede 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`requisição para ${url} falhou com "Não Encontrado"`))
        }
    })

    await this.url(url).catch(reject)

    // esperando aqui, porque algumas solicitações ainda podem estar pendentes
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

Neste exemplo, `firstMock` foi definido primeiro e tem uma chamada `respondOnce`, então o valor de resposta `secondMock` não será usado para a primeira requisição, mas será usado para as demais.