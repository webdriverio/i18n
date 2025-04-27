---
id: mjsonwp
title: Mobile JSON Wire Protocol
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---

## getPageIndex
Mobile JSON Wire Protocol Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).
:::caution

Dieser Protokollbefehl ist veraltet<br />In Appium 2.0 ist diese Methode als veraltet markiert und hat derzeit keine verfügbaren Alternativen.
:::

##### Usage

```js
driver.getPageIndex()
```


##### Returns

- **&lt;string&gt;**



---

## getNetworkConnection
Mobile JSON Wire Protocol Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Usage

```js
driver.getNetworkConnection()
```


##### Returns

- **&lt;number&gt;**
            **<code><var>connectionType</var></code>:** siehe https://appium.github.io/appium.io/docs/en/writing-running-appium/other/network-connection/


---

## setNetworkConnection
Mobile JSON Wire Protocol Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Usage

```js
driver.setNetworkConnection(type)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>number</td>
      <td>eine Bitmaske, die bei der Serialisierung in einen ganzzahligen Wert übersetzt werden sollte</td>
    </tr>
  </tbody>
</table>



---

## touchPerform
Mobile JSON Wire Protocol Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

##### Usage

```js
driver.touchPerform(actions)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>eine Liste von Objekten, von denen jedes eine Eingabequelle und ihre zugehörigen Aktionen darstellt</td>
    </tr>
  </tbody>
</table>



---

## multiTouchPerform
Mobile JSON Wire Protocol Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

##### Usage

```js
driver.multiTouchPerform(actions, elementId)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>eine Liste von Objekten, von denen jedes eine Eingabequelle und ihre zugehörigen Aktionen darstellt</td>
    </tr>
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td>die ID eines Elements, die in einem vorherigen Aufruf von Find Element(s) zurückgegeben wurde</td>
    </tr>
  </tbody>
</table>



---

## receiveAsyncResponse
Mobile JSON Wire Protocol Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).

##### Usage

```js
driver.receiveAsyncResponse(status, value)
```


##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>status</var></code></td>
      <td>string</td>
      <td>der erwartete Status der Antwort</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>der erwartete Wert der Antwort</td>
    </tr>
  </tbody>
</table>
