---
id: mjsonwp
title: Protocollo Mobile JSON Wire
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---

## getPageIndex
Comando del Protocollo Mobile JSON Wire. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).
:::caution

Questo comando di protocollo è deprecato<br />In Appium 2.0, questo metodo è contrassegnato come deprecato e attualmente non ha alternative disponibili.
:::

##### Utilizzo

```js
driver.getPageIndex()
```


##### Restituisce

- **&lt;string&gt;**



---

## getNetworkConnection
Comando del Protocollo Mobile JSON Wire. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Utilizzo

```js
driver.getNetworkConnection()
```


##### Restituisce

- **&lt;number&gt;**
            **<code><var>connectionType</var></code>:** vedi https://appium.github.io/appium.io/docs/en/writing-running-appium/other/network-connection/


---

## setNetworkConnection
Comando del Protocollo Mobile JSON Wire. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Utilizzo

```js
driver.setNetworkConnection(type)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>number</td>
      <td>una maschera di bit che deve essere tradotta in un valore intero quando serializzata</td>
    </tr>
  </tbody>
</table>



---

## touchPerform
Comando del Protocollo Mobile JSON Wire. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

##### Utilizzo

```js
driver.touchPerform(actions)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>un elenco di oggetti, ciascuno dei quali rappresenta una fonte di input e le relative azioni associate</td>
    </tr>
  </tbody>
</table>



---

## multiTouchPerform
Comando del Protocollo Mobile JSON Wire. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

##### Utilizzo

```js
driver.multiTouchPerform(actions, elementId)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>un elenco di oggetti, ciascuno dei quali rappresenta una fonte di input e le relative azioni associate</td>
    </tr>
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td>l'id di un elemento restituito in una precedente chiamata a Find Element(s)</td>
    </tr>
  </tbody>
</table>



---

## receiveAsyncResponse
Comando del Protocollo Mobile JSON Wire. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).

##### Utilizzo

```js
driver.receiveAsyncResponse(status, value)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>status</var></code></td>
      <td>string</td>
      <td>lo stato previsto della risposta</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>il valore previsto della risposta</td>
    </tr>
  </tbody>
</table>