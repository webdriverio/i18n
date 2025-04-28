---
id: mjsonwp
title: Mobile JSON Wire Protocol
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---

## getPageIndex
Mobile JSON Wire Protocol-kommando. Mer information finns i [officiella protokolldokumentationen](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).
:::caution

Denna protokollkommando är föråldrad<br />I Appium 2.0 är denna metod markerad som föråldrad och har för närvarande inga tillgängliga alternativ.
:::

##### Usage

```js
driver.getPageIndex()
```


##### Returns

- **&lt;string&gt;**



---

## getNetworkConnection
Mobile JSON Wire Protocol-kommando. Mer information finns i [officiella protokolldokumentationen](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Usage

```js
driver.getNetworkConnection()
```


##### Returns

- **&lt;number&gt;**
            **<code><var>connectionType</var></code>:** se https://appium.github.io/appium.io/docs/en/writing-running-appium/other/network-connection/


---

## setNetworkConnection
Mobile JSON Wire Protocol-kommando. Mer information finns i [officiella protokolldokumentationen](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

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
      <td>en bitmask som ska översättas till ett heltalsvärde när den serialiseras</td>
    </tr>
  </tbody>
</table>



---

## touchPerform
Mobile JSON Wire Protocol-kommando. Mer information finns i [officiella protokolldokumentationen](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

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
      <td>en lista med objekt, där varje objekt representerar en inputkälla och dess associerade åtgärder</td>
    </tr>
  </tbody>
</table>



---

## multiTouchPerform
Mobile JSON Wire Protocol-kommando. Mer information finns i [officiella protokolldokumentationen](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

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
      <td>en lista med objekt, där varje objekt representerar en inputkälla och dess associerade åtgärder</td>
    </tr>
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td>ID för ett element som returnerats i ett tidigare anrop till Find Element(s)</td>
    </tr>
  </tbody>
</table>



---

## receiveAsyncResponse
Mobile JSON Wire Protocol-kommando. Mer information finns i [officiella protokolldokumentationen](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).

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
      <td>den förväntade statusen för svaret</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>det förväntade värdet för svaret</td>
    </tr>
  </tbody>
</table>