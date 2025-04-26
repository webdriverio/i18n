---
id: mock
title: Das Mock-Objekt
---

Das Mock-Objekt ist ein Objekt, das einen Netzwerk-Mock repräsentiert und Informationen über Anfragen enthält, die mit der angegebenen `url` und den `filterOptions` übereinstimmen. Es kann mit dem Befehl [`mock`](/docs/api/browser/mock) empfangen werden.

:::info

Beachten Sie, dass die Verwendung des `mock`-Befehls die Unterstützung des Chrome DevTools-Protokolls erfordert.
Diese Unterstützung ist gegeben, wenn Sie Tests lokal in einem Chromium-basierten Browser ausführen oder
wenn Sie Selenium Grid v4 oder höher verwenden. Dieser Befehl kann __nicht__ verwendet werden, wenn
automatisierte Tests in der Cloud ausgeführt werden. Weitere Informationen finden Sie im Abschnitt [Automation Protocols](/docs/automationProtocols).

:::

Mehr über das Mocken von Anfragen und Antworten in WebdriverIO können Sie in unserem [Mocks and Spies](/docs/mocksandspies) Leitfaden lesen.

## Eigenschaften

Ein Mock-Objekt enthält die folgenden Eigenschaften:

| Name | Typ | Details |
| ---- | ---- | ------- |
| `url` | `String` | Die URL, die an den Mock-Befehl übergeben wurde |
| `filterOptions` | `Object` | Die Ressourcen-Filteroptionen, die an den Mock-Befehl übergeben wurden |
| `browser` | `Object` | Das [Browser-Objekt](/docs/api/browser), das verwendet wurde, um das Mock-Objekt zu erhalten. |
| `calls` | `Object[]` | Informationen über übereinstimmende Browser-Anfragen, die Eigenschaften wie `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` und `body` enthalten |

## Methoden

Mock-Objekte bieten verschiedene Befehle, die im Abschnitt `mock` aufgeführt sind und es Benutzern ermöglichen, das Verhalten der Anfrage oder Antwort zu modifizieren.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)

## Events

Das Mock-Objekt ist ein EventEmitter und es werden einige Events für Ihre Anwendungsfälle ausgelöst.

Hier ist eine Liste der Events.

### `request`

Dieses Event wird ausgelöst, wenn eine Netzwerkanfrage gestartet wird, die mit den Mock-Mustern übereinstimmt. Die Anfrage wird im Event-Callback übergeben.

Request-Interface:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

Dieses Event wird ausgelöst, wenn die Netzwerkantwort mit [`respond`](/docs/api/mock/respond) oder [`respondOnce`](/docs/api/mock/respondOnce) überschrieben wird. Die Antwort wird im Event-Callback übergeben.

Response-Interface:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

Dieses Event wird ausgelöst, wenn die Netzwerkanfrage mit [`abort`](/docs/api/mock/abort) oder [`abortOnce`](/docs/api/mock/abortOnce) abgebrochen wird. Der Fehler wird im Event-Callback übergeben.

Fail-Interface:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Dieses Event wird ausgelöst, wenn eine neue Übereinstimmung hinzugefügt wird, vor `continue` oder `overwrite`. Die Übereinstimmung wird im Event-Callback übergeben.

Match-Interface:
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

Dieses Event wird ausgelöst, wenn die Netzwerkantwort weder überschrieben noch unterbrochen wurde, oder wenn die Antwort bereits von einem anderen Mock gesendet wurde. `requestId` wird im Event-Callback übergeben.

## Beispiele

Ermitteln der Anzahl ausstehender Anfragen:

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

Einen Fehler bei einem 404-Netzwerkfehler auslösen:

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

Feststellen, ob der Mock-Antwortwert verwendet wurde:

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

In diesem Beispiel wurde `firstMock` zuerst definiert und hat einen `respondOnce`-Aufruf, daher wird der Antwortwert von `secondMock` für die erste Anfrage nicht verwendet, aber für alle weiteren Anfragen.