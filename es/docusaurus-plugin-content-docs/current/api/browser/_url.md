---
id: url
title: url
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/url.ts
---

El comando `url` carga una URL en el navegador. Si se especifica una baseUrl en la configuración,
se antepondrá al parámetro url utilizando el método url.resolve() de node. Llamar a
`browser.url('...')` con la misma url que la última vez activará una recarga de la página. Sin embargo,
si la url contiene un hash, el navegador no activará una nueva navegación y el usuario
tiene que [actualizar](/docs/api/webdriver#refresh) la página para activar una.

El comando devuelve un objeto `WebdriverIO.Request` que contiene información sobre la
solicitud y los datos de respuesta de la carga de la página:

```ts
interface WebdriverIO.Request {
  id?: string
  url: string
  timestamp: number
  navigation?: string
  redirectChain?: string[],
  headers: Record<string, string>
  cookies?: NetworkCookie[]
  \/**
   * Error message if request failed
   *\/
  error?: string
  response?: {
      fromCache: boolean
      headers: Record<string, string>
      mimeType: string
      status: number
  },
  /**
   * List of all requests that were made due to the main request.
   * Note: the list may be incomplete and does not contain request that were
   * made after the command has finished.
   *
   * The property will be undefined if the request is not a document request
   * that was initiated by the browser.
   *\/
  children?: Request[]
}
```

El comando admite las siguientes opciones:

### wait
El estado deseado en el que debe estar el recurso solicitado antes de finalizar el comando.
Admite los siguientes estados:

 - `none`: no espera después de que se realiza la solicitud de página y se recibe la respuesta
 - `interactive`: espera hasta que la página sea interactiva
 - `complete`: espera hasta que el árbol DOM de la página esté completamente cargado
 - `networkIdle`: espera hasta que no haya solicitudes de red pendientes

### headers

Cabeceras que se enviarán con la solicitud.

__Predeterminado:__ `{}`

### auth

Credenciales de autenticación básica.
Nota: esto sobrescribirá la cabecera `Authorization` existente si se proporciona en la opción `headers`.

### timeout

Si se establece en un número, el comando esperará la cantidad especificada de milisegundos para que la página cargue
todas las respuestas antes de regresar.

Nota: para que esto tenga un impacto, se requiere que la opción `wait` esté configurada como `networkIdle`.

__Predeterminado:__ `5000`

##### Uso

```js
browser.url(url, { wait, timeout, onBeforeLoad, auth, headers })
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>la URL a la que navegar</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`UrlOptions`</td>
      <td>opciones de navegación</td>
    </tr>
    <tr>
      <td><code><var>options.wait</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`'none', 'interactive', 'networkIdle', 'complete'`</td>
      <td>El estado deseado en el que debe estar el recurso solicitado antes de finalizar el comando. Predeterminado: 'complete'</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Si se establece en un número, el comando esperará la cantidad especificada de milisegundos para que la página cargue
todas las respuestas antes de regresar. Predeterminado: 5000</td>
    </tr>
    <tr>
      <td><code><var>options.onBeforeLoad</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Function`</td>
      <td>Una función que se llama antes de que su página haya cargado todos sus recursos. Te permite simular fácilmente
el entorno, por ejemplo, sobrescribir las API Web que utiliza tu aplicación.</td>
    </tr>
    <tr>
      <td><code><var>options.auth</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`{user: string, pass: string}`</td>
      <td>credenciales de autenticación básica</td>
    </tr>
    <tr>
      <td><code><var>options.headers</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Record<string, string>`</td>
      <td>cabeceras que se enviarán con la solicitud</td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```js title="url.js"
// navigate to a new URL
const request = await browser.url('https://webdriver.io');
// log url
console.log(request.url); // outputs: "https://webdriver.io"
console.log(request.response?.status); // outputs: 200
console.log(request.response?.headers); // outputs: { 'content-type': 'text/html; charset=UTF-8' }

```

```js title="baseUrlResolutions.js"
// With a base URL of http://example.com/site, the following url parameters resolve as such:
// When providing a scheme:
// https://webdriver.io
await browser.url('https://webdriver.io');

// When not starting with a slash, the URL resolves relative to the baseUrl
// http://example.com/site/relative
await browser.url('relative');

// When starting with a slash, the URL resolves relative to the root path of the baseUrl
// http://example.com/rootRelative
await browser.url('/rootRelative');

```

```js title="basicAuth.js"
// navigate to a URL with basic authentication
await browser.url('https://the-internet.herokuapp.com/basic_auth', {
    auth: {
        user
        pass
    }
});
await expect($('p=Congratulations! You must have the proper credentials.').toBeDisplayed();

```

```js title="onBeforeLoad.js"
// navigate to a URL and mock the battery API
await browser.url('https://pazguille.github.io/demo-battery-api/', {
    onBeforeLoad (win) {
        // mock "navigator.battery" property
        // returning mock charge object
        win.navigator.getBattery = () => Promise.resolve({
            level: 0.5,
            charging: false,
            chargingTime: Infinity,
            dischargingTime: 3600, // seconds
        })
    }
})
// now we can assert actual text - we are charged at 50%
await expect($('.battery-percentage')).toHaveText('50%')
// and has enough juice for 1 hour
await expect($('.battery-remaining')).toHaveText('01:00)
```

##### Devuelve

- **&lt;WebdriverIO.Request&gt;**
            **<code><var>returns</var></code>:**  un objeto de solicitud de la carga de la página con información sobre los datos de solicitud y respuesta