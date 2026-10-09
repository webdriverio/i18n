---
id: mock
title: Obiekt Mock
---

Obiekt mock to obiekt, który reprezentuje mock sieciowy i zawiera informacje o żądaniach pasujących do podanych `url` i `filterOptions`. Można go uzyskać za pomocą polecenia [`mock`](/docs/api/browser/mock).

:::info

Pamiętaj, że użycie polecenia `mock` wymaga obsługi protokołu Chrome DevTools.
Taka obsługa jest dostępna, jeśli uruchamiasz testy lokalnie w przeglądarce opartej na Chromium lub jeśli
używasz Selenium Grid w wersji 4 lub wyższej. Tego polecenia __nie__ można używać podczas uruchamiania
testów automatycznych w chmurze. Dowiedz się więcej w sekcji [Protokoły automatyzacji](/docs/automationProtocols).

:::

Więcej o mockowaniu żądań i odpowiedzi w WebdriverIO możesz przeczytać w naszym przewodniku [Mocki i szpiedzy](/docs/mocksandspies).

## Multi-remote

W przeglądarce [multi-remote](/docs/multiremote) [`browser.mock()`](/docs/api/browser/mock) zwraca `MultiRemoteMock` zamiast tego obiektu. `instances` zawiera listę nazw przeglądarek, a `getInstance(name)` zwraca `Mock` dla danej przeglądarki. `respond()`, `restore()` oraz pozostałe metody opisane poniżej są wykonywane na każdej instancji. `calls` pozostaje w mocku każdej instancji: `mock.getInstance('myChromeBrowser').calls`.

`getInstance` zgłasza błąd `Multi-remote object has no instance named "<name>"`, gdy `name` nie należy do `instances`.

## Właściwości

Obiekt mock zawiera następujące właściwości:

| Nazwa | Typ | Szczegóły |
| ---- | ---- | ------- |
| `url` | `String` | URL przekazany do polecenia mock |
| `filterOptions` | `Object` | Opcje filtrowania zasobów przekazane do polecenia mock |
| `browser` | `Object` | [Obiekt Browser](/docs/api/browser) użyty do uzyskania obiektu mock. |
| `calls` | `Object[]` | Informacje o pasujących żądaniach przeglądarki, zawierające właściwości takie jak `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` i `body` |

## Metody

Obiekty mock udostępniają różne polecenia, wymienione w sekcji `mock`, które pozwalają użytkownikom modyfikować zachowanie żądania lub odpowiedzi.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)
- [`waitForResponse`](/docs/api/mock/waitForResponse)

## Zdarzenia

Obiekt mock jest obiektem EventEmitter i emituje kilka zdarzeń, które możesz wykorzystać w swoich przypadkach użycia.

Oto lista zdarzeń.

### `request`

To zdarzenie jest emitowane podczas uruchamiania żądania sieciowego, które pasuje do wzorców mocka. Żądanie jest przekazywane do callbacku zdarzenia.

Interfejs żądania:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

To zdarzenie jest emitowane, gdy odpowiedź sieciowa zostaje nadpisana za pomocą [`respond`](/docs/api/mock/respond) lub [`respondOnce`](/docs/api/mock/respondOnce). Odpowiedź jest przekazywana do callbacku zdarzenia.

Interfejs odpowiedzi:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

To zdarzenie jest emitowane, gdy żądanie sieciowe zostaje przerwane za pomocą [`abort`](/docs/api/mock/abort) lub [`abortOnce`](/docs/api/mock/abortOnce). Informacja o niepowodzeniu jest przekazywana do callbacku zdarzenia.

Interfejs niepowodzenia:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

To zdarzenie jest emitowane, gdy dodane zostanie nowe dopasowanie, przed `continue` lub `overwrite`. Dopasowanie jest przekazywane do callbacku zdarzenia.

Interfejs dopasowania:
```ts
interface MatchEvent {
    url: string // URL żądania (bez fragmentu).
    urlFragment?: string // Fragment żądanego URL zaczynający się od krzyżyka (hash), jeśli występuje.
    method: string // Metoda żądania HTTP.
    headers: Record<string, string> // Nagłówki żądania HTTP.
    postData?: string // Dane żądania HTTP POST.
    hasPostData?: boolean // True, gdy żądanie zawiera dane POST.
    mixedContentType?: MixedContentType // Typ mieszanej zawartości (mixed content) żądania.
    initialPriority: ResourcePriority // Priorytet żądania zasobu w momencie wysłania żądania.
    referrerPolicy: ReferrerPolicy // Polityka referrera żądania, zgodnie z definicją w https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Czy zasób jest ładowany przez link preload.
    body: string | Buffer | JsonCompatible // Treść odpowiedzi rzeczywistego zasobu.
    responseHeaders: Record<string, string> // Nagłówki odpowiedzi HTTP.
    statusCode: number // Kod statusu odpowiedzi HTTP.
    mockedResponse?: string | Buffer // Jeśli mock emitujący zdarzenie również zmodyfikował jego odpowiedź.
}
```

### `continue`

To zdarzenie jest emitowane, gdy odpowiedź sieciowa nie została ani nadpisana, ani przerwana, lub jeśli odpowiedź została już wysłana przez inny mock. `requestId` jest przekazywane do callbacku zdarzenia.

## Przykłady

Pobieranie liczby oczekujących żądań:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // ważne jest, aby dopasować wszystkie żądania, w przeciwnym razie wynikowa wartość może być bardzo myląca.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

Zgłaszanie błędu przy niepowodzeniu sieciowym 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // czekamy tutaj, ponieważ niektóre żądania mogą nadal oczekiwać
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

Sprawdzanie, czy wartość odpowiedzi mocka została użyta:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // wywoływane dla pierwszego żądania do '**/foo/**'
}).on('continue', () => {
    // wywoływane dla pozostałych żądań do '**/foo/**'
})

secondMock.on('continue', () => {
    // wywoływane dla pierwszego żądania do '**/foo/bar/**'
}).on('overwrite', () => {
    // wywoływane dla pozostałych żądań do '**/foo/bar/**'
})
```

W tym przykładzie `firstMock` został zdefiniowany jako pierwszy i ma jedno wywołanie `respondOnce`, więc wartość odpowiedzi `secondMock` nie zostanie użyta dla pierwszego żądania, ale zostanie użyta dla wszystkich pozostałych.