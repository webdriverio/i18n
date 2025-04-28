---
id: mock
title: L'Oggetto Mock
---

L'oggetto mock è un oggetto che rappresenta un mock di rete e contiene informazioni sulle richieste che corrispondono a un determinato `url` e `filterOptions`. Può essere ottenuto utilizzando il comando [`mock`](/docs/api/browser/mock).

:::info

Nota che l'utilizzo del comando `mock` richiede il supporto per il protocollo Chrome DevTools.
Questo supporto è garantito se esegui i test localmente in un browser basato su Chromium o se
utilizzi Selenium Grid v4 o superiore. Questo comando __non__ può essere utilizzato quando si eseguono
test automatizzati nel cloud. Scopri di più nella sezione [Protocolli di Automazione](/docs/automationProtocols).

:::

Puoi leggere di più sul mock di richieste e risposte in WebdriverIO nella nostra guida [Mocks and Spies](/docs/mocksandspies).

## Proprietà

Un oggetto mock contiene le seguenti proprietà:

| Nome | Tipo | Dettagli |
| ---- | ---- | ------- |
| `url` | `String` | L'url passato al comando mock |
| `filterOptions` | `Object` | Le opzioni di filtro delle risorse passate al comando mock |
| `browser` | `Object` | L'[Oggetto Browser](/docs/api/browser) utilizzato per ottenere l'oggetto mock. |
| `calls` | `Object[]` | Informazioni sulle richieste del browser corrispondenti, contenenti proprietà come `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` e `body` |

## Metodi

Gli oggetti mock forniscono vari comandi, elencati nella sezione `mock`, che consentono agli utenti di modificare il comportamento della richiesta o della risposta.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)

## Eventi

L'oggetto mock è un EventEmitter e vengono emessi diversi eventi per i tuoi casi d'uso.

Ecco un elenco di eventi.

### `request`

Questo evento viene emesso quando si avvia una richiesta di rete che corrisponde ai pattern del mock. La richiesta viene passata nella callback dell'evento.

Interfaccia della richiesta:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

Questo evento viene emesso quando la risposta di rete viene sovrascritta con [`respond`](/docs/api/mock/respond) o [`respondOnce`](/docs/api/mock/respondOnce). La risposta viene passata nella callback dell'evento.

Interfaccia della risposta:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

Questo evento viene emesso quando la richiesta di rete viene interrotta con [`abort`](/docs/api/mock/abort) o [`abortOnce`](/docs/api/mock/abortOnce). Il fallimento viene passato nella callback dell'evento.

Interfaccia del fallimento:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Questo evento viene emesso quando viene aggiunta una nuova corrispondenza, prima di `continue` o `overwrite`. La corrispondenza viene passata nella callback dell'evento.

Interfaccia della corrispondenza:
```ts
interface MatchEvent {
    url: string // Request URL (without fragment).
    urlFragment?: string // Fragment of the requested URL starting with hash, if present.
    method: string // HTTP request method.
    headers: Record<string, string> // HTTP request headers.
    postData?: string // HTTP POST request data.
    hasPostData?: boolean // True when the request has POST data.
    mixedContentType?: MixedContentType // The mixed content export type of the request.
    initialPriority: ResourcePriority // Priority of the resource request at the time request is sent.
    referrerPolicy: ReferrerPolicy // The referrer policy of the request, as defined in https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Whether is loaded via link preload.
    body: string | Buffer | JsonCompatible // Body response of actual resource.
    responseHeaders: Record<string, string> // HTTP response headers.
    statusCode: number // HTTP response status code.
    mockedResponse?: string | Buffer // If mock, emitting the event, also modified it's response.
}
```

### `continue`

Questo evento viene emesso quando la risposta di rete non è stata né sovrascritta né interrotta, o se la risposta è stata già inviata da un altro mock. `requestId` viene passato nella callback dell'evento.

## Esempi

Ottenere il numero di richieste in sospeso:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // it is important to match all requests otherwise, the resulting value can be very confusing.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

Generare un errore in caso di fallimento di rete 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // waiting here, because some requests can still be pending
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

Determinare se il valore di risposta del mock è stato utilizzato:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // triggers for first request to '**/foo/**'
}).on('continue', () => {
    // triggers for rest requests to '**/foo/**'
})

secondMock.on('continue', () => {
    // triggers for first request to '**/foo/bar/**'
}).on('overwrite', () => {
    // triggers for rest requests to '**/foo/bar/**'
})
```

In questo esempio, `firstMock` è stato definito per primo e ha una chiamata `respondOnce`, quindi il valore di risposta di `secondMock` non verrà utilizzato per la prima richiesta, ma verrà utilizzato per tutte le altre.