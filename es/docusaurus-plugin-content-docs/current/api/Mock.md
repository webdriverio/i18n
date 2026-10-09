---
id: mock
title: El objeto Mock
---

El objeto mock es un objeto que representa un mock de red y contiene información sobre las solicitudes que coincidieron con la `url` y las `filterOptions` dadas. Se puede obtener usando el comando [`mock`](/docs/api/browser/mock).

:::info

Ten en cuenta que usar el comando `mock` requiere soporte para el protocolo Chrome DevTools.
Ese soporte está disponible si ejecutas las pruebas localmente en un navegador basado en Chromium o si
usas un Selenium Grid v4 o superior. Este comando __no__ se puede usar al ejecutar
pruebas automatizadas en la nube. Obtén más información en la sección [Protocolos de automatización](/docs/automationProtocols).

:::

Puedes leer más sobre cómo simular solicitudes y respuestas en WebdriverIO en nuestra guía [Mocks y Spies](/docs/mocksandspies).

## Multi-remote

En un navegador [multi-remote](/docs/multiremote), [`browser.mock()`](/docs/api/browser/mock) devuelve un `MultiRemoteMock` en lugar de este objeto. `instances` enumera los nombres de los navegadores, y `getInstance(name)` devuelve el `Mock` para ese navegador. `respond()`, `restore()` y los demás métodos que se describen a continuación se ejecutan en cada instancia. `calls` permanece en el mock de cada instancia: `mock.getInstance('myChromeBrowser').calls`.

`getInstance` lanza `Multi-remote object has no instance named "<name>"` cuando `name` no es uno de los valores de `instances`.

## Propiedades

Un objeto mock contiene las siguientes propiedades:

| Nombre | Tipo | Detalles |
| ---- | ---- | ------- |
| `url` | `String` | La url pasada al comando mock |
| `filterOptions` | `Object` | Las opciones de filtro de recursos pasadas al comando mock |
| `browser` | `Object` | El [objeto Browser](/docs/api/browser) usado para obtener el objeto mock. |
| `calls` | `Object[]` | Información sobre las solicitudes del navegador que coinciden, que contiene propiedades como `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` y `body` |

## Métodos

Los objetos mock proporcionan varios comandos, enumerados en la sección `mock`, que permiten a los usuarios modificar el comportamiento de la solicitud o la respuesta.

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

El objeto mock es un EventEmitter y emite un par de eventos para tus casos de uso.

Aquí hay una lista de eventos.

### `request`

Este evento se emite al iniciar una solicitud de red que coincide con los patrones del mock. La solicitud se pasa en el callback del evento.

Interfaz de la solicitud:
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

Interfaz de la respuesta:
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

Interfaz del fallo:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Este evento se emite cuando se agrega una nueva coincidencia, antes de `continue` u `overwrite`. La coincidencia se pasa en el callback del evento.

Interfaz de la coincidencia:
```ts
interface MatchEvent {
    url: string // URL de la solicitud (sin fragmento).
    urlFragment?: string // Fragmento de la URL solicitada que comienza con almohadilla, si está presente.
    method: string // Método de la solicitud HTTP.
    headers: Record<string, string> // Encabezados de la solicitud HTTP.
    postData?: string // Datos de la solicitud HTTP POST.
    hasPostData?: boolean // True cuando la solicitud tiene datos POST.
    mixedContentType?: MixedContentType // El tipo de contenido mixto de la solicitud.
    initialPriority: ResourcePriority // Prioridad de la solicitud del recurso en el momento en que se envía la solicitud.
    referrerPolicy: ReferrerPolicy // La política de referencia de la solicitud, según se define en https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Si se carga mediante link preload.
    body: string | Buffer | JsonCompatible // Cuerpo de la respuesta del recurso real.
    responseHeaders: Record<string, string> // Encabezados de la respuesta HTTP.
    statusCode: number // Código de estado de la respuesta HTTP.
    mockedResponse?: string | Buffer // Si el mock que emite el evento también modificó su respuesta.
}
```

### `continue`

Este evento se emite cuando la respuesta de red no ha sido sobrescrita ni interrumpida, o si la respuesta ya fue enviada por otro mock. `requestId` se pasa en el callback del evento.

## Ejemplos

Obtener el número de solicitudes pendientes:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // es importante que coincida con todas las solicitudes; de lo contrario, el valor resultante puede ser muy confuso.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

Lanzar un error ante un fallo de red 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // esperando aquí, porque algunas solicitudes aún pueden estar pendientes
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

En este ejemplo, `firstMock` se definió primero y tiene una llamada a `respondOnce`, por lo que el valor de respuesta de `secondMock` no se usará para la primera solicitud, pero sí para el resto.