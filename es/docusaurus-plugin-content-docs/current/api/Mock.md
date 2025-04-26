---
id: mock
title: El Objeto Mock
---

El objeto mock es un objeto que representa una simulación de red y contiene información sobre las solicitudes que coincidieron con una `url` y `filterOptions` determinadas. Se puede obtener utilizando el comando [`mock`](/docs/api/browser/mock).

:::info

Ten en cuenta que el uso del comando `mock` requiere soporte para el protocolo Chrome DevTools.
Este soporte se proporciona si ejecutas pruebas localmente en un navegador basado en Chromium o si
utilizas Selenium Grid v4 o superior. Este comando __no__ puede utilizarse cuando se ejecutan
pruebas automatizadas en la nube. Obtén más información en la sección [Protocolos de Automatización](/docs/automationProtocols).

:::

Puedes leer más sobre la simulación de solicitudes y respuestas en WebdriverIO en nuestra guía de [Mocks y Spies](/docs/mocksandspies).

## Propiedades

Un objeto mock contiene las siguientes propiedades:

| Nombre | Tipo | Detalles |
| ---- | ---- | ------- |
| `url` | `String` | La url pasada al comando mock |
| `filterOptions` | `Object` | Las opciones de filtro de recursos pasadas al comando mock |
| `browser` | `Object` | El [Objeto Browser](/docs/api/browser) utilizado para obtener el objeto mock. |
| `calls` | `Object[]` | Información sobre las solicitudes del navegador coincidentes, que contiene propiedades como `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` y `body` |

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

## Eventos

El objeto mock es un EventEmitter y se emiten varios eventos para tus casos de uso.

Aquí hay una lista de eventos.

### `request`

Este evento se emite cuando se lanza una solicitud de red que coincide con los patrones de mock. La solicitud se pasa en el callback del evento.

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

Este evento se emite cuando la respuesta de red se sobrescribe con [`respond`](/docs/api/mock/respond) o [`respondOnce`](/docs/api/mock/respondOnce). La respuesta se pasa en el callback del evento.

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

Este evento se emite cuando la solicitud de red se aborta con [`abort`](/docs/api/mock/abort) o [`abortOnce`](/docs/api/mock/abortOnce). El fallo se pasa en el callback del evento.

Interfaz de fallo:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Este evento se emite cuando se agrega una nueva coincidencia, antes de `continue` o `overwrite`. La coincidencia se pasa en el callback del evento.

Interfaz de coincidencia:
```ts
interface MatchEvent {
    url: string // URL de la solicitud (sin fragmento).
    urlFragment?: string // Fragmento de la URL solicitada que comienza con hash, si está presente.
    method: string // Método de solicitud HTTP.
    headers: Record<string, string> // Encabezados de solicitud HTTP.
    postData?: string // Datos de solicitud HTTP POST.
    hasPostData?: boolean // Verdadero cuando la solicitud tiene datos POST.
    mixedContentType?: MixedContentType // El tipo de exportación de contenido mixto de la solicitud.
    initialPriority: ResourcePriority // Prioridad de la solicitud de recurso en el momento en que se envía la solicitud.
    referrerPolicy: ReferrerPolicy // La política de referencia de la solicitud, como se define en https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Si se carga a través de precarga de enlace.
    body: string | Buffer | JsonCompatible // Cuerpo de respuesta del recurso actual.
    responseHeaders: Record<string, string> // Encabezados de respuesta HTTP.
    statusCode: number // Código de estado de respuesta HTTP.
    mockedResponse?: string | Buffer // Si el mock, que emite el evento, también modificó su respuesta.
}
```

### `continue`

Este evento se emite cuando la respuesta de red no ha sido sobrescrita ni interrumpida, o si la respuesta ya fue enviada por otro mock. `requestId` se pasa en el callback del evento.

## Ejemplos

Obtener el número de solicitudes pendientes:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // es importante coincidir con todas las solicitudes, de lo contrario, el valor resultante puede ser muy confuso.
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

    // esperando aquí, porque algunas solicitudes pueden estar pendientes
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

Determinar si se utilizó el valor de respuesta del mock:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // se activa para la primera solicitud a '**/foo/**'
}).on('continue', () => {
    // se activa para el resto de solicitudes a '**/foo/**'
})

secondMock.on('continue', () => {
    // se activa para la primera solicitud a '**/foo/bar/**'
}).on('overwrite', () => {
    // se activa para el resto de solicitudes a '**/foo/bar/**'
})
```

En este ejemplo, `firstMock` se definió primero y tiene una llamada `respondOnce`, por lo que el valor de respuesta de `secondMock` no se utilizará para la primera solicitud, pero se utilizará para el resto de ellas.