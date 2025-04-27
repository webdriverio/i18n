---
id: mjsonwp
title: मोबाइल JSON वायर प्रोटोकॉल
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---

## getPageIndex
Mobile JSON Wire Protocol command. More details can be found in the [official protocol docs](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).
:::caution

यह प्रोटोकॉल कमांड अप्रचलित है<br />Appium 2.0 में, इस विधि को अप्रचलित के रूप में चिह्नित किया गया है और वर्तमान में कोई उपलब्ध विकल्प नहीं हैं।
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
      <td>एक बिट मास्क जिसे सीरियलाइज़ करते समय पूर्णांक मान में परिवर्तित किया जाना चाहिए</td>
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
      <td>वस्तुओं की एक सूची, जिनमें से प्रत्येक एक इनपुट स्रोत और उसके संबंधित क्रियाओं का प्रतिनिधित्व करता है</td>
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
      <td>वस्तुओं की एक सूची, जिनमें से प्रत्येक एक इनपुट स्रोत और उसके संबंधित क्रियाओं का प्रतिनिधित्व करता है</td>
    </tr>
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td>Find Element(s) के पिछले कॉल में वापस किए गए एक तत्व की आईडी</td>
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
      <td>प्रतिक्रिया की अपेक्षित स्थिति</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>प्रतिक्रिया का अपेक्षित मूल्य</td>
    </tr>
  </tbody>
</table>