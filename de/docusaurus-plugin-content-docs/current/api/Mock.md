---
id: mock
title: Das Mock-Objekt
---

Das Mock-Objekt ist ein Objekt, das einen Netzwerk-Mock repräsentiert und Informationen über Anfragen enthält, die mit den angegebenen `url` und `filterOptions` übereinstimmen. Es kann mit dem Befehl [`mock`](/docs/api/browser/mock) abgerufen werden.

:::info

Beachten Sie, dass die Verwendung des `mock`-Befehls Unterstützung für das Chrome DevTools-Protokoll erfordert.
Diese Unterstützung ist gegeben, wenn Sie Tests lokal in einem Chromium-basierten Browser ausführen oder
ein Selenium Grid v4 oder höher verwenden. Dieser Befehl kann __nicht__ verwendet werden, wenn
automatisierte Tests in der Cloud ausgeführt werden. Weitere Informationen finden Sie im Abschnitt [Automatisierungsprotokolle](/docs/automationProtocols).

:::

Mehr über das Mocken von Anfragen und Antworten in WebdriverIO erfahren Sie in unserem Leitfaden [Mocks und Spies](/docs/mocksandspies).

## Multi-remote

In einem [Multi-remote](/docs/multiremote)-Browser gibt [`browser.mock()`](/docs/api/browser/mock) anstelle dieses Objekts ein `MultiRemoteMock` zurück. `instances` listet die Browsernamen auf, und `getInstance(name)` gibt den `Mock` für diesen Browser zurück. `respond()`, `restore()` und die anderen unten aufgeführten Methoden werden auf jeder Instanz ausgeführt. `calls` verbleibt auf dem Mock der jeweiligen Instanz: `mock.getInstance('myChromeBrowser').calls`.

`getInstance` wirft `Multi-remote object has no instance named "<name>"`, wenn `name` nicht in `instances` enthalten ist.

## Eigenschaften

Ein Mock-Objekt enthält die folgenden Eigenschaften:

| Name | Typ | Details |
| ---- | ---- | ------- |
| `url` | `String` | Die URL, die an den mock-Befehl übergeben wurde |
| `filterOptions` | `Object` | Die Ressourcenfilteroptionen, die an den mock-Befehl übergeben wurden |
| `browser` | `Object` | Das [Browser-Objekt](/docs/api/browser), das verwendet wurde, um das Mock-Objekt zu erhalten. |
| `calls` | `Object[]` | Informationen über übereinstimmende Browser-Anfragen, die Eigenschaften wie `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` und `body` enthalten |

## Methoden

Mock-Objekte bieten verschiedene Befehle, die im Abschnitt `mock` aufgeführt sind und es Benutzern ermöglichen, das Verhalten der Anfrage oder Antwort zu ändern.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)
- [`waitForResponse`](/docs/api/mock/waitForResponse)

## Events

Das Mock-Objekt ist ein EventEmitter, und für Ihre Anwendungsfälle werden einige Events ausgelöst.

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

Dieses Event wird ausgelöst, wenn eine Netzwerkanfrage mit [`abort`](/docs/api/mock/abort) oder [`abortOnce`](/docs/api/mock/abortOnce) abgebrochen wird. Der Fehler wird im Event-Callback übergeben.

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
    url: string // Anfrage-URL (ohne Fragment).
    urlFragment?: string // Fragment der angefragten URL, beginnend mit Hash, falls vorhanden.
    method: string // HTTP-Anfragemethode.
    headers: Record<string, string> // HTTP-Anfrage-Header.
    postData?: string // HTTP-POST-Anfragedaten.
    hasPostData?: boolean // True, wenn die Anfrage POST-Daten enthält.
    mixedContentType?: MixedContentType // Der Mixed-Content-Exporttyp der Anfrage.
    initialPriority: ResourcePriority // Priorität der Ressourcenanfrage zum Zeitpunkt des Sendens der Anfrage.
    referrerPolicy: ReferrerPolicy // Die Referrer-Policy der Anfrage, wie definiert in https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Ob über Link-Preload geladen wird.
    body: string | Buffer | JsonCompatible // Antwort-Body der tatsächlichen Ressource.
    responseHeaders: Record<string, string> // HTTP-Antwort-Header.
    statusCode: number // HTTP-Antwort-Statuscode.
    mockedResponse?: string | Buffer // Falls der Mock, der das Event auslöst, auch dessen Antwort verändert hat.
}
```

### `continue`

Dieses Event wird ausgelöst, wenn die Netzwerkantwort weder überschrieben noch unterbrochen wurde oder wenn die Antwort bereits von einem anderen Mock gesendet wurde. `requestId` wird im Event-Callback übergeben.

## Beispiele

Ermitteln der Anzahl ausstehender Anfragen:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // es ist wichtig, alle Anfragen abzufangen, da der resultierende Wert sonst sehr verwirrend sein kann.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

Einen Fehler bei einem 404-Netzwerkfehler werfen:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // hier warten, da einige Anfragen noch ausstehen können
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

Feststellen, ob der Antwortwert des Mocks verwendet wurde:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // wird für die erste Anfrage an '**/foo/**' ausgelöst
}).on('continue', () => {
    // wird für die restlichen Anfragen an '**/foo/**' ausgelöst
})

secondMock.on('continue', () => {
    // wird für die erste Anfrage an '**/foo/bar/**' ausgelöst
}).on('overwrite', () => {
    // wird für die restlichen Anfragen an '**/foo/bar/**' ausgelöst
})
```

In diesem Beispiel wurde `firstMock` zuerst definiert und hat einen `respondOnce`-Aufruf, daher wird der Antwortwert von `secondMock` für die erste Anfrage nicht verwendet, aber für alle weiteren.