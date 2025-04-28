---
id: webdriver
title: Protocolo WebDriver
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriver.ts
---
## newSession
El comando New Session crea una nueva sesión de WebDriver con el nodo de punto final. Si la creación falla, se devuelve un error de sesión no creada.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-new-sessions).



##### Uso

```js
browser.newSession(capabilities)
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
      <td><code><var>capabilities</var></code></td>
      <td>object</td>
      <td>un objeto JSON, el conjunto de capacidades que finalmente se fusionó y coincidió en el algoritmo de procesamiento de capacidades</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;Object&gt;**
            **<code><var>session</var></code>:** Objeto que contiene el sessionId y las capacidades de la sesión WebDriver creada.    


---
## deleteSession
El comando Delete Session cierra todos los contextos de navegación de nivel superior asociados a la sesión actual, termina la conexión y finalmente cierra la sesión actual.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-delete-session).



##### Uso

```js
browser.deleteSession(deleteSessionOpts)
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
      <td><code><var>deleteSessionOpts</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object</td>
      <td>Objeto que contiene opciones para el comando deleteSession, por ejemplo `{ shutdownDriver: boolean }`</td>
    </tr>
  </tbody>
</table>





---
## status
El comando Status devuelve información sobre si un extremo remoto está en un estado en el que puede crear nuevas sesiones y además puede incluir información meta arbitraria que es específica de la implementación.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-status).



##### Uso

```js
browser.status()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L5-L16
```



##### Devuelve

- **&lt;Object&gt;**
            **<code><var>status</var></code>:** Objeto que contiene el estado del controlador.    


---
## getTimeouts
El comando Get Timeouts obtiene duraciones de tiempo de espera asociadas con la sesión actual.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-timeouts).



##### Uso

```js
browser.getTimeouts()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L20-L24
```



##### Devuelve

- **&lt;Object&gt;**
            **<code><var>timeouts</var></code>:** Objeto que contiene duraciones de tiempo de espera para `script`, `pageLoad` e `implicit`.    


---
## setTimeouts
El comando Set Timeouts establece duraciones de tiempo de espera asociadas con la sesión actual. Los tiempos de espera que se pueden controlar se enumeran en la tabla de tiempos de espera de sesión a continuación.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-set-timeouts).



##### Uso

```js
browser.setTimeouts(implicit, pageLoad, script)
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
      <td><code><var>implicit</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>entero en ms para el tiempo de espera implícito de la sesión</td>
    </tr>
    <tr>
      <td><code><var>pageLoad</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>entero en ms para el tiempo de carga de página de la sesión</td>
    </tr>
    <tr>
      <td><code><var>script</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>entero en ms para el tiempo de espera de script de la sesión</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L28-L33
```






---
## getUrl
El comando Get Current URL devuelve la URL del contexto de navegación de nivel superior actual.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-current-url).



##### Uso

```js
browser.getUrl()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L39-L43
```



##### Devuelve

- **&lt;string&gt;**
            **<code><var>url</var></code>:** URL del documento activo del contexto de navegación de nivel superior actual    


---
## navigateTo
El comando navigateTo (go) se utiliza para hacer que el agente de usuario navegue a una nueva ubicación en el contexto de navegación de nivel superior actual.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-navigate-to).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [url](/docs/api/browser/url). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.navigateTo(url)
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
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>cadena que representa una URL absoluta (comenzando con http(s)), posiblemente incluyendo un fragmento (#...), también podría ser un esquema local (about: etc)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L47-L51
```






---
## back
El comando Back hace que el navegador retroceda un paso en el historial de sesión conjunto del contexto de navegación de nivel superior actual. Esto es equivalente a presionar el botón de retroceso en la interfaz del navegador o llamar a `window.history.back`.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-back).



##### Uso

```js
browser.back()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L55-L59
```






---
## forward
El comando Forward hace que el navegador avance un paso en el historial de sesión conjunto del contexto de navegación de nivel superior actual.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-forward).



##### Uso

```js
browser.forward()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L63-L69
```






---
## refresh
El comando Refresh hace que el navegador recargue la página en el contexto de navegación de nivel superior actual.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-refresh).



##### Uso

```js
browser.refresh()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L73-L78
```






---
## getTitle
El comando Get Title devuelve el título del documento del contexto de navegación de nivel superior actual, equivalente a llamar a `document.title`.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-title).



##### Uso

```js
browser.getTitle()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L82-L86
```



##### Devuelve

- **&lt;string&gt;**
            **<code><var>title</var></code>:** Devuelve una cadena que es igual a `document.title` del contexto de navegación de nivel superior actual.    


---
## getWindowHandle
El comando Get Window Handle devuelve el identificador de ventana para el contexto de navegación de nivel superior actual. Se puede usar como argumento para Switch To Window.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-window-handle).



##### Uso

```js
browser.getWindowHandle()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L90-L93
```



##### Devuelve

- **&lt;string&gt;**
            **<code><var>handle</var></code>:** Devuelve una cadena que es el identificador de ventana para el contexto de navegación de nivel superior actual.    


---
## closeWindow
El comando Close Window cierra el contexto de navegación de nivel superior actual. Una vez hecho esto, si no hay más contextos de navegación de nivel superior abiertos, la propia sesión de WebDriver se cierra.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-close-window).



##### Uso

```js
browser.closeWindow()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L97-L117
```






---
## switchToWindow
El comando Switch To Window se utiliza para seleccionar el contexto de navegación de nivel superior actual para la sesión actual, es decir, el que se utilizará para procesar los comandos.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-switch-to-window).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [switchWindow](/docs/api/browser/switchWindow). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.switchToWindow(handle)
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
      <td><code><var>handle</var></code></td>
      <td>string</td>
      <td>una cadena que representa un identificador de ventana, debe ser una de las cadenas que se devolvieron en una llamada a getWindowHandles</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L121-L130
```






---
## createWindow
Crea un nuevo contexto de navegación de nivel superior.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#new-window).



##### Uso

```js
browser.createWindow(type)
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
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>Establecido en 'tab' si la ventana recién creada comparte una ventana a nivel de sistema operativo con el contexto de navegación actual, o 'window' en caso contrario.</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L134-L136
```



##### Devuelve

- **&lt;Object&gt;**
            **<code><var>window</var></code>:** Objeto de nueva ventana que contiene 'handle' con el valor del identificador y 'type' con el valor del tipo de ventana creado    


---
## getWindowHandles
El comando Get Window Handles devuelve una lista de identificadores de ventana para cada contexto de navegación de nivel superior abierto. El orden en que se devuelven los identificadores de ventana es arbitrario.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-window-handles).



##### Uso

```js
browser.getWindowHandles()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L140-L143
```



##### Devuelve

- **&lt;String[]&gt;**
            **<code><var>handles</var></code>:** Un array que es una lista de identificadores de ventana.    


---
## printPage
El comando Print Page renderiza el documento a un documento PDF paginado. __Nota:__ Chrome actualmente solo admite esto en [modo headless](https://webdriver.io/docs/capabilities/#run-browser-headless), ver [`crbug753118`](https://bugs.chromium.org/p/chromium/issues/detail?id=753118)).<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#print-page).



##### Uso

```js
browser.printPage(orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges)
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
      <td><code><var>orientation</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>orientación de la página. Por defecto: `portrait`</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>escala de la página. Por defecto: `1`</td>
    </tr>
    <tr>
      <td><code><var>background</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>fondo de la página. Por defecto: `false`</td>
    </tr>
    <tr>
      <td><code><var>width</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>ancho de página en cm. Por defecto: `21.59` de la página</td>
    </tr>
    <tr>
      <td><code><var>height</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>altura de página en cm. Por defecto: `27.94` de la página</td>
    </tr>
    <tr>
      <td><code><var>top</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>margen de página en cm desde el margen superior. Por defecto: `1`</td>
    </tr>
    <tr>
      <td><code><var>bottom</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>margen de página en cm desde el margen inferior. Por defecto: `1`</td>
    </tr>
    <tr>
      <td><code><var>left</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>margen de página en cm desde el margen izquierdo. Por defecto: `1`</td>
    </tr>
    <tr>
      <td><code><var>right</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>margen de página en cm desde el margen derecho. Por defecto: `1`</td>
    </tr>
    <tr>
      <td><code><var>shrinkToFit</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>reducir pdf para ajustarse a la página. Por defecto: `true`</td>
    </tr>
    <tr>
      <td><code><var>pageRanges</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object[]</td>
      <td>rangos de página. Por defecto `[]`</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L150-L151
```



##### Devuelve

- **&lt;string&gt;**
            **<code><var>pdf</var></code>:** La representación PDF codificada en base64 del documento paginado.    


---
## switchToFrame
El comando Switch To Frame se utiliza para seleccionar el contexto de navegación de nivel superior actual o un contexto de navegación hijo del contexto de navegación actual para usar como contexto de navegación actual para comandos posteriores.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-switch-to-frame).
:::caution

Este comando de protocolo está obsoleto<br />Este comando está obsoleto y recomendamos a todos usar `switchFrame` en su lugar para cambiar a frames. Lee más sobre este comando en https://webdriver.io/docs/api/browser/switchFrame.
:::



##### Uso

```js
browser.switchToFrame(id)
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
      <td><code><var>id</var></code></td>
      <td>number, object, null</td>
      <td>uno de tres tipos posibles: null: esto representa el contexto de navegación de nivel superior (es decir, no un iframe), un Number, que representa el índice del objeto de ventana correspondiente a un frame, un objeto Element recibido usando `findElement`.</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L155-L168
```






---
## switchToParentFrame
El comando Switch to Parent Frame establece el contexto de navegación actual para futuros comandos al padre del contexto de navegación actual.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame).



##### Uso

```js
browser.switchToParentFrame()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L172-L189
```






---
## getWindowRect
El comando Get Window Rect devuelve el tamaño y la posición en la pantalla de la ventana del sistema operativo correspondiente al contexto de navegación de nivel superior actual.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-window-rect).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [getWindowSize](/docs/api/browser/getWindowSize). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.getWindowRect()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L193-L196
```



##### Devuelve

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Una representación JSON de un objeto "window rect". Tiene 4 propiedades: `x`, `y`, `width` y `height`.    


---
## setWindowRect
El comando Set Window Rect altera el tamaño y la posición de la ventana del sistema operativo correspondiente al contexto de navegación de nivel superior actual.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-set-window-rect).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [setWindowSize](/docs/api/browser/setWindowSize). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.setWindowRect(x, y, width, height)
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
      <td><code><var>x</var></code></td>
      <td>number, null</td>
      <td>el atributo screenX del objeto window</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number, null</td>
      <td>el atributo screenY del objeto window</td>
    </tr>
    <tr>
      <td><code><var>width</var></code></td>
      <td>number, null</td>
      <td>el ancho de las dimensiones externas del contexto de navegación de nivel superior, incluido el chrome del navegador, etc...</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>number, null</td>
      <td>la altura de las dimensiones externas del contexto de navegación de nivel superior, incluido el chrome del navegador, etc...</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L200-L204
```



##### Devuelve

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Una representación JSON de un objeto "window rect" basado en el nuevo estado de la ventana.    


---
## maximizeWindow
El comando Maximize Window invoca la operación específica del administrador de ventanas "maximizar", si la hay, en la ventana que contiene el contexto de navegación de nivel superior actual. Normalmente, esto aumenta la ventana al tamaño máximo disponible sin ir a pantalla completa.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-maximize-window).



##### Uso

```js
browser.maximizeWindow()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L208-L212
```



##### Devuelve

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Una representación JSON de un objeto "window rect" basado en el nuevo estado de la ventana.    


---
## minimizeWindow
El comando Minimize Window invoca la operación específica del administrador de ventanas "minimizar", si la hay, en la ventana que contiene el contexto de navegación de nivel superior actual. Normalmente, esto oculta la ventana en la bandeja del sistema.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-minimize-window).



##### Uso

```js
browser.minimizeWindow()
```




##### Devuelve

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Una representación JSON de un objeto "window rect" del contexto de navegación de nivel superior (nuevo) actual.    


---
## fullscreenWindow
El comando Fullscreen Window invoca la operación específica del administrador de ventanas "pantalla completa", si la hay, en la ventana que contiene el contexto de navegación de nivel superior actual. Normalmente, esto aumenta la ventana al tamaño de la pantalla física y puede ocultar elementos de chrome del navegador como barras de herramientas.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-fullscreen-window).



##### Uso

```js
browser.fullscreenWindow()
```




##### Devuelve

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Una representación JSON de un objeto "window rect" del contexto de navegación de nivel superior (nuevo) actual.    


---
## findElement
El comando Find Element se utiliza para encontrar un elemento en el contexto de navegación actual que se puede utilizar para futuros comandos. Este comando devuelve una representación JSON del elemento que se puede pasar al comando $ para transformar la referencia en un elemento WebdriverIO extendido.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-find-element).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [$](/docs/api/browser/$). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.findElement(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>una estrategia de localización de elementos válida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>el selector real que se utilizará para encontrar un elemento</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L226-L232
```



##### Devuelve

- **&lt;object&gt;**
            **<code><var>element</var></code>:** Una representación JSON de un objeto de elemento, por ejemplo, `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## findElementFromShadowRoot
El comando Find Element From Shadow Root se utiliza para encontrar un elemento dentro de la raíz de sombra de un elemento que se puede utilizar para futuros comandos. Este comando devuelve una representación JSON del elemento que se puede pasar al comando $ para transformar la referencia en un elemento WebdriverIO extendido.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#find-element-from-shadow-root).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [shadow$](/docs/api/element/shadow$). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.findElementFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>ID de elemento de un elemento raíz de sombra</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>una estrategia de localización de elementos válida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>el selector real que se utilizará para encontrar un elemento</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L236-L248
```



##### Devuelve

- **&lt;object&gt;**
            **<code><var>element</var></code>:** Una representación JSON de un objeto de elemento shadow, por ejemplo, `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## findElements
El comando Find Elements se utiliza para encontrar elementos en el contexto de navegación actual que pueden utilizarse para futuros comandos. Este comando devuelve una matriz de representación JSON de los elementos que se pueden pasar al comando $ para transformar la referencia en un elemento WebdriverIO extendido (Ver findElement).<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-find-elements).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [$$](/docs/api/browser/$$). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.findElements(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>una estrategia de localización de elementos válida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>el selector real que se utilizará para encontrar un elemento</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L252-L254
```



##### Devuelve

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** Una lista JSON (posiblemente vacía) de representaciones de un objeto de elemento, por ejemplo, `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.    


---
## findElementsFromShadowRoot
El comando Find Elements se utiliza para encontrar elementos dentro de la raíz de sombra de un elemento que pueden utilizarse para futuros comandos. Este comando devuelve una matriz de representación JSON de los elementos que se pueden pasar al comando $ para transformar la referencia en un elemento WebdriverIO extendido (Ver findElement).<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#find-elements-from-shadow-root).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [shadow$$](/docs/api/element/shadow$$). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.findElementsFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>ID de elemento de un elemento raíz de sombra</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>una estrategia de localización de elementos válida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>el selector real que se utilizará para encontrar un elemento</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L258-L268
```



##### Devuelve

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** Una lista JSON (posiblemente vacía) de representaciones de un objeto de elemento, por ejemplo, `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## findElementFromElement
El comando Find Element From Element se utiliza para encontrar un elemento a partir de un elemento web en el contexto de navegación actual que se puede utilizar para futuros comandos. Este comando devuelve una representación JSON del elemento que se puede pasar al comando $ para transformar la referencia en un elemento WebdriverIO extendido (Ver findElement).<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-find-element-from-element).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [$](/docs/api/element/$). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.findElementFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>una estrategia de localización de elementos válida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>el selector real que se utilizará para encontrar un elemento</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L272-L279
```



##### Devuelve

- **&lt;object&gt;**
            **<code><var>element</var></code>:** Una representación JSON de un objeto de elemento, por ejemplo, `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## findElementsFromElement
El comando Find Elements From Element se utiliza para encontrar elementos a partir de un elemento web en el contexto de navegación actual que pueden utilizarse para futuros comandos. Este comando devuelve una matriz de representación JSON de los elementos que se pueden pasar al comando $ para transformar la referencia en un elemento WebdriverIO extendido (Ver findElement).<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-find-elements-from-element).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [$$](/docs/api/element/$$). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.findElementsFromElement(elementId, using, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>una estrategia de localización de elementos válida</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>el selector real que se utilizará para encontrar un elemento</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L283-L290
```



##### Devuelve

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** Una lista JSON (posiblemente vacía) de representaciones de un objeto de elemento, por ejemplo, `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.    


---
## getElementShadowRoot
Obtiene el objeto raíz de sombra de un elemento. El objeto de resultado se puede utilizar para buscar elementos dentro de esta raíz de sombra utilizando, por ejemplo, findElementFromShadowRoots o findElementsFromShadowRoots.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-active-element).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [shadow$](/docs/api/element/shadow$). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.getElementShadowRoot(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L294-L305
```



##### Devuelve

- **&lt;string&gt;**
            **<code><var>shadowRoot</var></code>:** Una representación JSON de una raíz de sombra de elemento, por ejemplo, `{ 'shadow-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## getActiveElement
Get Active Element devuelve el elemento activo del elemento del documento del contexto de navegación actual. Este comando devuelve una representación JSON del elemento que se puede pasar al comando $ para transformar la referencia en un elemento WebdriverIO extendido (Ver findElement).<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-active-element).



##### Uso

```js
browser.getActiveElement()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L309-L316
```



##### Devuelve

- **&lt;string&gt;**
            **<code><var>element</var></code>:** Una representación JSON de un objeto de elemento, por ejemplo, `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## isElementSelected
Is Element Selected determina si el elemento referenciado está seleccionado o no. Esta operación solo tiene sentido en elementos de entrada de los estados Checkbox y Radio Button, o elementos de opción.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-is-element-selected).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [isSelected](/docs/api/element/isSelected). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.isElementSelected(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L322-L325
```



##### Devuelve

- **&lt;Boolean&gt;**
            **<code><var>isSelected</var></code>:** `true` o `false` basado en el estado seleccionado.    


---
## isElementDisplayed
Is Element Displayed determina la visibilidad de un elemento, que se guía por lo que es perceptiblemente visible para el ojo humano. En este contexto, la visibilidad de un elemento no se relaciona con las propiedades de estilo `visibility` o `display`.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#element-displayedness).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [isDisplayed](/docs/api/element/isDisplayed). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.isElementDisplayed(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L331-L333
```



##### Devuelve

- **&lt;Boolean&gt;**
            **<code><var>isDisplayed</var></code>:** `true` o `false` basado en el estado visible.    


---
## getElementAttribute
El comando Get Element Attribute devolverá el atributo de un elemento web.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-element-attribute).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [getAttribute](/docs/api/element/getAttribute). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.getElementAttribute(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nombre del valor de atributo a recuperar</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L339-L341
```



##### Devuelve

- **&lt;string&gt;**
            **<code><var>attribute</var></code>:** El atributo nombrado del elemento.    


---
## getElementProperty
El comando Get Element Property devolverá el resultado de obtener una propiedad de un elemento.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-element-property).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [getProperty](/docs/api/element/getProperty). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.getElementProperty(elementId, name)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nombre de la propiedad de atributo a recuperar</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L347-L349
```



##### Devuelve

- **&lt;string&gt;**
            **<code><var>property</var></code>:** La propiedad nombrada del elemento, accedida llamando a GetOwnProperty en el objeto de elemento.    


---
## getElementCSSValue
El comando Get Element CSS Value recupera el valor calculado de la propiedad CSS dada del elemento web dado.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-element-css-value).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [getCSSProperty](/docs/api/element/getCSSProperty). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.getElementCSSValue(elementId, propertyName)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>propertyName</var></code></td>
      <td>String</td>
      <td>nombre de la propiedad CSS a recuperar</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L355-L357
```



##### Devuelve

- **&lt;string&gt;**
            **<code><var>cssValue</var></code>:** El valor calculado del parámetro correspondiente al nombre de la propiedad de las declaraciones de estilo del elemento (a menos que el tipo de documento sea xml, en cuyo caso el valor de retorno es simplemente una cadena vacía).    


---
## getElementText
El comando Get Element Text pretende devolver el texto de un elemento "como se renderiza". El texto renderizado de un elemento también se utiliza para localizar elementos por su texto de enlace y texto de enlace parcial.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-element-text).



##### Uso

```js
browser.getElementText(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L363-L365
```



##### Devuelve

- **&lt;string&gt;**
            **<code><var>text</var></code>:** El texto visible del elemento (incluidos los elementos secundarios), siguiendo el algoritmo definido en los Selenium Atoms para [`bot.dom.getVisibleText`](https://github.com/SeleniumHQ/selenium/blob/e09e28f016c9f53196cf68d6f71991c5af4a35d4/javascript/atoms/dom.js#L981).    


---
## getElementTagName
El comando Get Element Tag Name devuelve el nombre de elemento calificado del elemento web dado.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-element-tag-name).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [getTagName](/docs/api/element/getTagName). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.getElementTagName(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L371-L373
```



##### Devuelve

- **&lt;string&gt;**
            **<code><var>text</var></code>:** El atributo tagName del elemento.    


---
## getElementRect
El comando Get Element Rect devuelve las dimensiones y coordenadas del elemento web dado.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-element-rect).

:::info

Este comando de protocolo está integrado en los siguientes métodos convenientes: [getSize](/docs/api/element/getSize), [getLocation](/docs/api/element/getLocation). Se recomienda usar estos comandos en su lugar.

:::


##### Uso

```js
browser.getElementRect(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L379-L381
```



##### Devuelve

- **&lt;Object&gt;**
            **<code><var>elementRect</var></code>:** Un objeto JSON que representa la posición y el rectángulo delimitador del elemento.    


---
## isElementEnabled
Is Element Enabled determina si el elemento referenciado está habilitado o no. Esta operación solo tiene sentido en controles de formulario.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-is-element-enabled).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [isEnabled](/docs/api/element/isEnabled). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.isElementEnabled(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L387-L390
```



##### Devuelve

- **&lt;Boolean&gt;**
            **<code><var>isEnabled</var></code>:** Si el elemento está en un documento xml, o es un control de formulario deshabilitado: `false`, de lo contrario, `true`.    


---
## elementClick
El comando Element Click desplaza a la vista el elemento si aún no es interactuable por puntero, y hace clic en su punto central en la vista. Si el punto central del elemento está oscurecido por otro elemento, se devuelve un error de clic de elemento interceptado. Si el elemento está fuera de la ventana gráfica, se devuelve un error de elemento no interactuable.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-element-click).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [click](/docs/api/element/click). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.elementClick(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L396-L398
```






---
## elementClear
El comando Element Clear desplaza a la vista un elemento editable o reiniciable y luego intenta borrar sus archivos seleccionados o contenido de texto.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-element-clear).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [clearValue](/docs/api/element/clearValue). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.elementClear(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L404-L407
```






---
## elementSendKeys
El comando Element Send Keys desplaza a la vista el elemento de control de formulario y luego envía las teclas proporcionadas al elemento. En caso de que el elemento no sea interactuable por teclado, se devuelve un error de elemento no interactuable.<br /><br />El estado de entrada de tecla utilizado para la entrada puede borrarse a mitad de la "escritura" enviando la tecla nula, que es U+E000 (NULL).<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-element-send-keys).

:::info

Este comando de protocolo está integrado en los siguientes métodos convenientes: [addValue](/docs/api/element/addValue), [setValue](/docs/api/element/setValue). Se recomienda usar estos comandos en su lugar.

:::


##### Uso

```js
browser.elementSendKeys(elementId, text)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>cadena para enviar como pulsaciones de tecla al elemento</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L413-L416
```






---
## getPageSource
El comando Get Page Source devuelve una serialización de cadena del DOM del documento activo del contexto de navegación actual.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-page-source).



##### Uso

```js
browser.getPageSource()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L420-L421
```



##### Devuelve

- **&lt;string&gt;**
            **<code><var>pageSource</var></code>:** el DOM del documento activo del contexto de navegación actual    


---
## executeScript
El comando Execute Script ejecuta una función JavaScript en el contexto del contexto de navegación actual y devuelve el valor de retorno de la función.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-execute-script).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [execute](/docs/api/browser/execute). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.executeScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>una cadena, el cuerpo de la función Javascript que desea ejecutar</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>una matriz de valores JSON que serán deserializados y pasados como argumentos a tu función</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L425-L426
```



##### Devuelve

- **&lt;*&gt;**
            **<code><var>result</var></code>:** El valor de retorno de tu script, el cumplimiento de la Promesa devuelta por tu script, o el error que fue la razón del rechazo de la Promesa devuelta por tu script.    


---
## executeAsyncScript
El comando Execute Async Script hace que JavaScript se ejecute como una función anónima. A diferencia del comando Execute Script, el resultado de la función se ignora. En su lugar, se proporciona un argumento adicional como argumento final de la función. Esta es una función que, cuando se llama, devuelve su primer argumento como respuesta.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-execute-async-script).

:::info

Este comando de protocolo está integrado en el siguiente método conveniente: [executeAsync](/docs/api/browser/executeAsync). Se recomienda usar este comando en su lugar.

:::


##### Uso

```js
browser.executeAsyncScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>una cadena, el cuerpo de la función Javascript que desea ejecutar</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>una matriz de valores JSON que serán deserializados y pasados como argumentos a tu función</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L430-L434
```



##### Devuelve

- **&lt;*&gt;**
            **<code><var>result</var></code>:** El valor de retorno de tu script, el cumplimiento de la Promesa devuelta por tu script, o el error que fue la razón del rechazo de la Promesa devuelta por tu script.    


---
## getAllCookies
El comando Get All Cookies devuelve todas las cookies asociadas con la dirección del documento activo del contexto de navegación actual.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-all-cookies).



##### Uso

```js
browser.getAllCookies()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L438-L455
```



##### Devuelve

- **&lt;Object[]&gt;**
            **<code><var>cookies</var></code>:** Una lista de cookies serializadas. Cada cookie serializada tiene una serie de campos opcionales que pueden o no devolverse además de `name` y `value`.    


---
## addCookie
El comando Add Cookie agrega una sola cookie al almacén de cookies asociado con la dirección del documento activo.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-adding-a-cookie).



##### Uso

```js
browser.addCookie(cookie)
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
      <td><code><var>cookie</var></code></td>
      <td>object</td>
      <td>Un objeto JSON que representa una cookie. Debe tener al menos los campos name y value y podría tener más, incluyendo expiry-time y así sucesivamente</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L459-L477
```






---
## deleteAllCookies
El comando Delete All Cookies permite la eliminación de todas las cookies asociadas con la dirección del documento activo.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-delete-all-cookies).



##### Uso

```js
browser.deleteAllCookies()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L481-L485
```






---
## getNamedCookie
El comando Get Named Cookie devuelve la cookie con el nombre solicitado de las cookies asociadas en el almacén de cookies del documento activo del contexto de navegación actual. Si no se encuentra ninguna cookie, se devuelve un error de no existe tal cookie.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-named-cookie).



##### Uso

```js
browser.getNamedCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nombre de la cookie a recuperar</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L489-L503
```



##### Devuelve

- **&lt;Object&gt;**
            **<code><var>cookie</var></code>:** Una cookie serializada, con campos name y value. Hay una serie de campos opcionales como `path`, `domain` y `expiry-time` que también pueden estar presentes.    


---
## deleteCookie
El comando Delete Cookie te permite eliminar ya sea una sola cookie por nombre de parámetro, o todas las cookies asociadas con la dirección del documento activo si name es indefinido.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-delete-cookie).



##### Uso

```js
browser.deleteCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nombre de la cookie a eliminar</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L507-L512
```






---
## performActions
El comando Perform Actions se utiliza para ejecutar acciones de usuario complejas. Ver [especificación](https://github.com/jlipps/simple-wd-spec#perform-actions) para más detalles.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-perform-actions).



##### Uso

```js
browser.performActions(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>una lista de objetos, cada uno de los cuales representa una fuente de entrada y sus acciones asociadas</td>
    </tr>
  </tbody>
</table>





---
## releaseActions
El comando Release Actions se utiliza para liberar todas las teclas y botones del puntero que están actualmente presionados. Esto hace que se generen eventos como si el estado se hubiera liberado mediante una serie explícita de acciones. También borra todo el estado interno de los dispositivos virtuales.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-release-actions).



##### Uso

```js
browser.releaseActions()
```







---
## dismissAlert
El comando Dismiss Alert descarta un diálogo simple si está presente, de lo contrario error. Una solicitud para descartar una alerta de usuario, que puede no tener necesariamente un botón de descarte, tiene el mismo efecto que aceptarla.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-dismiss-alert).



##### Uso

```js
browser.dismissAlert()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L516-L517
```






---
## acceptAlert
El comando Accept Alert acepta un diálogo simple si está presente, de lo contrario error.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-accept-alert).



##### Uso

```js
browser.acceptAlert()
```







---
## getAlertText
El comando Get Alert Text devuelve el mensaje del mensaje de usuario actual. Si no hay ningún mensaje de usuario actual, devuelve un error.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-get-alert-text).



##### Uso

```js
browser.getAlertText()
```



##### Ejemplo

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L521-L522
```



##### Devuelve

- **&lt;string&gt;**
            **<code><var>alertText</var></code>:** El mensaje del mensaje de usuario.    


---
## sendAlertText
El comando Send Alert Text establece el campo de texto de un mensaje de usuario window.prompt al valor dado.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-send-alert-text).



##### Uso

```js
browser.sendAlertText(text)
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
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>cadena para establecer el mensaje</td>
    </tr>
  </tbody>
</table>





---
## takeScreenshot
El comando Take Screenshot toma una captura de pantalla de la ventana gráfica del contexto de navegación de nivel superior.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-take-screenshot).



##### Uso

```js
browser.takeScreenshot()
```




##### Devuelve

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** Los datos de imagen PNG codificados en base64 que comprenden la captura de pantalla de la ventana gráfica inicial.    


---
## takeElementScreenshot
El comando Take Element Screenshot toma una captura de pantalla de la región visible abarcada por el rectángulo delimitador de un elemento.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).



##### Uso

```js
browser.takeElementScreenshot(elementId, scroll)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>desplazar a la vista el elemento. Por defecto: true</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** Los datos de imagen PNG codificados en base64 que comprenden la captura de pantalla de la región visible del rectángulo delimitador de un elemento después de que se ha desplazado a la vista.    


---
## getElementComputedRole
Obtener el rol WAI-ARIA calculado de un elemento.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#get-computed-role).



##### Uso

```js
browser.getElementComputedRole(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;string&gt;**
            **<code><var>role</var></code>:** El resultado de calcular el rol WAI-ARIA del elemento.    


---
## getElementComputedLabel
Obtener el nombre accesible del elemento.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/webdriver/#get-computed-label).



##### Uso

```js
browser.getElementComputedLabel(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;string&gt;**
            **<code><var>label</var></code>:** El resultado de un Cálculo de Nombre y Descripción Accesible para el Nombre Accesible del elemento.    


---
## setPermissions
Simula la modificación por parte del usuario del estado de permiso de un PermissionDescriptor. __Nota:__ esta característica aún no ha llegado a todos los navegadores.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/permissions/#set-permission-command).



##### Uso

```js
browser.setPermissions(descriptor, state, oneRealm)
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
      <td><code><var>descriptor</var></code></td>
      <td>object</td>
      <td>Cada característica potente tiene uno o más aspectos para los que los sitios web pueden solicitar permiso de acceso. Para describir estos aspectos, cada característica define un subtipo de PermissionDescriptor para ser su tipo descriptor de permiso. __Nota:__ esta característica aún no ha llegado a todos los navegadores.</td>
    </tr>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>Determina si el permiso es concedido, denegado o solicitado.</td>
    </tr>
    <tr>
      <td><code><var>oneRealm</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>Si se aplican o no los permisos a todos los contextos de ejecución.</td>
    </tr>
  </tbody>
</table>

##### Ejemplos


```js
// establecer permisos midi
browser.setPermissions(
  { name: 'midi', sysex: true },
  'granted' // puede ser también "denied" o "prompt"
);
```


```js
// establecer permisos de portapapeles
browser.setPermissions({ name: 'clipboard-read' }, 'granted');
// ahora puedes leer el portapapeles a través de, por ejemplo
const clipboardText = await browser.execute(() => navigator.clipboard.readText());
```





---
## generateTestReport
Genera un informe para pruebas. Extensión para [Reporting API](https://developers.google.com/web/updates/2018/09/reportingapi). __Nota:__ esta característica aún no ha llegado a todos los navegadores.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/reporting/#automation).



##### Uso

```js
browser.generateTestReport(message, group)
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
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>Mensaje a mostrar en el informe.</td>
    </tr>
    <tr>
      <td><code><var>group</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>Especifica el grupo de punto final al que entregar el informe.</td>
    </tr>
  </tbody>
</table>





---
## createMockSensor
Crea un sensor simulado para emular sensores como el Sensor de Luz Ambiental. __Nota:__ esta característica aún no ha llegado a todos los navegadores.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/sensors/#create-mock-sensor-command).



##### Uso

```js
browser.createMockSensor(mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Tipo de API de sensor a simular, por ejemplo 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>Un doble que representa la frecuencia en Hz que se utiliza para establecer la frecuencia de muestreo máxima soportada para el sensor simulado asociado.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>Un doble que representa la frecuencia en Hz que se utiliza para establecer la frecuencia de muestreo mínima soportada para el sensor simulado asociado.</td>
    </tr>
  </tbody>
</table>





---
## getMockSensor
Recupera información sobre un tipo dado de sensor simulado. __Nota:__ esta característica aún no ha llegado a todos los navegadores.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/sensors/#get-mock-sensor-command).



##### Uso

```js
browser.getMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>Tipo de sensor simulado del que recuperar información.</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;object&gt;**
            **<code><var>sensorReading</var></code>:** Valores de la lectura del sensor simulado.    


---
## updateMockSensor
Actualiza el tipo de sensor simulado. __Nota:__ esta característica aún no ha llegado a todos los navegadores.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/sensors/#update-mock-sensor-reading-command).



##### Uso

```js
browser.updateMockSensor(type, mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>Tipo de sensor simulado para actualizar información.</td>
    </tr>
    <tr>
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Tipo de API de sensor a simular, por ejemplo 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>Un doble que representa la frecuencia en Hz que se utiliza para establecer la frecuencia de muestreo máxima soportada para el sensor simulado asociado.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>Un doble que representa la frecuencia en Hz que se utiliza para establecer la frecuencia de muestreo mínima soportada para el sensor simulado asociado.</td>
    </tr>
  </tbody>
</table>





---
## deleteMockSensor
El comando Delete Session cierra cualquier contexto de navegación de nivel superior asociado con la sesión actual, termina la conexión y finalmente cierra la sesión actual. __Nota:__ esta característica aún no ha llegado a todos los navegadores.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/sensors/#delete-mock-sensor-command).



##### Uso

```js
browser.deleteMockSensor(type)
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
      <td><code><var>type</var></code></td>
      <td>String</td>
      <td>Tipo de sensor simulado a eliminar.</td>
    </tr>
  </tbody>
</table>





---
## setTimeZone
Simula el cambio de una zona horaria con fines de prueba. __Nota:__ esta característica aún no ha llegado a todos los navegadores.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://w3c.github.io/sensors/#create-mock-sensor-command).



##### Uso

```js
browser.setTimeZone(time_zone)
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
      <td><code><var>time_zone</var></code></td>
      <td>string</td>
      <td>Nombre de la zona horaria, por ejemplo Asia/Tokyo</td>
    </tr>
  </tbody>
</table>





---
## addVirtualAuthenticator
Crea un [Autenticador Virtual](https://www.w3.org/TR/webauthn-2/#virtual-authenticators) de software.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-virtual-authenticator).



##### Uso

```js
browser.addVirtualAuthenticator(protocol, transport, hasResidentKey, hasUserVerification, isUserConsenting, isUserVerified, extensions, uvm)
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
      <td><code><var>protocol</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>Valores válidos: 'ctap1/u2f', 'ctap2', 'ctap2_1'.</td>
    </tr>
    <tr>
      <td><code><var>transport</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>Valores válidos: 'usb', 'nfc', 'ble' o 'internal'.</td>
    </tr>
    <tr>
      <td><code><var>hasResidentKey</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>Valores válidos: true, false.</td>
    </tr>
    <tr>
      <td><code><var>hasUserVerification</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>Valores válidos: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserConsenting</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>Valores válidos: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserVerified</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>Valores válidos: Una matriz que contiene identificadores de extensión.</td>
    </tr>
    <tr>
      <td><code><var>extensions</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string[]</td>
      <td>Valores válidos: Hasta 3 entradas de Método de Verificación de Usuario.</td>
    </tr>
    <tr>
      <td><code><var>uvm</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object[]</td>
      <td></td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;string&gt;**
            **<code><var>authenticatorId</var></code>:** Devuelve el ID de cadena del autenticador.    


---
## removeVirtualAuthenticator
Elimina un Autenticador Virtual creado previamente.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-virtual-authenticator).



##### Uso

```js
browser.removeVirtualAuthenticator(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id del autenticador</td>
    </tr>
  </tbody>
</table>





---
## addCredential
Inyecta una Fuente de Credencial de Clave Pública en un Autenticador Virtual existente.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-credential).



##### Uso

```js
browser.addCredential(authenticatorId, credentialId, isResidentCredential, rpId, privateKey, userHandle, signCount, largeBlob)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>ID del autenticador</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>string</td>
      <td>El ID de Credencial codificado usando Codificación Base64url.</td>
    </tr>
    <tr>
      <td><code><var>isResidentCredential</var></code></td>
      <td>boolean</td>
      <td>Si se establece en true, se crea una credencial descubrible del lado del cliente. Si se establece en false, se crea una credencial del lado del servidor en su lugar.</td>
    </tr>
    <tr>
      <td><code><var>rpId</var></code></td>
      <td>string</td>
      <td>El ID de Parte Confiante al que está limitada la credencial.</td>
    </tr>
    <tr>
      <td><code><var>privateKey</var></code></td>
      <td>string</td>
      <td>Un paquete de clave asimétrica que contiene una sola clave privada por [RFC5958], codificado usando Codificación Base64url.</td>
    </tr>
    <tr>
      <td><code><var>userHandle</var></code></td>
      <td>string</td>
      <td>El userHandle asociado a la credencial codificado usando Codificación Base64url. Esta propiedad puede no estar definida.</td>
    </tr>
    <tr>
      <td><code><var>signCount</var></code></td>
      <td>number</td>
      <td>El valor inicial para un contador de firma asociado a la fuente de credencial de clave pública.</td>
    </tr>
    <tr>
      <td><code><var>largeBlob</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>El blob grande, por credencial, asociado a la fuente de credencial de clave pública, codificado usando Codificación Base64url. Esta propiedad puede no estar definida.</td>
    </tr>
  </tbody>
</table>





---
## getCredentials
Devuelve un objeto de Parámetros de Credencial para cada Fuente de Credencial de Clave Pública almacenada en un Autenticador Virtual, independientemente de si se almacenaron usando Add Credential o `navigator.credentials.create()`.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://www.w3.org/TR/webauthn-2/#sctn-automation-get-credentials).



##### Uso

```js
browser.getCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id del autenticador</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;object[]&gt;**
            **<code><var>credentials</var></code>:** Devuelve un array de credenciales.    


---
## removeAllCredentials
Elimina todas las Fuentes de Credencial de Clave Pública almacenadas en un Autenticador Virtual.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-all-credentials).



##### Uso

```js
browser.removeAllCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id del autenticador</td>
    </tr>
  </tbody>
</table>





---
## removeCredential
Elimina una Fuente de Credencial de Clave Pública almacenada en un Autenticador Virtual.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-credential).



##### Uso

```js
browser.removeCredential(authenticatorId, credentialId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id del autenticador</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>String</td>
      <td>id de la credencial</td>
    </tr>
  </tbody>
</table>





---
## setUserVerified
El comando de extensión Set User Verified establece la propiedad isUserVerified en el Autenticador Virtual.<br /><br />Comando del Protocolo WebDriver. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://www.w3.org/TR/webauthn-2/#sctn-automation-set-user-verified).



##### Uso

```js
browser.setUserVerified(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id del autenticador</td>
    </tr>
  </tbody>
</table>




