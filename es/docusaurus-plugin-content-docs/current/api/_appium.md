---
id: appium
title: Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---
## getAppiumContext
Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).



##### Uso

```js
driver.getAppiumContext()
```




##### Devuelve

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** una cadena que representa el contexto actual o null que representa 'sin contexto'    


---
## switchAppiumContext
Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).



##### Uso

```js
driver.switchAppiumContext(name)
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
      <td>string</td>
      <td>una cadena que representa un contexto disponible</td>
    </tr>
  </tbody>
</table>





---
## getAppiumContexts
Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).



##### Uso

```js
driver.getAppiumContexts()
```




##### Devuelve

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** un array de cadenas que representan contextos disponibles, p. ej. 'WEBVIEW', o 'NATIVE'    


---
## shake
Realiza una acción de agitar en el dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/).



##### Uso

```js
driver.shake()
```






##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---
## lock
Bloquea el dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/).



##### Uso

```js
driver.lock(seconds)
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
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>cuánto tiempo bloquear la pantalla (solo iOS)</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## unlock
Desbloquea el dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/).



##### Uso

```js
driver.unlock()
```






##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## isLocked
Comprueba si el dispositivo está bloqueado o no.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/).



##### Uso

```js
driver.isLocked()
```




##### Devuelve

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** Verdadero si el dispositivo está bloqueado, falso si no    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## startRecordingScreen
Comienza a grabar la pantalla.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).



##### Uso

```js
driver.startRecordingScreen(options)
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object</td>
      <td>parámetros de comando que pueden contener claves como: remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport (ver más descripción en la documentación de Appium)</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## stopRecordingScreen
Detiene la grabación de la pantalla<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/).



##### Uso

```js
driver.stopRecordingScreen(remotePath, username, password, method)
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
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>La ruta a la ubicación remota, donde se debe cargar el video resultante. Se admiten los siguientes protocolos: http/https, ftp. Esta opción solo tiene efecto si hay un proceso de grabación de pantalla en progreso y el parámetro forceRestart no está configurado en true. Un valor nulo o de cadena vacía (la configuración por defecto) significa que el contenido del archivo resultante debe codificarse como Base64.</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>El nombre del usuario para la autenticación remota.</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>La contraseña para la autenticación remota.</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>El nombre del método de carga multiparte http. Por defecto se usa 'PUT'.</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Cadena codificada en Base64. Si remote_path está configurado, la respuesta es una cadena vacía    

##### Soporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## getPerformanceDataTypes
Devuelve los tipos de información del estado del sistema que se pueden leer, como cpu, memoria, tráfico de red y batería.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/).



##### Uso

```js
driver.getPerformanceDataTypes()
```




##### Devuelve

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** Los tipos de datos de rendimiento disponibles (cpuinfo|batteryinfo|networkinfo|memoryinfo)    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## getPerformanceData
Devuelve la información del estado del sistema que se puede leer, como cpu, memoria, tráfico de red y batería.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/).



##### Uso

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
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
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>el nombre del paquete de la aplicación</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>el tipo de estado del sistema que se quiere leer. Debe ser uno de los tipos de datos de rendimiento soportados</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>el número de intentos de lectura</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** El tipo de información del estado del sistema que se puede leer, como cpu, memoria, tráfico de red y batería    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## pressKeyCode
Pulsa una tecla específica en el dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/).



##### Uso

```js
driver.pressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>código de tecla a presionar</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>estado meta para presionar el código de tecla</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>banderas para la pulsación de tecla</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## longPressKeyCode
Presiona y mantiene un código de tecla particular en el dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/).



##### Uso

```js
driver.longPressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>código de tecla a presionar en el dispositivo</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>metaestado para la pulsación de tecla</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>banderas para la pulsación de tecla</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## sendKeyEvent
Envía un código de tecla al dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).



##### Uso

```js
driver.sendKeyEvent(keycode, metastate)
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
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>código de tecla a presionar</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>estado meta para presionar el código de tecla</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## rotateDevice
Rotar el dispositivo en tres dimensiones.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation).



##### Uso

```js
driver.rotateDevice(x, y, z)
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
      <td>number</td>
      <td>desplazamiento x para usar en el centro del gesto de rotación</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>desplazamiento y para usar en el centro del gesto de rotación</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>desplazamiento z para usar en el centro del gesto de rotación</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## getCurrentActivity
Obtiene el nombre de la actividad actual de Android.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/).



##### Uso

```js
driver.getCurrentActivity()
```




##### Devuelve

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** Nombre de la actividad actual    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## getCurrentPackage
Obtiene el nombre del paquete Android actual.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/).



##### Uso

```js
driver.getCurrentPackage()
```




##### Devuelve

- **&lt;string&gt;**
            **<code><var>package</var></code>:** Nombre del paquete actual    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## installApp
Instala la aplicación dada en el dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/).



##### Uso

```js
driver.installApp(appPath)
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
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>ruta al archivo de aplicación .apk</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## activateApp
Activa la aplicación dada en el dispositivo<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/).



##### Uso

```js
driver.activateApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID de la aplicación (ID del paquete para Android, ID del paquete para iOS)</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## removeApp
Elimina una aplicación del dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/).



##### Uso

```js
driver.removeApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID de la aplicación (ID del paquete para Android, ID del paquete para iOS)</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## terminateApp
Termina la aplicación dada en el dispositivo<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/).



##### Uso

```js
driver.terminateApp(appId, options)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID de la aplicación (ID del paquete para Android, ID del paquete para iOS)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object</td>
      <td>Opciones de comando. Ej. "timeout": (Solo Android) Tiempo de espera para reintentar terminar la aplicación (ver más en la documentación de Appium)</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## isAppInstalled
Comprueba si la aplicación especificada está instalada en el dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/).



##### Uso

```js
driver.isAppInstalled(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID de la aplicación (ID del paquete para Android, ID del paquete para iOS)</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** Devuelve verdadero si está instalada, falso si no    

##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## queryAppState
Obtiene el estado de la aplicación dada en el dispositivo<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/).



##### Uso

```js
driver.queryAppState(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID de la aplicación (ID del paquete para Android, ID del paquete para iOS)</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 no está instalada. 1 no está ejecutándose. 2 se está ejecutando en segundo plano o suspendida. 3 se está ejecutando en segundo plano. 4 se está ejecutando en primer plano    

##### Soporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## hideKeyboard
Oculta el teclado en pantalla.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/).



##### Uso

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
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
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>estrategia para ocultar el teclado (solo UIAutomation), estrategias disponibles - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>valor de la tecla si la estrategia es 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>código de tecla si la estrategia es 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>nombre de la tecla si la estrategia es 'pressKey'</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## isKeyboardShown
Si el teclado en pantalla se muestra o no.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/).



##### Uso

```js
driver.isKeyboardShown()
```




##### Devuelve

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** Verdadero si el teclado se muestra    

##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## pushFile
Coloca un archivo en el dispositivo en un lugar particular.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/).



##### Uso

```js
driver.pushFile(path, data)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>ruta donde instalar los datos</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>contenido del archivo en base64</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## pullFile
Recupera un archivo del sistema de archivos del dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/).



##### Uso

```js
driver.pullFile(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>ruta en el dispositivo donde extraer el archivo</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Contenido del archivo en base64    

##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## pullFolder
Recupera una carpeta del sistema de archivos del dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/).



##### Uso

```js
driver.pullFolder(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>ruta a una carpeta completa en el dispositivo</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## toggleAirplaneMode
Alterna el modo avión en el dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/).



##### Uso

```js
driver.toggleAirplaneMode()
```






##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## toggleData
Cambia el estado del servicio de datos.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/).



##### Uso

```js
driver.toggleData()
```






##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## toggleWiFi
Cambia el estado del servicio wifi.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/).



##### Uso

```js
driver.toggleWiFi()
```






##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## toggleLocationServices
Cambia el estado del servicio de ubicación.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/).



##### Uso

```js
driver.toggleLocationServices()
```






##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## toggleNetworkSpeed
Establece la velocidad de red (solo emulador)<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/).



##### Uso

```js
driver.toggleNetworkSpeed(netspeed)
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
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>Tipo de red - 'full','gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## openNotifications
Abre las notificaciones de Android (solo emulador).<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/).



##### Uso

```js
driver.openNotifications()
```






##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## startActivity
Inicia una actividad de Android proporcionando el nombre del paquete y el nombre de la actividad.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/).



##### Uso

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
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
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>nombre de la aplicación</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>nombre de la actividad</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>nombre de la aplicación a esperar</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>nombre de la actividad a esperar</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>acción de intención que se usará para iniciar la actividad</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>categoría de intención que se usará para iniciar la actividad</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>banderas que se usarán para iniciar la actividad</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>argumentos de intención adicionales que se usarán para iniciar la actividad</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>no detiene el proceso de la aplicación bajo prueba, antes de iniciar la aplicación usando adb</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## getSystemBars
Recupera información de visibilidad y límites de las barras de estado y navegación.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/).



##### Uso

```js
driver.getSystemBars()
```




##### Devuelve

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** Información sobre visibilidad y límites de la barra de estado y navegación    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## getDeviceTime
Obtiene la hora en el dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/).



##### Uso

```js
driver.getDeviceTime()
```




##### Devuelve

- **&lt;string&gt;**
            **<code><var>time</var></code>:** Hora en el dispositivo    

##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## getDisplayDensity
Obtiene la densidad de la pantalla del dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).



##### Uso

```js
driver.getDisplayDensity()
```




##### Devuelve

- **&lt;*&gt;**
    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## touchId
Simula un evento de [touch id](https://support.apple.com/en-ca/ht201371) (solo simulador iOS). Para habilitar esta función, la capacidad deseada `allowTouchIdEnroll` debe establecerse en true y el Simulador debe estar [inscrito](https://support.apple.com/en-ca/ht201371). Cuando estableces allowTouchIdEnroll en true, establecerá el Simulador como inscrito por defecto. El estado de inscripción puede ser [alternado](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html). Esta llamada solo funcionará si el proceso de Appium o su aplicación principal (por ejemplo, Terminal.app o Appium.app) tiene acceso a la accesibilidad de Mac OS en Preferencias del Sistema > Seguridad y Privacidad > Privacidad > Accesibilidad.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/).



##### Uso

```js
driver.touchId(match)
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
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>estamos simulando un toque exitoso (true) o un toque fallido (false)</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## toggleEnrollTouchId
Alterna el simulador siendo [inscrito](https://support.apple.com/en-ca/ht201371) para aceptar touchId (solo simulador iOS). Para habilitar esta función, la capacidad deseada `allowTouchIdEnroll` debe establecerse en true. Cuando `allowTouchIdEnroll` está establecido en true, el Simulador se inscribirá por defecto, y el 'Toggle Touch ID Enrollment' cambia el estado de inscripción. Esta llamada solo funcionará si el proceso de Appium o su aplicación principal (por ejemplo, Terminal.app o Appium.app) tiene acceso a la accesibilidad de Mac OS en Preferencias del Sistema > Seguridad y Privacidad > Privacidad > Accesibilidad.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/).



##### Uso

```js
driver.toggleEnrollTouchId(enabled)
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
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>boolean</td>
      <td>igual a true si la inscripción de TouchID debe ser habilitada</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## launchApp
Lanza una aplicación en el dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/).
:::caution

Este comando de protocolo está obsoleto<br />Para iOS, utiliza `driver.execute('mobile: launchApp', { ... })`, y para Android, utiliza `driver.execute('mobile: activateApp', { ... })`.
:::



##### Uso

```js
driver.launchApp()
```






##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## closeApp
Cierra una aplicación en el dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/).
:::caution

Este comando de protocolo está obsoleto<br />Usa `driver.execute('mobile: terminateApp', { ... })` en su lugar
:::



##### Uso

```js
driver.closeApp()
```






##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## background
Envía la aplicación actualmente en ejecución para esta sesión al fondo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/).
:::caution

Este comando de protocolo está obsoleto<br />Usa `driver.execute('mobile: backgroundApp', { ... })` en su lugar
:::



##### Uso

```js
driver.background(seconds)
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
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>tiempo de espera para restaurar la aplicación, si es 'null' la aplicación no se restaurará</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## endCoverage
Obtiene datos de cobertura de prueba.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/).



##### Uso

```js
driver.endCoverage(intent, path)
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
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>intención para transmitir</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>ruta al archivo .ec</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## getStrings
Obtiene cadenas de la aplicación.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/).



##### Uso

```js
driver.getStrings(language, stringFile)
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
      <td><code><var>language</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>código de idioma</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>ruta al archivo de cadenas</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** todas las cadenas definidas de una aplicación para el idioma y nombre de archivo de cadenas especificados    

##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## setValueImmediate
Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).



##### Uso

```js
driver.setValueImmediate(elementId, text)
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
      <td>texto para establecer en un elemento</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## replaceValue
Reemplaza directamente el valor en un elemento.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).



##### Uso

```js
driver.replaceValue(elementId, value)
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
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>valor para reemplazar en el elemento</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## getSettings
Recupera la configuración actual en el dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/).



##### Uso

```js
driver.getSettings()
```




##### Devuelve

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** Hash JSON de todas las configuraciones actualmente especificadas, consulta la API de configuración    

##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## updateSettings
Actualiza la configuración actual en el dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/).



##### Uso

```js
driver.updateSettings(settings)
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
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>objeto clave/valor con configuraciones para actualizar</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## receiveAsyncResponse
URL de retorno para la ejecución asíncrona de JavaScript.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).



##### Uso

```js
driver.receiveAsyncResponse(response)
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
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>respuesta para recibir en el dispositivo</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---
## gsmCall
Realiza una llamada GSM (solo emulador).<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/).



##### Uso

```js
driver.gsmCall(phoneNumber, action)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>el número de teléfono al que llamar</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>La acción - 'call', 'accept', 'cancel', 'hold'</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## gsmSignal
Establece la intensidad de la señal GSM (solo emulador).<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/).



##### Uso

```js
driver.gsmSignal(signalStrength, signalStrengh)
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
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>intensidad de la señal en el rango [0, 4]</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>intensidad de la señal en el rango [0, 4]. Por favor, establece también este parámetro con el mismo valor si usas Appium v1.11.0 o inferior (consulta https://github.com/appium/appium/issues/12234).</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## powerCapacity
Establece el porcentaje de batería (solo emulador).<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/).



##### Uso

```js
driver.powerCapacity(percent)
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
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>valor de porcentaje en el rango [0, 100]</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## powerAC
Establece el estado del cargador de batería a conectado o no (solo emulador).<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/).



##### Uso

```js
driver.powerAC(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>establece el estado. on o off</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## gsmVoice
Establece el estado de la voz GSM (solo emulador).<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/).



##### Uso

```js
driver.gsmVoice(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>estado de la voz GSM - 'unregistered', 'home', 'roaming', 'searching', 'denied', 'off', 'on'</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## sendSms
Simula un mensaje SMS (solo emulador).<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/).



##### Uso

```js
driver.sendSms(phoneNumber, message)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>el número de teléfono al que enviar el SMS</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>el mensaje SMS</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## fingerPrint
Autentica usuarios utilizando sus huellas dactilares en emuladores compatibles.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/).



##### Uso

```js
driver.fingerPrint(fingerprintId)
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
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>huellas dactilares almacenadas en el sistema Android Keystore (del 1 al 10)</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## setClipboard
Establece el contenido del portapapeles del sistema<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/).



##### Uso

```js
driver.setClipboard(content, contentType, label)
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
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>El contenido del portapapeles codificado en base64</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>El tipo de contenido a obtener. Plaintext, Image, URL. Android solo soporta texto plano</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>Etiqueta de datos del portapapeles para Android</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Respuesta del servidor Appium    

##### Soporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## getClipboard
Obtiene el contenido del portapapeles del sistema<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/).



##### Uso

```js
driver.getClipboard(contentType)
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
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>El tipo de contenido a obtener. Plaintext, Image, URL. Android solo soporta texto plano</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Contenido del portapapeles como cadena codificada en base64 o una cadena vacía si el portapapeles está vacío    

##### Soporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## touchPerform
Esta funcionalidad solo está disponible desde dentro de un contexto nativo. 'Touch Perform' funciona de manera similar a las otras interacciones táctiles singulares, excepto que esto te permite encadenar más de una acción táctil como un solo comando. Esto es útil porque los comandos de Appium se envían a través de la red y hay latencia entre comandos. Esta latencia puede hacer que ciertas interacciones táctiles sean imposibles porque algunas interacciones necesitan realizarse en una secuencia. El deslizamiento vertical, por ejemplo, requiere presionar, moverse a una coordenada y diferente, y luego soltar. Para que funcione, no puede haber un retraso entre las interacciones.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/).



##### Uso

```js
driver.touchPerform(actions)
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
      <td>El tipo de acción a realizar (por ejemplo, moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>

##### Ejemplo


```js
// hacer un deslizamiento horizontal por porcentaje
const startPercentage = 10;
const endPercentage = 90;
const anchorPercentage = 50;

const { width, height } = driver.getWindowSize();
const anchor = height * anchorPercentage / 100;
const startPoint = width * startPercentage / 100;
const endPoint = width * endPercentage / 100;
driver.touchPerform([
  {
    action: 'press',
    options: {
      x: startPoint,
      y: anchor,
    },
  },
  {
    action: 'wait',
    options: {
      ms: 100,
    },
  },
  {
    action: 'moveTo',
    options: {
      x: endPoint,
      y: anchor,
    },
  },
  {
    action: 'release',
    options: {},
  },
]);
```




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## multiTouchPerform
Esta funcionalidad solo está disponible desde dentro de un contexto nativo. Realiza una secuencia de acción multitáctil.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/).



##### Uso

```js
driver.multiTouchPerform(actions)
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
      <td>El tipo de acción a realizar (por ejemplo, moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## executeDriverScript
Este comando te permite especificar un script WebdriverIO como una cadena y transmitirlo al servidor Appium para su ejecución local en el propio servidor. Este enfoque ayuda a minimizar la latencia potencial asociada con cada comando. ***Para utilizar este comando con Appium 2.0, debes tener instalado el complemento [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin).***<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md).



##### Uso

```js
driver.executeDriverScript(script, type, timeout)
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
      <td>El script a ejecutar. Tiene acceso a un objeto 'driver' que representa una sesión WebdriverIO adjunta al servidor actual.</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>El lenguaje/framework utilizado en el script. Actualmente, solo se soporta 'webdriverio' y es el valor predeterminado.</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>El número de milisegundos que se debe permitir que se ejecute el script antes de ser terminado por el servidor Appium. El valor predeterminado es el equivalente a 1 hora.</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Un objeto que contiene dos campos: 'result', que es el valor de retorno del propio script, y 'logs', que contiene 3 campos internos, 'log', 'warn', y 'error', que contienen un array de cadenas registradas por console.log, console.warn, y console.error en la ejecución del script.    


---
## getEvents
Obtiene eventos almacenados en el servidor appium.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md).



##### Uso

```js
driver.getEvents(type)
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
      <td>string[]</td>
      <td>Obtiene eventos que se filtran con el tipo si se proporciona el tipo.</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Un hash JSON de eventos como `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`.    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## logEvent
Almacena un evento personalizado.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md).



##### Uso

```js
driver.logEvent(vendor, event)
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
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>El nombre del proveedor. Será `vendor` en `vendor:event`.</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>El nombre del evento. Será `event` en `vendor:event`.</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## compareImages
Esta característica realiza comparaciones de imágenes utilizando las capacidades del marco OpenCV. Ten en cuenta que para que esta funcionalidad funcione, tanto el marco OpenCV como el módulo opencv4nodejs deben estar instalados en la máquina donde opera el servidor Appium. ***Además, necesitarás tener instalado el complemento [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin) para usar esta función con Appium 2.0.***<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/).



##### Uso

```js
driver.compareImages(mode, firstImage, secondImage, options)
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
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>Uno de los posibles modos de comparación: 'matchFeatures', 'getSimilarity', 'matchTemplate'. 'matchFeatures' es por defecto.</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>Datos de imagen. Se soportan todos los formatos de imagen que la propia biblioteca OpenCV acepta.</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>Datos de imagen. Se soportan todos los formatos de imagen que la propia biblioteca OpenCV acepta.</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>El contenido de este diccionario depende del valor real de `mode`. Consulta la documentación del módulo `appium-support` para más detalles. </td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;object&gt;**
            **<code><var>result</var></code>:** El contenido del diccionario resultante depende de los valores reales de `mode` y `options`. Consulta la documentación del módulo `appium-support` para más detalles.    


---
## implicitWait
Establece la cantidad de tiempo que el conductor debe esperar al buscar elementos. Al buscar un único elemento, el controlador debe sondear la página hasta que se encuentre un elemento o expire el tiempo de espera, lo que ocurra primero. Al buscar varios elementos, el controlador debe sondear la página hasta que se encuentre al menos un elemento o expire el tiempo de espera, momento en el que debe devolver una lista vacía. Si este comando nunca se envía, el controlador debe tener por defecto una espera implícita de 0ms.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.implicitWait(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>La cantidad de tiempo, en milisegundos, para esperar en un elemento.</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## getLocationInView
Determina la ubicación de un elemento en la pantalla una vez que se ha desplazado a la vista.<br /><br />__Nota:__ Esto se considera un comando interno y solo debe usarse para determinar la ubicación de un elemento para generar correctamente eventos nativos.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.getLocationInView(elementId)
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
      <td>ID del elemento al que dirigir el comando</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** Las coordenadas X e Y del elemento en la página.    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## sendKeys
Enviar una secuencia de pulsaciones de teclas al elemento activo<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.sendKeys(value)
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
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>La secuencia de teclas a escribir. Se debe proporcionar un array.</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## availableIMEEngines
Lista todos los motores disponibles en la máquina. Para usar un motor, debe estar presente en esta lista.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.availableIMEEngines()
```




##### Devuelve

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** Una lista de motores disponibles    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## getActiveIMEEngine
Obtiene el nombre del motor IME activo. La cadena del nombre es específica de la plataforma.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.getActiveIMEEngine()
```




##### Devuelve

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** El nombre del motor IME activo    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## isIMEActivated
Indica si la entrada IME está activa en este momento<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.isIMEActivated()
```




##### Devuelve

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** Verdadero si la entrada IME está disponible y actualmente activa, falso en caso contrario    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## deactivateIMEEngine
Desactiva el motor IME actualmente activo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.deactivateIMEEngine()
```






##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## activateIMEEngine
Activa un motor que está disponible<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.activateIMEEngine(engine)
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
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>nombre del motor a activar</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## asyncScriptTimeout
Establece la cantidad de tiempo, en milisegundos, que los scripts asincrónicos ejecutados por `/session/:sessionId/execute_async` pueden ejecutarse antes de que se aborten y se devuelva un error `Timeout` al cliente.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.asyncScriptTimeout(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>La cantidad de tiempo, en milisegundos, que los comandos con tiempo limitado pueden ejecutarse</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## submit
Envía un elemento de formulario.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.submit(elementId)
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
      <td>ID del elemento de formulario a enviar</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## getElementSize
Determina el tamaño de un elemento en píxeles. El tamaño se devolverá como un objeto JSON con propiedades `width` y `height`.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.getElementSize(elementId)
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
      <td>ID del elemento al que dirigir el comando</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** El ancho y alto del elemento, en píxeles.    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## getElementLocation
Determina la ubicación de un elemento en la página. El punto `(0, 0)` se refiere a la esquina superior izquierda de la página. Las coordenadas del elemento se devuelven como un objeto JSON con propiedades `x` e `y`.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.getElementLocation(elementId)
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
      <td>ID del elemento al que dirigir el comando</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** Las coordenadas X e Y del elemento en la página.    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## touchClick
Toque único en el dispositivo habilitado para táctil.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.touchClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID del elemento para realizar un toque único.</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## touchDown
Dedo abajo en la pantalla.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.touchDown(x, y)
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
      <td>number</td>
      <td>coordenada x en la pantalla</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>coordenada y en la pantalla</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## touchUp
Dedo arriba en la pantalla.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.touchUp(x, y)
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
      <td>number</td>
      <td>coordenada x en la pantalla</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>coordenada y en la pantalla</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## touchMove
Movimiento del dedo en la pantalla.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.touchMove(x, y)
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
      <td>number</td>
      <td>coordenada x en la pantalla</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>coordenada y en la pantalla</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## touchLongClick
Pulsación larga en la pantalla táctil usando eventos de movimiento de dedos.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.touchLongClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID del elemento sobre el que hacer una pulsación larga</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## touchFlick
Desliza rápidamente en la pantalla táctil usando eventos de movimiento de dedos. Este comando de deslizamiento rápido comienza en una ubicación particular de la pantalla.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
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
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>el desplazamiento x en píxeles para deslizar</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>el desplazamiento y en píxeles para deslizar</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>string</td>
      <td>ID del elemento donde comienza el deslizamiento</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>la velocidad en píxeles por segundo</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>la velocidad x en píxeles por segundo</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>number</td>
      <td>la velocidad y en píxeles por segundo</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## getOrientation
Obtiene la orientación actual del dispositivo.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.getOrientation()
```




##### Devuelve

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** La orientación actual correspondiente a un valor definido en ScreenOrientation: `LANDSCAPE|PORTRAIT`.    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## setOrientation
Establece la orientación del dispositivo<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.setOrientation(orientation)
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
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>la nueva orientación del navegador como se define en ScreenOrientation: `LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>




##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## getLogs
Obtiene el registro para un tipo de registro dado. El búfer de registro se restablece después de cada solicitud.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.getLogs(type)
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
      <td>el tipo de registro</td>
    </tr>
  </tbody>
</table>


##### Devuelve

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** La lista de entradas de registro.    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## getLogTypes
Obtiene los tipos de registro disponibles.<br /><br />Comando de Appium. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### Uso

```js
driver.getLogTypes()
```




##### Devuelve

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** La lista de tipos de registro disponibles.    

##### Soporte

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)
