---
id: mocksandspies
title: Solicitudes Simuladas y Espías
---

WebdriverIO viene con soporte incorporado para modificar respuestas de red que te permite enfocarte en probar tu aplicación frontend sin tener que configurar tu backend o un servidor simulado. Puedes definir respuestas personalizadas para recursos web como solicitudes de API REST en tu prueba y modificarlas dinámicamente.

:::info

Ten en cuenta que usar el comando `mock` requiere soporte para el protocolo Chrome DevTools. Ese soporte se da si ejecutas pruebas localmente en un navegador basado en Chromium, a través de Selenium Grid v4 o superior, o a través de un proveedor en la nube con soporte para el protocolo Chrome DevTools (por ejemplo, SauceLabs, BrowserStack, LambdaTest). El soporte completo para todos los navegadores estará disponible una vez que las primitivas requeridas lleguen a [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) y se implementen en los respectivos navegadores.

:::

## Creando un mock

Antes de poder modificar cualquier respuesta, primero debes definir un mock. Este mock se describe por la URL del recurso y puede filtrarse por el [método de solicitud](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) o [cabeceras](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). El recurso admite expresiones glob mediante [minimatch](https://www.npmjs.com/package/minimatch):

```js
// simular todos los recursos que terminan con "/users/list"
const userListMock = await browser.mock('**/users/list')

// o puedes especificar el mock filtrando recursos por cabeceras o
// código de estado, solo simular solicitudes exitosas a recursos json
const strictMock = await browser.mock('**', {
    // simular todas las respuestas json
    requestHeaders: { 'Content-Type': 'application/json' },
    // que fueron exitosas
    statusCode: 200
})
```

## Especificando respuestas personalizadas

Una vez que hayas definido un mock, puedes definir respuestas personalizadas para él. Estas respuestas personalizadas pueden ser un objeto para responder con JSON, un archivo local para responder con un fixture personalizado o un recurso web para reemplazar la respuesta con un recurso de internet.

### Simulando Solicitudes API

Para simular solicitudes API donde esperas una respuesta JSON, todo lo que necesitas hacer es llamar a `respond` en el objeto mock con un objeto arbitrario que quieras devolver, por ejemplo:

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

También puedes modificar las cabeceras de respuesta así como el código de estado pasando algunos parámetros de respuesta mock de la siguiente manera:

```js
mock.respond({ ... }, {
    // responder con código de estado 404
    statusCode: 404,
    // combinar cabeceras de respuesta con las siguientes cabeceras
    headers: { 'x-custom-header': 'foobar' }
})
```

Si quieres que el mock no llame al backend en absoluto, puedes pasar `false` para la bandera `fetchResponse`.

```js
mock.respond({ ... }, {
    // no llamar al backend real
    fetchResponse: false
})
```

Se recomienda almacenar respuestas personalizadas en archivos de fixture para que puedas simplemente requerirlos en tu prueba de la siguiente manera:

```js
// requiere Node.js v16.14.0 o superior para admitir aserciones de importación JSON
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Simulando recursos de texto

Si deseas modificar recursos de texto como archivos JavaScript, CSS u otros recursos basados en texto, puedes simplemente pasar una ruta de archivo y WebdriverIO reemplazará el recurso original con él, por ejemplo:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// o responder con tu JS personalizado
scriptMock.respond('alert("I am a mocked resource")')
```

### Redirigir recursos web

También puedes reemplazar un recurso web con otro recurso web si tu respuesta deseada ya está alojada en la web. Esto funciona con recursos de página individuales así como con una página web completa, por ejemplo:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // devuelve "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Respuestas dinámicas

Si tu respuesta simulada depende de la respuesta del recurso original, también puedes modificar dinámicamente el recurso pasando una función que recibe la respuesta original como parámetro y establece el mock basado en el valor de retorno, por ejemplo:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // reemplazar contenido del todo con su número de lista
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

## Abortando mocks

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

Esto es muy útil si quieres bloquear scripts de terceros de tu página que tienen una influencia negativa en tu prueba funcional. Puedes abortar un mock simplemente llamando a `abort` o `abortOnce`, por ejemplo:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## Espías

Cada mock es automáticamente un espía que cuenta la cantidad de solicitudes que el navegador hizo a ese recurso. Si no aplicas una respuesta personalizada o razón de aborto al mock, continúa con la respuesta predeterminada que normalmente recibirías. Esto te permite verificar cuántas veces el navegador realizó la solicitud, por ejemplo, a un cierto punto final de API.

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // devuelve 0

// registrar usuario
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// verificar si se hizo la solicitud API
expect(mock.calls.length).toBe(1)

// verificar respuesta
expect(mock.calls[0].body).toEqual({ success: true })
```

Si necesitas esperar hasta que se haya respondido a una solicitud coincidente, usa `mock.waitForResponse(options)`. Consulta la referencia de la API: [waitForResponse](/docs/api/mock/waitForResponse).