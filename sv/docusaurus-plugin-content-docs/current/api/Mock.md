---
id: mock
title: Mock-objektet
---

Mock-objektet är ett objekt som representerar en nätverks-mock och innehåller information om förfrågningar som matchade angivna `url` och `filterOptions`. Det kan erhållas med kommandot [`mock`](/docs/api/browser/mock).

:::info

Observera att användning av kommandot `mock` kräver stöd för Chrome DevTools-protokollet.
Detta stöd finns om du kör tester lokalt i en Chromium-baserad webbläsare eller om
du använder Selenium Grid v4 eller högre. Detta kommando kan __inte__ användas när du kör
automatiserade tester i molnet. Läs mer i avsnittet [Automation Protocols](/docs/automationProtocols).

:::

Du kan läsa mer om att mocka förfrågningar och svar i WebdriverIO i vår guide [Mocks and Spies](/docs/mocksandspies).

## Multi-remote

I en [multi-remote](/docs/multiremote)-webbläsare returnerar [`browser.mock()`](/docs/api/browser/mock) en `MultiRemoteMock` istället för detta objekt. `instances` listar webbläsarnamnen, och `getInstance(name)` returnerar `Mock` för den webbläsaren. `respond()`, `restore()` och de andra metoderna nedan körs på varje instans. `calls` finns kvar på varje instans mock: `mock.getInstance('myChromeBrowser').calls`.

`getInstance` kastar `Multi-remote object has no instance named "<name>"` när `name` inte är en av `instances`.

## Egenskaper

Ett mock-objekt innehåller följande egenskaper:

| Namn | Typ | Detaljer |
| ---- | ---- | ------- |
| `url` | `String` | URL:en som skickades till mock-kommandot |
| `filterOptions` | `Object` | Resursfilteralternativen som skickades till mock-kommandot |
| `browser` | `Object` | [Browser-objektet](/docs/api/browser) som användes för att få mock-objektet. |
| `calls` | `Object[]` | Information om matchande webbläsarförfrågningar, med egenskaper som `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` och `body` |

## Metoder

Mock-objekt tillhandahåller olika kommandon, listade i avsnittet `mock`, som låter användare modifiera beteendet hos förfrågan eller svaret.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)
- [`waitForResponse`](/docs/api/mock/waitForResponse)

## Händelser

Mock-objektet är en EventEmitter och ett par händelser sänds ut för dina användningsfall.

Här är en lista över händelser.

### `request`

Denna händelse sänds ut när en nätverksförfrågan som matchar mock-mönstren startas. Förfrågan skickas med i händelsens callback.

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

Denna händelse sänds ut när nätverkssvaret skrivs över med [`respond`](/docs/api/mock/respond) eller [`respondOnce`](/docs/api/mock/respondOnce). Svaret skickas med i händelsens callback.

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

Denna händelse sänds ut när en nätverksförfrågan avbryts med [`abort`](/docs/api/mock/abort) eller [`abortOnce`](/docs/api/mock/abortOnce). Fail skickas med i händelsens callback.

Fail-gränssnitt:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Denna händelse sänds ut när en ny matchning läggs till, före `continue` eller `overwrite`. Matchningen skickas med i händelsens callback.

Match-gränssnitt:
```ts
interface MatchEvent {
    url: string // Förfrågans URL (utan fragment).
    urlFragment?: string // Fragment av den begärda URL:en som börjar med hash, om det finns.
    method: string // HTTP-förfrågningsmetod.
    headers: Record<string, string> // HTTP-förfrågningshuvuden.
    postData?: string // HTTP POST-förfrågningsdata.
    hasPostData?: boolean // Sant när förfrågan har POST-data.
    mixedContentType?: MixedContentType // Förfrågans exporttyp för blandat innehåll.
    initialPriority: ResourcePriority // Resursförfrågans prioritet vid tidpunkten då förfrågan skickas.
    referrerPolicy: ReferrerPolicy // Förfrågans referrer-policy, enligt definitionen i https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Om den laddas via link preload.
    body: string | Buffer | JsonCompatible // Svarets body för den faktiska resursen.
    responseHeaders: Record<string, string> // HTTP-svarshuvuden.
    statusCode: number // HTTP-svarets statuskod.
    mockedResponse?: string | Buffer // Om mocken som sänder ut händelsen också modifierade dess svar.
}
```

### `continue`

Denna händelse sänds ut när nätverkssvaret varken har skrivits över eller avbrutits, eller om svaret redan har skickats av en annan mock. `requestId` skickas med i händelsens callback.

## Exempel

Hämta antalet väntande förfrågningar:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // det är viktigt att matcha alla förfrågningar, annars kan det resulterande värdet bli mycket förvirrande.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

Kasta ett fel vid 404-nätverksfel:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // väntar här, eftersom vissa förfrågningar fortfarande kan vara väntande
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

Avgöra om mockens svarsvärde användes:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // utlöses för första förfrågan till '**/foo/**'
}).on('continue', () => {
    // utlöses för resterande förfrågningar till '**/foo/**'
})

secondMock.on('continue', () => {
    // utlöses för första förfrågan till '**/foo/bar/**'
}).on('overwrite', () => {
    // utlöses för resterande förfrågningar till '**/foo/bar/**'
})
```

I det här exemplet definierades `firstMock` först och har ett `respondOnce`-anrop, så svarsvärdet från `secondMock` kommer inte att användas för den första förfrågan, men kommer att användas för resten av dem.