---
id: mjsonwp
title: Protocolo Mobile JSON Wire
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---
## getPageIndex
Comando del Protocolo Mobile JSON Wire. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).
:::caution

Este comando de protocolo está obsoleto<br />En Appium 2.0, este método está marcado como obsoleto y actualmente no tiene alternativas disponibles.
:::



##### Uso

```js
driver.getPageIndex()
```




##### Devuelve

- **&lt;string&gt;**
    


---
## getNetworkConnection
Comando del Protocolo Mobile JSON Wire. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).



##### Uso

```js
driver.getNetworkConnection()
```




##### Devuelve

- **&lt;number&gt;**
            **<code><var>connectionType</var></code>:** ver https://appium.github.io/appium.io/docs/en/writing-running-appium/other/network-connection/    


---
## setNetworkConnection
Comando del Protocolo Mobile JSON Wire. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).



##### Uso

```js
driver.setNetworkConnection(type)
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
      <td>number</td>
      <td>una máscara de bits que debe traducirse a un valor entero cuando se serializa</td>
    </tr>
  </tbody>
</table>





---
## touchPerform
Comando del Protocolo Mobile JSON Wire. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).



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
      <td>una lista de objetos, cada uno de los cuales representa una fuente de entrada y sus acciones asociadas</td>
    </tr>
  </tbody>
</table>





---
## multiTouchPerform
Comando del Protocolo Mobile JSON Wire. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).



##### Uso

```js
driver.multiTouchPerform(actions, elementId)
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
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>object[]</td>
      <td>el id de un elemento devuelto en una llamada anterior a Find Element(s)</td>
    </tr>
  </tbody>
</table>





---
## receiveAsyncResponse
Comando del Protocolo Mobile JSON Wire. Más detalles se pueden encontrar en la [documentación oficial del protocolo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).



##### Uso

```js
driver.receiveAsyncResponse(status, value)
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
      <td><code><var>status</var></code></td>
      <td>string</td>
      <td>el estado esperado de la respuesta</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>el valor esperado de la respuesta</td>
    </tr>
  </tbody>
</table>