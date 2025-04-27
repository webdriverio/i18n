---
id: switchContext
title: switchContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

Cambia a un contexto específico utilizando un `name`, `title` o `url` de Webview dado.

Este método mejora el comando `context` predeterminado de Appium ofreciendo más flexibilidad y precisión
para cambiar entre contextos nativos y webview en aplicaciones móviles híbridas.

### Cómo funcionan los contextos
Para una visión general de las aplicaciones híbridas y webviews, consulta la [documentación de Aplicaciones Híbridas](/docs/api/mobile#hybrid-apps).
A continuación se presenta un resumen de cómo el comando `switchContext` aborda desafíos comunes:

#### Desafíos en Android
- Los webviews a menudo contienen múltiples páginas (similares a pestañas del navegador). Identificar la página correcta requiere 
  metadatos adicionales como `title` o `url`, que no son proporcionados por los métodos predeterminados de Appium.
- Los métodos predeterminados de Appium devuelven solo nombres básicos de contexto (por ejemplo, `WEBVIEW_{packageName}`) sin detalles sobre
  el contenido o las páginas dentro del webview.
- Cambiar contextos en Android implica dos pasos, que son manejados automáticamente por este método:
  1. Cambiar al contexto Webview usando `WEBVIEW_{packageName}`.
  2. Seleccionar la página apropiada dentro del Webview usando el método `switchToWindow`.

#### Desafíos en iOS
- Los webviews se identifican mediante IDs genéricos (por ejemplo, `WEBVIEW_{id}`), que no proporcionan información sobre el contenido
  o la pantalla de la aplicación a la que corresponden.
- Determinar el webview correcto para la interacción a menudo requiere prueba y error.

El método `switchContext` simplifica este proceso recuperando metadatos detallados (por ejemplo, `title`, `url` y visibilidad)
para garantizar un cambio de contexto preciso y confiable.

### ¿Por qué usar este método?
- **Cambio simplificado**: Si conoces el `title` o `url` del webview deseado, este método elimina la necesidad de
  llamadas adicionales a `getContexts` o combinar múltiples métodos como `switchContext({id})` y `getTitle()`.
- **Coincidencia automática de contexto**: Encuentra la mejor coincidencia para un contexto basado en:
  - Identificadores específicos de la plataforma (`bundleId` para iOS, `packageName` para Android).
  - Coincidencias exactas o parciales para `title` o `url` (admite tanto cadenas como expresiones regulares).
  - Comprobaciones específicas de Android para asegurar que los webviews estén adjuntos y visibles.
- **Control detallado**: Intervalos de reintento personalizados y tiempos de espera (solo para Android) te permiten manejar retrasos en la inicialización del webview.
- **Acceso al método predeterminado de Appium**: Si es necesario, puedes usar el comando `switchContext` predeterminado de Appium a través de `driver.switchAppiumContext()`.

:::info Notas y limitaciones

- Si se conoce el `title` o `url` del webview deseado, este método puede localizar automáticamente y cambiar al contexto coincidente sin llamadas adicionales a `getContexts`.
- Las opciones específicas de Android como `androidWebviewConnectionRetryTime` y `androidWebviewConnectTimeout` no son aplicables a iOS.
- Registra las razones de los fallos de coincidencia de contexto para ayudar con la depuración.
- Cuando se usa un objeto como entrada, se requiere `title` o `url`.

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
      <td><code><var>context</var></code></td>
      <td>`string, SwitchContextOptions`</td>
      <td>El nombre del contexto al que cambiar. Se puede proporcionar un objeto con más opciones de contexto.</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>Opciones del comando switchContext</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string, RegExp`</td>
      <td>El título de la página a la que cambiar. Este será el contenido de la etiqueta title de una página webview. Puedes usar una cadena que debe coincidir completamente o una expresión regular.<br /><strong>IMPORTANTE:</strong> Cuando usas opciones, se requiere la propiedad `title` o `url`.</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string, RegExp`</td>
      <td>La url de la página a la que cambiar. Esta será la `url` de una página webview. Puedes usar una cadena que debe coincidir completamente o una expresión regular.<br /><strong>IMPORTANTE:</strong> Cuando usas opciones, se requiere la propiedad `title` o `url`.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>El tiempo en milisegundos para esperar entre cada reintento de conexión al webview. El valor predeterminado es `500` ms (opcional). <br /><strong>SOLO PARA ANDROID</strong> y solo se usará cuando se proporcione un `title` o `url`.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>La cantidad máxima de tiempo en milisegundos para esperar a que se detecte una página de webview. El valor predeterminado es `5000` ms (opcional). <br /><strong>SOLO PARA ANDROID</strong> y solo se usará cuando se proporcione un `title` o `url`.</td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```js title="example.test.js"
it('should switch to a webview by name and uses the default Appium `context`-method', async () => {
    // For Android, the context will be '`WEBVIEW_{packageName}`'
    await driver.switchContext('WEBVIEW_com.wdiodemoapp')
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.switchContext('WEBVIEW_94703.19')
})

```

```js title="exact.title.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the title needs to be an exact match
        title: 'Webview Title',
    })
})

```

```js title="exact.url.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the url needs to be an exact match
        url: 'https://webdriver.io',
    })
})

```

```js title="regex.title.url.test.js"
it('should switch to a webview and match a webview based on regex match of the `title` and `url` of the webview', async () => {
    await driver.switchContext({
        // The title should NOT end with 'foo'
        title: /^(?!.*foo$)/,
        // Matches any string that contains the substring `docs/api/mobile/switchContext`
        url: /.*docs\/api\/mobile\/switchContext/,
    })
})

```

```js title="android.context.waits.test.js"
it('should switch to a webview for Android but wait longer to connect and find a webview based on provided options', async () => {
    await driver.switchContext({
        // In this case the title need to be an exact match
        title: 'Webview Title',
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```