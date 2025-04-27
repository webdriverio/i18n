---
id: getContexts
title: getContexts
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContexts.ts
---

El método `getContexts` de WebdriverIO es una versión mejorada del comando predeterminado de Appium `contexts`
(y el anterior `getContexts` de WebdriverIO). Proporciona información detallada y procesable
sobre los contextos disponibles en una sesión de aplicación móvil, abordando las limitaciones de los métodos predeterminados de Appium.

### Cómo funcionan las Webviews y por qué este método ayuda
Para más detalles, consulta la [documentación de Aplicaciones Híbridas](/docs/api/mobile#hybrid-apps). A continuación se presenta un resumen de los desafíos abordados por el comando `getContexts`:

#### Desafíos en Android
- Una sola webview (por ejemplo, `WEBVIEW_{packageName}`) puede contener múltiples páginas (similar a las pestañas del navegador).
- Los métodos predeterminados de Appium no incluyen detalles sobre estas páginas, como su `title`, `url` o visibilidad,
  lo que dificulta identificar la página correcta y puede generar inestabilidad.

#### Desafíos en iOS
- El método predeterminado de Appium solo devuelve IDs genéricos de webview (por ejemplo, `WEBVIEW_{id}`) sin ningún metadato adicional.
- Esto hace que sea difícil determinar qué webview corresponde a la pantalla de la aplicación objetivo.

El método mejorado `getContexts` resuelve estos problemas devolviendo objetos de contexto detallados, que incluyen:
- **Para Android:** `title`, `url`, `packageName`, `webviewPageId` y detalles de diseño (`screenX`, `screenY`, `width` y `height`).
- **Para iOS:** `bundleId`, `title` y `url`.

Estas mejoras hacen que la depuración y la interacción con aplicaciones híbridas sean más confiables.

### ¿Por qué usar este método?
Por defecto, el método `contexts` de Appium solo devuelve un array de strings que representan los contextos disponibles:
- **Para Android:** `['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]`
- **Para iOS:** `['NATIVE_APP', 'WEBVIEW_84392.1', ...]`

Aunque es suficiente para escenarios simples, estas respuestas predeterminadas carecen de metadatos críticos para pruebas de aplicaciones híbridas:
- **Para Android:** La falta de metadatos específicos de página dificulta la interacción con la webview correcta.
- **Para iOS:** Los IDs genéricos de webview no proporcionan información sobre el contenido o la pantalla de la aplicación que representan.

El método mejorado `getContexts` proporciona:
- Metadatos detallados tanto para Android como para iOS.
- Opciones para filtrar y personalizar los contextos devueltos para una mejor segmentación e interacción.

:::info Notas y limitaciones

- El método mejorado `getContexts` funciona tanto en plataformas Android como iOS. Sin embargo, los datos devueltos pueden variar según la plataforma y la aplicación bajo prueba.
- Si no especificas la opción `returnDetailedContexts`, el método se comporta como el método predeterminado `contexts` de Appium, devolviendo un array simple de contextos.
- Para usar el método "predeterminado" `contexts` de Appium, usa `driver.getAppiumContexts()`. Para más información, consulta la [documentación de Appium Contexts](/docs/api/appium#getappiumcontexts).

#### Webviews de Android:
- Los metadatos como `androidWebviewData` solo están disponibles cuando `returnAndroidDescriptionData` es `true`.
- Usar el método `getContexts` en un navegador Chrome puede ocasionalmente devolver datos incompletos debido a versiones incompatibles de navegador/Webview/ChromeDriver. En tales casos, se pueden devolver valores predeterminados o un `webviewPageId` incorrecto (por ejemplo, `0`).

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
      <td>Las opciones de `getContexts` (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContexts</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`boolean`</td>
      <td>Por defecto, solo devolvemos los nombres de contexto basados en la API predeterminada `contexts` de Appium. Si quieres obtener todos los datos, puedes establecer esto como `true`. El valor predeterminado es `false` (opcional).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>El tiempo en milisegundos para esperar entre cada intento de conexión a la webview. Por defecto es `500` ms (opcional). <br /><strong>SOLO PARA ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>La cantidad máxima de tiempo en milisegundos para esperar a que se detecte una página de web view. Por defecto es `5000` ms (opcional). <br /><strong>SOLO PARA ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.filterByCurrentAndroidApp</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`boolean`</td>
      <td>Por defecto, devolvemos todas las webviews. Si deseas filtrar las webviews por la aplicación Android actual que está abierta, puedes establecer esto como `true`. El valor predeterminado es `false` (opcional). <br /><strong>NOTA:</strong> Ten en cuenta que también puedes NO encontrar ninguna Webview basada en esta "restricción". <br /><strong>SOLO PARA ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.isAndroidWebviewVisible</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`boolean`</td>
      <td>Por defecto, solo devolvemos las webviews que están adjuntas y visibles. Si deseas obtener todas las webviews, puedes establecer esto como `false` (opcional). El valor predeterminado es `true`. <br /><strong>SOLO PARA ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.returnAndroidDescriptionData</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`boolean`</td>
      <td>Por defecto, no hay datos de descripción de Webview de Android (Chrome). Si deseas obtener todos los datos, puedes establecer esto como `true`. El valor predeterminado es `false` (opcional). <br />Al habilitar esta opción, obtendrás datos adicionales en la respuesta, consulta `description.data.test.js` para más información. <br /><strong>SOLO PARA ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### Ejemplos

```js title="example.test.js"
it('should return all contexts in the current session with the default Appium `contexts`-method.', async () => {
    // For Android
    await driver.getContexts()
    // Returns ['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts()
    // Returns [ 'NATIVE_APP', 'WEBVIEW_84392.1', ... ]
})

```

```js title="detailed.test.js"
it('should return all contexts in the current session with detailed info.', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   },
    //   {
    //       id: 'WEBVIEW_chrome',
    //       title: 'Android | Get more done with Google on Android-phones and devices',
    //       url: 'https://www.android.com/',
    //       packageName: 'com.android.chrome',
    //       webviewPageId: '0'
    //   }
    // ]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts({returnDetailedContexts: true})
    // Returns: [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_86150.1',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       bundleId: 'org.reactjs.native.example.wdiodemoapp'
    //   },
    //   {
    //       id: 'WEBVIEW_86152.1',
    //       title: 'Apple',
    //       url: 'https://www.apple.com/',
    //       bundleId: 'com.apple.mobilesafari'
    //   }
    // ]
})

```

```js title="description.data.test.js"
it('should return Android description data for the webview', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true, returnAndroidDescriptionData: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       androidWebviewData: {
    //          // Indicates whether the web page is currently attached to a web view.
    //          // `true` means the page is attached and likely active, `false` indicates it is not.
    //          attached: true,
    //          // Indicates whether the web page is empty or not. An empty page typically means that
    //          // there is no significant content loaded in it. `true` indicates the page is empty,
    //          // `false` indicates it has content.
    //          empty: false,
    //          // Indicates whether the page has never been attached to a web view. If `true`, the
    //          // page has never been attached, which could indicate a new or unused page. If `false`,
    //          // the page has been attached at some point.
    //          neverAttached: false,
    //          // Indicates whether the web page is visible on the screen. `true` means the page is
    //          // visible to the user, `false` means it is not.
    //          visible: true,
    //          // This data can be super useful to determine where on the screen the webview is located
    //          // and can come in handy when you want to interact with elements on the screen based on
    //          // coordinates based on the top-left corner of the screen
    //          screenX: 0,
    //          screenY: 151,
    //          height: 2589,
    //          width: 1344
    //       },
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   }
    // ]
})
```