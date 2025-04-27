---
id: mjsonwp
title: மொபைல் JSON வயர் நெறிமுறை
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---

## getPageIndex
Mobile JSON Wire Protocol command. More details can be found in the [official protocol docs](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).
:::caution

இந்த நெறிமுறை கட்டளை காலாவதியானது<br />Appium 2.0 இல், இந்த முறை காலாவதியானதாக குறிக்கப்பட்டுள்ளது மற்றும் தற்போது மாற்று வழிகள் எதுவும் இல்லை.
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
      <td>உரையாக்கம் செய்யப்படும் போது முழு எண் மதிப்பாக மாற்றப்பட வேண்டிய பிட் மாஸ்க்</td>
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
      <td>உள்ளீட்டு மூலங்கள் மற்றும் அதனுடன் தொடர்புடைய செயல்களை பிரதிநிதித்துவப்படுத்தும் பொருள்களின் பட்டியல்</td>
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
      <td>உள்ளீட்டு மூலங்கள் மற்றும் அதனுடன் தொடர்புடைய செயல்களை பிரதிநிதித்துவப்படுத்தும் பொருள்களின் பட்டியல்</td>
    </tr>
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td>Find Element(s) என்ற முந்தைய அழைப்பில் திருப்பித் தரப்பட்ட உறுப்பின் ஐடி</td>
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
      <td>பதிலின் எதிர்பார்க்கப்படும் நிலை</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>பதிலின் எதிர்பார்க்கப்படும் மதிப்பு</td>
    </tr>
  </tbody>
</table>