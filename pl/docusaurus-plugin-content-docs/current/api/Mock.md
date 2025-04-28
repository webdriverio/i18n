---
id: mock
title: Obiekt Mock
---

Obiekt mock to obiekt reprezentujący makietę sieciową, zawierający informacje o żądaniach, które pasowały do podanego `url` i `filterOptions`. Można go otrzymać za pomocą polecenia [`mock`](/docs/api/browser/mock).

:::info

Pamiętaj, że używanie polecenia `mock` wymaga wsparcia dla protokołu Chrome DevTools.
To wsparcie jest dostępne, jeśli uruchamiasz testy lokalnie w przeglądarce opartej na Chromium lub jeśli
używasz Selenium Grid w wersji 4 lub wyższej. To polecenie __nie może__ być używane podczas uruchamiania
zautomatyzowanych testów w chmurze. Dowiedz się więcej w sekcji [Protokoły Automatyzacji](/docs/automationProtocols).

:::

Więcej informacji o tworzeniu makiet dla żądań i odpowiedzi w WebdriverIO znajdziesz w naszym przewodniku [Makiety i Szpiedzy](/docs/mocksandspies).

## Właściwości

Obiekt mock zawiera następujące właściwości:

| Nazwa | Typ | Szczegóły |
| ---- | ---- | ------- |
| `url` | `String` | Adres URL przekazany do polecenia mock |
| `filterOptions` | `Object` | Opcje filtrowania zasobów przekazane do polecenia mock |
| `browser` | `Object` | [Obiekt przeglądarki](/docs/api/browser) używany do uzyskania obiektu mock. |
| `calls` | `Object[]` | Informacje o pasujących żądaniach przeglądarki, zawierające właściwości takie jak `url`, `method`, `headers`, `initialPriority`, `referrerPolicy`, `statusCode`, `responseHeaders` i `body` |

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

## Zdarzenia

Obiekt mock jest emiterem zdarzeń (EventEmitter) i kilka zdarzeń jest emitowanych do wykorzystania w twoich przypadkach użycia.

Oto lista zdarzeń.

### `request`

To zdarzenie jest emitowane przy uruchamianiu żądania sieciowego, które pasuje do wzorców mocka. Żądanie jest przekazywane w callbacku zdarzenia.

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

To zdarzenie jest emitowane, gdy odpowiedź sieciowa jest nadpisywana za pomocą [`respond`](/docs/api/mock/respond) lub [`respondOnce`](/docs/api/mock/respondOnce). Odpowiedź jest przekazywana w callbacku zdarzenia.

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

To zdarzenie jest emitowane, gdy żądanie sieciowe jest przerywane za pomocą [`abort`](/docs/api/mock/abort) lub [`abortOnce`](/docs/api/mock/abortOnce). Błąd jest przekazywany w callbacku zdarzenia.

Interfejs błędu:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

To zdarzenie jest emitowane, gdy dodawane jest nowe dopasowanie, przed `continue` lub `overwrite`. Dopasowanie jest przekazywane w callbacku zdarzenia.

Interfejs dopasowania:
```ts
interface MatchEvent {
    url: string // URL żądania (bez fragmentu).
    urlFragment?: string // Fragment żądanego URL zaczynający się od #, jeśli jest obecny.
    method: string // Metoda żądania HTTP.
    headers: Record<string, string> // Nagłówki żądania HTTP.
    postData?: string // Dane żądania HTTP POST.
    hasPostData?: boolean // Prawda, gdy żądanie ma dane POST.
    mixedContentType?: MixedContentType // Typ eksportu mieszanej zawartości żądania.
    initialPriority: ResourcePriority // Priorytet żądania zasobu w momencie wysłania żądania.
    referrerPolicy: ReferrerPolicy // Polityka odnośnika żądania, zgodnie z definicją w https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Czy jest ładowany za pomocą preload linku.
    body: string | Buffer | JsonCompatible // Zawartość odpowiedzi rzeczywistego zasobu.
    responseHeaders: Record<string, string> // Nagłówki odpowiedzi HTTP.
    statusCode: number // Kod statusu odpowiedzi HTTP.
    mockedResponse?: string | Buffer // Jeśli mock emitujący zdarzenie również zmodyfikował swoją odpowiedź.
}
```

### `continue`

To zdarzenie jest emitowane, gdy odpowiedź sieciowa nie została ani nadpisana, ani przerwana, lub jeśli odpowiedź została już wysłana przez inny mock. `requestId` jest przekazywany w callbacku zdarzenia.

## Przykłady

Uzyskiwanie liczby oczekujących żądań:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // ważne jest, aby dopasować wszystkie żądania, w przeciwnym razie wynikowa wartość może być bardzo myląca.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`dopasowano żądanie do ${request.url}, oczekuje ${pendingRequests} żądań`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`rozwiązano żądanie do ${url}, oczekuje ${pendingRequests} żądań`)
})
```

Zgłaszanie błędu przy niepowodzeniu sieciowym 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`żądanie do ${url} nie powiodło się z błędem "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // oczekiwanie tutaj, ponieważ niektóre żądania mogą nadal być w toku
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

Określanie, czy wartość odpowiedzi mock została użyta:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // wyzwalane dla pierwszego żądania do '**/foo/**'
}).on('continue', () => {
    // wyzwalane dla pozostałych żądań do '**/foo/**'
})

secondMock.on('continue', () => {
    // wyzwalane dla pierwszego żądania do '**/foo/bar/**'
}).on('overwrite', () => {
    // wyzwalane dla pozostałych żądań do '**/foo/bar/**'
})
```

W tym przykładzie, `firstMock` został zdefiniowany jako pierwszy i ma jedno wywołanie `respondOnce`, więc wartość odpowiedzi `secondMock` nie zostanie użyta dla pierwszego żądania, ale zostanie użyta dla pozostałych.