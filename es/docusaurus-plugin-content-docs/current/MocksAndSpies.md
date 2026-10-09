---
id: mocksandspies
title: Mocks y espías de solicitudes
description: "Simula solicitudes y respuestas de red en tus pruebas con browser.mock, aborta solicitudes e inspecciona llamadas con espías."
---

WebdriverIO viene con soporte integrado para modificar respuestas de red, lo que te permite centrarte en probar tu aplicación frontend sin tener que configurar tu backend o un servidor de mocks. Puedes definir respuestas personalizadas para recursos web, como solicitudes a una API REST, en tu prueba y modificarlas dinámicamente.

:::info

Ten en cuenta que usar el comando `mock` requiere soporte para WebDriver Bidi. Normalmente es así cuando ejecutas pruebas localmente en un navegador basado en Chromium o en Firefox, así como si usas Selenium Grid v4 o superior. Si ejecutas pruebas en la nube, asegúrate de que tu proveedor en la nube sea compatible con WebDriver Bidi.

:::

## Crear un mock

Antes de poder modificar cualquier respuesta, primero tienes que definir un mock. Este mock se describe mediante la URL del recurso y puede filtrarse por el [método de solicitud](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) o por [cabeceras](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). El recurso se compara usando un [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern), donde `*` coincide con cualquier secuencia de caracteres. Una URL sin protocolo se compara solo con la ruta de la solicitud, por lo que `*/users/list` coincide con esa ruta en cualquier origen:

```js
// simula todos los recursos que terminan en "/users/list"
const userListMock = await browser.mock('*/users/list')

// o puedes especificar el mock filtrando los recursos por cabeceras o
// código de estado, simulando solo solicitudes exitosas a recursos json
const strictMock = await browser.mock('*', {
    // simula todas las respuestas json
    requestHeaders: { 'Content-Type': 'application/json' },
    // que fueron exitosas
    statusCode: 200
})

// en lugar de una cadena también puedes pasar un `URLPattern`; el polyfill
// también funciona en entornos de ejecución sin soporte nativo de URLPattern
import { URLPattern } from 'urlpattern-polyfill'
const patternMock = await browser.mock(new URLPattern({ pathname: '/users/list' }))
```

:::warning

Usa un único `*` como comodín en las URL; también coincide con `/`. Los comodines consecutivos antes de un texto fijo, como `**/api/**` o `**/data.json`, pueden causar un retroceso excesivo de la expresión regular en URL no relacionadas y congelar una prueba. Consulta el [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548). En las pruebas de componentes, usa también un protocolo y un nombre de host fijos para mantener el tráfico del runner fuera de la interceptación; consulta [mocks de solicitudes en pruebas de componentes](/docs/component-testing/mocking#requests).

:::

## Especificar respuestas personalizadas

Una vez que hayas definido un mock, puedes definir respuestas personalizadas para él. Esas respuestas personalizadas pueden ser un objeto para responder con un JSON, un archivo local para responder con un fixture personalizado o un recurso web para reemplazar la respuesta con un recurso de internet.

### Simular solicitudes de API

Para simular solicitudes de API en las que esperas una respuesta JSON, lo único que necesitas hacer es llamar a `respond` en el objeto mock con un objeto arbitrario que quieras devolver, por ejemplo:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/')

mock.respond([{
    title: 'Injected (non) completed Todo',
    order: null,
    completed: false
}, {
    title: 'Injected completed Todo',
    order: null,
    completed: true
}], {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    fetchResponse: false
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li').map(el => el.getText()))
// muestra: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

También puedes modificar las cabeceras de la respuesta, así como el código de estado, pasando algunos parámetros de respuesta del mock de la siguiente manera:

```js
mock.respond({ ... }, {
    // responde con el código de estado 404
    statusCode: 404,
    // combina las cabeceras de la respuesta con las siguientes cabeceras
    headers: { 'x-custom-header': 'foobar' }
})
```

Si quieres que el mock no llame al backend en absoluto, puedes pasar `false` en la opción `fetchResponse`.

```js
mock.respond({ ... }, {
    // no llama al backend real
    fetchResponse: false
})
```

`fetchResponse: false` nunca llama al backend. Un mock creado con un filtro `statusCode` o `responseHeaders` necesita esa respuesta para decidir si coincide, por lo que `respond()` y `respondOnce()` lanzan un error si los combinas. Elimina el filtro de respuesta, o deja `fetchResponse` sin definir para que el mock pueda leer la respuesta del backend y luego reemplazarla.

Se recomienda almacenar las respuestas personalizadas en archivos de fixtures para que simplemente puedas importarlas en tu prueba de la siguiente manera:

```js
// requiere Node.js v16.14.0 o superior para soportar las aserciones de importación JSON
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Simular recursos de texto

Si quieres modificar recursos de texto como JavaScript, archivos CSS u otros recursos basados en texto, simplemente puedes pasar la ruta de un archivo y WebdriverIO reemplazará el recurso original con él, por ejemplo:

```js
const scriptMock = await browser.mock('*/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// o responde con tu JS personalizado
scriptMock.respond('alert("I am a mocked resource")')
```

### Redirigir recursos web

También puedes simplemente reemplazar un recurso web con otro recurso web si la respuesta que deseas ya está alojada en la web. Esto funciona tanto con recursos individuales de la página como con la propia página web, por ejemplo:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // devuelve "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Respuestas dinámicas

Si la respuesta de tu mock depende de la respuesta original del recurso, también puedes modificar el recurso dinámicamente pasando una función que recibe la respuesta original como parámetro y establece el mock en función del valor devuelto, por ejemplo:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // reemplaza el contenido de las tareas con su número en la lista
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// devuelve
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## Abortar mocks

En lugar de devolver una respuesta personalizada, también puedes simplemente abortar la solicitud con uno de los siguientes errores HTTP:

- Failed
- Aborted
- TimedOut
- AccessDenied
- ConnectionClosed
- ConnectionReset
- ConnectionRefused
- ConnectionAborted
- ConnectionFailed
- NameNotResolved
- InternetDisconnected
- AddressUnreachable
- BlockedByClient
- BlockedByResponse

Esto es muy útil si quieres bloquear scripts de terceros en tu página que tienen una influencia negativa en tu prueba funcional. Puedes abortar un mock simplemente llamando a `abort` o `abortOnce`, por ejemplo:

```js
const mock = await browser.mock('https://www.google-analytics.com/*')
mock.abort('Failed')
```

## Espías

Cada mock es automáticamente un espía que cuenta la cantidad de solicitudes que el navegador hizo a ese recurso. Si no aplicas una respuesta personalizada o un motivo de aborto al mock, continúa con la respuesta predeterminada que recibirías normalmente. Esto te permite comprobar cuántas veces el navegador realizó la solicitud, por ejemplo, a un determinado endpoint de la API.

```js
const mock = await browser.mock('*/user', { method: 'post' })
console.log(mock.calls.length) // devuelve 0

// registra al usuario
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// comprueba si se realizó la solicitud a la API
expect(mock.calls.length).toBe(1)

// verifica la respuesta
expect(mock.calls[0].body).toEqual({ success: true })
```

Si necesitas esperar hasta que una solicitud coincidente haya respondido, usa `mock.waitForResponse(options)`. Consulta la referencia de la API: [waitForResponse](/docs/api/mock/waitForResponse).

## Multi-remote

En un navegador [multi-remote](/docs/multiremote), `mock()` devuelve un `MultiRemoteMock` en lugar de un único `Mock`. Métodos como `respond()` y `restore()` se ejecutan en todas las instancias. `waitForResponse()` espera hasta que cada instancia tenga una respuesta coincidente. Las solicitudes capturadas permanecen en el mock de ese navegador:

```ts
const mock = await browser.mock('*/user', { method: 'post' })
mock.respond({ success: true })

// registra un usuario en cada navegador para que cada sesión envíe la solicitud
await browser.$('#username').setValue('randomUser')
await browser.$('#password').setValue('password123')
await browser.$('#password_repeat').setValue('password123')
await browser.$('button[type="submit"]').click()

await mock.waitForResponse()

expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
expect(mock.getInstance('myFirefoxBrowser').calls).toHaveLength(1)
```

`mock.instances` enumera esos nombres en el orden en que se crearon los mocks. `getInstance` lanza `Multi-remote object has no instance named "<name>"` cuando el nombre no está en esa lista. Un mock creado a partir de `browser.select('myFirefoxBrowser', 'myChromeBrowser')` enumera Firefox primero, lo que puede diferir de `browser.instances`.

Para simular solo un navegador, llama a `mock()` en esa instancia:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/user')
```