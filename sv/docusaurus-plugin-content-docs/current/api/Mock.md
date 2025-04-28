---
id: mock
title: Mock-objektet
---

Mock-objektet är ett objekt som representerar en nätverksmock och innehåller information om förfrågningar som matchade en given `url` och `filterOptions`. Det kan hämtas med hjälp av kommandot [`mock`](/docs/api/browser/mock).

:::info

Observera att användning av kommandot `mock` kräver stöd för Chrome DevTools-protokollet.
Detta stöd finns om du kör tester lokalt i Chromium-baserad webbläsare eller om
du använder Selenium Grid v4 eller högre. Detta kommando kan __inte__ användas när du kör
automatiserade tester i molnet. Läs mer i avsnittet [Automation Protocols](/docs/automationProtocols).

:::

Du kan läsa mer om att mocka förfrågningar och svar i WebdriverIO i vår guide [Mocks and Spies](/docs/mocksandspies).

## Egenskaper

Ett mock-objekt innehåller följande egenskaper:

| Namn | Typ | Detaljer |
| ---- | ---- | ------- |
| `url` | `String` | URL:en som skickades till mock-kommandot |
| `filterOptions` | `Object` | Resursfilteralternativen som skickades till mock-kommandot |
| `browser` | `Object` | [Browser-objektet](/docs/api/browser) som användes för att få mock-objektet. |
| `calls` | `Object[]` | Information om matchande webbläsarförfrågningar, innehållande egenskaper som `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` och `body` |

## Metoder

Mock-objekt tillhandahåller olika kommandon, listade i avsnittet `mock`, som låter användare modifiera beteendet för begäran eller svar.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)

## Händelser

Mock-objektet är en EventEmitter och ett antal händelser utlöses för dina användningsfall.

Här är en lista över händelser.

### `request`

Denna händelse utlöses när en nätverksförfrågan som matchar mock-mönster startas. Förfrågan skickas i händelsecallback.

Request-gränssnitt:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

Denna händelse utlöses när nätverkssvar skrivs över med [`respond`](/docs/api/mock/respond) eller [`respondOnce`](/docs/api/mock/respondOnce). Svaret skickas i händelsecallback.

Response-gränssnitt:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

Denna händelse utlöses när nätverksförfrågan avbryts med [`abort`](/docs/api/mock/abort) eller [`abortOnce`](/docs/api/mock/abortOnce). Felet skickas i händelsecallback.

Fail-gränssnitt:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Denna händelse utlöses när en ny matchning läggs till, innan `continue` eller `overwrite`. Matchningen skickas i händelsecallback.

Match-gränssnitt:
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

Denna händelse utlöses när nätverkssvaret varken har skrivits över eller avbrutits, eller om svaret redan skickats av en annan mock. `requestId` skickas i händelsecallback.

## Exempel

Få antal väntande förfrågningar:

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

Kasta ett fel vid 404 nätverksfel:

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

Avgöra om mock-svarsvärdet användes:

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

I detta exempel definierades `firstMock` först och har ett `respondOnce`-anrop, så `secondMock`-svarsvärdet kommer inte att användas för den första förfrågan, men kommer att användas för resten av dem.