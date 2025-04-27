---
id: getContext
title: getContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

Recupera el contexto de la sesión actual.

Este método mejora el comando predeterminado de Appium `context`/WebdriverIO `getContext` proporcionando una opción para
devolver información detallada del contexto, facilitando el trabajo con aplicaciones híbridas que utilizan webviews.

### Cómo funcionan los contextos
Consulta la [documentación de Aplicaciones Híbridas](/docs/api/mobile#hybrid-apps) para más información. A continuación se explican los desafíos asociados con el comando `getContext`:

#### Para Android:
- Los webviews pueden contener múltiples páginas (como pestañas de navegador), y la identificación de la página correcta requiere metadatos adicionales
  como `title` o `url`.
- Los métodos predeterminados de Appium solo proporcionan nombres básicos de contexto (por ejemplo, `WEBVIEW_{packageName}`) sin información detallada
  sobre las páginas dentro del webview.

#### Para iOS:
- Cada webview se identifica con una cadena genérica `WEBVIEW_{id}`, que no indica su contenido o la pantalla de la aplicación
  a la que pertenece.

### ¿Por qué usar este método?
- **Comportamiento predeterminado**:
  - Devuelve el contexto actual como una cadena (por ejemplo, `NATIVE_APP` o `WEBVIEW_{id}`).
- **Contexto detallado**:
  - Cuando `returnDetailedContext` está habilitado, recupera metadatos como:
    - **Android**: `packageName`, `title`, `url` y `webviewPageId`.
    - **iOS**: `bundleId`, `title` y `url`.
- **Opciones específicas de Android**:
  - Los intervalos de reintento y tiempos de espera se pueden personalizar para manejar retrasos en la inicialización del webview.

:::info Notas y limitaciones

- Si `returnDetailedContext` no está habilitado, el método se comporta como el método predeterminado de Appium `getContext`.
- Si deseas utilizar el método "predeterminado" de Appium `context`, puedes usar el método `driver.getAppiumContext()`, ver
también el comando [Appium Contexts](/docs/api/appium#getappiumcontext).
- **Android:** Las opciones específicas de Android (`androidWebviewConnectionRetryTime` y `androidWebviewConnectTimeout`) no tienen efecto en iOS.
- Muestra advertencias si se encuentran múltiples o ningún contexto detallado:
  - `We found more than 1 detailed context for the current context '{context}'. We will return the first context.`
  - `We did not get back any detailed context for the current context '{context}'. We will return the current context as a string.`

:::

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`GetContextsOptions`</td>
      <td>Las opciones de `getContext` (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`boolean`</td>
      <td>Por defecto, solo devolvemos el nombre del contexto basado en la API predeterminada de Appium `context`, que es solo una cadena. Si deseas obtener información detallada del contexto, establece esto como `true`. El valor predeterminado es `false` (opcional).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>El tiempo en milisegundos para esperar entre cada reintento de conexión al webview. El valor predeterminado es `500` ms (opcional). <br /><strong>SOLO PARA ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>El tiempo máximo en milisegundos para esperar a que se detecte una página de webview. El valor predeterminado es `5000` ms (opcional). <br /><strong>SOLO PARA ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```js title="default.test.js"
it('should return the current context with the default Appium `context` method', async () => {
    // For Android
    await driver.getContext()
    // Returns 'WEBVIEW_com.wdiodemoapp' or 'NATIVE_APP'
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext()
    // Returns 'WEBVIEW_94703.19' or 'NATIVE_APP'
})

```

```js title="detailed.test.js"
it('should return the context of the current session with more detailed information', async () => {
    // For Android
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_com.wdiodemoapp',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   packageName: 'com.wdiodemoapp',
    //   webviewPageId: '5C0425CF67E9B169245F48FF21172912'
    // }
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_64981.1',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   bundleId: 'org.reactjs.native.example.wdiodemoapp'
    // }
})

```

```js title="customize.retry.test.js"
it('should be able to cusomize the retry intervals and timeouts to handle delayed webview initialization', async () => {
    // For Android
    await driver.getContext({
        returnDetailedContext: true,
        // NOTE: The following options are Android-specific
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```