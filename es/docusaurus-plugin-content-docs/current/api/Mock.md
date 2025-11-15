---
id: mock
title: El Objeto Mock
---

El objeto mock es un objeto que representa una simulación de red y contiene información sobre solicitudes que coincidieron con una `url` y `filterOptions` determinadas. Puede obtenerse utilizando el comando [`mock`](/docs/api/browser/mock).

:::info

Ten en cuenta que el uso del comando `mock` requiere soporte para el protocolo Chrome DevTools.
Este soporte se proporciona si ejecutas pruebas localmente en un navegador basado en Chromium o si
utilizas Selenium Grid v4 o superior. Este comando __no__ puede usarse cuando se ejecutan
pruebas automatizadas en la nube. Obtén más información en la sección [Protocolos de Automatización](/docs/automationProtocols).

:::

Puedes leer más sobre la simulación de solicitudes y respuestas en WebdriverIO en nuestra guía [Mocks y Spies](/docs/mocksandspies).

## Propiedades

Un objeto mock contiene las siguientes propiedades:

| Nombre | Tipo | Detalles |
| ---- | ---- | ------- |
| `url` | `String` | La url pasada al comando mock |
| `filterOptions` | `Object` | Las opciones de filtro de recursos pasadas al comando mock |
| `browser` | `Object` | El [Objeto Browser](/docs/api/browser) utilizado para obtener el objeto mock. |
| `calls` | `Object[]` | Información sobre las solicitudes del navegador coincidentes, que contienen propiedades como `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` y `body` |

## Métodos

Los objetos mock proporcionan varios comandos, listados en la sección `mock`, que permiten a los usuarios modificar el comportamiento de la solicitud o respuesta.

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

El objeto mock es un EventEmitter y emite varios eventos para tus casos de uso.

Aquí hay una lista de eventos.

### `request`

Este evento se emite al lanzar una solicitud de red que coincide con los patrones del mock. La solicitud se pasa en la devolución de llamada del evento.

Interfaz de solicitud:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

Este evento se emite cuando la respuesta de red se sobrescribe con [`respond`](/docs/api/mock/respond) o [`respondOnce`](/docs/api/mock/respondOnce). La respuesta se pasa en la devolución de llamada del evento.

Interfaz de respuesta:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

Este evento se emite cuando la solicitud de red se aborta con [`abort`](/docs/api/mock/abort) o [`abortOnce`](/docs/api/mock/abortOnce). El fallo se pasa en la devolución de llamada del evento.

Interfaz de fallo:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Este evento se emite cuando se agrega una nueva coincidencia, antes de `continue` o `overwrite`. La coincidencia se pasa en la devolución de llamada del evento.

Interfaz de coincidencia:
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

Este evento se emite cuando la respuesta de red no ha sido sobrescrita ni interrumpida, o si la respuesta ya fue enviada por otro mock. `requestId` se pasa en la devolución de llamada del evento.

## Ejemplos

Obtener el número de solicitudes pendientes:

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

Lanzar un error en caso de fallo de red 404:

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

Determinar si se usó el valor de respuesta del mock:

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

En este ejemplo, `firstMock` fue definido primero y tiene una llamada `respondOnce`, por lo que el valor de respuesta de `secondMock` no se utilizará para la primera solicitud, pero se utilizará para el resto de ellas.