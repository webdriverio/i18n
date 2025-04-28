---
id: mock
title: L'Oggetto Mock
---

L'oggetto mock è un oggetto che rappresenta un mock di rete e contiene informazioni sulle richieste che corrispondono a un determinato `url` e `filterOptions`. Può essere ottenuto utilizzando il comando [`mock`](/docs/api/browser/mock).

:::info

Nota che l'utilizzo del comando `mock` richiede il supporto per il protocollo Chrome DevTools.
Questo supporto è disponibile se esegui i test localmente in un browser basato su Chromium o se
utilizzi Selenium Grid v4 o versioni successive. Questo comando __non__ può essere utilizzato quando si eseguono
test automatizzati nel cloud. Scopri di più nella sezione [Protocolli di Automazione](/docs/automationProtocols).

:::

Puoi leggere di più sul mock di richieste e risposte in WebdriverIO nella nostra guida [Mock e Spy](/docs/mocksandspies).

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

Questo evento viene emesso quando si avvia una richiesta di rete che corrisponde ai pattern del mock. La richiesta viene passata nel callback dell'evento.

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

Questo evento viene emesso quando la risposta di rete viene sovrascritta con [`respond`](/docs/api/mock/respond) o [`respondOnce`](/docs/api/mock/respondOnce). La risposta viene passata nel callback dell'evento.

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

Questo evento viene emesso quando la richiesta di rete viene interrotta con [`abort`](/docs/api/mock/abort) o [`abortOnce`](/docs/api/mock/abortOnce). Il fallimento viene passato nel callback dell'evento.

Interfaccia del fallimento:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Questo evento viene emesso quando viene aggiunta una nuova corrispondenza, prima di `continue` o `overwrite`. La corrispondenza viene passata nel callback dell'evento.

Interfaccia della corrispondenza:
```ts
interface MatchEvent {
    url: string // URL della richiesta (senza frammento).
    urlFragment?: string // Frammento dell'URL richiesto che inizia con #, se presente.
    method: string // Metodo della richiesta HTTP.
    headers: Record<string, string> // Header della richiesta HTTP.
    postData?: string // Dati della richiesta HTTP POST.
    hasPostData?: boolean // True quando la richiesta ha dati POST.
    mixedContentType?: MixedContentType // Il tipo di export del contenuto misto della richiesta.
    initialPriority: ResourcePriority // Priorità della richiesta di risorsa al momento dell'invio.
    referrerPolicy: ReferrerPolicy // La politica di referrer della richiesta, come definito in https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Se viene caricato tramite preload del link.
    body: string | Buffer | JsonCompatible // Corpo della risposta della risorsa effettiva.
    responseHeaders: Record<string, string> // Header della risposta HTTP.
    statusCode: number // Codice di stato della risposta HTTP.
    mockedResponse?: string | Buffer // Se il mock, che emette l'evento, ha anche modificato la sua risposta.
}
```

### `continue`

Questo evento viene emesso quando la risposta di rete non è stata né sovrascritta né interrotta, o se la risposta è già stata inviata da un altro mock. `requestId` viene passato nel callback dell'evento.

## Esempi

Ottenere il numero di richieste in sospeso:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // è importante corrispondere a tutte le richieste, altrimenti il valore risultante può essere molto confuso.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`richiesta corrispondente a ${request.url}, ${pendingRequests} richieste in sospeso`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`richiesta risolta per ${url}, ${pendingRequests} richieste in sospeso`)
})
```

Generare un errore su un fallimento di rete 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`la richiesta a ${url} è fallita con "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // attendere qui, perché alcune richieste potrebbero essere ancora in sospeso
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
    // si attiva per la prima richiesta a '**/foo/**'
}).on('continue', () => {
    // si attiva per le richieste rimanenti a '**/foo/**'
})

secondMock.on('continue', () => {
    // si attiva per la prima richiesta a '**/foo/bar/**'
}).on('overwrite', () => {
    // si attiva per le richieste rimanenti a '**/foo/bar/**'
})
```

In questo esempio, `firstMock` è stato definito per primo e ha una chiamata `respondOnce`, quindi il valore di risposta di `secondMock` non verrà utilizzato per la prima richiesta, ma verrà utilizzato per le richieste successive.