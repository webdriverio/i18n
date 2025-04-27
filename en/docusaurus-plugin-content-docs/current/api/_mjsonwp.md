---
id: mjsonwp
title: Mobile JSON Wire Protocol
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---
## getPageIndex
Mobile JSON Wire Protocol command. More details can be found in the [official protocol docs](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).
:::caution

This protocol command is deprecated<br />In Appium 2.0, this method is marked as deprecated and currently has no available alternatives.
:::



##### Usage

```js
driver.getPageIndex()
```




##### Returns

- **&lt;string&gt;**
    


---
## getNetworkConnection
Mobile JSON Wire Protocol command. More details can be found in the [official protocol docs](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).



##### Usage

```js
driver.getNetworkConnection()
```




##### Returns

- **&lt;number&gt;**
            **<code><var>connectionType</var></code>:** see https://appium.github.io/appium.io/docs/en/writing-running-appium/other/network-connection/    


---
## setNetworkConnection
Mobile JSON Wire Protocol command. More details can be found in the [official protocol docs](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).



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
      <td>a bit mask that should be translated to an integer value when serialized</td>
    </tr>
  </tbody>
</table>





---
## touchPerform
Mobile JSON Wire Protocol command. More details can be found in the [official protocol docs](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).



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
      <td>a list of objects, each of which represents an input source and its associated actions</td>
    </tr>
  </tbody>
</table>





---
## multiTouchPerform
Mobile JSON Wire Protocol command. More details can be found in the [official protocol docs](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).



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
      <td>a list of objects, each of which represents an input source and its associated actions</td>
    </tr>
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td>the id of an element returned in a previous call to Find Element(s)</td>
    </tr>
  </tbody>
</table>





---
## receiveAsyncResponse
Mobile JSON Wire Protocol command. More details can be found in the [official protocol docs](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).



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
      <td>the expected status of the response</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>the expected value of the response</td>
    </tr>
  </tbody>
</table>




